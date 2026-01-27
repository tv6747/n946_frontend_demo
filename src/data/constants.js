
export const MODES = {
  CHAT: 'chat',      
  KB: 'knowledge',    
  PROMPT: 'prompt_opt',
  TRANS: 'translation',
  PPT: 'ppt_generation',
  BOT_MGR: 'bot_management'
};

export const FEATURES = {
  INTERACTIVE: { id: 'interactive', label: '互動問答', mode: MODES.CHAT, placeholder: '輸入您的問題...' },
  KB_MANAGEMENT: { id: 'kb_manage', label: '知識庫', mode: MODES.KB, placeholder: '' },
  DOC_TRANS: { id: 'doc_trans', label: '文件翻譯', mode: MODES.TRANS, placeholder: '' },
  PPT_GEN: { id: 'ppt_gen', label: 'PPT 互動產出', mode: MODES.PPT, placeholder: '描述您想要製作的簡報主題...' },
  PROMPT_OPT: { id: 'prompt_opt', label: '提示詞優化', mode: MODES.PROMPT, placeholder: '輸入測試案例...' },
  BOT_MANAGEMENT: { id: 'bot_manage', label: '管理答詢機器人', mode: MODES.BOT_MGR, placeholder: '' },
  BOT_CS: { id: 'bot_cs', label: '答詢機器人 - 客服小幫手', mode: MODES.CHAT, placeholder: '詢問客服相關...' },
  BOT_DATA: { id: 'bot_data', label: '答詢機器人 - 數據分析師', mode: MODES.CHAT, placeholder: '請上傳數據...' },
  DRAFT_MAIL: { id: 'draft_mail', label: '例行函稿 - 署長信箱', mode: MODES.CHAT, placeholder: '輸入民眾來信內容...' },
  DRAFT_HILL: { id: 'draft_hill', label: '例行函稿 - 山坡地社區點監測', mode: MODES.CHAT, placeholder: '輸入監測數據...' },
  DRAFT_AREA: { id: 'draft_area', label: '例行函稿 - 禁建限區', mode: MODES.CHAT, placeholder: '輸入管制區號...' },
  DRAFT_DECOR: { id: 'draft_decor', label: '例行函稿 - 室內裝修', mode: MODES.CHAT, placeholder: '輸入申請案號...' },
};

export const LANGUAGES = [
  { id: 'auto', label: '自動偵測' },
  { id: 'zh-TW', label: '正體中文' },
  { id: 'zh-CN', label: '簡體中文' },
  { id: 'ja', label: '日語' },
  { id: 'ko', label: '韓語' },
  { id: 'en', label: '英語' },
  { id: 'fr', label: '法語' },
  { id: 'de', label: '德語' },
  { id: 'es', label: '西班牙語' },
];

export const SYSTEM_PROMPTS = [
  { id: 'default', label: '通用助手 (預設)' },
  { id: 'customer_service', label: '親切客服' },
  { id: 'professional', label: '專業嚴謹' },
  { id: 'creative', label: '創意發想' },
  { id: 'coding', label: '程式專家' },
];

export const LLM_MODELS = [
  { id: 'gpt-4o', label: 'GPT-4o' },
  { id: 'claude-3.5', label: 'Claude 3.5 Sonnet' },
  { id: 'gemini-1.5', label: 'Gemini 1.5 Pro' },
  { id: 'llama-3', label: 'Llama 3 70B' },
];

export const PROMPT_TEMPLATES = [
  { id: 'default', label: '通用預設' },
  { id: 'formal_tw', label: '台灣公文正式語氣' },
  { id: 'summary', label: '重點摘要專家' },
  { id: 'creative_writer', label: '創意文案寫手' },
  { id: 'code_helper', label: '資深程式架構師' },
];

export const WELCOME_CONFIG = {
  interactive: {
    title: '你好，今天想聊些什麼？',
    sub: '我可以協助你撰寫文章、規劃行程或解答疑問。',
    suggestions: ['如何撰寫一份正式的道歉信？', '比較 React 和 Vue 的優缺點', '幫我規劃三天兩夜的東京自由行']
  },
  ppt_gen: {
    title: '快速生成專業簡報',
    sub: '告訴我主題，我將為您生成大綱、內容並套用精美範本。',
    suggestions: ['製作一份關於 2024 年度行銷策略的簡報', '新產品上市發表會簡報大綱', '公司內部資安教育訓練教材']
  },
  bot_cs: {
    title: '客服小幫手',
    sub: '專門處理客戶抱怨、退貨流程與標準回覆。',
    suggestions: ['如何委婉拒絕客戶的不合理退貨要求？', '草擬一封針對服務中斷的致歉信', '客戶詢問 VIP 會員資格申請流程']
  },
  bot_data: {
    title: '數據分析師',
    sub: '上傳您的數據，我將協助分析趨勢並提供洞察。',
    suggestions: ['分析上季度的營收下滑原因', '預測下個月的熱銷商品', '根據現有數據找出潛在的高價值客戶']
  },
  draft_mail: {
    title: '署長信箱擬稿',
    sub: '協助回覆民眾陳情案件，確保語氣正式且合規。',
    suggestions: ['擬稿回覆關於夜間施工噪音的陳情', '回覆民眾詢問公園設施修繕進度', '針對交通號誌故障的陳情回覆']
  },
  draft_decor: {
    title: '室內裝修審查',
    sub: '協助檢核申請文件缺漏並擬定補正通知。',
    suggestions: ['檢查案號 113-裝修-099 的缺件情形', '擬定消防圖說未核章的補正通知', '查詢本月待審核的案件列表']
  },
  draft_hill: {
    title: '山坡地社區監測',
    sub: '協助彙整監測數據，判讀異常趨勢並生成通報。',
    suggestions: ['輸入 A 社區 2024/01 監測數據', '分析 B 觀測井的水位異常紀錄', '擬定監測儀器故障的維修通知']
  },
  draft_area: {
    title: '禁限建區查詢服務',
    sub: '查詢土地是否位於管制範圍，並協助擬定查詢結果公文。',
    suggestions: ['查詢 XX市XX區XX段 123 地號 建築限制', '擬定「非屬禁限建範圍」之證明函稿', '說明該區域之建築退縮規定']
  },
  kb_qa: { 
    title: '知識庫智能問答',
    sub: '我將基於您選定的文件內容進行回答，請盡量具體提問。',
    suggestions: ['總結選定文件的重點', '文件中提到的主要數據有哪些？', '比較這幾份文件的異同之處']
  },
  default: {
    title: 'AI Pilot',
    sub: '您的智慧工作夥伴',
    suggestions: ['寫一首關於人工智慧的詩', '解釋量子運算的原理', '總結這篇文章的重點']
  }
};

export const PPT_TEMPLATES = [
  { id: 1, name: '企業商務藍', color: 'bg-blue-600', textColor: 'text-white' },
  { id: 2, name: '極簡現代灰', color: 'bg-slate-700', textColor: 'text-white' },
  { id: 3, name: '創意活潑橘', color: 'bg-orange-500', textColor: 'text-white' },
  { id: 4, name: '學術研究綠', color: 'bg-emerald-600', textColor: 'text-white' },
  { id: 5, name: '科技未來紫', color: 'bg-indigo-600', textColor: 'text-white' },
  { id: 6, name: '高雅質感黑', color: 'bg-zinc-800', textColor: 'text-white' },
];
