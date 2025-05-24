import { Router } from "express";
import { eq, and } from "drizzle-orm";
import db from "../config/db.js";
import { followsTable } from "../models/schema.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

/**
 * POST /api/follows
 * 追蹤某使用者
 * Body: { following_id }
 */
router.post("/", async (req, res) => {
  const { follower_id, following_id } = req.body;

  if (follower_id === following_id) {
    return res.status(400).json({ error: "不能追蹤自己！" });
  }

  await db
    .insert(followsTable)
    .values({ follower_id, following_id })
    .onConflictDoNothing();

  res.status(201).json({ success: true });
});

/**
 * DELETE /api/follows
 * 取消追蹤
 * Body: { follower_id, following_id }
 */
router.delete("/", async (req, res) => {
  const { follower_id, following_id } = req.body;

  await db
    .delete(followsTable)
    .where(
      and(
        eq(followsTable.follower_id, follower_id),
        eq(followsTable.following_id, following_id)
      )
    );

  res.status(204).end();
});

/**
 * GET /api/follows/check/:target_id
 * 檢查目前登入者是否已追蹤某個使用者（供前端按鈕顯示）
 */
router.get("/check/:target_id", async (req, res) => {
  const { follower_id } = req.body;
  const following_id = parseInt(req.params.target_id);

  const result = await db
    .select()
    .from(followsTable)
    .where(
      and(
        eq(followsTable.follower_id, follower_id),
        eq(followsTable.following_id, following_id)
      )
    );

  res.json({ isFollowing: result.length > 0 });
});

export default router;
