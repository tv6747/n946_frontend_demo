
export const MOCK_TOOLS = [
  {
    id: 1,
    name: 'WebSearch - Google',
    description: '使用 Google 搜尋引擎檢索網路即時資訊，支援新聞、圖片與一般網頁結果。',
    sseEndpoint: 'http://172.16.10.20:3000/sse/google-search',
    port: 3000,
    status: 'active'
  },
  {
    id: 2,
    name: 'WebSearch - DuckDuckGo',
    description: '使用 DuckDuckGo 搜尋引擎進行隱私保護搜尋，不追蹤使用者搜尋紀錄。',
    sseEndpoint: 'http://172.16.10.20:3100/sse/ddg-search',
    port: 3100,
    status: 'active'
  },
  {
    id: 3,
    name: 'OCR',
    description: '光學字元辨識服務，可將圖片中的文字轉換為可編輯的文本格式，支援多語言辨識。',
    sseEndpoint: 'http://172.16.10.25:4000/sse/ocr-service',
    port: 4000,
    status: 'active'
  }
];
