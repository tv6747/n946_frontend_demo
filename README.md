# N946 Frontend Demo

N946 前端展示專案是一個功能完整的 GAI（Generative AI）應用平台，整合了多個 AI 互動功能，包含知識庫管理、智能問答、答詢機器人、PPT 生成、提示詞優化、文件翻譯以及完整的管理後台系統。

## 📖 完整技術文件

請參閱 **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)** 以獲得詳細的專案架構、功能說明、狀態管理、資料流和設計模式等完整資訊。

## 技術棧

- **Framework**: React 18.2.0 + Vite 5.0.8
- **Styling**: TailwindCSS 3.4.0
- **Icons**: Lucide React 0.300.0
- **State Management**: React Hooks (集中式狀態管理)
- **Utilities**: clsx + tailwind-merge

## 快速開始

### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動開發伺服器
```bash
npm run dev
```
預設會在 `http://localhost:5173` 啟動

### 3. 建置生產版本
```bash
npm run build
```

### 4. 部署到 GitHub Pages
```bash
npm run deploy
```

## 三大平台系統

### 🤖 GAI 互動平台
- 互動問答 (含 AI 回饋系統：👍/👎/回饋 Modal)
- 知識庫管理（雙模式：QA 問答 / 檔案管理）
  - 常用清單：收藏文件至清單 / 清單 Q&A 問答 / 從清單移除 / 狀態隔離 / 星號清單自動作為預設問答上下文
  - 資料夾編輯：個人知識庫 Inline editing
- PPT 互動產出（含範本管理：收藏/編輯/上傳/系統保護）
- 提示詞優化
- 文件翻譯
- 語料庫管理（專有名詞/近似詞）
- 答詢機器人管理
  - 人事差勤機器人
  - 資訊安全機器人

### 📄 智慧公文輔助系統
- 首長信箱
- 例行函稿 - 山坡地社區監測
- 例行函稿 - 禁建限區
- 例行函稿 - 室內裝修
- 公文檔案上傳生成案件歷程
- 通用公文撰寫

### ⚙️ 後台管理系統（管理員專用）
- 服務管理（應用管理/應用配置、知識庫權限、機器人管理）
  - 應用配置與機器人配置採用統一分頁式「預設設定」(語言模型/參數/提示詞/工具)
- 語料庫管理（專有名詞、近似詞）
- 語言模型管理（模型管理、參數設定）
- 提示詞管理 + 提示詞優化
- API 管理
- 工具管理
- 帳號管理
- 稽核管理（知識庫紀錄、對話紀錄、統計圖表）
- LangFlow

## 核心特色

✅ **多系統整合**：三大平台系統無縫切換  
✅ **權限控制**：管理員與一般使用者的差異化功能  
✅ **雙模式知識庫**：問答與管理模式切換  
✅ **RAG 智能問答**：基於選定文件的上下文問答  
✅ **常用清單**：知識庫文件收藏清單，支援 Q&A 快速問答、狀態隔離、清單 CRUD  
✅ **AI 回饋系統**：統一的 👍/👎/回饋 Modal，涵蓋所有對話功能  
✅ **PPT 範本管理**：收藏、編輯、上傳、系統範本保護  
✅ **模組化設計**：清晰的功能分離與元件組合 (40+ 個功能元件)  
✅ **狀態管理**：集中式 React Hooks 狀態管理  
✅ **完整後台**：21 個管理元件涵蓋服務/模型/帳號/稽核等  
✅ **統一預設設定**：應用配置與機器人配置採用分頁式設定 (Tab + Transfer List)  

## 專案結構

```
frontend_demo/
├── src/
│   ├── App.jsx                 # 主應用程式（狀態中心）
│   ├── assets/                 # 靜態資源 (Logo、PPT 範本圖片)
│   ├── components/             # 共用元件（15 個）
│   │   ├── common/             # 通用元件 (ChatMessage, ChatInput, TreeNode 等)
│   │   ├── layout/             # 佈局元件 (MainLayout)
│   │   └── modals/             # 彈窗元件 (8 個，含 AddToListModal)
│   ├── features/               # 功能模組（40 個）
│   │   ├── admin/              # 管理後台 (21 個)
│   │   ├── bot/                # 機器人配置
│   │   ├── chat/               # 對話功能 (含回饋 Modal)
│   │   ├── corpus/             # 語料庫管理
│   │   ├── kb/                 # 知識庫管理 (含常用清單)
│   │   ├── ppt/                # PPT 生成 (含範本管理)
│   │   ├── prompt/             # 提示詞優化
│   │   └── translation/        # 文件翻譯
│   ├── data/                   # 常數與模擬資料 (5 個資料檔)
│   ├── utils/                  # 工具函數
│   └── hooks/                  # 自定義 Hooks (useResizable)
├── PROJECT_DOCUMENTATION.md    # 完整技術文件 📚
├── package.json
└── README.md
```

## 角色切換（Demo 功能）

專案內建角色切換功能，點擊右上角使用者頭像可以切換：

- **一般使用者**：可存取 GAI 平台與智慧公文系統
- **管理員**：可存取 GAI 平台與後台管理系統

## 開發者資源

- **完整文件**：[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)
- **線上展示**：[https://tv6747.github.io/n946_frontend_demo/](https://tv6747.github.io/n946_frontend_demo/)
- **Repository**：`tv6747/n946_frontend_demo`

## License

本專案為展示用途。
