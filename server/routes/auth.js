const express = require("express")
const {handle_verify} = require('../middleware/Aut_middleware')

const { login, register } = require("../controller/user_Controller")

const router = express.Router()
router.post("/verify", handle_verify);
router.post("/login", login)
router.post("/register", register)

module.exports = router;