-- ==========================================
-- N946 系統 Demo 資料 INSERT SQL
-- 根據前端 DEMO 資料與 Schema 生成
-- 生成時間: 2026-02-26
-- 注意: 不包含 file_chunk 資料
-- ==========================================

-- ==========================================
-- 1. Identity 模組 - department
-- ==========================================
INSERT INTO department (id, parent_id, department_name, description) VALUES
(1, NULL, '國土管理署', '國土管理署本部'),
(2, 1, '建築管理組', '掌理建築法規、營建管理等'),
(3, 1, '國土計畫組', '掌理國土規劃、土地使用分區等'),
(4, 1, '都市更新組', '掌理都市更新政策、危老重建等'),
(5, 2, '五科', '建管組五科'),
(6, 1, '城鄉分署', '城鄉發展分署'),
(7, 1, '資訊室', '資訊系統管理'),
(8, 1, '人事室', '人事行政管理'),
(9, 1, '行銷部', '行銷推廣');

-- ==========================================
-- 2. Identity 模組 - users
-- ==========================================
INSERT INTO users (id, account, password, user_name, email, department_id, description, status, created_at, updated_at) VALUES
(1, 'alex.lin',    '$2b$10$hashedpassword001', '林小宏', 'alex.lin@nlma.gov.tw',    5, '系統管理員',       '啟用', '2023-01-01', '2024-02-01'),
(2, 'sara.chen',   '$2b$10$hashedpassword002', '陳莎拉', 'sara.chen@nlma.gov.tw',   2, '建築執照審查人員', '啟用', '2023-03-15', '2024-01-20'),
(3, 'john.wu',     '$2b$10$hashedpassword003', '吳約翰', 'john.wu@nlma.gov.tw',     3, '留職停薪',         '停用', '2023-06-10', '2023-12-01'),
(4, 'emily.chang', '$2b$10$hashedpassword004', '張愛美', 'emily.chang@nlma.gov.tw', 5, '',                 '啟用', '2023-11-05', '2024-02-10'),
(5, 'david.wang',  '$2b$10$hashedpassword005', '王大衛', 'david.wang@nlma.gov.tw',  2, '新進人員',         '啟用', '2024-02-01', '2024-02-01'),
(6, 'chen.xiaohua','$2b$10$hashedpassword006', '陳小華', 'chen.xiaohua@nlma.gov.tw',5, '一般使用者',       '啟用', '2023-02-01', '2024-01-15'),
(7, 'li.dahua',    '$2b$10$hashedpassword007', '李大華', 'li.dahua@nlma.gov.tw',    5, '管理員',           '啟用', '2023-01-15', '2024-02-05'),
(8, 'wang.xiaoming','$2b$10$hashedpassword008','王小明', 'wang.xiaoming@nlma.gov.tw',7, '資訊室人員',       '啟用', '2023-04-01', '2024-02-05'),
(9, 'chen.xiaomei','$2b$10$hashedpassword009', '陳小美', 'chen.xiaomei@nlma.gov.tw',9, '行銷部人員',       '啟用', '2023-05-01', '2024-02-05');

-- ==========================================
-- 3. File 模組 - file_folder (知識庫樹狀結構)
-- ==========================================
INSERT INTO file_folder (id, parent_id, folder_name, creator_id, status) VALUES
-- 組織/單位公用
(1,  NULL, '組織/單位公用', 1, '正常'),
(2,  1,    '國土管理署',    1, '正常'),
(3,  2,    '國土法規',      1, '正常'),
(4,  2,    '行政法規',      1, '正常'),
(5,  1,    '建築管理組',    1, '正常'),
(6,  5,    '建築辦法',      1, '正常'),
(7,  5,    '行政辦法',      1, '正常'),
(8,  1,    '五科',          1, '正常'),
(9,  8,    'OO業務',        1, '正常'),
(10, 8,    'OO規範',        1, '正常'),
-- 個人知識庫
(11, NULL, '個人知識庫',    6, '正常'),
(12, 11,   'A',             6, '正常'),
(13, 11,   'B',             6, '正常'),
-- 與我共享
(14, NULL, '與我共享',      1, '正常'),
(15, 14,   '國土計畫組',    1, '正常'),
(16, 14,   '城鄉分署',      1, '正常'),
(17, 14,   '王小明',        8, '正常');

