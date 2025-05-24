import { Router } from "express";
import db from "../db/index.js";
import { commentsTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = Router();

/**
 * GET /api/comments/:pen_id
 * 查某個作品的所有留言
 */
router.get("/:pen_id", async (req, res) => {
  const pen_id = parseInt(req.params.pen_id);

  const comments = await db
    .select()
    .from(commentsTable)
    .where(eq(commentsTable.pen_id, pen_id));

  res.json(comments);
});

/**
 * POST /api/comments
 * 新增留言
 * Body: { pen_id, user_id, content }
 */
router.post("/", async (req, res) => {
  const { pen_id, user_id, content } = req.body;

  const [newComment] = await db
    .insert(commentsTable)
    .values({ pen_id, user_id, content })
    .returning();

  res.status(201).json(newComment);
});

/**
 * PUT /api/comments/:id
 * 編輯留言內容
 */
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { content } = req.body;

  const result = await db
    .update(commentsTable)
    .set({ content })
    .where(eq(commentsTable.id, id))
    .returning();

  if (result.length === 0) return res.status(404).json({ error: "找不到留言" });
  res.json(result[0]);
});

/**
 * DELETE /api/comments/:id
 * 刪除留言
 */
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  await db.delete(commentsTable).where(eq(commentsTable.id, id));
  res.status(204).end();
});

export default router;
