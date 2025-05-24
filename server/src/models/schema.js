// 測試用schema

import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
  boolean,
  primaryKey,
  serial
} from "drizzle-orm/pg-core";

// 使用者資料表
const usersTable = pgTable("users", {
  // id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  id: varchar("id", { length: 1000 }).primaryKey(),  // 欄位名稱依然是叫id
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 50 }).notNull(),
  password_hash: text("password_hash").notNull(),
  is_pro: boolean("is_pro").default(false),
  profile_image: text("profile_image"), // 存網址
  display_name: varchar("display_name", { length: 100 }),
  location: varchar("location", { length: 255 }),
  bio: text("bio"),
  profile_link1: text("profile_link1"),
  profile_link2: text("profile_link2"),
  profile_link3: text("profile_link3"),
  created_at: timestamp().defaultNow(),
});

// 作品資料表 (我們需要為pens取個新名字, 像是 compounds 或 doses 之類的(????))
const pensTable = pgTable("pens", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer("user_id").references(() => usersTable.id),
  html_code: text("html_code"),
  css_code: text("css_code"),
  js_code: text("js_code"),
  title: varchar("title", { length: 100 }).notNull(),
  description: text(), // 刪除 description 的 not null設定
  is_private: boolean("is_private").default(false),
  created_at: timestamp().defaultNow(),
});
// 未來擴充：Preprocessors, external Scripts, npm packages, CSS, Base, Vendor Prefixing, auto save, auto-upating preview, format on save, code indentation, code intent width

// 收藏資料表
const favoritesTable = pgTable(
  "favorites",
  {
    user_id: integer("user_id")
      .references(() => usersTable.id)
      .notNull(),
    pen_id: integer("pen_id")
      .references(() => pensTable.id)
      .notNull(),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.user_id, table.pen_id] }),
  })
);

// 留言資料表
const commentsTable = pgTable("comments", {
  id: serial("id").primaryKey(),
  pen_id: integer("pen_id")
    .references(() => pensTable.id)
    .notNull(),
  user_id: integer("user_id")
    .references(() => usersTable.id)
    .notNull(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

// 使用者追蹤資料表
const followsTable = pgTable(
  "follows",
  {
    follower_id: integer("follower_id")
      .references(() => usersTable.id)
      .notNull(), // 誰在追蹤
    following_id: integer("following_id")
      .references(() => usersTable.id)
      .notNull(), // 被追蹤的人
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.follower_id, table.following_id] }),
  })
);

// 標籤表
const tagsTable = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
});

// 作品對標籤中介表
const penTagsTable = pgTable(
  "pen_tags",
  {
    pen_id: integer("pen_id")
      .references(() => pensTable.id, { onDelete: "cascade" }) 
      .notNull(),
    tag_id: integer("tag_id")
      .references(() => tagsTable.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.pen_id, table.tag_id] }),
  })
);


export {
  usersTable,
  pensTable,
  favoritesTable,
  commentsTable,
  followsTable,
  tagsTable,
  penTagsTable
};