-- ==========================================
-- 4. File 模組 - file (文件)
-- 注意: 不生成 file_chunk 資料
-- ==========================================
INSERT INTO file (id, file_name, file_type, file_size, file_path, creator_id, status) VALUES
-- 前5筆: 基礎文件
(1,  '專案規格書_v1.pdf',          'pdf',  2500000, '/kb/org/section5/business/', 1, '正常'),
(2,  '會議記錄_2024.docx',         'docx', 1800000, '/kb/org/section5/business/', 1, '正常'),
(3,  '我的筆記.txt',               'txt',   500000, '/kb/personal/a/',            6, '正常'),
(4,  '員工請假辦法.pdf',            'pdf',  3200000, '/kb/org/section5/standard/', 1, '正常'),
(5,  'Q1行銷檢討.pptx',            'pptx', 4500000, '/kb/shared/land_plan/',      9, '正常'),
-- 6~20: REALISTIC_FILES
(6,  '員工差勤管理辦法.pdf',        'pdf',  2100000, '/kb/org/section5/standard/', 1, '正常'),
(7,  '2024年度資安宣導手冊.pdf',    'pdf',  3800000, '/kb/org/section5/standard/', 1, '正常'),
(8,  '資訊設備使用規範.pdf',        'pdf',  1500000, '/kb/org/section5/standard/', 1, '正常'),
(9,  '第10次專案會議記錄.docx',     'docx', 2200000, '/kb/org/section5/business/', 1, '正常'),
(10, '需求訪談紀錄_20240215.docx',  'docx', 1900000, '/kb/org/section5/business/', 1, '正常'),
(11, '系統測試計畫書.docx',         'docx', 2800000, '/kb/org/section5/business/', 1, '正常'),
(12, '使用者操作手冊_v2.docx',      'docx', 3500000, '/kb/shared/land_plan/',      3, '正常'),
(13, '異常狀況處理報告.docx',       'docx', 1200000, '/kb/personal/a/',            6, '正常'),
(14, '勞工退休金提繳申報表.pdf',    'pdf',  900000,  '/kb/shared/land_plan/',      3, '正常'),
(15, '供應商評鑑表.pdf',            'pdf',  1100000, '/kb/org/section5/business/', 1, '正常'),
(16, '年度預算編列準則.pdf',        'pdf',  2700000, '/kb/org/section5/standard/', 1, '正常'),
(17, '教育訓練計畫書.docx',         'docx', 2000000, '/kb/shared/land_plan/',      3, '正常'),
(18, '資安事件通報單.docx',         'docx', 800000,  '/kb/org/section5/standard/', 1, '正常'),
(19, '客戶滿意度調查報告.pdf',      'pdf',  3100000, '/kb/org/section5/business/', 1, '正常'),
(20, '軟體授權清單.xlsx',           'xlsx', 600000,  '/kb/shared/land_plan/',      3, '正常'),
-- 21~40: 歸檔文件
(21, '歸檔文件_21.pdf', 'pdf', 1500000, '/kb/org/section5/business/',  1, '正常'),
(22, '歸檔文件_22.pdf', 'pdf', 2000000, '/kb/org/building/method/',    1, '正常'),
(23, '歸檔文件_23.pdf', 'pdf', 1700000, '/kb/org/section5/business/',  1, '正常'),
(24, '歸檔文件_24.pdf', 'pdf', 2300000, '/kb/org/building/method/',    1, '正常'),
(25, '歸檔文件_25.pdf', 'pdf', 1800000, '/kb/org/section5/business/',  1, '正常'),
(26, '歸檔文件_26.pdf', 'pdf', 2100000, '/kb/org/building/method/',    1, '正常'),
(27, '歸檔文件_27.pdf', 'pdf', 1600000, '/kb/org/section5/business/',  1, '正常'),
(28, '歸檔文件_28.pdf', 'pdf', 2400000, '/kb/org/building/method/',    1, '正常'),
(29, '歸檔文件_29.pdf', 'pdf', 1900000, '/kb/org/section5/business/',  1, '正常'),
(30, '歸檔文件_30.pdf', 'pdf', 2200000, '/kb/org/building/method/',    1, '正常'),
(31, '歸檔文件_31.pdf', 'pdf', 1400000, '/kb/org/section5/business/',  1, '正常'),
(32, '歸檔文件_32.pdf', 'pdf', 2500000, '/kb/org/building/method/',    1, '正常'),
(33, '歸檔文件_33.pdf', 'pdf', 1300000, '/kb/org/section5/business/',  1, '正常'),
(34, '歸檔文件_34.pdf', 'pdf', 2600000, '/kb/org/building/method/',    1, '正常'),
(35, '歸檔文件_35.pdf', 'pdf', 1200000, '/kb/org/section5/business/',  1, '正常'),
(36, '歸檔文件_36.pdf', 'pdf', 2700000, '/kb/org/building/method/',    1, '正常'),
(37, '歸檔文件_37.pdf', 'pdf', 1100000, '/kb/org/section5/business/',  1, '正常'),
(38, '歸檔文件_38.pdf', 'pdf', 2800000, '/kb/org/building/method/',    1, '正常'),
(39, '歸檔文件_39.pdf', 'pdf', 1000000, '/kb/org/section5/business/',  1, '正常'),
(40, '歸檔文件_40.pdf', 'pdf', 2900000, '/kb/org/building/method/',    1, '正常'),
-- 41~45: 個人文件
(41, '20240129_工作日報.docx', 'docx', 700000,  '/kb/personal/b/', 6, '正常'),
(42, '20240128_工作日報.docx', 'docx', 650000,  '/kb/personal/b/', 6, '正常'),
(43, '每週例會簡報.pptx',     'pptx', 4200000, '/kb/personal/a/', 6, '正常'),
(44, '個人工作計畫.xlsx',     'xlsx', 500000,  '/kb/personal/a/', 6, '正常'),
(45, '測試文件_45.pdf',       'pdf',  300000,  '/kb/personal/b/', 6, '正常');

-- ==========================================
-- 5. File 模組 - file_shared
-- ==========================================
INSERT INTO file_shared (id, file_id, folder_id, user_id, department_id, creator_id, status) VALUES
(1, 1, NULL, 5, NULL, 1, '正常');

-- ==========================================
-- 6. File 模組 - file_favorite_list (常用清單)
-- ==========================================
INSERT INTO file_favorite_list (id, list_name, is_default, creator_id, status) VALUES
(1, '常用文件列表1', TRUE,  6, '正常'),
(2, '行銷文件列表1', FALSE, 6, '正常');

-- ==========================================
-- 7. File 模組 - file_favorite_list_mapping
-- ==========================================
INSERT INTO file_favorite_list_mapping (id, list_id, file_id, is_important) VALUES
(1,  1, 22, FALSE),
(2,  1, 24, FALSE),
(3,  1, 26, FALSE),
(4,  1, 28, FALSE),
(5,  1, 30, FALSE),
(6,  1, 32, FALSE),
(7,  1, 34, FALSE),
(8,  2, 22, FALSE),
(9,  2, 24, FALSE),
(10, 2, 26, FALSE),
(11, 2, 28, FALSE),
(12, 2, 30, FALSE),
(13, 2, 32, FALSE),
(14, 2, 34, FALSE);

