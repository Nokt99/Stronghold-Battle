const mongoose = require("mongoose");

const parentRequestSchema = new mongoose.Schema({
  childUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  parentEmail: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ParentRequest", parentRequestSchema);
