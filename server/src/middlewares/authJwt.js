const admin = require("../config/firebase");

async function authenticate(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ error: "Missing token" });
	}

	const idToken = authHeader.split(" ")[1];

	try {
		const decoded = await admin.auth().verifyIdToken(idToken);
		req.user = decoded;
		next();
	} catch (err) {
		console.error("驗證失敗:", err);
		return res.status(401).json({ error: "無效的 token" });
	}
}

module.exports = authenticate;
