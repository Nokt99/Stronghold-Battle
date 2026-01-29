const express = require("express");
const router = express.Router();
const serverController = require("../controllers/serverController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, serverController.createServer);
router.post("/join", authMiddleware, serverController.joinServer);
router.get("/list", authMiddleware, serverController.listServers);
router.get("/owned", authMiddleware, serverController.listOwnedServers);
router.post("/toggle", authMiddleware, serverController.toggleServerStatus);

module.exports = router;
