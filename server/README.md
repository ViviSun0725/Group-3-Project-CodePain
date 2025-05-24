1. 請先確認已npm套件已安裝

```
npm install
```

2. 在自己電腦下載 postgreSQL 與 pgAdmin

3. 在自己電腦建立一個用於測試的資料庫(例如：Codecaine)

4. 在 `/server` 目錄建立 `.env` 檔

5. 在 `.env` 存入以下內容
```
DATABASE_URL=postgresql://[你的postgre使用者名稱]:[你的密碼]@localhost:5432/[你剛創立的測試資料庫名稱]
JWT_SECRET=[可以是任意字串，也自行製作金鑰]
```

6. 確認你的 Terminal 移動到 server 資料夾內

7. 在 Terminal 依序執行下列指令
a. 在資料庫建立資料表
```
npm run generate 
npm run migrate 
```
b. 建立種子資料(測試用假資料)
```
npm run seed
```

補充：清除種子資料
```
npm run sneed:clean
```
注意：這行指令會清除資料庫內所有筆資料，若你有自行新增的測試資料也會遭到清除