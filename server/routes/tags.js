import { Router } from "express";
import db from "../db/index.js";
import { pensTable, tagsTable, penTagsTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = Router();

/**
 * GET /api/tags
 * 取得所有標籤
 */
router.get("/", async (req, res) => {
  const tags = await db.select().from(tagsTable);
  res.json(tags);
});

/**
 * GET /api/tags/:tagName
 * 查詢特定標籤底下的所有作品
 */
router.get("/:tagName", async (req, res) => {
  const { tagName } = req.params;

  // 1. 找出 tag 的 id
  const tagRecord = (await db.select().from(tagsTable).where(eq(tagsTable.name, tagName)))[0];
  if (!tagRecord) return res.status(404).json({ error: "找不到這個標籤" });

  // 2. 找出這個 tag_id 對應到的 pen_id
  const tagLinks = await db
    .select({ pen_id: penTagsTable.pen_id })
    .from(penTagsTable)
    .where(eq(penTagsTable.tag_id, tagRecord.id));

  const penIds = tagLinks.map(t => t.pen_id);
  if (penIds.length === 0) return res.json([]); // 沒有作品

  // 3. 查出這些作品
  const pens = await db
    .select()
    .from(pensTable)
    .where(pensTable.id.in(penIds));

  res.json(pens);
});

export default router;
