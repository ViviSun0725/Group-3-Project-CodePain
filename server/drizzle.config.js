import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config();

export default defineConfig({
  out: "./src/drizzle",
  schema: "./sec/models/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL
  }
});