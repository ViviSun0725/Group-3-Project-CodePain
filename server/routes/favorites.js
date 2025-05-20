import { Router } from "express";
import db from "../db/index.js";
import { favoritesTable, pensTable } from "../db/schema.js";
import { eq, and } from "drizzle-orm";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

/**
 * POST /api/favorites
 * 收藏一個作品
 * Body: { user_id, pen_id }
 */
router.post("/", async (req, res) => {
  const { user_id, pen_id } = req.body;

  try {
    await db.insert(favoritesTable).values({ user_id, pen_id }).onConflictDoNothing();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "收藏失敗", details: err.message });
  }
});

/**
 * DELETE /api/favorites
 * 取消收藏
 * Body: { user_id, pen_id }
 */
router.delete("/", async (req, res) => {
  const { user_id, pen_id } = req.body;

  await db.delete(favoritesTable).where(
    and(eq(favoritesTable.user_id, user_id), eq(favoritesTable.pen_id, pen_id))
  );

  res.status(204).end();
});

/**
 * GET /api/favorites/:user_id
 * 取得某使用者的所有收藏作品
 */
router.get("/:user_id", async (req, res) => {
  const user_id = parseInt(req.params.user_id);

  const result = await db
    .select({
      pen_id: favoritesTable.pen_id
    })
    .from(favoritesTable)
    .where(eq(favoritesTable.user_id, user_id));

  const penIds = result.map(r => r.pen_id);

  const pens = await db
    .select()
    .from(pensTable)
    .where(pensTable.id.in(penIds));

  res.json(pens);
});

export default router;
