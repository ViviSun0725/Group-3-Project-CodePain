const express = require("express");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./src/routes/profile");

// app套用框架 類似html套用vue
const app = express();

//使用express cors
app.use(cors());
app.use(express.json());

//使用路由
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
