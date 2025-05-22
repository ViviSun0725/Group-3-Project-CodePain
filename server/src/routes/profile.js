const express = require("express");
const authenticate = require("../middlewares/authJwt");
const { profileTable } = require("../models/schema");
const { eq } = require("drizzle-orm");
const router = express.Router();
const admin = require("../config/firebase");
const db = require("../config/db");
router.get("/test", authenticate, (req, res) => {
  res.json({
    message: "驗證成功",
    uid: req.user.uid,
    email: req.user.email,
  });
});
router.post("/posts", async (req, res) => {
  const idToken = req.headers.authorization?.split(" ")[1];
  if (!idToken) return res.status(401).send("No token");
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // 第一次見到這個 uid 時，嘗試在 users 表新增使用者資料
    // 你也可以帶更多資訊，例如 email, name (從 decodedToken 取，或前端傳)
    const email = decodedToken.email || null;

    // 查詢使用者是否存在
    const user = await db
      .select()
      .from(profileTable)
      .where(eq(profileTable.uid, uid));

    if (user.length === 0) {
      // 不存在就新增
      await db.insert(profileTable).values({
        uid: uid,
        email: email,
        username: email ? email.split("@")[0] : uid, // 預設用 email 前綴，沒有 email 就用 uid
      });
    }
    return res.status(201).json({ message: "使用者新增成功" });
  } catch (err) {
    console.error(err);
    res.status(401).send("Unauthorized or error");
  }
});
module.exports = router;
