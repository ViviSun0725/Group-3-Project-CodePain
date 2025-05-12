import express from "express";
import cors from "cors";

const PORT = 3000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "First API Test From Vivi" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
