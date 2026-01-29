require("dotenv").config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET || "dev-secret",
    tokenExpiry: "7d"
};
