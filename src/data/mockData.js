
export const KB_TREE_DATA = [
  {
    id: 'org',
    label: '組織/單位公用',
    type: 'folder',
    children: [
      { id: 'org_rules', label: '規章文件', type: 'folder', children: [] },
      { id: 'org_projects', label: '專案文件', type: 'folder', children: [] },
    ]
  },
  { id: 'dept_hr', label: '人事室', type: 'folder', children: [] },
  { 
    id: 'personal', 
    label: '個人知識庫',
    type: 'folder',
    isDefault: true,
    children: [
        { 
            id: 'personal_work', 
            label: '工作文件', 
            type: 'folder', 
            children: [
                { id: 'personal_work_daily', label: '日報', type: 'folder', children: [] },
                { id: 'personal_work_meeting', label: '會議資料', type: 'folder', children: [] }
            ] 
        },
        { id: 'personal_misc', label: '雜項', type: 'folder', children: [] }
    ]
  },
  {
    id: 'shared_root',
    label: '與我共享',
    type: 'folder',
    children: [
       { id: 'shared_dept', label: '跨部門共享', type: 'folder', children: [] },
       { id: 'shared_others', label: '其他共享', type: 'folder', children: [] }
    ]
  }
];


export const CORPUS_PAGES = [
    { id: 'proper_noun', label: '專有名詞語料庫' },
    { id: 'synonym_mgr', label: '近似用語管理' },
];

export const MOCK_GLOSSARIES = [
    { id: 1, main_term: '行動電話', description: '可隨身攜帶之無線通訊設備', category: '電子產品', created_at: '2023-01-01' },
    { id: 2, main_term: '人工智慧', description: '由機器展示的智慧', category: '科技', created_at: '2023-02-15' },
    { id: 3, main_term: '筆記型電腦', description: '包含螢幕與鍵盤的可攜式電腦', category: '電子產品', created_at: '2023-03-10' },
];

export const MOCK_SYNONYMS = [
    { id: 1, glossary_id: 1, synonym_term: '手機', remark: '一般口語' },
    { id: 2, glossary_id: 1, synonym_term: '手提電話', remark: '港澳用語' },
    { id: 3, glossary_id: 2, synonym_term: 'AI', remark: '英文縮寫' },
    { id: 4, glossary_id: 2, synonym_term: '機器智慧', remark: '學術用語' },
    { id: 5, glossary_id: 3, synonym_term: '筆電', remark: '台灣縮寫' },
    { id: 6, glossary_id: 3, synonym_term: 'Laptop', remark: '英文' },
];

// --- New NLMA Terminology Mock Data ---

export const MOCK_TERM_CATEGORIES = [
    { id: 1, name: '國土計畫組', description: '掌理國土規劃、土地使用分區等' },
    { id: 2, name: '建築管理組', description: '掌理建築法規、營建管理等' },
    { id: 3, name: '都市更新組', description: '掌理都市更新政策、危老重建等' },
];

export const MOCK_TERM_DEFINITIONS = [
    { 
        id: 't1', 
        term_name: '容積率', 
        definition: '指基地內建築物總樓地板面積與基地面積之比。', 
        source_type: '法律',
        source_title: '建築技術規則建築設計施工編第161條',
        is_legal_binding: true,
        is_current: true,
        version_tag: '113年修訂',
        categories: [2] // Linked by ID to Categories
    },
    { 
        id: 't2', 
        term_name: '第一種農業發展地區', 
        definition: '指具優良農業生產環境、維持糧食安全功能或曾經投資建設重大農業改良設施之地區。', 
        source_type: '法律',
        source_title: '國土計畫法第20條',
        is_legal_binding: true,
        is_current: true,
        version_tag: '114年通檢版',
        categories: [1]
    },
    { 
        id: 't3', 
        term_name: '建蔽率', 
        definition: '指建築面積占基地面積之比率。', 
        source_type: '法律', 
        source_title: '建築技術規則建築設計施工編第1條', 
        is_legal_binding: true,
        is_current: true, 
        version_tag: '現行版',
        categories: [2]
    },
    {
        id: 't4',
        term_name: '都市更新單元',
        definition: '指依本條例規定劃定應實施都市更新之地區。',
        source_type: '法律',
        source_title: '都市更新條例第3條',
        is_legal_binding: true,
        is_current: true,
        version_tag: '108年修訂',
        categories: [3]
    }
];

export const MOCK_TERM_ANNOTATIONS = [
    {
        id: 'a1',
        term_id: 't1',
        doc_number: '內授營字第112081XXXX號',
        annotation_content: '關於容積率計算之補充說明：免計容積項目應包含...',
        effective_date: '2023-05-12',
        is_active: true
    },
    {
        id: 'a2',
        term_id: 't2',
        doc_number: '台內營字第113008XXXX號',
        annotation_content: '針對第一種農業發展地區之劃設原則，補充說明如下：...',
        effective_date: '2024-01-20',
        is_active: true
    }
];


