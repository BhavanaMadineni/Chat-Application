const express = require("express");
const {logout, login, signup} = require("../controllers/auth.controller")

const router = express.Router();

router.post("/logout",logout)

router.post("/login",login)

router.post("/signup",signup)

module.exports = router;