-- ==========================================
-- 8. LLM 模組 - model
-- ==========================================
INSERT INTO model (id, model_name, model_type, endpoint_url, api_key, creator_id, status, created_at) VALUES
(1, 'GPT-4o',                '生成式', 'https://api.openai.com/v1/chat/completions',                    'sk-proj-abc123...', 1, '啟用', '2024-01-15'),
(2, 'Claude 3.5 Sonnet',     '生成式', 'https://api.anthropic.com/v1/messages',                         'sk-ant-xyz789...', 1, '啟用', '2024-01-20'),
(3, 'Text Embedding 3 Large','詞向量', 'https://api.openai.com/v1/embeddings',                          'sk-proj-embed123...', 1, '啟用', '2024-02-01'),
(4, 'Gemini 1.5 Pro',        '生成式', 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro', '', 1, '停用', '2024-02-10');

-- ==========================================
-- 9. LLM 模組 - model_parameter
-- ==========================================
INSERT INTO model_parameter (id, parameter_name, parameter_content, creator_id, status, created_at) VALUES
(1, '創意寫作', '{"temperature": 0.9, "top_p": 0.95, "top_k": 50}', 1, '啟用', '2024-02-01'),
(2, '精確回答', '{"temperature": 0.3, "top_p": 0.8, "top_k": 30}',  1, '啟用', '2024-02-05'),
(3, '平衡模式', '{"temperature": 0.7, "top_p": 0.9, "top_k": 40}',  1, '啟用', '2024-02-10'),
(4, '保守輸出', '{"temperature": 0.2, "top_p": 0.7, "top_k": 20}',  1, '啟用', '2024-02-15');

-- ==========================================
-- 10. LLM 模組 - model_prompt
-- ==========================================
INSERT INTO model_prompt (id, prompt_name, prompt_content, creator_id, status, created_at) VALUES
(1, '公文撰寫助理', '你是一個專業的公文撰寫助理。請使用標準的台灣公文格式與用字遣詞 (如：函、簽、公告等)。語氣需正式、精確、不帶情緒。', 1, '啟用', '2024-01-20'),
(2, '客服回覆專家', '你是一個專業的客服人員。請以親切、同理的態度回應客戶問題，確保提供準確的資訊並維持專業形象。', 8, '啟用', '2024-01-25'),
(3, '數據分析師',   '你是一個資深數據分析師。請基於提供的數據進行深入分析，找出關鍵趨勢與洞察，並以清晰的方式呈現結果。', 1, '啟用', '2024-02-01'),
(4, '創意文案寫手', '你是一個充滿創意的行銷文案寫手。請使用生動活潑、引人入勝的語氣，為產品或主題撰寫吸引人的文案。', 9, '啟用', '2024-02-08'),
(5, '程式碼審查專家','You are an expert software architect and code reviewer. Provide constructive feedback on code quality, design patterns, and best practices. Explain your suggestions clearly.', 7, '啟用', '2024-02-12');

-- ==========================================
-- 11. LLM 模組 - model_prompt_shared
-- ==========================================
INSERT INTO model_prompt_shared (id, prompt_id, user_id, department_id, creator_id, status) VALUES
(1, 1, 6, NULL, 1, '正常'),
(2, 1, 4, NULL, 1, '正常'),
(3, 3, 7, NULL, 1, '正常'),
(4, 4, 5, NULL, 9, '正常');

-- ==========================================
-- 12. LLM 模組 - model_tool
-- ==========================================
INSERT INTO model_tool (id, tool_name, description, endpoint_url, endpoint_port, creator_id, status) VALUES
(1, 'WebSearch - Google',    '使用 Google 搜尋引擎檢索網路即時資訊，支援新聞、圖片與一般網頁結果。',               'http://172.16.10.20:3000/sse/google-search', 3000, 1, '啟用'),
(2, 'WebSearch - DuckDuckGo','使用 DuckDuckGo 搜尋引擎進行隱私保護搜尋，不追蹤使用者搜尋紀錄。',                 'http://172.16.10.20:3100/sse/ddg-search',    3100, 1, '啟用'),
(3, 'OCR',                   '光學字元辨識服務，可將圖片中的文字轉換為可編輯的文本格式，支援多語言辨識。', 'http://172.16.10.25:4000/sse/ocr-service',   4000, 1, '啟用');

-- ==========================================
-- 13. Corpus 語料庫模組 - corpus_proper (專有名詞)
-- ==========================================
INSERT INTO corpus_proper (id, proper_name, description, creator_id, status) VALUES
(1, '容積率',           '指基地內建築物總樓地板面積與基地面積之比。（建築技術規則建築設計施工編第161條）', 1, '正常'),
(2, '第一種農業發展地區','指具優良農業生產環境、維持糧食安全功能或曾經投資建設重大農業改良設施之地區。（國土計畫法第20條）', 1, '正常'),
(3, '建蔽率',           '指建築面積占基地面積之比率。（建築技術規則建築設計施工編第1條）', 1, '正常'),
(4, '都市更新單元',     '指依本條例規定劃定應實施都市更新之地區。（都市更新條例第3條）', 1, '正常'),
(5, '行動電話',         '可隨身攜帶之無線通訊設備', 1, '正常'),
(6, '人工智慧',         '由機器展示的智慧', 1, '正常'),
(7, '筆記型電腦',       '包含螢幕與鍵盤的可攜式電腦', 1, '正常');

-- ==========================================
-- 14. Corpus 語料庫模組 - corpus_synonyms (近似詞)
-- ==========================================
INSERT INTO corpus_synonyms (id, standard_name, synonyms_name, category, description, creator_id, status) VALUES
(1, '行動電話',   ARRAY['手機', '手提電話'],     '通用', '一般口語 / 港澳用語', 1, '正常'),
(2, '人工智慧',   ARRAY['AI', '機器智慧'],       '通用', '英文縮寫 / 學術用語', 1, '正常'),
(3, '筆記型電腦', ARRAY['筆電', 'Laptop'],       '通用', '台灣縮寫 / 英文',     1, '正常');

-- ==========================================
-- 15. APP 模組 - app (應用功能)
-- ==========================================
INSERT INTO app (id, app_name, service_type, description, creator_id, status, created_at) VALUES
(1,  '互動問答',                    'GAI 互動平台', '通用型 AI 助手，提供問答、寫作協助。',                           1, '啟用', '2024-01-15'),
(2,  '知識庫',                      'GAI 互動平台', '知識庫管理與智能問答系統。',                                     1, '啟用', '2024-01-18'),
(3,  'PPT 互動產出',                'GAI 互動平台', '互動式簡報生成服務。',                                           1, '啟用', '2024-01-22'),
(4,  '文件翻譯',                    'GAI 互動平台', '多國語言文件翻譯服務。',                                         1, '啟用', '2024-02-01'),
(5,  '人事差勤機器人',              '答詢機器人',   '協助查詢假勤相關問題，包含年假、加班、打卡等事項。',             1, '啟用', '2024-02-05'),
(6,  '資訊安全機器人',              '答詢機器人',   '協助解答資安相關問題，包含密碼設定、可疑郵件處理、個資保護等。', 1, '啟用', '2024-02-08'),
(7,  '首長信箱',                    '智慧公文系統', '協助回覆民眾陳情案件。',                                         1, '啟用', '2024-02-10'),
(8,  '例行函稿 - 山坡地社區點監測', '智慧公文系統', '山坡地社區監測報告函稿生成。',                                   1, '啟用', '2024-02-12'),
(9,  '例行函稿 - 禁建限區',         '智慧公文系統', '禁建限區相關公文生成。',                                         1, '啟用', '2024-02-15'),
(10, '例行函稿 - 室內裝修',         '智慧公文系統', '室內裝修審查公文生成。',                                         1, '啟用', '2024-02-18'),
(11, '通用公文撰寫',                '智慧公文系統', '協助撰寫、潤飾與檢查各類公文內容。',                             1, '啟用', '2024-02-23'),
(12, '公文檔案上傳生成案件歷程',    '智慧公文系統', '上傳公文檔案自動生成案件歷程摘要及時間軸。',                     1, '啟用', '2024-02-22'),
(13, '提示詞優化',                  'GAI 互動平台', '協助使用者優化與測試提示詞。',                                   1, '啟用', '2024-02-20'),
(14, '人資規章小幫手',              'GAI 互動平台', '解答員工關於請假、福利等規章問題。',                             1, '啟用', '2024-01-25'),
(15, '程式碼審查員',                'GAI 互動平台', '協助開發人員進行 Code Review 與優化建議。',                      1, '啟用', '2024-01-28'),
(16, '每日新聞摘要',                'GAI 互動平台', '自動彙整並摘要每日產業新聞。',                                   1, '啟用', '2024-02-03');

-- ==========================================
-- 16. APP 模組 - app_model_setting
-- ==========================================
INSERT INTO app_model_setting (id, app_id, welcome_message, recommend_questions, function_settings, model_settings, creator_id, status) VALUES
(1,  1,  '您好！我是智能助理，有什麼可以幫您的嗎？', ARRAY['如何使用知識庫功能？','系統支援哪些語言？','如何匯出對話紀錄？'], '{"enableFileUpload": true, "enableFeedback": true}', '{"modelId": 1, "paramId": 3, "promptId": null}', 1, '正常'),
(2,  2,  '歡迎使用知識庫管理系統！您可以上傳、管理文件，並進行智能問答。', ARRAY['如何上傳文件到知識庫？','支援哪些檔案格式？','如何搜尋特定內容？'], NULL, '{"modelId": 1, "paramId": 2, "promptId": 1}', 1, '正常'),
(3,  3,  '讓我幫您製作精美的簡報！請描述您的需求。', ARRAY['如何生成商業提案簡報？','可以指定簡報風格嗎？','支援匯出哪些格式？'], NULL, '{"modelId": 2, "paramId": 1, "promptId": 4}', 1, '正常'),
(4,  4,  '專業文件翻譯服務，支援多種語言。', ARRAY['支援哪些語言翻譯？','可以翻譯PDF檔案嗎？','翻譯品質如何？'], '{"enableFileUpload": true, "enableFeedback": true}', '{"modelId": 1, "paramId": 2, "promptId": null}', 1, '正常'),
(5,  5,  '你好！我是人事差勤小幫手。我可以協助你查詢假勤規定、申請流程、或查看你的出缺勤紀錄。請問今天有什麼可以幫你的嗎？', ARRAY['請問特休假還有幾天？','如何申請加班費？','請假單送出後多久會核准？','遲到會有什麼影響？','婚假可以分開請嗎？'], '{"allowUpload": true, "enableFeedback": true, "showUsedDocs": true}', '{"modelId": 2, "paramId": 3, "promptId": 2}', 1, '正常'),
(6,  6,  '您好，我是資訊安全防護機器人。請隨時保持警覺，勿點擊不明連結。若有任何資安疑慮、密碼設定或軟體安裝問題，歡迎隨時詢問！', ARRAY['收到可疑郵件該如何處理？','如何設定高強度密碼？','公司電腦可以安裝私人軟體嗎？','發現電腦中毒了怎麼辦？','如何使用 VPN 安全連線？'], '{"allowUpload": true, "enableFeedback": true, "showUsedDocs": true}', '{"modelId": 1, "paramId": 2, "promptId": 3}', 1, '正常'),
(7,  7,  '請輸入民眾來信內容，系統將協助草擬回覆函稿。', ARRAY['如何處理陳情案件？','回覆格式有哪些要求？','需要主管核准嗎？'], NULL, '{"modelId": 1, "paramId": 2, "promptId": 1}', 1, '正常'),
(8,  8,  '請輸入山坡地監測數據，系統將生成監測報告函稿。', ARRAY['監測數據範圍為何？','異常值如何處理？','報告週期是多久？'], '{"enableFileUpload": true, "enableFeedback": true}', '{"modelId": 1, "paramId": 2, "promptId": null}', 1, '正常'),
(9,  9,  '輸入管制區號，系統將生成相關公文。', ARRAY['如何查詢管制區資訊？','變更管制需要什麼程序？','公文流程為何？'], '{"enableFileUpload": true, "enableFeedback": true}', '{"modelId": 1, "paramId": 2, "promptId": null}', 1, '正常'),
(10, 10, '請輸入裝修申請案號，系統將協助處理相關文件。', ARRAY['申請流程為何？','需要哪些文件？','審查時間多長？'], '{"enableFileUpload": true, "enableFeedback": true}', '{"modelId": 1, "paramId": 2, "promptId": null}', 1, '正常'),
(11, 11, '協助撰寫、潤飾與檢查各類公文內容。', ARRAY['如何撰寫開會通知單？','幫我潤飾這段函稿內容','檢查這份公文的格式是否正確'], '{"enableFileUpload": true, "enableFeedback": true}', '{"modelId": 1, "paramId": 2, "promptId": 1}', 1, '正常'),
(12, 12, '請上傳公文檔案以生成案件歷程。', ARRAY['如何上傳檔案？','支援哪些檔案格式？','生成歷程需要多久？'], '{"enableFileUpload": true, "enableFeedback": true}', '{"modelId": 1, "paramId": 2, "promptId": null}', 1, '正常'),
(13, 13, '歡迎使用提示詞優化工具，讓我們一起打造更好的提示詞！', ARRAY['如何撰寫有效的提示詞？','什麼是零樣本學習？','如何測試提示詞效果？'], NULL, '{"modelId": 2, "paramId": 1, "promptId": 5}', 1, '正常');

-- ==========================================
-- 17. APP 模組 - app_shared (應用權限)
-- ==========================================
INSERT INTO app_shared (id, app_id, user_id, department_id, creator_id, status) VALUES
(1,  1,  6,    NULL, 1, '正常'),
(2,  1,  NULL, 5,    1, '正常'),
(3,  2,  6,    NULL, 1, '正常'),
(4,  2,  5,    NULL, 1, '正常'),
(5,  3,  6,    NULL, 1, '正常'),
(6,  4,  NULL, 5,    1, '正常'),
(7,  5,  6,    NULL, 1, '正常'),
(8,  5,  7,    NULL, 1, '正常'),
(9,  6,  6,    NULL, 1, '正常'),
(10, 6,  7,    NULL, 1, '正常'),
(11, 7,  6,    NULL, 1, '正常'),
(12, 10, 6,    NULL, 1, '正常'),
(13, 11, 7,    NULL, 1, '正常');

-- ==========================================
-- 18. APP 模組 - app_linked_file (應用關聯文件)
-- ==========================================
INSERT INTO app_linked_file (id, app_id, file_id_list, creator_id, status) VALUES
(1, 5, ARRAY[1, 4],    1, '正常'),
(2, 6, ARRAY[1, 2],    1, '正常');

-- ==========================================
-- 19. APP 模組 - app_api_provide (API 服務)
-- ==========================================
INSERT INTO app_api_provide (id, api_name, endpoint_path, endpoint_parameter, api_key, model_settings, creator_id, status, created_at) VALUES
(1, '公文生成 API',   '/api/v1/generate-document',        'type=official&format=pdf',             'api-key-doc-123',      '{"modelId": 1, "paramId": 2, "promptId": 1}', 1, '啟用', '2024-02-10'),
(2, '客服回覆 API',   '/api/v1/customer-service/reply',   'lang=zh-TW&tone=friendly',             '',                     '{"modelId": 2, "paramId": 3, "promptId": 2}', 1, '啟用', '2024-02-12'),
(3, '創意文案生成',   '/api/v1/creative-content',         'category=marketing&style=energetic',   'api-key-creative-789', '{"modelId": 1, "paramId": 1, "promptId": 4}', 1, '啟用', '2024-02-18');

-- ==========================================
-- 20. Chat 模組 - chat_session (對話記錄)
-- 根據 MOCK_CHAT_HISTORY 生成，並產生對話內容
-- ==========================================
INSERT INTO chat_session (id, app_id, model_settings, creator_id, status, created_at) VALUES
('a0000001-0000-0000-0000-000000000001', 1,  '{"modelId": 1, "paramId": 3}', 6, '正常', '2024-02-05 14:30:00'),
('a0000001-0000-0000-0000-000000000002', 1,  '{"modelId": 1, "paramId": 3}', 6, '正常', '2024-02-05 10:23:00'),
('a0000001-0000-0000-0000-000000000003', 5,  '{"modelId": 2, "paramId": 3}', 6, '正常', '2024-02-04 09:15:00'),
('a0000001-0000-0000-0000-000000000004', 6,  '{"modelId": 1, "paramId": 2}', 6, '正常', '2024-02-04 11:30:00'),
('a0000001-0000-0000-0000-000000000005', 13, '{"modelId": 2, "paramId": 1}', 6, '正常', '2024-01-29 15:00:00'),
('a0000001-0000-0000-0000-000000000006', 1,  '{"modelId": 1, "paramId": 3}', 6, '正常', '2024-01-30 16:20:00'),
('a0000001-0000-0000-0000-000000000007', 7,  '{"modelId": 1, "paramId": 2}', 6, '正常', '2024-02-04 13:45:00'),
('a0000001-0000-0000-0000-000000000008', 10, '{"modelId": 1, "paramId": 2}', 6, '正常', '2024-02-03 10:00:00'),
('a0000001-0000-0000-0000-000000000009', 3,  '{"modelId": 2, "paramId": 1}', 6, '正常', '2024-02-05 14:50:00'),
('a0000001-0000-0000-0000-000000000010', 2,  '{"modelId": 1, "paramId": 2}', 6, '正常', '2024-02-05 15:00:00'),
('a0000001-0000-0000-0000-000000000011', 2,  '{"modelId": 1, "paramId": 2}', 6, '正常', '2024-02-04 09:30:00');

-- ==========================================
-- 21. Chat 模組 - chat_content (對話內容)
-- 額外生成的 DEMO 對話內容
-- ==========================================
INSERT INTO chat_content (id, session_id, role, content, feedback, token_count, created_at) VALUES
-- Session 1: 公文撰寫建議 (互動問答)
(1,  'a0000001-0000-0000-0000-000000000001', 'User', '請問撰寫正式公文有哪些注意事項？', NULL, 25, '2024-02-05 14:30:00'),
(2,  'a0000001-0000-0000-0000-000000000001', 'AI',   '撰寫正式公文時，請注意以下要點：

1. **格式規範**：依照「文書處理手冊」規定，公文分為令、呈、咨、函、公告、書函等。
2. **用語精確**：使用正式用語，如「查」、「奉」、「准」、「復」等公文慣用語。
3. **段落結構**：主旨、說明、辦法三段式結構，主旨應簡明扼要。
4. **標點符號**：使用全形標點符號，數字統一使用阿拉伯數字或中文數字。
5. **稱謂正確**：對上級機關用「鈞」，平行機關用「貴」，對下級用「該」。

請問您需要撰寫哪一類公文？我可以提供更具體的建議。', 'good', 180, '2024-02-05 14:30:15'),
(3,  'a0000001-0000-0000-0000-000000000001', 'User', '我需要寫一份開會通知函，主題是討論下季度預算。', NULL, 30, '2024-02-05 14:31:00'),
(4,  'a0000001-0000-0000-0000-000000000001', 'AI',   '好的，以下是開會通知函的範本：

---
**○○機關 函**

受文者：各相關單位

主旨：訂於○年○月○日（星期○）召開「114年度第○季預算編列研商會議」，請派員出席，請查照。

說明：
一、依據本機關114年度施政計畫辦理。
二、會議時間：114年○月○日（星期○）上午10時。
三、會議地點：本機關○樓第○會議室。
四、討論事項：114年度第○季預算配置及執行檢討。
五、請各單位備妥相關預算資料出席。

---

請根據實際情況修改日期、地點等資訊。需要我進一步調整嗎？', NULL, 220, '2024-02-05 14:31:20'),

-- Session 2: Python 腳本除錯 (互動問答)
(5,  'a0000001-0000-0000-0000-000000000002', 'User', '我的 Python 腳本在讀取 CSV 檔案時遇到 UnicodeDecodeError，該怎麼解決？', NULL, 30, '2024-02-05 10:23:00'),
(6,  'a0000001-0000-0000-0000-000000000002', 'AI',   '這是常見的編碼問題，以下是幾個解決方案：

**方法一：指定編碼格式**
```python
import pandas as pd
df = pd.read_csv("file.csv", encoding="utf-8-sig")
# 或嘗試 "big5", "cp950" (繁體中文常用)
```

**方法二：自動偵測編碼**
```python
import chardet

with open("file.csv", "rb") as f:
    result = chardet.detect(f.read())

df = pd.read_csv("file.csv", encoding=result["encoding"])
```

**方法三：忽略錯誤字元**
```python
df = pd.read_csv("file.csv", encoding="utf-8", errors="ignore")
```

由於您在台灣環境，CSV 檔案很可能是 Big5 或 CP950 編碼。建議先嘗試 `encoding="cp950"`。', 'good', 200, '2024-02-05 10:23:30'),

-- Session 3: 人事規章查詢 (人事差勤機器人)
(7,  'a0000001-0000-0000-0000-000000000003', 'User', '請問特休假有幾天？怎麼計算的？', NULL, 18, '2024-02-04 09:15:00'),
(8,  'a0000001-0000-0000-0000-000000000003', 'AI',   '根據《勞動基準法》第38條規定，員工特別休假天數如下：

| 年資 | 特休天數 |
|------|---------|
| 滿6個月未滿1年 | 3天 |
| 滿1年未滿2年 | 7天 |
| 滿2年未滿3年 | 10天 |
| 滿3年未滿5年 | 14天 |
| 滿5年未滿10年 | 15天 |
| 滿10年以上 | 每年加1天，最多30天 |

**注意事項：**
- 特休假年度未休完，僱主應折算工資。
- 特休假排定以勞工意願為優先。

請問您的年資大約多久？我可以幫您計算剩餘天數。', 'good', 180, '2024-02-04 09:15:20'),
(9,  'a0000001-0000-0000-0000-000000000003', 'User', '我年資3年半，已經用了5天，還剩幾天？', NULL, 20, '2024-02-04 09:16:00'),
(10, 'a0000001-0000-0000-0000-000000000003', 'AI',   '您年資滿3年未滿5年，依規定可享有 **14天** 特別休假。

已使用：5天
**剩餘特休假：9天**

建議您可至人事差勤系統確認實際餘額，如有差異請洽人事單位。需要我協助其他假勤問題嗎？', NULL, 80, '2024-02-04 09:16:15'),

-- Session 4: 資安漏洞掃描 (資訊安全機器人)
(11, 'a0000001-0000-0000-0000-000000000004', 'User', '我收到一封附件是 .exe 的郵件，寄件者是公司內部的同事，該打開嗎？', NULL, 30, '2024-02-04 11:30:00'),
(12, 'a0000001-0000-0000-0000-000000000004', 'AI',   '⚠️ **強烈建議不要直接開啟！**

即使寄件者顯示為公司同事，也可能是偽造的。請依以下步驟處理：

1. **不要點擊附件**：.exe 為可執行檔，具有極高風險。
2. **確認寄件者**：透過電話或即時通訊向該同事確認是否為本人寄出。
3. **檢查郵件特徵**：
   - 寄件地址是否完全正確（注意拼寫差異）
   - 郵件內容是否有語法錯誤
   - 是否有緊急催促開啟的措辭
4. **通報資安窗口**：將該信件轉寄至 security@nlma.gov.tw。

公司內部正常業務傳送不應使用 .exe 檔案。此類郵件高度疑似為社交工程攻擊或勒索軟體。', 'good', 200, '2024-02-04 11:30:25'),

-- Session 5: 提示詞 A/B 測試 v1 (提示詞優化)
(13, 'a0000001-0000-0000-0000-000000000005', 'User', '我想比較兩個提示詞版本的效果，一個是直接指令式，一個是角色扮演式。', NULL, 28, '2024-01-29 15:00:00'),
(14, 'a0000001-0000-0000-0000-000000000005', 'AI',   '好的，我來幫您設計 A/B 測試框架：

**版本 A - 直接指令式：**
> 「請用繁體中文摘要以下文章，限200字以內，條列式呈現重點。」

**版本 B - 角色扮演式：**
> 「你是一位資深新聞編輯，擅長將長篇報導濃縮為精要摘要。請閱讀以下文章，以條列式整理3-5個核心重點，每點不超過40字，使用繁體中文。」

**評估指標建議：**
- 摘要完整度（是否涵蓋主要資訊）
- 格式遵循度（是否依照要求格式）
- 語言品質（用詞是否精準自然）
- 一致性（多次執行結果的穩定度）

要開始測試嗎？請提供一篇測試文章。', NULL, 200, '2024-01-29 15:00:30'),

-- Session 6: 翻譯請求 (互動問答)
(15, 'a0000001-0000-0000-0000-000000000006', 'User', '請幫我把以下內容翻譯成英文：「本署將於下週一召開跨部門協調會議，請各單位主管準時出席。」', NULL, 40, '2024-01-30 16:20:00'),
(16, 'a0000001-0000-0000-0000-000000000006', 'AI',   '以下是英文翻譯：

"The Administration will convene an inter-departmental coordination meeting next Monday. All unit supervisors are requested to attend punctually."

**替代版本（較正式）：**
"This Administration hereby notifies that a cross-departmental coordination meeting shall be held on the coming Monday. Heads of all relevant units are kindly requested to attend on time."

請問需要調整語氣或用詞嗎？', 'good', 120, '2024-01-30 16:20:15'),

-- Session 7: 陳情回覆草稿-噪音 (首長信箱)
(17, 'a0000001-0000-0000-0000-000000000007', 'User', '民眾陳情內容：我家旁邊的工地每天晚上10點以後還在施工，噪音嚴重影響睡眠，請政府處理。', NULL, 40, '2024-02-04 13:45:00'),
(18, 'a0000001-0000-0000-0000-000000000007', 'AI',   '以下為陳情回覆草稿：

---
○○先生/女士 您好：

有關台端反映住家鄰近工地夜間施工噪音問題一案，本署處理情形說明如下：

一、台端來函所述情事，本署已函請轄管工務單位派員至現場稽查。

二、依據《噪音管制法》第9條規定，營建工程噪音不得於晚間10時至翌日上午6時施工，違者可處新臺幣3,000元以上30,000元以下罰鍰。

三、本署已通知該工地承造人及監造人，要求立即改善並遵守施工時段規定。

四、後續將持續追蹤改善情形，如噪音問題未獲改善，歡迎再次來函或撥打本署服務專線反映。

感謝台端對市政建設之關心。

此致
敬禮
---

請確認內容後進行修改或直接送出。', NULL, 250, '2024-02-04 13:45:30'),

-- Session 8: 室內裝修 (例行函稿)
(19, 'a0000001-0000-0000-0000-000000000008', 'User', '案號 113營署建字第1130001234號 的室內裝修申請，請檢查缺件情形。', NULL, 25, '2024-02-03 10:00:00'),
(20, 'a0000001-0000-0000-0000-000000000008', 'AI',   '已查詢案號 **113營署建字第1130001234號** 的室內裝修申請案，檢核結果如下：

**缺件清單：**
| 項次 | 應備文件 | 狀態 |
|-----|---------|------|
| 1 | 建築物室內裝修申請書 | ✅ 已備 |
| 2 | 建築物權利證明文件 | ✅ 已備 |
| 3 | 前次核准使用執照影本 | ❌ 缺件 |
| 4 | 室內裝修圖說（平面、立面） | ✅ 已備 |
| 5 | 消防安全設備圖說 | ❌ 未核章 |
| 6 | 室內裝修從業者登記證影本 | ✅ 已備 |

**建議處理方式：**
需發函通知申請人補正第3項及第5項文件，補正期限為30日。

要我直接生成補正通知函稿嗎？', NULL, 200, '2024-02-03 10:00:25'),

-- Session 9: 年度計畫簡報大綱 (PPT 互動產出)
(21, 'a0000001-0000-0000-0000-000000000009', 'User', '幫我製作一份114年度國土管理署工作計畫簡報，大約10頁。', NULL, 25, '2024-02-05 14:50:00'),
(22, 'a0000001-0000-0000-0000-000000000009', 'AI',   '好的！以下是簡報大綱規劃：

**114年度國土管理署工作計畫簡報（10頁）**

📄 **第1頁** — 封面
📄 **第2頁** — 目錄
📄 **第3頁** — 113年度工作回顧與成果
📄 **第4頁** — 113年度關鍵數據統計
📄 **第5頁** — 114年度施政目標
📄 **第6頁** — 重點推動計畫（國土計畫）
📄 **第7頁** — 重點推動計畫（建築管理）
📄 **第8頁** — 預算配置與資源規劃
📄 **第9頁** — 預期效益與KPI指標
📄 **第10頁** — 結語與聯繫資訊

我將使用您選取的範本進行生成。確認大綱無誤後，我會開始製作內容，您可以隨時在左側與我討論修改。', 'good', 180, '2024-02-05 14:50:20'),

-- Session 10: 員工請假辦法查詢 (知識庫問答)
(23, 'a0000001-0000-0000-0000-000000000010', 'User', '請根據知識庫的員工請假辦法，說明婚假的規定。', NULL, 22, '2024-02-05 15:00:00'),
(24, 'a0000001-0000-0000-0000-000000000010', 'AI',   '根據知識庫中《員工請假辦法》的相關規定，婚假說明如下：

**婚假規定：**
- **天數**：婚假8日（不含例假日及國定假日）。
- **請假期限**：自結婚之日起，可於一個月內（或依機關規定期限內）一次或分次請休完畢。
- **應備文件**：結婚證書或戶籍謄本影本。

**注意事項：**
1. 婚假期間工資照給。
2. 分次請休者，需事先經主管核准排定。
3. 補辦婚假之期限依各機關人事規定。

> 📄 參考來源：員工請假辦法.pdf（第5章第12條）

如需進一步了解其他假別規定，歡迎提問。', NULL, 160, '2024-02-05 15:00:20'),

-- Session 11: Q1 專案規格確認 (知識庫問答)
(25, 'a0000001-0000-0000-0000-000000000011', 'User', '請幫我整理專案規格書的關鍵需求項目有哪些？', NULL, 20, '2024-02-04 09:30:00'),
(26, 'a0000001-0000-0000-0000-000000000011', 'AI',   '根據知識庫中《專案規格書_v1.pdf》的內容，關鍵需求項目整理如下：

**功能性需求：**
1. 使用者身分驗證與權限管理（含 SSO 整合）
2. 多模型語言模型整合（GPT-4o、Claude 3.5）
3. 知識庫文件管理與 RAG 智能問答
4. 公文擬稿與格式檢核
5. PPT 自動生成與範本管理

**非功能性需求：**
1. 回應時間不超過3秒（95th percentile）
2. 系統可用性 ≥ 99.5%
3. 支援同時100位使用者
4. 資料加密傳輸（TLS 1.3）
5. 符合政府資安三級規範

**專案時程：**
- Phase 1（Q1-Q2）：核心模組開發
- Phase 2（Q3）：UAT 與優化
- Phase 3（Q4）：正式上線

> 📄 參考來源：專案規格書_v1.pdf

需要我針對某個需求項目深入說明嗎？', 'good', 220, '2024-02-04 09:30:30');

-- ==========================================
-- 22. Chat 模組 - chat_linked_file (知識庫對話關聯文件)
-- ==========================================
INSERT INTO chat_linked_file (id, session_id, favorite_list_id, file_id_list) VALUES
(1, 'a0000001-0000-0000-0000-000000000010', 1, ARRAY[4, 6]),
(2, 'a0000001-0000-0000-0000-000000000011', NULL, ARRAY[1]);

-- ==========================================
-- 23. Chat 模組 - chat_feedback_message
-- ==========================================
INSERT INTO chat_feedback_message (id, content_id, feedback_message, created_at) VALUES
(1, 2,  '回答很詳細且實用，格式清晰。', '2024-02-05 14:32:00'),
(2, 8,  '表格式整理很方便理解。', '2024-02-04 09:17:00');

-- ==========================================
-- 24. Chat 模組 - chat_archive_content (Canvas 存檔)
-- ==========================================
INSERT INTO chat_archive_content (id, session_id, archive_name, canvas_obj, status, created_at) VALUES
(1, 'a0000001-0000-0000-0000-000000000007', '2024-01-15 陳情案件彙整', '{"type": "draft_mail", "content": "陳情案件彙整內容"}', '正常', '2024-01-15 17:00:00'),
(2, 'a0000001-0000-0000-0000-000000000008', '裝修申請案-A001審查', '{"type": "draft_decor", "content": "裝修案件審查記錄"}', '正常', '2024-02-03 12:00:00');

-- ==========================================
-- 25. Audit 模組 - system_log
-- ==========================================
INSERT INTO system_log (id, operate_type, operate_object, operator_id, description, ip_address, user_agent, operated_at) VALUES
(1, '新增', '專案規格書_v2.pdf', 8, 'Uploaded new version of specs.',   '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0)', '2024-02-05 09:30:00'),
(2, '刪除', '舊版規章.pdf',      8, 'Removed outdated document.',       '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0)', '2024-02-05 10:00:00'),
(3, '新增', '2024 年度計畫',     7, 'Created new project folder.',      '192.168.1.101', 'Mozilla/5.0 (Windows NT 10.0)', '2024-02-04 14:15:00'),
(4, '查詢', '員工手冊.pdf',      9, 'Viewed document content.',         '192.168.1.102', 'Mozilla/5.0 (Macintosh)',       '2024-02-05 11:20:00');

-- ==========================================
-- 26. Audit 模組 - system_statistics
-- ==========================================
INSERT INTO system_statistics (id, statistics_type, count, department_id, statistics_date) VALUES
-- 模型使用次數
(1,  '模型使用次數', 4500, 7, '2024-02-05'),
(2,  '模型使用次數', 3200, 7, '2024-02-05'),
(3,  '模型使用次數', 1200, 7, '2024-02-05'),
-- 應用使用次數
(4,  '應用使用次數', 5000, 7, '2024-02-05'),
(5,  '應用使用次數', 1500, 7, '2024-02-05'),
(6,  '應用使用次數', 800,  7, '2024-02-05'),
-- 使用人數 by 部門
(7,  '使用人數', 3500, 7, '2024-02-05'),
(8,  '使用人數', 2100, 8, '2024-02-05'),
(9,  '使用人數', 1800, 9, '2024-02-05'),
-- 對話次數 趨勢
(10, '對話次數', 120, NULL, '2024-01-29'),
(11, '對話次數', 125, NULL, '2024-01-30'),
(12, '對話次數', 132, NULL, '2024-01-31'),
(13, '對話次數', 135, NULL, '2024-02-01'),
(14, '對話次數', 140, NULL, '2024-02-02'),
(15, '對話次數', 142, NULL, '2024-02-03'),
(16, '對話次數', 150, NULL, '2024-02-04');

-- ==========================================
-- 重設序列值 (確保後續 INSERT 不會衝突)
-- ==========================================
SELECT setval('department_id_seq', (SELECT MAX(id) FROM department));
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('file_folder_id_seq', (SELECT MAX(id) FROM file_folder));
SELECT setval('file_id_seq', (SELECT MAX(id) FROM file));
SELECT setval('file_shared_id_seq', (SELECT MAX(id) FROM file_shared));
SELECT setval('file_favorite_list_id_seq', (SELECT MAX(id) FROM file_favorite_list));
SELECT setval('file_favorite_list_mapping_id_seq', (SELECT MAX(id) FROM file_favorite_list_mapping));
SELECT setval('model_id_seq', (SELECT MAX(id) FROM model));
SELECT setval('model_parameter_id_seq', (SELECT MAX(id) FROM model_parameter));
SELECT setval('model_prompt_id_seq', (SELECT MAX(id) FROM model_prompt));
SELECT setval('model_prompt_shared_id_seq', (SELECT MAX(id) FROM model_prompt_shared));
SELECT setval('model_tool_id_seq', (SELECT MAX(id) FROM model_tool));
SELECT setval('app_id_seq', (SELECT MAX(id) FROM app));
SELECT setval('app_model_setting_id_seq', (SELECT MAX(id) FROM app_model_setting));
SELECT setval('app_shared_id_seq', (SELECT MAX(id) FROM app_shared));
SELECT setval('app_linked_file_id_seq', (SELECT MAX(id) FROM app_linked_file));
SELECT setval('app_api_provide_id_seq', (SELECT MAX(id) FROM app_api_provide));
SELECT setval('chat_content_id_seq', (SELECT MAX(id) FROM chat_content));
SELECT setval('chat_linked_file_id_seq', (SELECT MAX(id) FROM chat_linked_file));
SELECT setval('chat_feedback_message_id_seq', (SELECT MAX(id) FROM chat_feedback_message));
SELECT setval('chat_archive_content_id_seq', (SELECT MAX(id) FROM chat_archive_content));
SELECT setval('system_log_id_seq', (SELECT MAX(id) FROM system_log));
SELECT setval('system_statistics_id_seq', (SELECT MAX(id) FROM system_statistics));
SELECT setval('corpus_proper_id_seq', (SELECT MAX(id) FROM corpus_proper));
SELECT setval('corpus_synonyms_id_seq', (SELECT MAX(id) FROM corpus_synonyms));
