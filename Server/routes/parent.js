const express = require("express");
const router = express.Router();
const parentController = require("../controllers/parentController");
const authMiddleware = require("../middleware/authMiddleware");

// Child triggers this to send email to parent
router.post("/request", authMiddleware, parentController.requestApproval);

// Parent responds (this can be called from a simple parent UI)
router.post("/respond", parentController.respond);

// Child checks status of their approval request
router.get("/status", authMiddleware, parentController.checkStatus);

module.exports = router;
