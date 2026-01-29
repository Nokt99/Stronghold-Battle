const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const gameRoutes = require("./routes/game");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/game", gameRoutes);

app.use(errorHandler);

module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}
