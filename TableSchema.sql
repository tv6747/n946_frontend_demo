/***
## 「PPT 互動生成」模板檔案
	- 模板檔案上傳時會紀錄於 File
	- 一般使用者右側上傳模板時，檔案上傳到「個人知識庫」的「隱藏」資料夾中，更改名稱/移除檔案時變更對應個人知識庫檔案名稱
	- 管理員在「知識庫」上傳「PPT模板」並設定共享
	- 載入畫面時，取得最新與個人共享的「PPT模板」並建立/更新「常用文件 List」(隱藏，使用者在知識庫管理看不到)(File_favorite_list)
	- 使用 File_favorite_list_mapping 紀錄星號「是否為常用」
	- 需在後端寫好取得模板邏輯，無法透過後台設定
	
## 「提示詞優化」
	- 需在後端透過對話邏輯使用對話相關資料表，無法透過後台設定

## 一般使用者使用應用時，需要同步檢查「應用管理」、「提示詞管理」中的設定
	- 「應用管理」、「提示詞管理」都被設定為可以存取的情況，使用者才看得到能夠使用。
	
## 「室內裝修」
	- 搜尋附件、傳回公文系統，需在後端寫好，無法透過後台設定
	
## 「應用管理」的設定
	- 模型、提示詞、參數 為單選或多選需在前端寫好邏輯呈現，後端接收時也須檢核是否為單/多選。

## 「文件翻譯」
	- 同其他應用只需要設定一套「語言模型/參數/提示詞/工具」
	- 後端處理邏輯需要後端寫好，無法透過後台設定
***/

-- 啟用必要的擴充套件
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- ==========================================
-- 建立 ENUM 類型
-- ==========================================
CREATE TYPE user_status AS ENUM ('啟用', '停用');
CREATE TYPE file_status AS ENUM ('切片', 'Embedding狀態', '正常', '垃圾桶', '刪除');
CREATE TYPE folder_status AS ENUM ('正常', '垃圾桶', '刪除');
CREATE TYPE generic_status AS ENUM ('正常', '刪除');
CREATE TYPE enable_status AS ENUM ('啟用', '停用', '刪除');
CREATE TYPE model_type AS ENUM ('生成式', '詞向量');
CREATE TYPE operate_type AS ENUM ('新增', '修改', '刪除', '查詢', '匯入', '匯出', '登入', '其他');
CREATE TYPE statistics_type AS ENUM ('應用使用次數', '模型使用次數', 'Token', '對話', '對話次數', '使用人數');
CREATE TYPE corpus_category AS ENUM ('通用', '專業', '系統');
CREATE TYPE chat_role AS ENUM ('User', 'AI');
CREATE TYPE chat_feedback AS ENUM ('good', 'bad');
CREATE TYPE attachment_status AS ENUM ('正常', '傳回公文系統');
CREATE TYPE service_type AS ENUM('GAI 互動平台','智慧公文系統','答詢機器人');
-- ==========================================
-- Identity 模組
-- ==========================================
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    parent_id INT REFERENCES department(id) ON DELETE SET NULL,
    department_name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    account VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- hash
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    department_id INT REFERENCES department(id) ON DELETE SET NULL,
    description TEXT,
    status user_status DEFAULT '啟用',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- File 模組
