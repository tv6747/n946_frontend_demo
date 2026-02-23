// Mock data for Service Management

import { MOCK_USERS } from './mockData';

export const MOCK_APPLICATIONS = [
  {
    id: 'app_interactive',
    name: '互動問答',
    level: 'GAI',
    page: 'interactive',
    supportCanvas: false,
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_3',
      promptId: '',
    },
    featureSettings: {
      enableFileUpload: true,
      enableFeedback: true
    },
    tools: [{ id: '1', defaultOn: true }, { id: '3', defaultOn: false }], // Google Search, OCR
    availableModels: ['model_1', 'model_2'],
    defaultModelId: 'model_1', // Default model for the application
    welcomeMessage: '您好！我是智能助理，有什麼可以幫您的嗎？',
    defaultQuestions: [
      '如何使用知識庫功能？',
      '系統支援哪些語言？',
      '如何匯出對話紀錄？'
    ],
    permissions: {
      allowedUsers: ['user_1', 'user_2', 'user_3', 'user_4'],
      isPublic: false
    },
    createdAt: '2024-01-15',
  settings: {
    chat: { defaultSettings: {}, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' },
    canvas: { defaultSettings: { modelId: '', paramId: '', promptId: '' }, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' }
  }
  },
  {
    id: 'app_kb',
    name: '知識庫',
    level: 'GAI',
    page: 'kb_manage',
    supportCanvas: false,
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_2',
      promptId: 'prompt_1',
    },
    availableModels: ['model_1', 'model_2'],
    defaultModelId: 'model_1',
    welcomeMessage: '歡迎使用知識庫管理系統！您可以上傳、管理文件，並進行智能問答。',
    defaultQuestions: [
      '如何上傳文件到知識庫？',
      '支援哪些檔案格式？',
      '如何搜尋特定內容？'
    ],
    permissions: {
      allowedUsers: ['user_1', 'user_2', 'user_3'],
      isPublic: false
    },
    createdAt: '2024-01-18',
  settings: {
    chat: { defaultSettings: {}, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' },
    canvas: { defaultSettings: { modelId: '', paramId: '', promptId: '' }, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' }
  }
  },
  {
    id: 'app_ppt',
    name: 'PPT 互動產出',
    level: 'GAI',
    page: 'ppt_gen',
    supportCanvas: true,
    defaultSettings: {
      modelId: 'model_2',
      paramId: 'param_1',
      promptId: 'prompt_4',
    },
    availableModels: ['model_1', 'model_2'],
    defaultModelId: 'model_1',
    welcomeMessage: '讓我幫您製作精美的簡報！請描述您的需求。',
    defaultQuestions: [
      '如何生成商業提案簡報？',
      '可以指定簡報風格嗎？',
      '支援匯出哪些格式？'
    ],
    permissions: {
      allowedUsers: ['user_1', 'user_2'],
      isPublic: false
    },
    createdAt: '2024-01-22',
  settings: {
    chat: { defaultSettings: {}, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' },
    canvas: { defaultSettings: { modelId: '', paramId: '', promptId: '' }, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' }
  }
  },
  {
    id: 'app_translation',
    name: '文件翻譯',
    level: 'GAI',
    page: 'doc_trans',
    supportCanvas: false,
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_2',
      promptId: '',
    },
    featureSettings: {
      enableFileUpload: true,
      enableFeedback: true
    },
    availableModels: ['model_1', 'model_2'],
    defaultModelId: 'model_1',
    welcomeMessage: '專業文件翻譯服務，支援多種語言。',
    defaultQuestions: [
      '支援哪些語言翻譯？',
      '可以翻譯PDF檔案嗎？',
      '翻譯品質如何？'
    ],
    permissions: {
      allowedUsers: [],
      isPublic: true
    },
    createdAt: '2024-02-01',
  settings: {
    chat: { defaultSettings: {}, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' },
    canvas: { defaultSettings: { modelId: '', paramId: '', promptId: '' }, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' }
  }
  },
  {
    id: 'app_bot_hr',
    name: '答詢機器人 - 人事差勤機器人',
    level: 'GAI',
    page: 'bot_hr',
    supportCanvas: true,
    defaultSettings: {
      modelId: 'model_2',
      paramId: 'param_3',
      promptId: 'prompt_2',
    },
    availableModels: ['model_1', 'model_2'],
    defaultModelId: 'model_1',
    welcomeMessage: '你好！我是人事差勤小幫手。我可以協助你查詢假勤規定、申請流程、或查看你的出缺勤紀錄。請問今天有什麼可以幫你的嗎？',
    defaultQuestions: [
      '請問特休假還有幾天？',
      '如何申請加班費？',
      '請假單送出後多久會核准？',
      '遲到會有什麼影響？',
      '婚假可以分開請嗎？'
    ],
    permissions: {
      allowedUsers: [],
      isPublic: true
    },
    createdAt: '2024-02-05',
  settings: {
    chat: { defaultSettings: {}, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' },
    canvas: { defaultSettings: { modelId: '', paramId: '', promptId: '' }, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' }
  }
  },
  {
    id: 'app_bot_security',
    name: '答詢機器人 - 資訊安全機器人',
    level: 'GAI',
    page: 'bot_security',
    supportCanvas: true,
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_2',
      promptId: 'prompt_3',
    },
    availableModels: ['model_1'],
    defaultModelId: 'model_1',
    welcomeMessage: '您好，我是資訊安全防護機器人。請隨時保持警覺，勿點擊不明連結。若有任何資安疑慮、密碼設定或軟體安裝問題，歡迎隨時詢問！',
    defaultQuestions: [
      '收到可疑郵件該如何處理？',
      '如何設定高強度密碼？',
      '公司電腦可以安裝私人軟體嗎？',
      '發現電腦中毒了怎麼辦？',
      '如何使用 VPN 安全連線？'
    ],
    permissions: {
      allowedUsers: ['user_me', 'user_admin'],
      isPublic: false
    },
    createdAt: '2024-02-08',
  settings: {
    chat: { defaultSettings: {}, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' },
    canvas: { defaultSettings: { modelId: '', paramId: '', promptId: '' }, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' }
  }
  },
  {
    id: 'app_draft_mail',
    name: '首長信箱',
    level: 'DOC',
    page: 'draft_mail',
    supportCanvas: true,
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_2',
      promptId: 'prompt_1',
    },
    availableModels: ['model_1'],
    welcomeMessage: '請輸入民眾來信內容，系統將協助草擬回覆函稿。',
    defaultQuestions: [
      '如何處理陳情案件？',
      '回覆格式有哪些要求？',
      '需要主管核准嗎？'
    ],
    permissions: {
      allowedUsers: ['user_1', 'user_4'],
      isPublic: false
    },
    createdAt: '2024-02-10',
  settings: {
    chat: { defaultSettings: {}, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' },
    canvas: { defaultSettings: { modelId: '', paramId: '', promptId: '' }, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' }
  }
  },
  {
    id: 'app_draft_hill',
    name: '例行函稿 - 山坡地社區點監測',
    level: 'DOC',
    page: 'draft_hill',
    supportCanvas: true,
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_2',
      promptId: '',
    },
    featureSettings: {
      enableFileUpload: true,
      enableFeedback: true
    },
    availableModels: ['model_1'],
    welcomeMessage: '請輸入山坡地監測數據，系統將生成監測報告函稿。',
    defaultQuestions: [
      '監測數據範圍為何？',
      '異常值如何處理？',
      '報告週期是多久？'
    ],
    permissions: {
      allowedUsers: ['user_1'],
      isPublic: false
    },
    createdAt: '2024-02-12',
  settings: {
    chat: { defaultSettings: {}, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' },
    canvas: { defaultSettings: { modelId: '', paramId: '', promptId: '' }, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' }
  }
  },
  {
    id: 'app_draft_area',
    name: '例行函稿 - 禁建限區',
    level: 'DOC',
    page: 'draft_area',
    supportCanvas: true,
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_2',
      promptId: '',
    },
    featureSettings: {
      enableFileUpload: true,
      enableFeedback: true
    },
    availableModels: ['model_1'],
    welcomeMessage: '輸入管制區號，系統將生成相關公文。',
    defaultQuestions: [
      '如何查詢管制區資訊？',
      '變更管制需要什麼程序？',
      '公文流程為何？'
    ],
    permissions: {
      allowedUsers: ['user_1', 'user_4'],
      isPublic: false
    },
    createdAt: '2024-02-15',
  settings: {
    chat: { defaultSettings: {}, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' },
    canvas: { defaultSettings: { modelId: '', paramId: '', promptId: '' }, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' }
  }
  },
  {
    id: 'app_draft_decor',
    name: '例行函稿 - 室內裝修',
    level: 'DOC',
    page: 'draft_decor',
    supportCanvas: true,
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_2',
      promptId: '',
    },
    featureSettings: {
      enableFileUpload: true,
      enableFeedback: true
    },
    availableModels: ['model_1'],
    welcomeMessage: '請輸入裝修申請案號，系統將協助處理相關文件。',
    defaultQuestions: [
      '申請流程為何？',
      '需要哪些文件？',
      '審查時間多長？'
    ],
    permissions: {
      allowedUsers: ['user_1', 'user_2', 'user_4'],
      isPublic: false
    },
    createdAt: '2024-02-18',
  settings: {
    chat: { defaultSettings: {}, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' },
    canvas: { defaultSettings: { modelId: '', paramId: '', promptId: '' }, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' }
  }
  },
  {
    id: 'app_doc_assist',
    name: '通用公文撰寫',
    level: 'DOC',
    page: 'doc_assist',
    supportCanvas: true,
    featureSettings: {
      enableFileUpload: true,
      enableFeedback: true
    },
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_2',
      promptId: '',
    },
    availableModels: ['model_1'],
    availablePrompts: ['prompt_1'],
    defaultPromptId: 'prompt_1',
    welcomeMessage: '協助撰寫、潤飾與檢查各類公文內容。',
    defaultQuestions: [
      '如何撰寫開會通知單？',
      '幫我潤飾這段函稿內容',
      '檢查這份公文的格式是否正確'
    ],
    permissions: {
      allowedUsers: ['user_admin', 'user_1'],
      isPublic: false
    },
    createdAt: '2024-02-23',
  settings: {
    chat: { defaultSettings: {}, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' },
    canvas: { defaultSettings: { modelId: '', paramId: '', promptId: '' }, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' }
  }
  },
  {
    id: 'app_draft_doc_gen',
    name: '公文檔案上傳生成案件歷程',
    level: 'DOC',
    page: 'draft_doc_gen',
    supportCanvas: false,
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_2',
      promptId: '',
    },
    featureSettings: {
      enableFileUpload: true,
      enableFeedback: true
    },
    availableModels: ['model_1'],
    welcomeMessage: '請上傳公文檔案以生成案件歷程。',
    defaultQuestions: [
      '如何上傳檔案？',
      '支援哪些檔案格式？',
      '生成歷程需要多久？'
    ],
    permissions: {
      allowedUsers: ['user_admin', 'user_1'],
      isPublic: false
    },
    createdAt: '2024-02-22',
  settings: {
    chat: { defaultSettings: {}, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' },
    canvas: { defaultSettings: { modelId: '', paramId: '', promptId: '' }, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' }
  }
  },
  {
    id: 'app_prompt_opt',
    name: '提示詞優化',
    level: 'GAI',
    page: 'prompt_opt',
    supportCanvas: true,
    defaultSettings: {
      modelId: 'model_2',
      paramId: 'param_1',
      promptId: 'prompt_5',
    },
    availableModels: ['model_1', 'model_2'],
    welcomeMessage: '歡迎使用提示詞優化工具，讓我們一起打造更好的提示詞！',
    defaultQuestions: [
      '如何撰寫有效的提示詞？',
      '什麼是零樣本學習？',
      '如何測試提示詞效果？'
    ],
    permissions: {
      allowedUsers: ['user_1', 'user_2'],
      isPublic: false
    },
    createdAt: '2024-02-20',
  settings: {
    chat: { defaultSettings: {}, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' },
    canvas: { defaultSettings: { modelId: '', paramId: '', promptId: '' }, availableModels: [], tools: [], availablePrompts: [], defaultModelId: '', defaultPromptId: '' }
  }
  }
];

// Mock KB Folder Permissions
export const MOCK_KB_FOLDER_PERMISSIONS = [
  {
    folderId: 'org',
    assignedUsers: ['user_1', 'user_2'],
    assignedDepartments: ['dept_1'],
    inheritedFrom: null,
  },
  {
    folderId: 'org_rules',
    assignedUsers: [],
    assignedDepartments: [],
    inheritedFrom: 'org',
  },
  {
    folderId: 'org_projects',
    assignedUsers: ['user_3'],
    assignedDepartments: [],
    inheritedFrom: 'org',
  },
  {
    folderId: 'dept_hr',
    assignedUsers: ['user_4'],
    assignedDepartments: ['dept_2'],
    inheritedFrom: null,
  },
  {
    folderId: 'personal',
    assignedUsers: ['user_1'],
    assignedDepartments: [],
    inheritedFrom: null,
  },
  {
    folderId: 'personal_work',
    assignedUsers: [],
    assignedDepartments: [],
    inheritedFrom: 'personal',
  },
  {
    folderId: 'personal_work_daily',
    assignedUsers: [],
    assignedDepartments: [],
    inheritedFrom: 'personal_work',
  },
  {
    folderId: 'personal_work_meeting',
    assignedUsers: ['user_2'],
    assignedDepartments: [],
    inheritedFrom: 'personal_work',
  },
  {
    folderId: 'personal_misc',
    assignedUsers: [],
    assignedDepartments: [],
    inheritedFrom: 'personal',
  },
  {
    folderId: 'shared_root',
    assignedUsers: ['user_1', 'user_2', 'user_3'],
    assignedDepartments: [],
    inheritedFrom: null,
  },
  {
    folderId: 'shared_dept',
    assignedUsers: [],
    assignedDepartments: ['dept_1', 'dept_2'],
    inheritedFrom: 'shared_root',
  },
  {
    folderId: 'shared_others',
    assignedUsers: [],
    assignedDepartments: [],
    inheritedFrom: 'shared_root',
  },
];

