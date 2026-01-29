const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/state", authMiddleware, gameController.getGameState);
router.post("/matchmaking", authMiddleware, gameController.matchmaking);

module.exports = router;
