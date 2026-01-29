const User = require("../models/User");
const tokenService = require("../services/tokenService");
const passwordUtil = require("../utils/password");

module.exports = {
    async register(req, res, next) {
        try {
            const { username, email, password } = req.body;

            const exists = await User.findOne({ email });
            if (exists) return res.status(400).json({ error: "Email already in use" });

            const hashed = await passwordUtil.hash(password);

            const user = await User.create({
                username,
                email,
                password: hashed
            });

            const token = tokenService.sign(user);

            res.json({ token, user });
        } catch (err) {
            next(err);
        }
    },

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ error: "Invalid credentials" });

            const valid = await passwordUtil.compare(password, user.password);
            if (!valid) return res.status(400).json({ error: "Invalid credentials" });

            const token = tokenService.sign(user);

            res.json({ token, user });
        } catch (err) {
            next(err);
        }
    },

    async me(req, res) {
        res.json({ user: req.user });
    }
};
