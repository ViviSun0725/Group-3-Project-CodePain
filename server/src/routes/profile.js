const express = require("express");
const authenticate = require("../middlewares/authJwt");
const { profileTable } = require("../models/schema");
const { eq } = require("drizzle-orm");
const router = express.Router();

router.get("/test", authenticate, (req, res) => {
	res.json({
		message: "驗證成功",
		uid: req.user.uid,
		email: req.user.email,
	});
});
module.exports = router;
