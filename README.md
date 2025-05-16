# 新尖兵前端班 - 第三組專題 repo - CodePain 

## 第一次下載請依序至以下資料夾安裝 npm 套件

1. 在專案資料夾根目錄

```bash
npm install
```

2. 在 client 資料夾

```bash
cd client    // 移動至 client 資料夾
npm install
```

3. 在 server 資料夾
```bash
cd ..        // 回上一層
cd server    // 移動至 server 資料夾
npm install  
```

### 執行方式

1. 前端開發
請至 client 資料夾

```bash
cd client
npm run dev
```

2. 前端+後端開發
可至根目錄資料夾
```bash
npm run dev
```
或開兩個 Terminal 分別運行 client 與 server

## 開分支步驟

1. 在自己電腦要存專案的位置 把專案Clone下來

```bash
git clone https://github.com/ViviSun0725/team-3-exercise.git
```

2. cd 進專案資料夾

3. 切到 dev 分支

```bash
git checkout dev
git pull origin dev
```

4. 開自己功能分支

```bash
git checkout -b feature/your-name-task
```

或

```bash
git checkout -b issue/1
```



5. 本地 commit → push 上 github

```bash
git add .
git commit -m "commit訊息"
git push origin feature/your-name-task
```

7. 到 Github 發 PR

## 開發前例行步驟

1. 每次開始開發前先拉遠端 dev 分支的進度，再開自己的分支：

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/你的分支
   ```

2. Merge 回 dev 前記得再拉一次遠端 dev 進度，把衝突解完再 merge：

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

