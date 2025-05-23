const express = require("express");
const authenticate = require("../middlewares/authJwt");
const router = express.Router();
const { addUsers } = require("../controllers/addUser");

//工具包 先放在這裡 同樣可以在這裡寫CRUD 沒問題在把code拆到controllers 帶上middelwares .etc
//完成開發可移除 簡潔code畫面
const { profileTable } = require("../models/schema");
const { eq } = require("drizzle-orm");
const admin = require("../config/firebase");
const db = require("../config/db");
////////

//測試用路由
router.get("/test", authenticate, (req, res) => {
	res.json({
		message: "驗證成功",
		uid: req.user.uid,
		email: req.user.email,
	});
});
////

//新增使用者到資料庫
router.post("/addusers", authenticate, addUsers);

module.exports = router;
