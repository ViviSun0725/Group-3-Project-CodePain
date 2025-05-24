// 📦 種子資料產生器 seed.js
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  usersTable,
  pensTable,
  favoritesTable,
  commentsTable,
  followsTable,
  tagsTable,
  penTagsTable
} from "../db/schema.js";
import { eq } from "drizzle-orm";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

// 工具：隨機取樣
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const sampleTags = ["html", "css", "javascript", "gsap", "anime.js", "tailwind", "vue", "react"];
const sampleUsers = [
  { email: "lucy@example.com", username: "lucy", password_hash: "123", display_name: "Lucy" },
  { email: "jay@example.com", username: "jay", password_hash: "123", display_name: "Jay" },
  { email: "momo@example.com", username: "momo", password_hash: "123", display_name: "Momo" },
];

const run = async () => {
  console.log("🌱 開始播種資料...");

  // 1. 使用者
  const users = await db.insert(usersTable).values(sampleUsers).returning();

  // 2. 標籤
  const tagRecords = await Promise.all(
    sampleTags.map((name) =>
      db.insert(tagsTable).values({ name }).onConflictDoNothing().returning()
    )
  );
  const tags = tagRecords.flatMap((t) => t);

  // 3. 作品
  const pens = [];
  for (let i = 0; i < 10; i++) {
    const author = pick(users);
    const [pen] = await db.insert(pensTable).values({
      user_id: author.id,
      title: `作品 ${i + 1}`,
      html_code: `<h1>Hello ${i}</h1>`
    }).returning();
    pens.push(pen);

    // 隨機加幾個標籤
    const chosenTags = [...tags].sort(() => 0.5 - Math.random()).slice(0, 2);
    for (const tag of chosenTags) {
      await db.insert(penTagsTable).values({ pen_id: pen.id, tag_id: tag.id }).onConflictDoNothing();
    }
  }

  // 4. 留言
  for (const pen of pens) {
    for (let i = 0; i < 2; i++) {
      const user = pick(users);
      await db.insert(commentsTable).values({
        pen_id: pen.id,
        user_id: user.id,
        content: `這是 ${user.username} 留在 ${pen.title} 的留言`
      });
    }
  }

  // 5. 收藏
  for (const user of users) {
    const liked = [...pens].sort(() => 0.5 - Math.random()).slice(0, 3);
    for (const pen of liked) {
      await db.insert(favoritesTable).values({ user_id: user.id, pen_id: pen.id }).onConflictDoNothing();
    }
  }

  // 6. 追蹤
  await db.insert(followsTable).values([
    { follower_id: users[0].id, following_id: users[1].id },
    { follower_id: users[0].id, following_id: users[2].id },
    { follower_id: users[1].id, following_id: users[0].id },
  ]).onConflictDoNothing();

  console.log("✅ 播種完成！");
  process.exit();
};

if (process.argv.includes("--cleanup")) {
  const cleanup = async () => {
    console.log("🧹 開始清除資料...");
    await db.delete(favoritesTable);
    await db.delete(commentsTable);
    await db.delete(followsTable);
    await db.delete(penTagsTable);
    await db.delete(pensTable);
    await db.delete(tagsTable);
    await db.delete(usersTable);
    console.log("✅ 資料已清除完畢！");
    process.exit();
  };
  cleanup();
} else {
  run().catch((err) => {
    console.error("❌ 播種失敗：", err);
    process.exit(1);
  });
}


// 自動建立的資料：
// 3 位使用者

// 8 組常見標籤（html, css, javascript…）

// 10 筆作品，每筆隨機加上 2 個標籤

// 每篇作品有 2 則留言

// 每個使用者收藏 3 筆作品

// 使用者彼此之間有追蹤關係