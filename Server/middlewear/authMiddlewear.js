const tokenService = require("../services/tokenService");
const User = require("../models/User");

module.exports = async function (req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "Missing token" });

    const token = header.split(" ")[1];
    try {
        const decoded = tokenService.verify(token);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ error: "Invalid token" });

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: "Unauthorized" });
    }
};
