module.exports = {
    async getGameState(req, res) {
        res.json({
            world: "placeholder",
            player: req.user._id
        });
    },

    async matchmaking(req, res) {
        res.json({
            status: "queued",
            player: req.user._id
        });
    }
};
