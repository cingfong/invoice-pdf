# 發票與帳單 PDF 產生系統

這是一個基於 Nuxt.js 開發的網頁應用程式，主要用途是紀錄帳單資料並生成 PDF 格式的發票或帳單文件。

## 技術堆疊

- **前端框架**: [Nuxt 3](https://nuxt.com/) (Vue 3 框架)
- **UI 組件**: [@nuxt/ui](https://ui.nuxt.com/)
- **表單驗證**: [VeeValidate](https://vee-validate.logaretm.com/)
- **樣式**: [Tailwind CSS](https://tailwindcss.com/)
- **資料庫連接**: [Neon Database](https://neon.tech/) (Serverless Postgres)

## 功能特點

- 建立和管理帳單記錄
- 計算訂單項目總價
- 生成 PDF 格式的發票/帳單
- 儲存和檢視歷史帳單記錄

## 安裝與設定

### 前置需求

- Node.js (建議版本: 20.x 或更高)
- pnpm (推薦) 或 npm

### 安裝步驟

1. 克隆專案：

```bash
git clone [專案 URL]
cd invoice-pdf
```

2. 安裝相依套件：

```bash
# 使用 pnpm
pnpm install

# 或使用 npm
npm install
```

## 開發環境

啟動開發伺服器 (預設位址為 `http://localhost:3000`):

```bash
# 使用 pnpm
pnpm dev

# 或使用 npm
npm run dev
```

## 建置與部署

建置生產版本：

```bash
# 使用 pnpm
pnpm build

# 或使用 npm
npm run build
```

本機預覽生產版本：

```bash
# 使用 pnpm
pnpm preview

# 或使用 npm
npm run preview
```

## 專案結構說明

- `pages/`: 網頁路由和主要頁面
- `components/`: 可重複使用的 Vue 組件
- `server/api/`: API 端點處理
- `constant/`: 常數和型別定義
- `assets/`: 全域 CSS 和靜態資源

更多關於部署的資訊，請參考 [Nuxt 部署文件](https://nuxt.com/docs/getting-started/deployment)。

<!-- TODO: 待補  -->

- 錯誤彈窗顯示
- MERGE 沒有刪除分支以及新增 commit 的點
