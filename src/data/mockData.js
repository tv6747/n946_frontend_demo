
export const KB_TREE_DATA = [
  {
    id: 'org',
    label: '組織/單位公用',
    type: 'folder',
    children: [
      { 
        id: 'org_land', 
        label: '國土管理署', 
        type: 'folder',
        ownerType: 'dept',
        children: [
          { id: 'org_land_law', label: '國土法規', type: 'folder', children: [] },
          { id: 'org_land_admin', label: '行政法規', type: 'folder', children: [] }
        ] 
      },
      { 
        id: 'org_building', 
        label: '建築管理組', 
        type: 'folder',
        ownerType: 'dept',
        children: [
          { id: 'org_building_method', label: '建築辦法', type: 'folder', children: [] },
          { id: 'org_building_admin', label: '行政辦法', type: 'folder', children: [] }
        ] 
      },
      { 
        id: 'org_section5', 
        label: '五科', 
        type: 'folder',
        ownerType: 'dept',
        children: [
          { id: 'org_section5_business', label: 'OO業務', type: 'folder', children: [] },
          { id: 'org_section5_standard', label: 'OO規範', type: 'folder', children: [] }
        ] 
      }
    ]
  },
  { 
    id: 'personal', 
    label: '個人知識庫',
    type: 'folder',
    isDefault: true,
    children: [
      { id: 'personal_a', label: 'A', type: 'folder', children: [] },
      { id: 'personal_b', label: 'B', type: 'folder', children: [] }
    ]
  },
  {
    id: 'shared_root',
    label: '與我共享',
    type: 'folder',
    children: [
      { id: 'shared_land_plan', label: '國土計畫組', type: 'folder', ownerType: 'dept', children: [] },
      { id: 'shared_urban', label: '城鄉分署', type: 'folder', ownerType: 'dept', children: [] },
      { id: 'shared_wang', label: '王小明', type: 'folder', ownerType: 'user', children: [] }
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


const REALISTIC_FILES = [
  { name: '員工差勤管理辦法.pdf', type: 'pdf', folder: 'org_section5_standard' },
  { name: '2024年度資安宣導手冊.pdf', type: 'pdf', folder: 'org_section5_standard' },
  { name: '資訊設備使用規範.pdf', type: 'pdf', folder: 'org_section5_standard' },
  { name: '第10次專案會議記錄.docx', type: 'docx', folder: 'org_section5_business' },
  { name: '需求訪談紀錄_20240215.docx', type: 'docx', folder: 'org_section5_business' },
  { name: '系統測試計畫書.docx', type: 'docx', folder: 'org_section5_business' },
  { name: '使用者操作手冊_v2.docx', type: 'docx', folder: 'shared_land_plan' },
  { name: '異常狀況處理報告.docx', type: 'docx', folder: 'personal_a' },
  { name: '勞工退休金提繳申報表.pdf', type: 'pdf', folder: 'shared_land_plan' },
  { name: '供應商評鑑表.pdf', type: 'pdf', folder: 'org_section5_business' },
  { name: '年度預算編列準則.pdf', type: 'pdf', folder: 'org_section5_standard' },
  { name: '教育訓練計畫書.docx', type: 'docx', folder: 'shared_land_plan' },
  { name: '資安事件通報單.docx', type: 'docx', folder: 'org_section5_standard' },
  { name: '客戶滿意度調查報告.pdf', type: 'pdf', folder: 'org_section5_business' },
  { name: '軟體授權清單.xlsx', type: 'lsx', folder: 'shared_land_plan' }
];

export const MASTER_FILES = Array.from({ length: 45 }).map((_, i) => {
  let name, folderId;
  
  if (i < 5) {
     name = ['專案規格書_v1.pdf', '會議記錄_2024.docx', '我的筆記.txt', '員工請假辦法.pdf', 'Q1行銷檢討.pptx'][i];
     // Map these to valid folders
     folderId = i === 0 || i === 1 ? 'org_section5_business' : i === 2 ? 'personal_a' : i === 3 ? 'org_section5_standard' : 'shared_land_plan';
  } else if (i >= 40) {
      if (i === 40) { name = '20240129_工作日報.docx'; folderId = 'personal_b'; }
      else if (i === 41) { name = '20240128_工作日報.docx'; folderId = 'personal_b'; }
      else if (i === 42) { name = '每週例會簡報.pptx'; folderId = 'personal_a'; }
      else if (i === 43) { name = '個人工作計畫.xlsx'; folderId = 'personal_a'; }
      else { name = `測試文件_${i + 1}.pdf`; folderId = 'personal_b'; }
  } else {
      // Use realistic files for indices 5 to 19 (approx)
      const realisticIndex = i - 5;
      if (realisticIndex < REALISTIC_FILES.length) {
          name = REALISTIC_FILES[realisticIndex].name;
          folderId = REALISTIC_FILES[realisticIndex].folder;
      } else {
          name = `歸檔文件_${i + 1}.pdf`; 
          folderId = i % 2 === 0 ? 'org_section5_business' : 'org_building_method';
      }
  }

  return {
    id: `file_${i + 1}`,
    name,
    size: `${(Math.random() * 5 + 0.1).toFixed(1)} MB`,
    date: `2024-0${Math.ceil(Math.random() * 9)}-${Math.ceil(Math.random() * 28)}`,
    folderId,
    sharedWith: i === 0 ? ['u2'] : [],
    isSharedByOthers: i >= 4 && i <= 5
  };
});

export const MOCK_USERS = [
  { id: 'user_me', name: '陳小華', dept: '國土署建管組五科', role: 'user', type: 'user' },
  { id: 'user_admin', name: '李大華', dept: '國土署建管組五科', role: 'admin', type: 'user' },
  { id: 'dept_section5', name: '五科 - 全體', type: 'dept' },
  { id: 'dept_building', name: '建管組 - 全體', type: 'dept' },
  { id: 'dept_land', name: '國土署 - 全體', type: 'dept' },
];

export const MOCK_BOTS = [
  { 
    id: 'bot_hr', 
    name: '人事差勤機器人', 
    status: 'active', 
    description: '協助查詢假勤相關問題，包含年假、加班、打卡等事項。',
    welcomeMessage: '你好！我是人事差勤小幫手。我可以協助你查詢假勤規定、申請流程、或查看你的出缺勤紀錄。請問今天有什麼可以幫你的嗎？', 
    allowUpload: false,
    showUsedDocs: true,
    defaultQuestions: ['請問特休假還有幾天？', '如何申請加班費？', '請假單送出後多久會核准？', '遲到會有什麼影響？', '婚假可以分開請嗎？'],
    files: ['file_1', 'file_4'], 
    tools: [{ id: '2', defaultOn: true }], // DuckDuckGo
    accessibleUsers: ['user_me', 'user_admin'] 
  },
  { 
    id: 'bot_security', 
    name: '資訊安全機器人', 
    status: 'active', 
    description: '協助解答資安相關問題，包含密碼設定、可疑郵件處理、個資保護等。',
    welcomeMessage: '您好，我是資訊安全防護機器人。請隨時保持警覺，勿點擊不明連結。若有任何資安疑慮、密碼設定或軟體安裝問題，歡迎隨時詢問！', 
    allowUpload: false,
    showUsedDocs: true,
    defaultQuestions: ['收到可疑郵件該如何處理？', '如何設定高強度密碼？', '公司電腦可以安裝私人軟體嗎？', '發現電腦中毒了怎麼辦？', '如何使用 VPN 安全連線？'],
    files: ['file_1', 'file_2'],
    accessibleUsers: ['user_me', 'user_admin']
  }
];


export const MOCK_CHAT_HISTORY = [
  { id: 1, title: '公文撰寫建議', time: '剛剛', featureId: 'interactive' },
  { id: 2, title: 'Python 腳本除錯', time: '今天 10:23', featureId: 'interactive' },
  { id: 3, title: '人事規章查詢', time: '昨天', featureId: 'bot_hr' },
  { id: 4, title: '資安漏洞掃描', time: '昨天', featureId: 'bot_security' },
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

// --- Admin Mock Data ---

export const MOCK_ADMIN_APPS = [
  { 
      id: 'app_gai_qa', 
      system: 'GAI', 
      name: '互動問答', 
      description: '通用型 AI 助手，提供問答、寫作協助。',
      departments: ['u1', 'u5'],
      users: ['u2', 'u3', 'u4'],
      model: 'gpt-4o',
      template: 'default',
      settings: {
          systemPrompt: 'You are a helpful assistant.',
          temperature: 0.7,
          topP: 0.9,
          topK: 40
      }
  },
  { 
      id: 'app_gai_trans', 
      system: 'GAI', 
      name: '文件翻譯', 
      description: '多國語言文件翻譯服務。',
      departments: ['u1'],
      users: [],
      model: 'claude-3.5',
      template: 'default',
      settings: {
          systemPrompt: 'You are a professional translator.',
          temperature: 0.2,
          topP: 0.8,
          topK: 20
      }
  },
  {
      id: 'app_doc_draft',
      system: 'DOC',
      name: '例行函稿 - 署長信箱',
      description: '協助回覆民眾陳情案件。',
      departments: ['u5'],
      users: ['u3'],
      model: 'gpt-4o',
      template: 'formal_tw',
      settings: {
          systemPrompt: '你是一個專業的公文撰寫助理，請使用正式且精確的語氣。',
          temperature: 0.5,
          topP: 0.85,
          topK: 30
      }
  },
  {
      id: 'app_hr_helper',
      system: 'GAI',
      name: '人資規章小幫手',
      description: '解答員工關於請假、福利等規章問題。',
      departments: ['u1', 'u5'],
      users: [],
      model: 'gpt-4o',
      template: 'default',
      settings: {
          systemPrompt: '你是人資助手，請依據公司規章回答問題。',
          temperature: 0.3,
          topP: 0.8,
          topK: 20
      }
  },
  {
      id: 'app_code_assist',
      system: 'GAI',
      name: '程式碼審查員',
      description: '協助開發人員進行 Code Review 與優化建議。',
      departments: ['u1'],
      users: ['u2'],
      model: 'claude-3.5',
      template: 'default',
      settings: {
          systemPrompt: 'You are an expert code reviewer.',
          temperature: 0.1,
          topP: 0.9,
          topK: 40
      }
  },
  {
      id: 'app_news_summary',
      system: 'GAI',
      name: '每日新聞摘要',
      description: '自動彙整並摘要每日產業新聞。',
      departments: ['u4'],
      users: [],
      model: 'gpt-4o',
      template: 'default',
      settings: {
          systemPrompt: 'Please summarize the news articles.',
          temperature: 0.5,
          topP: 0.9,
          topK: 40
      }
  }
];

export const MOCK_ADMIN_MODELS = [
  { id: 'm1', name: 'GPT-4o', provider: 'OpenAI', status: 'active', url: 'https://api.openai.com/v1', key: 'sk-proj-****************' },
  { id: 'm2', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', status: 'active', url: 'https://api.anthropic.com/v1', key: 'sk-ant-****************' },
  { id: 'm3', name: 'Gemini 1.5 Pro', provider: 'Google', status: 'inactive', url: 'https://generativelanguage.googleapis.com', key: 'AIzaSy*****************' },
  { id: 'm4', name: 'Llama 3 70B (Local)', provider: 'Local', status: 'active', url: 'http://192.168.1.100:11434', key: 'N/A' },
];

export const MOCK_AUDIT_KB_LOGS = [
    { id: 'kbl1', action: 'upload', target: '專案規格書_v2.pdf', targetType: 'file', user: '王小明', dept: '資訊室', time: '2024-02-05 09:30', details: 'Uploaded new version of specs.' },
    { id: 'kbl2', action: 'delete', target: '舊版規章.pdf', targetType: 'file', user: '王小明', dept: '資訊室', time: '2024-02-05 10:00', details: 'Removed outdated document.' },
    { id: 'kbl3', action: 'create', target: '2024 年度計畫', targetType: 'folder', user: '李大華', dept: '人事室', time: '2024-02-04 14:15', details: 'Created new project folder.' },
    { id: 'kbl4', action: 'view', target: '員工手冊.pdf', targetType: 'file', user: '陳小美', dept: '行銷部', time: '2024-02-05 11:20', details: 'Viewed document content.' },
];

export const MOCK_AUDIT_CHAT_LOGS = [
    { id: 'cl1', appType: 'GAI - 互動問答', title: 'Python 教學', user: '李大華', dept: '人事室', time: '2024-02-05 09:45', content: 'User: 如何使用 Python 讀取 CSV?\nAI: 您可以使用 pandas 庫...' },
    { id: 'cl2', appType: 'DOC - 署長信箱', title: '陳情回覆草稿', user: '王小明', dept: '資訊室', time: '2024-02-04 16:30', content: 'User: 幫我擬一份關於噪音的陳情回覆\nAI: 好的，這是草稿...' },
    { id: 'cl3', appType: 'GAI - 文件翻譯', title: '規格書翻譯', user: '陳小美', dept: '行銷部', time: '2024-02-05 10:15', content: 'User: 翻譯這份文件\nAI: 翻譯完成，請下載。' },
];

export const MOCK_ADMIN_STATS = {
    modelUsage: [
        { name: 'GPT-4o', value: 4500 },
        { name: 'Claude 3.5', value: 3200 },
        { name: 'Llama 3', value: 1200 },
    ],
    appUsage: [
        { name: '互動問答', value: 5000 },
        { name: '文件翻譯', value: 1500 },
        { name: '公文生成', value: 800 },
    ],
    deptUsage: [
        { name: '資訊室', value: 3500 },
        { name: '人事室', value: 2100 },
        { name: '行銷部', value: 1800 },
    ],
    kbTrend: [
        { date: '1/29', count: 120 },
        { date: '1/30', count: 125 },
        { date: '1/31', count: 132 },
        { date: '2/01', count: 135 },
        { date: '2/02', count: 140 },
        { date: '2/03', count: 142 },
        { date: '2/04', count: 150 },
    ],
    activity: [
        { hour: '08:00', value: 50 },
        { hour: '10:00', value: 200 },
        { hour: '12:00', value: 80 },
        { hour: '14:00', value: 250 },
        { hour: '16:00', value: 180 },
        { hour: '18:00', value: 60 },
    ]
};

export const MOCK_ACCOUNTS = [
  { id: 'u101', username: 'alex.lin', name: '林小宏', email: 'alex.lin@nlma.gov.tw', orgUnit: '1', status: 'active', role: 'admin', note: '系統管理員', createdAt: '2023-01-01', updatedAt: '2024-02-01' },
  { id: 'u102', username: 'sara.chen', name: '陳莎拉', email: 'sara.chen@nlma.gov.tw', orgUnit: '2', status: 'active', role: 'user', note: '建築執照審查人員', createdAt: '2023-03-15', updatedAt: '2024-01-20' },
  { id: 'u103', username: 'john.wu', name: '吳約翰', email: 'john.wu@nlma.gov.tw', orgUnit: '3', status: 'inactive', role: 'user', note: '留職停薪', createdAt: '2023-06-10', updatedAt: '2023-12-01' },
  { id: 'u104', username: 'emily.chang', name: '張愛美', email: 'emily.chang@nlma.gov.tw', orgUnit: '1', status: 'active', role: 'user', note: '', createdAt: '2023-11-05', updatedAt: '2024-02-10' },
  { id: 'u105', username: 'david.wang', name: '王大衛', email: 'david.wang@nlma.gov.tw', orgUnit: '2', status: 'active', role: 'user', note: '新進人員', createdAt: '2024-02-01', updatedAt: '2024-02-01' },
];
