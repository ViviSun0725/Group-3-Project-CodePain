import express from "express";
import { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";


import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import pensRouter from "./routes/pens.js";
import tagsRouter from "./routes/tags.js";
import favoritesRouter from "./routes/favorites.js";
import commentsRouter from "./routes/comments.js";
import followsRouter from "./routes/follows.js";

const { Pool } = pg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const db = drizzle(pool);

const PORT = 3000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/pens", pensRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/favorites", favoritesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/follows", followsRouter);


app.get("/api/test", (req, res) => {
  res.json({ message: "First API Test From Vivi" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
