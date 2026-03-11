
export const KB_TREE_DATA = [
  {
    id: 'org',
    label: '國土署',
    type: 'folder',
    children: [
      { id: 'org_plan', label: '國土計畫組', type: 'folder', ownerType: 'dept', children: [
        { id: 'org_plan_policy', label: '計畫政策', type: 'folder', children: [] },
        { id: 'org_plan_review', label: '審議紀錄', type: 'folder', children: [] }
      ] },
      { id: 'org_land_plan', label: '國土組國土規劃科', type: 'folder', ownerType: 'dept', children: [
        { id: 'org_land_plan_zoning', label: '使用分區', type: 'folder', children: [] },
        { id: 'org_land_plan_spatial', label: '空間規劃', type: 'folder', children: [] }
      ] },
      { id: 'org_land_dev', label: '國土組國土發展科', type: 'folder', ownerType: 'dept', children: [
        { id: 'org_land_dev_strategy', label: '發展策略', type: 'folder', children: [] },
        { id: 'org_land_dev_region', label: '區域計畫', type: 'folder', children: [] }
      ] },
      { id: 'org_spec_plan', label: '國土組特域規劃科', type: 'folder', ownerType: 'dept', children: [
        { id: 'org_spec_plan_coast', label: '海岸管理', type: 'folder', children: [] },
        { id: 'org_spec_plan_mountain', label: '山地管理', type: 'folder', children: [] }
      ] },
      { id: 'org_land_ctrl', label: '國土組國土管制科', type: 'folder', ownerType: 'dept', children: [
        { id: 'org_land_ctrl_enforce', label: '管制執行', type: 'folder', children: [] },
        { id: 'org_land_ctrl_audit', label: '違規查處', type: 'folder', children: [] }
      ] },
      { id: 'org_hr', label: '人事室', type: 'folder', ownerType: 'dept', children: [
        { id: 'org_hr_general', label: '綜合業務', type: 'folder', children: [] },
        { id: 'org_hr_rules', label: '人事規章', type: 'folder', children: [] }
      ] },
      { id: 'org_hr_gen1', label: '人事室綜合人事科', type: 'folder', ownerType: 'dept', children: [
        { id: 'org_hr_gen1_appoint', label: '任免遷調', type: 'folder', children: [] },
        { id: 'org_hr_gen1_assess', label: '考核管理', type: 'folder', children: [] }
      ] },
      { id: 'org_hr_gen2', label: '人事室綜合人事二科', type: 'folder', ownerType: 'dept', children: [
        { id: 'org_hr_gen2_welfare', label: '待遇福利', type: 'folder', children: [] },
        { id: 'org_hr_gen2_attend', label: '差勤管理', type: 'folder', children: [] }
      ] },
      { id: 'org_hr_gen3', label: '人事室綜合人事三科', type: 'folder', ownerType: 'dept', children: [
        { id: 'org_hr_gen3_training', label: '訓練進修', type: 'folder', children: [] },
        { id: 'org_hr_gen3_manpower', label: '人力規劃', type: 'folder', children: [] }
      ] }
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
      { id: 'shared_plan', label: '國土計畫組', type: 'folder', ownerType: 'dept', children: [] },
      { id: 'shared_hr', label: '人事室', type: 'folder', ownerType: 'dept', children: [] },
      { id: 'shared_wang', label: '王小明', type: 'folder', ownerType: 'user', children: [] }
    ]
  }
];

/**
 * 常用清單 (Favorite Lists) 假資料
 * 
 * 【業務邏輯說明 - 供開發參考】
 * 此清單資料庫僅儲存文件的 ID，在此清單中的任何移除或修改操作，
 * 皆不會影響或刪除到原本的文件實體。
 * 清單僅為「參照」，不擁有檔案本身。
 */
