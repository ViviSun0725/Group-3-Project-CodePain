### 我們搬家了
本專案已轉為前後端 repository 分離架構
前端 repository 連結：[Codecaine_client](https://github.com/CodecaineWebsite/Codecaine_client)
後端 repository 連結：[Codecaine_server](https://github.com/CodecaineWebsite/Codecaine_server)

# 產業新尖兵 前端工程師養成班 第三組 - Codecaine 線上程式碼編輯分享平台

Codecaine 是一個 CodePen-inspired 的線上程式碼編輯與分享平台，提供即時預覽、作品儲存、社群互動等功能，讓使用者可以更輕鬆地創作與展示前端作品。

##  技術架構

- **Frontend:** Vue 3 + TailwindCSS + Pinia + Vue Router + Monaco Editor
- **Backend:** Node.js + Express + PostgreSQL
- **Authentication:** Firebase Auth
- **Storage:** AWS S3（使用者上傳）

## 小組成員/開發人員

- [孫瑋微](https://github.com/ViviSun0725)

- [杜澄潔](https://github.com/kaiadu)

- [陳俊宏](https://github.com/k890120)

- [林威廷](https://github.com/WeyTing)

- [陳竑齊](https://github.com/lllBarry)

- [邱郁婷](https://github.com/chinyuting)

- [段振東](https://github.com/duanjendong)

## 下載專案

1. 在自己電腦要存專案的位置 把專案Clone下來

```bash
git clone https://github.com/ViviSun0725/Codecaine.git
```

2. cd 進專案資料夾

```bash
cd Codecaine
```


### 第一次下載後請依序至以下資料夾安裝 npm 套件

1. 在 client 資料夾

```bash
cd client    // 移動至 client 資料夾
npm install
```

2. 在 server 資料夾
```bash
cd ..        // 回上一層
cd server    // 移動至 server 資料夾
npm install  
```

### 設定環境變數
請小組成員自行設定

1. client
```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```
2. server
```
DATABASE_URL=
FIREBASE_SERVICE_ACCOUNT=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_BUCKET_NAME=
```

### 建立資料庫欄位

```bash
# 請至 server 資料夾
cd server
npm run generate
npm run migrate
```

### 執行方式

請開啟兩個 Terminal 分別運行 client 與 server

1. 前端開發
請至 client 資料夾

```bash
cd client
npm run dev
```

2. 後端開發
請至 server 資料夾
```bash
cd server
npm run dev
```


## 開分支步驟


1. 切到 dev 分支

```bash
git checkout dev      # 切換至 dev 分支
git pull origin dev   # 抓取遠端 dev 分支進度，確保開分支前 dev 是最新狀態
```

2. 開自己功能分支

```bash
git checkout -b feature/your-name-task
```

或

```bash
git checkout -b issue/1
```

3. 本地 commit → push 上 github

```bash
git add .
# 或
git add <你要加進這次 commit 的檔案>

git commit -m "commit訊息"
git push origin feat/your-task  # 將分支上傳至遠端
```

4. 到 Github 發 PR

## 開發前例行步驟

1. 每次開始開發前先拉遠端 dev 分支的進度，再開自己的分支：

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat/你的分支
   ```

2. Merge 回 dev 前記得再拉一次遠端 dev 進度，把衝突解完再發 PR：

   ```bash
   git pull origin dev
   git push origin feature/your-name-task
   # 解完 conflict 再 push，然後開 PR
   ```
### 命名規範



| 類型                    | 規範                             | 範例                                                           |
| ----------------------- | -------------------------------- | -------------------------------------------------------------- |
| Vue 元件命名            | PascalCase（每個單字首字母大寫） | `UserProfile.vue`                                              |
| CSS / Tailwind 類別命名 | kebab-case (烤肉串命名)          | `error-message`                                                |
| JavaScript 變數與函式   | camelCase  (小駝峰命名)          | `userToken``handleLogin()`                                     |
| JavaScript 常數         | UPPER_SNAKE_CASE (大寫蛇式命名)  | `PORT`                                                         |
| Pinia Store 命名        | snake_case (小寫蛇式命名)        | `defineStore('user_store', { ... })`                           |
| API 路由命名            | 小寫 + 複數名詞                  | `GET /api/users``POST /api/projects``DELETE /api/messages/:id` |
| Git 分支命名            | 使用結構：`type/feature-name`    | `feat/login-page` `fix/api-timeout` `refactor/editor-toolbar`  `issue/20`  |
| Commit 訊息命名    |  參考 Conventional Commit 規範，格式：`[type]description`    | `[feat] 新增註冊功能` `[fix] 修正登入 API 回傳錯誤` `[docs] 補上 README 命名規範`    |



### 分支/commit類型 範例

[Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/)
[助教提供的github流程pdf](https://drive.google.com/file/d/15vxFHq6fgofokIE4NoyUlqnlQ7L1g4bJ/view)

| 類型       | 說明                                   |
| ---------- | -------------------------------------- |
| `feat`     | 新增功能                               |
| `fix`      | 修復錯誤                               |
| `refactor` | 重構、優化程式碼，不是新功能或修復錯誤 |
| `pref`     | 改善效能                               |
| `docs`     | 修改文件                               |
| `test`     | 測試新增/修改                          |
| `style`    | 程式碼格式調整（如空白、縮排）         |
| `revert`   | 還原某次 commit                        |
| `build`    | 修改建置工具、外部依賴設定             |
| `chore`    | 其他雜項變動（不影響程式執行）         |

## 聲明

此專案僅作個人／團隊學習用途，致敬 CodePen，不作為商業用途。
