const { varchar, timestamp, pgTable } = require("drizzle-orm/pg-core");

const profileTable = pgTable("profile", {
  uid: varchar("uid", { length: 1000 }).primaryKey(),
  username: varchar("username", { length: 20 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  location: varchar("location", { length: 255 }),
  bio: varchar("bio", { length: 100 }),
  createdAt: timestamp("created_at", { precision: 0 }).defaultNow(),
});

module.exports = {
  profileTable,
};
