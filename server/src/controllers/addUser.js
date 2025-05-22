const db = require("../config/db"); // 對資料庫操作
const { profileTable } = require("../models/schema"); //資料庫的table格式
require("dotenv").config(); //環境變數
const { eq } = require("drizzle-orm");

module.exports = {
	addUsers,
};
