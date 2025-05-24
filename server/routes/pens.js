import { Router } from "express";
import db from "../db/index.js";
import { pensTable, penTagsTable, tagsTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

/**
 * GET /api/pens
 * 取得所有作品
 */
router.get("/", async (req, res) => {
  const pens = await db.select().from(pensTable);
  res.json(pens);
});

/**
 * GET /api/pens/:id
 * 取得單一作品
 */
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await db.select().from(pensTable).where(eq(pensTable.id, id));
  if (result.length === 0) return res.status(404).json({ error: "找不到作品" });
  res.json(result[0]);
});

/**
 * POST /api/pens
 * 新增一份作品（支援標籤）
 * 傳入格式：
 * {
 *   user_id: 1,
 *   title: "My Pen",
 *   html_code: "<h1>Hello</h1>",
 *   tags: ["html", "gsap"]
 * }
 */
router.post("/", async (req, res) => {
  const {
    user_id,
    title,
    html_code,
    css_code,
    js_code,
    description,
    is_public = true,
    tags = [],
  } = req.body;

  // 1. 建立作品
  const [newPen] = await db
    .insert(pensTable)
    .values({
      user_id,
      title,
      html_code,
      css_code,
      js_code,
      description,
      is_public,
    })
    .returning();

  // 2. 新增標籤（如果有）
  for (const tagName of tags) {
    // 2-1. 確認標籤是否存在，不存在就新增
    const [tag] = await db
      .insert(tagsTable)
      .values({ name: tagName })
      .onConflictDoNothing()
      .returning();

    // 2-2. 找出 tag.id（從剛新增或原有中查）
    const tagRecord =
      tag ||
      (await db.select().from(tagsTable).where(eq(tagsTable.name, tagName)))[0];
    if (!tagRecord) continue;

    // 2-3. 建立 penTags 關聯
    await db
      .insert(penTagsTable)
      .values({
        pen_id: newPen.id,
        tag_id: tagRecord.id,
      })
      .onConflictDoNothing(); // 避免重複
  }

  res.status(201).json(newPen);
});

/**
 * PUT /api/pens/:id
 * 編輯作品（不包含標籤）
 */
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const update = await db
    .update(pensTable)
    .set(req.body)
    .where(eq(pensTable.id, id))
    .returning();
  if (update.length === 0) return res.status(404).json({ error: "找不到作品" });
  res.json(update[0]);
});

/**
 * DELETE /api/pens/:id
 * 刪除作品（目前不 cascade 標籤關聯）
 */
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  await db.delete(pensTable).where(eq(pensTable.id, id));
  res.status(204).end();
});

export default router;
