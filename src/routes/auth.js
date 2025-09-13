const express = require("express");
const passport = require("passport");
const {
  getLogin,
  getRegister,
  postRegister,
  logout,
} = require("../controller/authController");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const router = express.Router();

router.get("/login", ensureGuest, getLogin);
router.post(
  "/login",
  ensureGuest,
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

router.get("/register", ensureGuest, getRegister);
router.post("/register", ensureGuest, postRegister);
router.get("/logout", logout);

module.exports = router;
