const express = require("express");
const router = express.Router();

// middlwares
const { validateSignup, validateSignin } = require("../middlewares/joi");

// route controllers
const { signUp, signIn } = require("../controllers/auth");

router.post("/signup", validateSignup, signUp);
router.post("/signin", validateSignin, signIn);

module.exports = router;
