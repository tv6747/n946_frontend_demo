// Mock data for Language Model Management

export const MOCK_LLM_MODELS = [
  {
    id: 'model_1',
    name: 'GPT-4o',
    type: 'generative',
    url: 'https://api.openai.com/v1/chat/completions',
    apiKey: 'sk-proj-abc123...',
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: 'model_2',
    name: 'Claude 3.5 Sonnet',
    type: 'generative',
    url: 'https://api.anthropic.com/v1/messages',
    apiKey: 'sk-ant-xyz789...',
    temperature: 0.8,
    topP: 0.95,
    topK: 50,
    status: 'active',
    createdAt: '2024-01-20'
  },
  {
    id: 'model_3',
    name: 'Text Embedding 3 Large',
    type: 'embedding',
    url: 'https://api.openai.com/v1/embeddings',
    apiKey: 'sk-proj-embed123...',
    temperature: 0,
    topP: 1,
    topK: 0,
    status: 'active',
    createdAt: '2024-02-01'
  },
  {
    id: 'model_4',
    name: 'Gemini 1.5 Pro',
    type: 'generative',
    url: 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro',
    apiKey: '',
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    status: 'inactive',
    createdAt: '2024-02-10'
  }
];

export const MOCK_LLM_PARAMS = [
  {
    id: 'param_1',
    name: '創意寫作',
    temperature: 0.9,
    topP: 0.95,
    topK: 50,
    createdAt: '2024-02-01'
  },
  {
    id: 'param_2',
    name: '精確回答',
    temperature: 0.3,
    topP: 0.8,
    topK: 30,
    createdAt: '2024-02-05'
  },
  {
    id: 'param_3',
    name: '平衡模式',
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    createdAt: '2024-02-10'
  },
  {
    id: 'param_4',
    name: '保守輸出',
    temperature: 0.2,
    topP: 0.7,
    topK: 20,
    createdAt: '2024-02-15'
  }
];

export const MOCK_LLM_PROMPTS = [
  {
    id: 'prompt_1',
    name: '公文撰寫助理',
    content: '你是一個專業的公文撰寫助理。請使用標準的台灣公文格式與用字遣詞 (如：函、簽、公告等)。語氣需正式、精確、不帶情緒。',
    creator: 'Admin',
    createdAt: '2024-01-20'
  },
  {
    id: 'prompt_2',
    name: '客服回覆專家',
    content: '你是一個專業的客服人員。請以親切、同理的態度回應客戶問題，確保提供準確的資訊並維持專業形象。',
    creator: 'John Doe',
    createdAt: '2024-01-25'
  },
  {
    id: 'prompt_3',
    name: '數據分析師',
    content: '你是一個資深數據分析師。請基於提供的數據進行深入分析，找出關鍵趨勢與洞察，並以清晰的方式呈現結果。',
    creator: 'Admin',
    createdAt: '2024-02-01'
  },
  {
    id: 'prompt_4',
    name: '創意文案寫手',
    content: '你是一個充滿創意的行銷文案寫手。請使用生動活潑、引人入勝的語氣，為產品或主題撰寫吸引人的文案。',
    creator: 'Marketing Team',
    createdAt: '2024-02-08'
  },
  {
    id: 'prompt_5',
    name: '程式碼審查專家',
    content: 'You are an expert software architect and code reviewer. Provide constructive feedback on code quality, design patterns, and best practices. Explain your suggestions clearly.',
    creator: 'Dev Team',
    createdAt: '2024-02-12'
  }
];

export const MOCK_LLM_APIS = [
  {
    id: 'api_1',
    name: '公文生成 API',
    path: '/api/v1/generate-document',
    params: 'type=official&format=pdf',
    apiKey: 'api-key-doc-123',
    modelId: 'model_1',
    paramId: 'param_2',
    promptId: 'prompt_1',
    createdAt: '2024-02-10'
  },
  {
    id: 'api_2',
    name: '客服回覆 API',
    path: '/api/v1/customer-service/reply',
    params: 'lang=zh-TW&tone=friendly',
    apiKey: '',
    modelId: 'model_2',
    paramId: 'param_3',
    promptId: 'prompt_2',
    createdAt: '2024-02-12'
  },
  {
    id: 'api_3',
    name: '文本嵌入 API',
    path: '/api/v1/embeddings',
    params: 'model=text-embedding-3-large',
    apiKey: 'api-key-embed-456',
    modelId: 'model_3',
    paramId: 'param_4',
    promptId: '',
    createdAt: '2024-02-15'
  },
  {
    id: 'api_4',
    name: '創意文案生成',
    path: '/api/v1/creative-content',
    params: 'category=marketing&style=energetic',
    apiKey: 'api-key-creative-789',
    modelId: 'model_1',
    paramId: 'param_1',
    promptId: 'prompt_4',
    createdAt: '2024-02-18'
  }
];
