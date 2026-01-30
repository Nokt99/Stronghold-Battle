const mongoose = require("mongoose");

const gameServerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hostUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  code: { type: String, required: true, unique: true },
  isPrivate: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("GameServer", gameServerSchema);
