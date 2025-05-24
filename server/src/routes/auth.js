import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import { usersTable } from "../models/schema.js";
import { eq } from "drizzle-orm";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret"; // 請記得在 .env 設定

/**
 * POST /api/auth/register
 * 註冊新使用者
 */
router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  // 檢查是否已有帳號存在
  const existing = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (existing.length > 0) return res.status(409).json({ error: "Email 已被註冊" });

  // 雜湊密碼
  const hash = await bcrypt.hash(password, 10);

  // 新增使用者
  const [user] = await db
    .insert(usersTable)
    .values({ email, username, password_hash: hash })
    .returning();

  // 回傳 token
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
  res.status(201).json({ token });
});

/**
 * POST /api/auth/login
 * 登入
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = (await db.select().from(usersTable).where(eq(usersTable.email, email)))[0];
  if (!user) return res.status(401).json({ error: "帳號或密碼錯誤" });

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) return res.status(401).json({ error: "帳號或密碼錯誤" });

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

/**
 * GET /api/auth/profile
 * 驗證 token 並回傳使用者資料
 */
router.get("/profile", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "未提供 token" });

  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = (await db.select().from(usersTable).where(eq(usersTable.id, payload.id)))[0];
    if (!user) return res.status(404).json({ error: "使用者不存在" });

    const { password_hash, ...safeUser } = user;
    res.json(safeUser);
  } catch (err) {
    res.status(401).json({ error: "無效的 token" });
  }
});

export default router;