export const MOCK_FAVORITE_LISTS = [
  {
    id: 'fav_1',
    name: '常用文件列表1',
    isDefault: true,
    fileIds: ['file_22', 'file_24', 'file_26', 'file_28', 'file_30', 'file_32', 'file_34']
  },
  {
    id: 'fav_2',
    name: '行銷文件列表1',
    isDefault: false,
    fileIds: ['file_22', 'file_24', 'file_26', 'file_28', 'file_30', 'file_32', 'file_34']
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
    { id: 1, name: '國土計畫組', description: '掌理國土計畫擬定、審議及推動相關事項' },
    { id: 2, name: '國土組國土規劃科', description: '掌理國土空間規劃、土地使用分區等' },
    { id: 3, name: '國土組國土發展科', description: '掌理國土發展策略、區域計畫推動等' },
    { id: 4, name: '國土組特域規劃科', description: '掌理特定區域規劃、海岸及山地管理等' },
    { id: 5, name: '國土組國土管制科', description: '掌理國土使用管制、違規查處等' },
    { id: 6, name: '人事室', description: '掌理機關人事行政綜合業務' },
    { id: 7, name: '人事室綜合人事科', description: '掌理人事任免、遷調、考核等' },
    { id: 8, name: '人事室綜合人事二科', description: '掌理待遇福利、差勤管理等' },
    { id: 9, name: '人事室綜合人事三科', description: '掌理訓練進修、人力規劃等' },
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
        categories: [2] // 國土署國土組國土規劃科
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
        categories: [1] // 國土署國土計畫組
    },
    { 
        id: 't3', 
        term_name: '國土使用管制', 
        definition: '指對國土空間內各使用分區及其分類之使用行為所為之管制。', 
        source_type: '法律', 
        source_title: '國土計畫法施行細則第6條', 
        is_legal_binding: true,
        is_current: true, 
        version_tag: '現行版',
        categories: [5] // 國土署國土組國土管制科
    },
    {
        id: 't4',
        term_name: '特定區域計畫',
        definition: '指為特殊需要而就特定區域所擬定之計畫。',
        source_type: '法律',
        source_title: '國土計畫法第3條',
        is_legal_binding: true,
        is_current: true,
        version_tag: '114年修訂',
        categories: [4] // 國土署國土組特域規劃科
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
  { name: '員工差勤管理辦法.pdf', type: 'pdf', folder: 'org_hr_rules' },
  { name: '2024年度資安宣導手冊.pdf', type: 'pdf', folder: 'org_hr_gen2_welfare' },
  { name: '資訊設備使用規範.pdf', type: 'pdf', folder: 'org_hr_gen1_appoint' },
  { name: '第10次專案會議記錄.docx', type: 'docx', folder: 'org_plan_review' },
  { name: '國土計畫總體規劃報告.docx', type: 'docx', folder: 'org_plan_policy' },
  { name: '使用分區劃定作業說明.docx', type: 'docx', folder: 'org_land_plan_zoning' },
  { name: '空間規劃審議紀錄.docx', type: 'docx', folder: 'org_land_plan_spatial' },
  { name: '區域發展策略報告.docx', type: 'docx', folder: 'org_land_dev_strategy' },
  { name: '區域計畫執行進度.pdf', type: 'pdf', folder: 'org_land_dev_region' },
  { name: '海岸地區管理辦法.pdf', type: 'pdf', folder: 'org_spec_plan_coast' },
  { name: '山地地區開發審議.pdf', type: 'pdf', folder: 'org_spec_plan_mountain' },
  { name: '國土使用管制執行計畫.docx', type: 'docx', folder: 'org_land_ctrl_enforce' },
  { name: '違規使用查處報告.docx', type: 'docx', folder: 'org_land_ctrl_audit' },
  { name: '人事綜合業務月報.pdf', type: 'pdf', folder: 'org_hr_general' },
  { name: '差勤管理實施要點.pdf', type: 'pdf', folder: 'org_hr_gen2_attend' },
  { name: '考核結果彙整表.xlsx', type: 'xlsx', folder: 'org_hr_gen1_assess' },
  { name: '年度訓練計畫.docx', type: 'docx', folder: 'org_hr_gen3_training' },
  { name: '人力配置規劃書.docx', type: 'docx', folder: 'org_hr_gen3_manpower' },
  { name: '使用者操作手冊_v2.docx', type: 'docx', folder: 'shared_plan' },
  { name: '異常狀況處理報告.docx', type: 'docx', folder: 'personal_a' },
  { name: '勞工退休金提繳申報表.pdf', type: 'pdf', folder: 'shared_plan' },
  { name: '福利措施一覽表.pdf', type: 'pdf', folder: 'org_hr_gen2_welfare' },
  { name: '教育訓練完訓統計.docx', type: 'docx', folder: 'org_hr_gen3_training' },
  { name: '國土計畫法釋義彙編.pdf', type: 'pdf', folder: 'org_plan_policy' },
  { name: '軟體授權清單.xlsx', type: 'xlsx', folder: 'shared_hr' }
];

export const MASTER_FILES = Array.from({ length: 45 }).map((_, i) => {
  let name, folderId;
  
  if (i < 5) {
     name = ['專案規格書_v1.pdf', '會議記錄_2024.docx', '我的筆記.txt', '員工請假辦法.pdf', 'Q1工作成果報告.pptx'][i];
     // Map these to valid folders
     folderId = i === 0 || i === 1 ? 'org_plan_review' : i === 2 ? 'personal_a' : i === 3 ? 'org_hr_rules' : 'shared_plan';
  } else if (i >= 40) {
      if (i === 40) { name = '20240129_工作日報.docx'; folderId = 'personal_b'; }
      else if (i === 41) { name = '20240128_工作日報.docx'; folderId = 'personal_b'; }
      else if (i === 42) { name = '每週例會簡報.pptx'; folderId = 'personal_a'; }
      else if (i === 43) { name = '個人工作計畫.xlsx'; folderId = 'personal_a'; }
      else { name = `測試文件_${i + 1}.pdf`; folderId = 'personal_b'; }
  } else {
      // Use realistic files for indices 5 to 29 (expanded)
      const realisticIndex = i - 5;
      if (realisticIndex < REALISTIC_FILES.length) {
          name = REALISTIC_FILES[realisticIndex].name;
          folderId = REALISTIC_FILES[realisticIndex].folder;
      } else {
          const orgSubFolders = ['org_plan_policy', 'org_plan_review', 'org_land_plan_zoning', 'org_land_plan_spatial', 'org_land_dev_strategy', 'org_land_dev_region', 'org_spec_plan_coast', 'org_spec_plan_mountain', 'org_land_ctrl_enforce', 'org_land_ctrl_audit', 'org_hr_general', 'org_hr_rules', 'org_hr_gen1_appoint', 'org_hr_gen1_assess', 'org_hr_gen2_welfare', 'org_hr_gen2_attend', 'org_hr_gen3_training', 'org_hr_gen3_manpower'];
          name = `歸檔文件_${i + 1}.pdf`; 
          folderId = orgSubFolders[i % orgSubFolders.length];
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
  { id: 'user_me', name: '陳小華', dept: '國土組國土規劃科', role: 'user', type: 'user' },
  { id: 'user_admin', name: '李大華', dept: '人事室', role: 'admin', type: 'user' },
  { id: 'dept_plan', name: '國土計畫組 - 全體', type: 'dept' },
  { id: 'dept_land_plan', name: '國土組國土規劃科 - 全體', type: 'dept' },
  { id: 'dept_land_dev', name: '國土組國土發展科 - 全體', type: 'dept' },
  { id: 'dept_spec_plan', name: '國土組特域規劃科 - 全體', type: 'dept' },
  { id: 'dept_land_ctrl', name: '國土組國土管制科 - 全體', type: 'dept' },
  { id: 'dept_hr', name: '人事室 - 全體', type: 'dept' },
  { id: 'dept_hr_gen1', name: '人事室綜合人事科 - 全體', type: 'dept' },
  { id: 'dept_hr_gen2', name: '人事室綜合人事二科 - 全體', type: 'dept' },
  { id: 'dept_hr_gen3', name: '人事室綜合人事三科 - 全體', type: 'dept' },
];

export const MOCK_BOTS = [
  { 
    id: 'bot_hr', 
    name: '人事差勤機器人', 
    status: 'active', 
    description: '協助查詢假勤相關問題，包含年假、加班、打卡等事項。',
    welcomeMessage: '你好！我是人事差勤小幫手。我可以協助你查詢假勤規定、申請流程、或查看你的出缺勤紀錄。請問今天有什麼可以幫你的嗎？', 
    allowUpload: true,
    enableFeedback: true,
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
    allowUpload: true,
    enableFeedback: true,
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
      name: '首長信箱',
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
    { id: 'ol1', action: '新增', target: '帳號 david.wang', targetType: 'account', module: '帳號管理', user: '林小宏', dept: '國土計畫組', time: '2024-02-06 09:15', details: '新增使用者帳號 david.wang（王大衛），組織單位：國土組國土發展科。' },
    { id: 'ol2', action: '修改', target: '應用「互動問答」設定', targetType: 'app', module: '應用管理', user: '林小宏', dept: '國土計畫組', time: '2024-02-06 10:00', details: '修改互動問答應用的模型參數：temperature 由 0.7 調整為 0.5，新增使用者權限：陳莎拉。' },
    { id: 'ol3', action: '上傳', target: '專案規格書_v2.pdf', targetType: 'file', module: '知識庫', user: '王大衛', dept: '國土組國土發展科', time: '2024-02-05 09:30', details: '上傳新版專案規格書至「國土組國土發展科」知識庫資料夾。' },
    { id: 'ol4', action: '刪除', target: '舊版規章.pdf', targetType: 'file', module: '知識庫', user: '王大衛', dept: '國土組國土發展科', time: '2024-02-05 10:00', details: '刪除過期文件「舊版規章.pdf」。' },
    { id: 'ol5', action: '修改', target: '提示詞「公文撰寫助理」', targetType: 'prompt', module: '提示詞管理', user: '林小宏', dept: '國土計畫組', time: '2024-02-05 11:30', details: '更新提示詞內容，增加「請避免使用過於情緒化的字眼」限制條件。設定為公開。' },
    { id: 'ol6', action: '停用', target: '帳號 john.wu', targetType: 'account', module: '帳號管理', user: '林小宏', dept: '國土計畫組', time: '2024-02-05 14:00', details: '停用帳號 john.wu（吳約翰），原因：留職停薪。' },
    { id: 'ol7', action: '新增', target: '模型 Gemini 1.5 Pro', targetType: 'model', module: '模型管理', user: '林小宏', dept: '國土計畫組', time: '2024-02-04 16:20', details: '新增語言模型 Gemini 1.5 Pro，API Endpoint: generativelanguage.googleapis.com。狀態設為停用。' },
    { id: 'ol8', action: '建立', target: '資料夾「2024 年度計畫」', targetType: 'folder', module: '知識庫', user: '張愛美', dept: '人事室綜合人事科', time: '2024-02-04 14:15', details: '在人事室知識庫建立新資料夾「2024 年度計畫」。' },
    { id: 'ol9', action: '修改', target: '帳號 sara.chen 權限', targetType: 'account', module: '帳號管理', user: '林小宏', dept: '國土計畫組', time: '2024-02-04 10:45', details: '新增 sara.chen（陳莎拉）「國土組國土規劃科」部門管理員權限。' },
    { id: 'ol10', action: '新增', target: '應用「每日新聞摘要」', targetType: 'app', module: '應用管理', user: '林小宏', dept: '國土計畫組', time: '2024-02-03 15:30', details: '建立新應用「每日新聞摘要」，使用 GPT-4o 模型，設定自動彙整並摘要每日產業新聞。' },
    { id: 'ol11', action: '上傳', target: '員工差勤管理辦法.pdf', targetType: 'file', module: '知識庫', user: '張愛美', dept: '人事室綜合人事科', time: '2024-02-03 09:00', details: '上傳最新版「員工差勤管理辦法」至人事室知識庫。' },
    { id: 'ol12', action: '刪除', target: '提示詞「舊版客服模板」', targetType: 'prompt', module: '提示詞管理', user: '林小宏', dept: '國土計畫組', time: '2024-02-02 17:00', details: '刪除不再使用的提示詞模板「舊版客服模板」。' },
];

export const MOCK_AUDIT_CHAT_LOGS = [
    { id: 'cl1', appType: 'GAI - 互動問答', title: 'Python 教學', user: '李大華', dept: '人事室', time: '2024-02-05 09:45', content: 'User: 如何使用 Python 讀取 CSV?\nAI: 您可以使用 pandas 庫...' },
    { id: 'cl2', appType: 'DOC - 首長信箱', title: '陳情回覆草稿', user: '王小明', dept: '國土組國土規劃科', time: '2024-02-04 16:30', content: 'User: 幫我擬一份關於噪音的陳情回覆\nAI: 好的，這是草稿...' },
    { id: 'cl3', appType: 'GAI - 文件翻譯', title: '規格書翻譯', user: '陳小美', dept: '國土組國土發展科', time: '2024-02-05 10:15', content: 'User: 翻譯這份文件\nAI: 翻譯完成，請下載。' },
    { id: 'cl4', appType: 'DOC - 通用公文撰寫', title: '開會通知單撰寫', user: '李大華', dept: '人事室', time: '2024-02-06 14:00', content: 'User: 幫我寫一份開會通知\nAI: 好的，這是草稿...' },
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
        { name: '國土計畫組', value: 3500 },
        { name: '人事室', value: 2100 },
        { name: '國土組國土規劃科', value: 1800 },
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
  { id: 'u101', username: 'alex.lin', name: '林小宏', email: 'alex.lin@nlma.gov.tw', orgUnit: '1', status: 'active', role: 'admin', note: '系統管理員', createdAt: '2023-01-01', updatedAt: '2024-02-01', permissionUnits: [{ deptId: 'dept_plan', isAdmin: true }, { deptId: 'dept_hr', isAdmin: true }] },
  { id: 'u102', username: 'sara.chen', name: '陳莎拉', email: 'sara.chen@nlma.gov.tw', orgUnit: '2', status: 'active', role: 'user', note: '國土規劃業務人員', createdAt: '2023-03-15', updatedAt: '2024-01-20', permissionUnits: [{ deptId: 'dept_land_plan', isAdmin: true }] },
  { id: 'u103', username: 'john.wu', name: '吳約翰', email: 'john.wu@nlma.gov.tw', orgUnit: '6', status: 'inactive', role: 'user', note: '留職停薪', createdAt: '2023-06-10', updatedAt: '2023-12-01', permissionUnits: [] },
  { id: 'u104', username: 'emily.chang', name: '張愛美', email: 'emily.chang@nlma.gov.tw', orgUnit: '7', status: 'active', role: 'user', note: '人事任免業務', createdAt: '2023-11-05', updatedAt: '2024-02-10', permissionUnits: [{ deptId: 'dept_hr_gen1', isAdmin: true }, { deptId: 'dept_hr_gen2', isAdmin: true }] },
  { id: 'u105', username: 'david.wang', name: '王大衛', email: 'david.wang@nlma.gov.tw', orgUnit: '3', status: 'active', role: 'user', note: '新進人員', createdAt: '2024-02-01', updatedAt: '2024-02-01', permissionUnits: [] },
];
