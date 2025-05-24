// src/routes/profile.js
import express from "express";
import { authenticate } from "../middlewares/authJwt.js";
import { addUsers } from "../controllers/addUser.js";
//工具包 先放在這裡 同樣可以在這裡寫CRUD 沒問題在把code拆到controllers 帶上middelwares .etc
//完成開發可移除 簡潔code畫面
import { profileTable } from "../models/schema.js";
import { eq } from "drizzle-orm";
import admin from "../config/firebase.js";
import db from "../config/db.js";

const router = express.Router();

// 測試用路由
router.get("/test", authenticate, (req, res) => {
  res.json({
    message: "驗證成功",
    uid: req.user.uid,
    email: req.user.email,
  });
});

// 新增使用者到資料庫
router.post("/addusers", authenticate, addUsers);

export default router;
