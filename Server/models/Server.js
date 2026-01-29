const mongoose = require("mongoose");

const ServerSchema = new mongoose.Schema({
    owner:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name:    { type: String, required: true },
    address: { type: String, required: true, unique: true },
    players: { type: Number, default: 0 },
    online:  { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Server", ServerSchema);
