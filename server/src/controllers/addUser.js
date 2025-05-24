// src/controllers/addUsers.js
import "dotenv/config";
import db from "../config/db.js";
import { profileTable } from "../models/schema.js";
import { eq } from "drizzle-orm";

export const addUsers = async (req, res) => {
	const uid = req.user.uid;
	const email = req.user.email || null;

	try {
		const user = await db
			.select()
			.from(profileTable)
			.where(eq(profileTable.uid, uid));

		if (user.length > 0) {
			return res.status(400).json({ message: "使用者已存在" });
		}

		await db.insert(profileTable).values({
			uid: uid,
			email: email,
			username: email ? email.split("@")[0] : uid,
		});

		return res.status(201).json({ message: "使用者新增成功" });
	} catch (err) {
		console.error(err);
		res.status(401).send("Unauthorized or error");
	}
};