export const MASTER_FILES = Array.from({ length: 45 }).map((_, i) => ({
  id: `file_${i + 1}`,
  name: i < 5 ? ['專案規格書_v1.pdf', '會議記錄_2024.docx', '我的筆記.txt', '員工請假辦法.pdf', 'Q1行銷檢討.pptx'][i] : 
        i === 40 ? '20240129_工作日報.docx' : 
        i === 41 ? '20240128_工作日報.docx' : 
        i === 42 ? '每週例會簡報.pptx' : 
        i === 43 ? '個人工作計畫.xlsx' :
        `測試文件_${i + 1}.pdf`,
  size: `${(Math.random() * 10 + 0.1).toFixed(1)} MB`,
  date: `2024-0${Math.ceil(Math.random() * 9)}-${Math.ceil(Math.random() * 28)}`,
  folderId: i === 0 || i === 1 ? 'org_projects' : i === 2 ? 'personal' : i === 3 ? 'org_rules' : i === 4 ? 'shared_dept' :  i === 40 ? 'personal_work_daily' : i === 41 ? 'personal_work_daily' : i === 42 ? 'personal_work_meeting' : i === 43 ? 'personal_work' : 'org_projects',
  sharedWith: i === 0 ? ['u2'] : [],
  isSharedByOthers: i >= 4 && i <= 5
}));

export const MOCK_USERS = [
  { id: 'u1', name: '資訊室 - 全體', type: 'dept' },
  { id: 'u2', name: '王小明 (資訊室)', type: 'user' },
  { id: 'u3', name: '李大華 (人事室)', type: 'user' },
  { id: 'u4', name: '陳小美 (行銷部)', type: 'user' },
  { id: 'u5', name: '人事室 - 全體', type: 'dept' },
];

export const MOCK_BOTS = [
  { 
    id: 'bot_cs', 
    name: '客服小幫手', 
    status: 'active', 
    welcomeMessage: '您好，我是客服小幫手，很高興為您服務。', 
    allowUpload: false,
    showUsedDocs: true,
    defaultQuestions: ['如何申請退貨？', '查詢訂單狀態', '會員權益說明'],
    files: ['file_1', 'file_4'], 
    accessibleUsers: ['u1', 'u2'] 
  },
  { 
    id: 'bot_data', 
    name: '數據分析師', 
    status: 'inactive', 
    welcomeMessage: '請上傳您的數據檔案，我將協助分析。', 
    allowUpload: true,
    showUsedDocs: false,
    defaultQuestions: ['分析本月銷售趨勢', '找出異常數據'],
    files: ['file_1', 'file_2'],
    accessibleUsers: ['u1']
  }
];

export const MOCK_CHAT_HISTORY = [
  { id: 1, title: '公文撰寫建議', time: '剛剛', featureId: 'interactive' },
  { id: 2, title: 'Python 腳本除錯', time: '今天 10:23', featureId: 'interactive' },
  { id: 3, title: '客服回應樣板測試', time: '昨天', featureId: 'bot_cs' },
  { id: 4, title: '數據異常分析', time: '昨天', featureId: 'bot_data' },
  { id: 5, title: '提示詞 A/B 測試 v1', time: '上週', featureId: 'prompt_opt' },
  { id: 6, title: '翻譯請求', time: '上週', featureId: 'interactive' },
  { id: 7, title: '陳情回覆草稿-噪音', time: '昨天', featureId: 'draft_mail' },
  { id: 8, title: '113營署建字第1130001234號', time: '前天', featureId: 'draft_decor' },
  { id: 9, title: '年度計畫簡報大綱', time: '剛剛', featureId: 'ppt_gen' },
  { id: 10, title: '員工請假辦法查詢', time: '剛剛', featureId: 'kb_qa' },
  { id: 11, title: 'Q1 專案規格確認', time: '昨天', featureId: 'kb_qa' },
];

export const MOCK_ARCHIVES = [
  { id: 'a1', title: '2024-01-15 陳情案件彙整', featureId: 'draft_mail' },
  { id: 'a4', title: '裝修申請案-A001審查', featureId: 'draft_decor' },
];

export const MOCK_VERSIONS = [
  { id: 'v1.0', label: 'v1.0 - 初始版本', content: '你是一個專業的公文撰寫助理，請使用正式且精確的語氣。' },
  { id: 'v1.1', label: 'v1.1 - 增加語氣限制', content: '你是一個專業的公文撰寫助理，請使用正式且精確的語氣。請避免使用過於情緒化的字眼。' },
  { id: 'v2.0', label: 'v2.0 - 針對長度優化', content: '你是一個專業的公文撰寫助理。請精簡摘要內容，重點條列式呈現，適合高層快速閱讀。' },
];
