import jwt from "jsonwebtoken";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";

/**
 * 驗證 JWT 的 middleware
 * 通過後會在 req.user 上存放使用者資料
 */
export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "未提供 token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = (await db.select().from(usersTable).where(eq(usersTable.id, payload.id)))[0];
    if (!user) return res.status(401).json({ error: "無效使用者" });

    // 將使用者資料掛到 req 上
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      is_pro: user.is_pro
    };

    next(); // 通過驗證，交給下一個處理函式
  } catch (err) {
    return res.status(401).json({ error: "token 驗證失敗" });
  }
}
