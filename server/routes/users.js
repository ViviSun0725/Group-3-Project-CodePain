import { Router } from "express";
import db from "../db/index.js";
import {
  usersTable,
  pensTable,
  followsTable
} from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = Router();

/**
 * GET /api/users/:id
 * 取得使用者個人資料（不含密碼）
 */
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));
  
  if (result.length === 0) return res.status(404).json({ error: "使用者不存在" });

  const { password_hash, ...userData } = result[0]; // 不回傳密碼
  res.json(userData);
});

/**
 * PUT /api/users/:id
 * 編輯使用者資料（頭貼、顯示名稱、bio 等）
 */
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updateData = req.body;

  const result = await db
    .update(usersTable)
    .set(updateData)
    .where(eq(usersTable.id, id))
    .returning();

  if (result.length === 0) return res.status(404).json({ error: "使用者不存在" });

  const { password_hash, ...updatedUser } = result[0];
  res.json(updatedUser);
});

/**
 * GET /api/users/:id/pens
 * 查詢某使用者的所有作品
 */
router.get("/:id/pens", async (req, res) => {
  const id = parseInt(req.params.id);
  const pens = await db
    .select()
    .from(pensTable)
    .where(eq(pensTable.user_id, id));
  res.json(pens);
});

/**
 * GET /api/users/:id/following
 * 查詢此使用者追蹤的人
 */
router.get("/:id/following", async (req, res) => {
  const id = parseInt(req.params.id);
  const follows = await db
    .select({
      user_id: followsTable.following_id
    })
    .from(followsTable)
    .where(eq(followsTable.follower_id, id));
  res.json(follows.map(f => f.user_id));
});

/**
 * GET /api/users/:id/followers
 * 查詢追蹤此使用者的人
 */
router.get("/:id/followers", async (req, res) => {
  const id = parseInt(req.params.id);
  const followers = await db
    .select({
      user_id: followsTable.follower_id
    })
    .from(followsTable)
    .where(eq(followsTable.following_id, id));
  res.json(followers.map(f => f.user_id));
});

export default router;
