// Mock data for Service Management

import { MOCK_USERS } from './mockData';

export const MOCK_APPLICATIONS = [
  {
    id: 'app_interactive',
    name: '互動問答',
    level: 'GAI',
    page: 'interactive',
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_3',
      promptId: '',
    },
    availableModels: ['model_1', 'model_2'],
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
    createdAt: '2024-01-15'
  },
  {
    id: 'app_kb',
    name: '知識庫',
    level: 'GAI',
    page: 'kb_manage',
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_2',
      promptId: 'prompt_1',
    },
    availableModels: ['model_1', 'model_2'],
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
    createdAt: '2024-01-18'
  },
  {
    id: 'app_ppt',
    name: 'PPT 互動產出',
    level: 'GAI',
    page: 'ppt_gen',
    defaultSettings: {
      modelId: 'model_2',
      paramId: 'param_1',
      promptId: 'prompt_4',
    },
    availableModels: ['model_1', 'model_2'],
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
    createdAt: '2024-01-22'
  },
  {
    id: 'app_translation',
    name: '文件翻譯',
    level: 'GAI',
    page: 'doc_trans',
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_2',
      promptId: '',
    },
    availableModels: ['model_1', 'model_2'],
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
    createdAt: '2024-02-01'
  },
  {
    id: 'app_bot_cs',
    name: '答詢機器人 - 客服小幫手',
    level: 'GAI',
    page: 'bot_cs',
    defaultSettings: {
      modelId: 'model_2',
      paramId: 'param_3',
      promptId: 'prompt_2',
    },
    availableModels: ['model_1', 'model_2'],
    welcomeMessage: '您好！我是客服小幫手，很高興為您服務！',
    defaultQuestions: [
      '營業時間是什麼時候？',
      '如何聯繫客服？',
      '退換貨政策是什麼？'
    ],
    permissions: {
      allowedUsers: [],
      isPublic: true
    },
    createdAt: '2024-02-05'
  },
  {
    id: 'app_bot_data',
    name: '答詢機器人 - 數據分析師',
    level: 'GAI',
    page: 'bot_data',
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_2',
      promptId: 'prompt_3',
    },
    availableModels: ['model_1'],
    welcomeMessage: '我是您的數據分析助手，請上傳數據或提出分析需求。',
    defaultQuestions: [
      '如何進行趨勢分析？',
      '支援哪些圖表類型？',
      '可以匯出分析報告嗎？'
    ],
    permissions: {
      allowedUsers: ['user_1', 'user_2', 'user_3'],
      isPublic: false
    },
    createdAt: '2024-02-08'
  },
  {
    id: 'app_draft_mail',
    name: '例行函稿 - 署長信箱',
    level: 'DOC',
    page: 'draft_mail',
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
    createdAt: '2024-02-10'
  },
  {
    id: 'app_draft_hill',
    name: '例行函稿 - 山坡地社區點監測',
    level: 'DOC',
    page: 'draft_hill',
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_2',
      promptId: '',
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
    createdAt: '2024-02-12'
  },
  {
    id: 'app_draft_area',
    name: '例行函稿 - 禁建限區',
    level: 'DOC',
    page: 'draft_area',
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_2',
      promptId: '',
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
    createdAt: '2024-02-15'
  },
  {
    id: 'app_draft_decor',
    name: '例行函稿 - 室內裝修',
    level: 'DOC',
    page: 'draft_decor',
    defaultSettings: {
      modelId: 'model_1',
      paramId: 'param_2',
      promptId: '',
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
    createdAt: '2024-02-18'
  },
  {
    id: 'app_prompt_opt',
    name: '提示詞優化',
    level: 'GAI',
    page: 'prompt_opt',
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
    createdAt: '2024-02-20'
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

