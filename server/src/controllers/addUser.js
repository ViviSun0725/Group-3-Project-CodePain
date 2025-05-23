const db = require("../config/db"); // 對資料庫操作
const { profileTable } = require("../models/schema"); //資料庫的table格式
require("dotenv").config(); //環境變數
const { eq } = require("drizzle-orm");

const addUsers = async (req, res) => {
	const uid = req.user.uid; //來自authjwt的decoded
	const email = req.user.email || null;
	try {
		// 查詢使用者是否存在
		const user = await db
			.select()
			.from(profileTable)
			.where(eq(profileTable.uid, uid));

		if (user.length > 0) {
			// 使用者已存在，回傳 400 和錯誤訊息
			return res.status(400).json({ message: "使用者已存在" });
		}
		// 不存在就新增
		await db.insert(profileTable).values({
			uid: uid,
			email: email,
			username: email ? email.split("@")[0] : uid, // 預設用 email 前綴，沒有 email 就用 uid
		});

		return res.status(201).json({ message: "使用者新增成功" });
	} catch (err) {
		console.error(err);
		res.status(401).send("Unauthorized or error");
	}
};

module.exports = {
	addUsers,
};
