#新尖兵第三組專題 repo - CodePain

### 開分支步驟

1. 在自己電腦要存專案的父位置 把專案Clone下來

```bash
git clone https://github.com/ViviSun0725/team-3-exercise.git
```

2. cd 到專案資料夾

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



5. 本地 commit→push 遠端 repo

```bash
git add .
git commit -m "commit訊息"
git push origin feature/your-name-task
```

7. 到 Github 發 PR

### 開發前例行步驟

1. 每次開始開發前先：

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/你的分支
   ```

2. Merge 回 dev 前記得：

   ```bash
   git pull origin dev
   git merge dev
   # 解完 conflict 再 push，然後開 PR
   ```

### Conventional Commit 範例

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
