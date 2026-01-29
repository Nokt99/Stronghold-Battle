const crypto = require("crypto");
const ParentApproval = require("../models/ParentApproval");
const emailService = require("../services/emailService");

module.exports = {
    // Child (logged-in user) requests parent approval
    async requestApproval(req, res, next) {
        try {
            const { parentEmail } = req.body;

            if (!parentEmail) {
                return res.status(400).json({ error: "Parent email is required" });
            }

            const token = crypto.randomBytes(24).toString("hex");

            const approval = await ParentApproval.create({
                child: req.user._id,
                parentEmail,
                token
            });

            const link = `${process.env.FRONTEND_URL || "http://localhost:5173"}/parent-approve?token=${token}`;

            await emailService.send(
                parentEmail,
                "Stronghold Battle – Parent Approval",
                `Your child requested access to Stronghold Battle.\n\nApprove or reject here:\n${link}`
            );

            res.json({ status: "pending", approvalId: approval._id });
        } catch (err) {
            next(err);
        }
    },

    // Parent responds (approve / reject)
    async respond(req, res, next) {
        try {
            const { token, decision } = req.body;

            if (!token || !["approved", "rejected"].includes(decision)) {
                return res.status(400).json({ error: "Invalid request" });
            }

            const approval = await ParentApproval.findOne({ token });
            if (!approval) return res.status(404).json({ error: "Request not found" });

            approval.status = decision;
            await approval.save();

            res.json({ status: approval.status });
        } catch (err) {
            next(err);
        }
    },

    // Child polls to see if parent has approved
    async checkStatus(req, res, next) {
        try {
            const { approvalId } = req.query;

            const approval = await ParentApproval.findOne({
                _id: approvalId,
                child: req.user._id
            });

            if (!approval) return res.status(404).json({ error: "Request not found" });

            res.json({ status: approval.status });
        } catch (err) {
            next(err);
        }
    }
};
