
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
