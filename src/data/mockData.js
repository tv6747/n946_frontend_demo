
export const KB_TREE_DATA = [
  {
    id: 'org',
    label: '組織/單位公用',
    type: 'folder',
    children: [
      { 
        id: 'org_rules', 
        label: '規章文件', 
        type: 'folder', 
        children: [
          { 
            id: 'org_rules_internal', 
            label: '內部規章', 
            type: 'folder', 
            children: [
              { id: 'doc_001', label: '員工手冊_2024.pdf', type: 'file', size: '2.3 MB', folderId: 'org_rules_internal' },
              { id: 'doc_002', label: '差旅費報支規定.pdf', type: 'file', size: '856 KB', folderId: 'org_rules_internal' },
              { id: 'doc_003', label: '資訊安全管理辦法.docx', type: 'file', size: '1.2 MB', folderId: 'org_rules_internal' }
            ] 
          },
          { 
            id: 'org_rules_external', 
            label: '外部法規', 
            type: 'folder', 
            children: [
              { id: 'doc_004', label: '勞動基準法彙編.pdf', type: 'file', size: '5.1 MB', folderId: 'org_rules_external' },
              { id: 'doc_005', label: '個資法施行細則.pdf', type: 'file', size: '1.8 MB', folderId: 'org_rules_external' }
            ] 
          }
        ] 
      },
      { 
        id: 'org_projects', 
        label: '專案文件', 
        type: 'folder', 
        children: [
          { 
            id: 'org_projects_2024', 
            label: '2024年度專案', 
            type: 'folder', 
            children: [
              { id: 'doc_006', label: '數位轉型計畫書.pptx', type: 'file', size: '8.5 MB', folderId: 'org_projects_2024' },
              { id: 'doc_007', label: '智慧辦公室建置規劃.xlsx', type: 'file', size: '3.2 MB', folderId: 'org_projects_2024' }
            ] 
          }
        ] 
      }
    ]
  },
  { 
    id: 'dept_hr', 
    label: '人事室', 
    type: 'folder', 
    children: [
      {
        id: 'dept_hr_recruit',
        label: '招募任用',
        type: 'folder',
        children: [
          {
            id: 'dept_hr_recruit_process',
            label: '招募流程',
            type: 'folder',
            children: [
              { id: 'doc_101', label: '招募作業流程圖.pdf', type: 'file', size: '1.5 MB', folderId: 'dept_hr_recruit_process' },
              { id: 'doc_102', label: '面試評核表範本.docx', type: 'file', size: '456 KB', folderId: 'dept_hr_recruit_process' },
              { id: 'doc_103', label: '新人報到檢核清單.xlsx', type: 'file', size: '234 KB', folderId: 'dept_hr_recruit_process' }
            ]
          },
          {
            id: 'dept_hr_recruit_templates',
            label: '職缺範本',
            type: 'folder',
            children: [
              { id: 'doc_104', label: '軟體工程師職缺說明.docx', type: 'file', size: '678 KB', folderId: 'dept_hr_recruit_templates' },
              { id: 'doc_105', label: '專案經理職缺說明.docx', type: 'file', size: '645 KB', folderId: 'dept_hr_recruit_templates' }
            ]
          }
        ]
      },
      {
        id: 'dept_hr_training',
        label: '教育訓練',
        type: 'folder',
        children: [
          {
            id: 'dept_hr_training_annual',
            label: '年度訓練計畫',
            type: 'folder',
            children: [
              { id: 'doc_106', label: '2024年度訓練計畫.pptx', type: 'file', size: '4.2 MB', folderId: 'dept_hr_training_annual' },
              { id: 'doc_107', label: '訓練預算規劃.xlsx', type: 'file', size: '892 KB', folderId: 'dept_hr_training_annual' }
            ]
          },
          {
            id: 'dept_hr_training_materials',
            label: '訓練教材',
            type: 'folder',
            children: [
              { id: 'doc_108', label: '新人訓練簡報.pptx', type: 'file', size: '12.3 MB', folderId: 'dept_hr_training_materials' },
              { id: 'doc_109', label: '資安教育訓練手冊.pdf', type: 'file', size: '3.7 MB', folderId: 'dept_hr_training_materials' }
            ]
          }
        ]
      },
      {
        id: 'dept_hr_performance',
        label: '績效考核',
        type: 'folder',
        children: [
          {
            id: 'dept_hr_performance_forms',
            label: '考核表單',
            type: 'folder',
            children: [
              { id: 'doc_110', label: '年度績效考核表.xlsx', type: 'file', size: '567 KB', folderId: 'dept_hr_performance_forms' },
              { id: 'doc_111', label: '試用期考核表.docx', type: 'file', size: '423 KB', folderId: 'dept_hr_performance_forms' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dept_finance',
    label: '財務部',
    type: 'folder',
    children: [
      {
        id: 'dept_finance_accounting',
        label: '會計作業',
        type: 'folder',
        children: [
          {
            id: 'dept_finance_accounting_monthly',
            label: '月結作業',
            type: 'folder',
            children: [
              { id: 'doc_201', label: '2024年1月結算報表.xlsx', type: 'file', size: '2.8 MB', folderId: 'dept_finance_accounting_monthly' },
              { id: 'doc_202', label: '2024年2月結算報表.xlsx', type: 'file', size: '2.9 MB', folderId: 'dept_finance_accounting_monthly' },
              { id: 'doc_203', label: '月結作業檢核表.docx', type: 'file', size: '345 KB', folderId: 'dept_finance_accounting_monthly' }
            ]
          },
          {
            id: 'dept_finance_accounting_annual',
            label: '年度決算',
            type: 'folder',
            children: [
              { id: 'doc_204', label: '2023年度財務報表.pdf', type: 'file', size: '5.6 MB', folderId: 'dept_finance_accounting_annual' },
              { id: 'doc_205', label: '決算說明文件.docx', type: 'file', size: '1.2 MB', folderId: 'dept_finance_accounting_annual' }
            ]
          }
        ]
      },
      {
        id: 'dept_finance_budget',
        label: '預算管理',
        type: 'folder',
        children: [
          {
            id: 'dept_finance_budget_allocation',
            label: '預算分配',
            type: 'folder',
            children: [
              { id: 'doc_206', label: '2024年度總預算.xlsx', type: 'file', size: '4.3 MB', folderId: 'dept_finance_budget_allocation' },
              { id: 'doc_207', label: '各部門預算配置表.xlsx', type: 'file', size: '1.8 MB', folderId: 'dept_finance_budget_allocation' }
            ]
          },
          {
            id: 'dept_finance_budget_control',
            label: '預算控管',
            type: 'folder',
            children: [
              { id: 'doc_208', label: '預算執行進度報告.pptx', type: 'file', size: '3.4 MB', folderId: 'dept_finance_budget_control' }
            ]
          }
        ]
      },
      {
        id: 'dept_finance_tax',
        label: '稅務申報',
        type: 'folder',
        children: [
          {
            id: 'dept_finance_tax_monthly',
            label: '月報',
            type: 'folder',
            children: [
              { id: 'doc_209', label: '營業稅申報表_202401.pdf', type: 'file', size: '876 KB', folderId: 'dept_finance_tax_monthly' },
              { id: 'doc_210', label: '營業稅申報表_202402.pdf', type: 'file', size: '892 KB', folderId: 'dept_finance_tax_monthly' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dept_it',
    label: '資訊部',
    type: 'folder',
    children: [
      {
        id: 'dept_it_infrastructure',
        label: '基礎設施',
        type: 'folder',
        children: [
          {
            id: 'dept_it_infrastructure_network',
            label: '網路架構',
            type: 'folder',
            children: [
              { id: 'doc_301', label: '網路拓撲圖.vsdx', type: 'file', size: '3.2 MB', folderId: 'dept_it_infrastructure_network' },
              { id: 'doc_302', label: 'IP位址配置表.xlsx', type: 'file', size: '567 KB', folderId: 'dept_it_infrastructure_network' },
              { id: 'doc_303', label: '防火牆設定文件.pdf', type: 'file', size: '2.1 MB', folderId: 'dept_it_infrastructure_network' }
            ]
          },
          {
            id: 'dept_it_infrastructure_server',
            label: '伺服器管理',
            type: 'folder',
            children: [
              { id: 'doc_304', label: '伺服器清單.xlsx', type: 'file', size: '445 KB', folderId: 'dept_it_infrastructure_server' },
              { id: 'doc_305', label: '備份還原程序.docx', type: 'file', size: '1.3 MB', folderId: 'dept_it_infrastructure_server' }
            ]
          }
        ]
      },
      {
        id: 'dept_it_development',
        label: '系統開發',
        type: 'folder',
        children: [
          {
            id: 'dept_it_development_standards',
            label: '開發規範',
            type: 'folder',
            children: [
              { id: 'doc_306', label: '程式碼撰寫規範.md', type: 'file', size: '123 KB', folderId: 'dept_it_development_standards' },
              { id: 'doc_307', label: 'Git使用指南.pdf', type: 'file', size: '2.4 MB', folderId: 'dept_it_development_standards' },
              { id: 'doc_308', label: 'API設計原則.docx', type: 'file', size: '876 KB', folderId: 'dept_it_development_standards' }
            ]
          },
          {
            id: 'dept_it_development_docs',
            label: '技術文件',
            type: 'folder',
            children: [
              { id: 'doc_309', label: '系統架構說明.pptx', type: 'file', size: '6.7 MB', folderId: 'dept_it_development_docs' },
              { id: 'doc_310', label: '資料庫Schema設計.pdf', type: 'file', size: '1.9 MB', folderId: 'dept_it_development_docs' }
            ]
          }
        ]
      },
      {
        id: 'dept_it_security',
        label: '資訊安全',
        type: 'folder',
        children: [
          {
            id: 'dept_it_security_policy',
            label: '安全政策',
            type: 'folder',
            children: [
              { id: 'doc_311', label: '資安政策白皮書.pdf', type: 'file', size: '3.8 MB', folderId: 'dept_it_security_policy' },
              { id: 'doc_312', label: '存取控制管理辦法.docx', type: 'file', size: '1.1 MB', folderId: 'dept_it_security_policy' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dept_legal',
    label: '法務部',
    type: 'folder',
    children: [
      {
        id: 'dept_legal_contracts',
        label: '合約管理',
        type: 'folder',
        children: [
          {
            id: 'dept_legal_contracts_templates',
            label: '合約範本',
            type: 'folder',
            children: [
              { id: 'doc_401', label: '採購合約範本.docx', type: 'file', size: '678 KB', folderId: 'dept_legal_contracts_templates' },
              { id: 'doc_402', label: '保密協議範本.docx', type: 'file', size: '456 KB', folderId: 'dept_legal_contracts_templates' },
              { id: 'doc_403', label: '勞動契約範本.docx', type: 'file', size: '534 KB', folderId: 'dept_legal_contracts_templates' }
            ]
          },
          {
            id: 'dept_legal_contracts_review',
            label: '合約審閱',
            type: 'folder',
            children: [
              { id: 'doc_404', label: '合約審閱指引.pdf', type: 'file', size: '2.3 MB', folderId: 'dept_legal_contracts_review' },
              { id: 'doc_405', label: '風險評估檢核表.xlsx', type: 'file', size: '345 KB', folderId: 'dept_legal_contracts_review' }
            ]
          }
        ]
      },
      {
        id: 'dept_legal_compliance',
        label: '法規遵循',
        type: 'folder',
        children: [
          {
            id: 'dept_legal_compliance_gdpr',
            label: '個資保護',
            type: 'folder',
            children: [
              { id: 'doc_406', label: 'GDPR遵循指南.pdf', type: 'file', size: '4.5 MB', folderId: 'dept_legal_compliance_gdpr' },
              { id: 'doc_407', label: '個資盤點清冊.xlsx', type: 'file', size: '1.2 MB', folderId: 'dept_legal_compliance_gdpr' }
            ]
          }
        ]
      },
      {
        id: 'dept_legal_intellectual',
        label: '智慧財產',
        type: 'folder',
        children: [
          {
            id: 'dept_legal_intellectual_patents',
            label: '專利管理',
            type: 'folder',
            children: [
              { id: 'doc_408', label: '專利申請流程.pdf', type: 'file', size: '1.7 MB', folderId: 'dept_legal_intellectual_patents' },
              { id: 'doc_409', label: '專利清單.xlsx', type: 'file', size: '678 KB', folderId: 'dept_legal_intellectual_patents' }
            ]
          }
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
