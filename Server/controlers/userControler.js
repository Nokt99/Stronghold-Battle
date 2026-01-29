module.exports = {
    async getProfile(req, res) {
        res.json({ user: req.user });
    },

    async updateProfile(req, res, next) {
        try {
            const updates = req.body;
            Object.assign(req.user, updates);
            await req.user.save();
            res.json({ user: req.user });
        } catch (err) {
            next(err);
        }
    }
};