-- ==========================================
CREATE TABLE file_folder (
    id SERIAL PRIMARY KEY,
    parent_id INT REFERENCES file_folder(id) ON DELETE CASCADE,
    folder_name VARCHAR(255) NOT NULL,
    creator_id INT REFERENCES users(id) ON DELETE SET NULL,
    status folder_status DEFAULT '正常',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE file (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50),
    file_size BIGINT,
    file_blob BYTEA,
    file_path TEXT,
    creator_id INT REFERENCES users(id) ON DELETE SET NULL,
    status file_status DEFAULT '正常',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE file_chunk (
    id SERIAL PRIMARY KEY,
    file_id INT REFERENCES file(id) ON DELETE CASCADE,
    content TEXT,
    embedding vector(1536), -- 假設使用 1536 維度，可依需求調整
    chunk_index INT,
    token_count INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE file_shared (
    id SERIAL PRIMARY KEY,
    file_id INT REFERENCES file(id) ON DELETE CASCADE,
    folder_id INT REFERENCES file_folder(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    department_id INT REFERENCES department(id) ON DELETE CASCADE,
    creator_id INT REFERENCES users(id) ON DELETE SET NULL,
    status generic_status DEFAULT '正常',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    -- 確保 file_id 或 folder_id 至少有一項，且 user_id 與 department_id 擇一
    CHECK (
        (file_id IS NOT NULL OR folder_id IS NOT NULL) AND 
        (user_id IS NOT NULL OR department_id IS NOT NULL)
    )
);

CREATE TABLE file_favorite_list (
    id SERIAL PRIMARY KEY,
    list_name VARCHAR(255) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    creator_id INT REFERENCES users(id) ON DELETE CASCADE,
    status generic_status DEFAULT '正常',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE file_favorite_list_mapping (
    id SERIAL PRIMARY KEY,
    list_id INT REFERENCES file_favorite_list(id) ON DELETE CASCADE,
    file_id INT REFERENCES file(id) ON DELETE CASCADE,
    is_important BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- LLM 模組
-- ==========================================
CREATE TABLE model (
    id SERIAL PRIMARY KEY,
    model_name VARCHAR(255) NOT NULL,
    model_type model_type NOT NULL,
    endpoint_url TEXT NOT NULL,
    api_key TEXT,
    creator_id INT REFERENCES users(id) ON DELETE SET NULL,
    status user_status DEFAULT '啟用',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE model_parameter (
    id SERIAL PRIMARY KEY,
    parameter_name VARCHAR(255) NOT NULL,
    parameter_content JSONB NOT NULL,
    creator_id INT REFERENCES users(id) ON DELETE SET NULL,
    status enable_status DEFAULT '啟用',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE model_prompt (
    id SERIAL PRIMARY KEY,
    prompt_name VARCHAR(255) NOT NULL,
    prompt_content TEXT NOT NULL,
    creator_id INT REFERENCES users(id) ON DELETE SET NULL,
    status enable_status DEFAULT '啟用',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE model_prompt_shared (
    id SERIAL PRIMARY KEY,
    prompt_id INT REFERENCES model_prompt(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    department_id INT REFERENCES department(id) ON DELETE CASCADE,
    creator_id INT REFERENCES users(id) ON DELETE SET NULL,
    status generic_status DEFAULT '正常',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE model_tool (
    id SERIAL PRIMARY KEY,
    tool_name VARCHAR(255) NOT NULL,
    description TEXT,
    endpoint_url TEXT NOT NULL,
    endpoint_port INT,
    creator_id INT REFERENCES users(id) ON DELETE SET NULL,
    status enable_status DEFAULT '啟用',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- ==========================================
-- APP 模組
-- ==========================================
CREATE TABLE app (
    id SERIAL PRIMARY KEY,
    app_name VARCHAR(255) NOT NULL,
	service_type service_type DEFAULT 'GAI 互動平台',
    description TEXT,
    creator_id INT REFERENCES users(id) ON DELETE SET NULL,
    status enable_status DEFAULT '啟用',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE app_model_setting (
    id SERIAL PRIMARY KEY,
    app_id INT REFERENCES app(id) ON DELETE CASCADE,
    welcome_message TEXT,
    recommend_questions TEXT[],
    function_settings JSONB,
    model_settings JSONB,
    creator_id INT REFERENCES users(id) ON DELETE SET NULL,
    status generic_status DEFAULT '正常',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE app_shared (
    id SERIAL PRIMARY KEY,
    app_id INT REFERENCES app(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    department_id INT REFERENCES department(id) ON DELETE CASCADE,
    creator_id INT REFERENCES users(id) ON DELETE SET NULL,
    status generic_status DEFAULT '正常',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE app_linked_file (
    id SERIAL PRIMARY KEY,
    app_id INT REFERENCES app(id) ON DELETE CASCADE,
    file_id_list INT[],
    creator_id INT REFERENCES users(id) ON DELETE SET NULL,
    status generic_status DEFAULT '正常',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE app_api_provide (
    id SERIAL PRIMARY KEY,
    api_name VARCHAR(255) NOT NULL,
    endpoint_path TEXT NOT NULL,
    endpoint_parameter TEXT,
    api_key TEXT,
    model_settings JSONB,
    creator_id INT REFERENCES users(id) ON DELETE SET NULL,
    status enable_status DEFAULT '啟用',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- ==========================================
-- Audit 模組
-- ==========================================
CREATE TABLE system_log (
    id SERIAL PRIMARY KEY,
    operate_type operate_type NOT NULL,
    operate_object VARCHAR(255),
    operator_id INT REFERENCES users(id) ON DELETE SET NULL,
    description TEXT,
    ip_address INET,
    user_agent TEXT,
    operated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE system_statistics (
    id SERIAL PRIMARY KEY,
    statistics_type statistics_type NOT NULL,
    count INT DEFAULT 0,
    department_id INT REFERENCES department(id) ON DELETE CASCADE,
    statistics_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Corpus 語料庫模組
-- ==========================================
CREATE TABLE corpus_proper (
    id SERIAL PRIMARY KEY,
    proper_name VARCHAR(255) NOT NULL,
    description TEXT,
    creator_id INT REFERENCES users(id) ON DELETE SET NULL,
    status generic_status DEFAULT '正常',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE corpus_synonyms (
    id SERIAL PRIMARY KEY,
    standard_name VARCHAR(255) NOT NULL,
    synonyms_name TEXT[],
    category corpus_category DEFAULT '通用',
    description TEXT,
    creator_id INT REFERENCES users(id) ON DELETE SET NULL,
    status generic_status DEFAULT '正常',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- ==========================================
-- Chat 模組
-- ==========================================
CREATE TABLE chat_session (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    app_id INT REFERENCES app(id) ON DELETE SET NULL,
    model_settings JSONB,
    creator_id INT REFERENCES users(id) ON DELETE CASCADE,
    status generic_status DEFAULT '正常',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE chat_content (
    id SERIAL PRIMARY KEY,
    session_id UUID REFERENCES chat_session(id) ON DELETE CASCADE,
    role chat_role NOT NULL,
    content TEXT NOT NULL,
    feedback chat_feedback,
    token_count INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat_linked_file (
    id SERIAL PRIMARY KEY,
    session_id UUID REFERENCES chat_session(id) ON DELETE CASCADE,
    favorite_list_id INT REFERENCES file_favorite_list(id) ON DELETE SET NULL,
    file_id_list INT[]
);

CREATE TABLE chat_upload_content (
    id SERIAL PRIMARY KEY,
    content_id INT REFERENCES chat_content(id) ON DELETE CASCADE,
    file_id INT REFERENCES file(id) ON DELETE CASCADE
);

CREATE TABLE chat_content_citation (
    id SERIAL PRIMARY KEY,
    content_id INT REFERENCES chat_content(id) ON DELETE CASCADE,
    chunk_id INT REFERENCES file_chunk(id) ON DELETE CASCADE
);

CREATE TABLE chat_feedback_message (
    id SERIAL PRIMARY KEY,
    content_id INT REFERENCES chat_content(id) ON DELETE CASCADE,
    feedback_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat_archive_content (
    id SERIAL PRIMARY KEY,
    session_id UUID REFERENCES chat_session(id) ON DELETE CASCADE,
    archive_name VARCHAR(255) NOT NULL,
    canvas_obj JSONB,
    status generic_status DEFAULT '正常',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE chat_attachment (
    id SERIAL PRIMARY KEY,
    content_id INT REFERENCES chat_content(id) ON DELETE CASCADE,
    status attachment_status DEFAULT '正常',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Identity 模組註解
-- ==========================================
COMMENT ON TABLE department IS '部門';
COMMENT ON COLUMN department.id IS '流水號';
COMMENT ON COLUMN department.parent_id IS '所屬部門 ID';
COMMENT ON COLUMN department.department_name IS '部門名稱';
COMMENT ON COLUMN department.description IS '備註';

COMMENT ON TABLE users IS '使用者帳號';
COMMENT ON COLUMN users.id IS '流水號';
COMMENT ON COLUMN users.account IS '帳號';
COMMENT ON COLUMN users.password IS '密碼_hash';
COMMENT ON COLUMN users.user_name IS '姓名';
COMMENT ON COLUMN users.email IS '電子信箱';
COMMENT ON COLUMN users.department_id IS '部門 ID';
COMMENT ON COLUMN users.description IS '備註';
COMMENT ON COLUMN users.status IS '狀態 (啟用、停用)';
COMMENT ON COLUMN users.created_at IS '註冊時間';
COMMENT ON COLUMN users.updated_at IS '更新時間';

-- ==========================================
-- File 模組註解
-- ==========================================
COMMENT ON TABLE file_folder IS '文件資料夾';
COMMENT ON COLUMN file_folder.id IS '流水號';
COMMENT ON COLUMN file_folder.parent_id IS '所屬資料夾 ID';
COMMENT ON COLUMN file_folder.folder_name IS '資料夾名稱';
COMMENT ON COLUMN file_folder.creator_id IS '建立者 ID';
COMMENT ON COLUMN file_folder.status IS '狀態';
COMMENT ON COLUMN file_folder.created_at IS '建立時間';
COMMENT ON COLUMN file_folder.updated_at IS '更新時間 (重新命名或加入移除檔案)';
COMMENT ON COLUMN file_folder.deleted_at IS '刪除時間';

COMMENT ON TABLE file IS '文件';
COMMENT ON COLUMN file.id IS '流水號';
COMMENT ON COLUMN file.file_name IS '檔案名稱';
COMMENT ON COLUMN file.file_type IS '檔案類型 (ex. docx、pdf、pptx等)';
COMMENT ON COLUMN file.file_size IS '檔案大小';
COMMENT ON COLUMN file.file_blob IS '檔案二進制儲存內容';
COMMENT ON COLUMN file.file_path IS '檔案位置';
COMMENT ON COLUMN file.creator_id IS '文件擁有者/上傳者';
COMMENT ON COLUMN file.status IS '狀態';
COMMENT ON COLUMN file.created_at IS '建立時間';
COMMENT ON COLUMN file.updated_at IS '更新時間';
COMMENT ON COLUMN file.deleted_at IS '刪除時間';

COMMENT ON TABLE file_chunk IS '文件切塊表';
COMMENT ON COLUMN file_chunk.id IS '流水號';
COMMENT ON COLUMN file_chunk.file_id IS '文件 ID';
COMMENT ON COLUMN file_chunk.content IS '切塊內容';
COMMENT ON COLUMN file_chunk.embedding IS '切塊向量';
COMMENT ON COLUMN file_chunk.chunk_index IS '切塊索引';
COMMENT ON COLUMN file_chunk.token_count IS 'token 使用量';
COMMENT ON COLUMN file_chunk.created_at IS '切塊完成時間';

COMMENT ON TABLE file_shared IS '文件及資料夾存取權限';
COMMENT ON COLUMN file_shared.id IS '流水號';
COMMENT ON COLUMN file_shared.file_id IS '文件 ID';
COMMENT ON COLUMN file_shared.folder_id IS '資料夾 ID';
COMMENT ON COLUMN file_shared.user_id IS '使用者 ID';
COMMENT ON COLUMN file_shared.department_id IS '部門 ID';
COMMENT ON COLUMN file_shared.creator_id IS '設定權限的使用者 ID';
COMMENT ON COLUMN file_shared.status IS '狀態';
COMMENT ON COLUMN file_shared.created_at IS '建立時間 (紀錄何時分享)';
COMMENT ON COLUMN file_shared.updated_at IS '更新時間 (加入移除分享的更新時間)';
COMMENT ON COLUMN file_shared.deleted_at IS '刪除時間';

COMMENT ON TABLE file_favorite_list IS '常用清單';
COMMENT ON COLUMN file_favorite_list.id IS '流水號';
COMMENT ON COLUMN file_favorite_list.list_name IS '常用清單名稱';
COMMENT ON COLUMN file_favorite_list.is_default IS '是否為預設清單';
COMMENT ON COLUMN file_favorite_list.creator_id IS '建立者 ID';
COMMENT ON COLUMN file_favorite_list.status IS '狀態';
COMMENT ON COLUMN file_favorite_list.created_at IS '建立時間';
COMMENT ON COLUMN file_favorite_list.updated_at IS '更新時間';
COMMENT ON COLUMN file_favorite_list.deleted_at IS '刪除時間';

COMMENT ON TABLE file_favorite_list_mapping IS '清單與文件關聯表';
COMMENT ON COLUMN file_favorite_list_mapping.id IS '流水號';
COMMENT ON COLUMN file_favorite_list_mapping.list_id IS '常用清單 ID';
COMMENT ON COLUMN file_favorite_list_mapping.file_id IS '文件 ID';
COMMENT ON COLUMN file_favorite_list_mapping.is_important IS '是否為重要文件';
COMMENT ON COLUMN file_favorite_list_mapping.created_at IS '加入清單的時間';

-- ==========================================
-- LLM 模組註解
-- ==========================================
COMMENT ON TABLE model IS '模型管理';
COMMENT ON COLUMN model.id IS '流水號';
COMMENT ON COLUMN model.model_name IS '模型名稱';
COMMENT ON COLUMN model.model_type IS '模型類型';
COMMENT ON COLUMN model.endpoint_url IS '端點網址';
COMMENT ON COLUMN model.api_key IS 'API KEY';
COMMENT ON COLUMN model.creator_id IS '建立者 ID';
COMMENT ON COLUMN model.status IS '狀態';
COMMENT ON COLUMN model.created_at IS '建立時間';
COMMENT ON COLUMN model.updated_at IS '更新時間';
COMMENT ON COLUMN model.deleted_at IS '刪除時間';

COMMENT ON TABLE model_parameter IS '模型參數管理';
COMMENT ON COLUMN model_parameter.id IS '流水號';
COMMENT ON COLUMN model_parameter.parameter_name IS '參數名稱';
COMMENT ON COLUMN model_parameter.parameter_content IS '模型參數 (JSONB)';
COMMENT ON COLUMN model_parameter.creator_id IS '建立者 ID';
COMMENT ON COLUMN model_parameter.status IS '狀態';
COMMENT ON COLUMN model_parameter.created_at IS '建立時間';
COMMENT ON COLUMN model_parameter.updated_at IS '更新時間';
COMMENT ON COLUMN model_parameter.deleted_at IS '刪除時間';

COMMENT ON TABLE model_prompt IS '提示詞管理';
COMMENT ON COLUMN model_prompt.id IS '流水號';
COMMENT ON COLUMN model_prompt.prompt_name IS '提示詞名稱';
COMMENT ON COLUMN model_prompt.prompt_content IS '提示詞內容';
COMMENT ON COLUMN model_prompt.creator_id IS '建立者 ID';
COMMENT ON COLUMN model_prompt.status IS '狀態';
COMMENT ON COLUMN model_prompt.created_at IS '建立時間';
COMMENT ON COLUMN model_prompt.updated_at IS '更新時間';
COMMENT ON COLUMN model_prompt.deleted_at IS '刪除時間';

COMMENT ON TABLE model_prompt_shared IS '提示詞權限';
COMMENT ON COLUMN model_prompt_shared.id IS '流水號';
COMMENT ON COLUMN model_prompt_shared.prompt_id IS '提示詞 ID';
COMMENT ON COLUMN model_prompt_shared.user_id IS '使用者 ID';
COMMENT ON COLUMN model_prompt_shared.department_id IS '部門 ID';
COMMENT ON COLUMN model_prompt_shared.creator_id IS '設定權限的使用者 ID';
COMMENT ON COLUMN model_prompt_shared.status IS '狀態';
COMMENT ON COLUMN model_prompt_shared.created_at IS '建立時間';
COMMENT ON COLUMN model_prompt_shared.updated_at IS '更新時間';

COMMENT ON TABLE model_tool IS '工具管理';
COMMENT ON COLUMN model_tool.id IS '流水號';
COMMENT ON COLUMN model_tool.tool_name IS '工具名稱';
COMMENT ON COLUMN model_tool.description IS '備註';
COMMENT ON COLUMN model_tool.endpoint_url IS '端點網址';
COMMENT ON COLUMN model_tool.endpoint_port IS '端點端口';
COMMENT ON COLUMN model_tool.creator_id IS '建立者 ID';
COMMENT ON COLUMN model_tool.status IS '狀態';
COMMENT ON COLUMN model_tool.created_at IS '建立時間';
COMMENT ON COLUMN model_tool.updated_at IS '更新時間';
COMMENT ON COLUMN model_tool.deleted_at IS '刪除時間';

-- ==========================================
-- APP 模組註解
-- ==========================================
COMMENT ON TABLE app IS '應用功能';
COMMENT ON COLUMN app.id IS '流水號';
COMMENT ON COLUMN app.app_name IS '應用名稱';
COMMENT ON COLUMN app.description IS '備註';
COMMENT ON COLUMN app.creator_id IS '建立者 ID';
COMMENT ON COLUMN app.status IS '狀態';
COMMENT ON COLUMN app.created_at IS '建立時間';
COMMENT ON COLUMN app.updated_at IS '更新時間';
COMMENT ON COLUMN app.deleted_at IS '刪除時間';

COMMENT ON TABLE app_model_setting IS '應用模型預設';
COMMENT ON COLUMN app_model_setting.id IS '流水號';
COMMENT ON COLUMN app_model_setting.app_id IS '應用 ID';
COMMENT ON COLUMN app_model_setting.welcome_message IS '歡迎詞';
COMMENT ON COLUMN app_model_setting.recommend_questions IS '預設提問';
COMMENT ON COLUMN app_model_setting.function_settings IS '功能設定 (JSONB)';
COMMENT ON COLUMN app_model_setting.model_settings IS '模型設定 (JSONB)';
COMMENT ON COLUMN app_model_setting.creator_id IS '設定權限的使用者 ID';
COMMENT ON COLUMN app_model_setting.status IS '狀態';
COMMENT ON COLUMN app_model_setting.created_at IS '建立時間';
COMMENT ON COLUMN app_model_setting.updated_at IS '更新時間';

COMMENT ON TABLE app_shared IS '應用權限';
COMMENT ON COLUMN app_shared.id IS '流水號';
COMMENT ON COLUMN app_shared.app_id IS '應用 ID';
COMMENT ON COLUMN app_shared.user_id IS '使用者 ID';
COMMENT ON COLUMN app_shared.department_id IS '部門 ID';
COMMENT ON COLUMN app_shared.creator_id IS '設定權限的使用者 ID';
COMMENT ON COLUMN app_shared.status IS '狀態';
COMMENT ON COLUMN app_shared.created_at IS '建立時間';
COMMENT ON COLUMN app_shared.updated_at IS '更新時間';

COMMENT ON TABLE app_linked_file IS '應用關聯文件';
COMMENT ON COLUMN app_linked_file.id IS '流水號';
COMMENT ON COLUMN app_linked_file.app_id IS '應用 ID';
COMMENT ON COLUMN app_linked_file.file_id_list IS '文件 ID 列表';
COMMENT ON COLUMN app_linked_file.creator_id IS '設定權限的使用者 ID';
COMMENT ON COLUMN app_linked_file.status IS '狀態';
COMMENT ON COLUMN app_linked_file.created_at IS '建立時間';
COMMENT ON COLUMN app_linked_file.updated_at IS '更新時間';

COMMENT ON TABLE app_api_provide IS 'API 服務提供';
COMMENT ON COLUMN app_api_provide.id IS '流水號';
COMMENT ON COLUMN app_api_provide.api_name IS 'API 名稱';
COMMENT ON COLUMN app_api_provide.endpoint_path IS '網址路徑';
COMMENT ON COLUMN app_api_provide.endpoint_parameter IS '網址參數';
COMMENT ON COLUMN app_api_provide.api_key IS 'API KEY';
COMMENT ON COLUMN app_api_provide.model_settings IS '模型設定';
COMMENT ON COLUMN app_api_provide.creator_id IS '建立者 ID';
COMMENT ON COLUMN app_api_provide.status IS '狀態';
COMMENT ON COLUMN app_api_provide.created_at IS '建立時間';
COMMENT ON COLUMN app_api_provide.updated_at IS '更新時間';
COMMENT ON COLUMN app_api_provide.deleted_at IS '刪除時間';

-- ==========================================
-- Audit 模組註解
-- ==========================================
COMMENT ON TABLE system_log IS '系統紀錄/知識庫紀錄';
COMMENT ON COLUMN system_log.id IS '流水號';
COMMENT ON COLUMN system_log.operate_type IS '操作類型';
COMMENT ON COLUMN system_log.operate_object IS '操作物件';
COMMENT ON COLUMN system_log.operator_id IS '使用者帳號 ID';
COMMENT ON COLUMN system_log.description IS '操作說明';
COMMENT ON COLUMN system_log.ip_address IS 'IP 位址';
COMMENT ON COLUMN system_log.user_agent IS '瀏覽器版本';
COMMENT ON COLUMN system_log.operated_at IS '操作時間';

COMMENT ON TABLE system_statistics IS '統計圖表';
COMMENT ON COLUMN system_statistics.id IS '流水號';
COMMENT ON COLUMN system_statistics.statistics_type IS '統計類型';
COMMENT ON COLUMN system_statistics.count IS '次數';
COMMENT ON COLUMN system_statistics.department_id IS '部門 ID';
COMMENT ON COLUMN system_statistics.statistics_date IS '統計日期';
COMMENT ON COLUMN system_statistics.created_at IS '建立時間';

-- ==========================================
-- Corpus 語料庫模組註解
-- ==========================================
COMMENT ON TABLE corpus_proper IS '專有名詞管理';
COMMENT ON COLUMN corpus_proper.id IS '流水號';
COMMENT ON COLUMN corpus_proper.proper_name IS '專有名詞';
COMMENT ON COLUMN corpus_proper.description IS '備註';
COMMENT ON COLUMN corpus_proper.creator_id IS '建立者 ID';
COMMENT ON COLUMN corpus_proper.status IS '狀態';
COMMENT ON COLUMN corpus_proper.created_at IS '建立時間';
COMMENT ON COLUMN corpus_proper.updated_at IS '更新時間';
COMMENT ON COLUMN corpus_proper.deleted_at IS '刪除時間';

COMMENT ON TABLE corpus_synonyms IS '近似詞管理';
COMMENT ON COLUMN corpus_synonyms.id IS '流水號';
COMMENT ON COLUMN corpus_synonyms.standard_name IS '標準詞';
COMMENT ON COLUMN corpus_synonyms.synonyms_name IS '近似詞 (TEXT Array)';
COMMENT ON COLUMN corpus_synonyms.category IS '標準詞分類';
COMMENT ON COLUMN corpus_synonyms.description IS '備註';
COMMENT ON COLUMN corpus_synonyms.creator_id IS '建立者 ID';
COMMENT ON COLUMN corpus_synonyms.status IS '狀態';
COMMENT ON COLUMN corpus_synonyms.created_at IS '建立時間';
COMMENT ON COLUMN corpus_synonyms.updated_at IS '更新時間';
COMMENT ON COLUMN corpus_synonyms.deleted_at IS '刪除時間';

-- ==========================================
-- Chat 模組註解
-- ==========================================
COMMENT ON TABLE chat_session IS '對話記錄';
COMMENT ON COLUMN chat_session.id IS 'Session ID (UUID)';
COMMENT ON COLUMN chat_session.app_id IS '應用 ID';
COMMENT ON COLUMN chat_session.model_settings IS '模型設定';
COMMENT ON COLUMN chat_session.creator_id IS '建立者 ID';
COMMENT ON COLUMN chat_session.status IS '狀態';
COMMENT ON COLUMN chat_session.created_at IS '建立時間';
COMMENT ON COLUMN chat_session.updated_at IS '更新時間';
COMMENT ON COLUMN chat_session.deleted_at IS '刪除時間';

COMMENT ON TABLE chat_content IS '對話內容';
COMMENT ON COLUMN chat_content.id IS '流水號';
COMMENT ON COLUMN chat_content.session_id IS '對話 ID';
COMMENT ON COLUMN chat_content.role IS '對話腳色';
COMMENT ON COLUMN chat_content.content IS '對話內容';
COMMENT ON COLUMN chat_content.feedback IS '回饋';
COMMENT ON COLUMN chat_content.token_count IS 'token 使用量';
COMMENT ON COLUMN chat_content.created_at IS '建立時間';

COMMENT ON TABLE chat_linked_file IS '知識庫對話常用文件/勾選文件';
COMMENT ON COLUMN chat_linked_file.id IS '流水號';
COMMENT ON COLUMN chat_linked_file.session_id IS '對話 ID';
COMMENT ON COLUMN chat_linked_file.favorite_list_id IS '常用清單 ID';
COMMENT ON COLUMN chat_linked_file.file_id_list IS '文件 ID 列表';

COMMENT ON TABLE chat_upload_content IS '對話上傳內容與文件關聯';
COMMENT ON COLUMN chat_upload_content.id IS '流水號';
COMMENT ON COLUMN chat_upload_content.content_id IS '對話內容 ID';
COMMENT ON COLUMN chat_upload_content.file_id IS '文件 ID';

COMMENT ON TABLE chat_content_citation IS '對話引用來源';
COMMENT ON COLUMN chat_content_citation.id IS '流水號';
COMMENT ON COLUMN chat_content_citation.content_id IS '對話內容 ID';
COMMENT ON COLUMN chat_content_citation.chunk_id IS '文件切塊 ID';

COMMENT ON TABLE chat_feedback_message IS '對話回饋訊息';
COMMENT ON COLUMN chat_feedback_message.id IS '流水號';
COMMENT ON COLUMN chat_feedback_message.content_id IS '對話內容 ID';
COMMENT ON COLUMN chat_feedback_message.feedback_message IS '回饋內容';
COMMENT ON COLUMN chat_feedback_message.created_at IS '建立時間';

COMMENT ON TABLE chat_archive_content IS 'Canvas 存檔表';
COMMENT ON COLUMN chat_archive_content.id IS '流水號';
COMMENT ON COLUMN chat_archive_content.session_id IS '對話 ID';
COMMENT ON COLUMN chat_archive_content.archive_name IS '存檔名稱';
COMMENT ON COLUMN chat_archive_content.canvas_obj IS '存檔物件 (JSONB)';
COMMENT ON COLUMN chat_archive_content.status IS '狀態';
COMMENT ON COLUMN chat_archive_content.created_at IS '建立時間';
COMMENT ON COLUMN chat_archive_content.deleted_at IS '刪除時間';

COMMENT ON TABLE chat_attachment IS '對話附件';
COMMENT ON COLUMN chat_attachment.id IS '流水號';
COMMENT ON COLUMN chat_attachment.content_id IS '對話內容 ID';
COMMENT ON COLUMN chat_attachment.status IS '狀態 (正常、傳回公文系統)';
COMMENT ON COLUMN chat_attachment.created_at IS '建立時間';