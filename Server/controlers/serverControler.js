const Server = require("../models/Server");

module.exports = {
    async createServer(req, res, next) {
        try {
            const { name, address } = req.body;

            const exists = await Server.findOne({ address });
            if (exists) return res.status(400).json({ error: "Address already in use" });

            const server = await Server.create({
                owner: req.user._id,
                name,
                address,
                players: 0,
                online: true
            });

            res.json({ server });
        } catch (err) {
            next(err);
        }
    },

    async joinServer(req, res, next) {
        try {
            const { address } = req.body;

            const server = await Server.findOne({ address });
            if (!server) return res.status(404).json({ error: "Server not found" });

            res.json({ server });
        } catch (err) {
            next(err);
        }
    },

    async listServers(req, res) {
        const servers = await Server.find({});
        res.json({ servers });
    },

    async listOwnedServers(req, res) {
        const servers = await Server.find({ owner: req.user._id });
        res.json({ servers });
    },

    async toggleServerStatus(req, res, next) {
        try {
            const { id } = req.body;

            const server = await Server.findById(id);
            if (!server) return res.status(404).json({ error: "Server not found" });

            if (server.owner.toString() !== req.user._id.toString())
                return res.status(403).json({ error: "Not your server" });

            server.online = !server.online;
            await server.save();

            res.json({ server });
        } catch (err) {
            next(err);
        }
    }
};
