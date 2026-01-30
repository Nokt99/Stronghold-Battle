const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const parentRoutes = require("./routes/parentRoutes");
const serverRoutes = require("./routes/serverRoutes");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/servers", serverRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Stronghold Battle backend running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
