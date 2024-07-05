const express = require("express");
const {sendMessage} = require("../controllers/message.controller");
const {getMessage} = require("../controllers/message.controller");
const {protectRoute} = require("../middlewares/protectRoute");

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessage);

module.exports = router;