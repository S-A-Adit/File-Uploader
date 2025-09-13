const bcrypt = require("bcrypt");
const prisma = require("../config/db");

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.getRegister = (req, res) => {
  res.render("register");
};

exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashed },
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.redirect("/register");
  }
};

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
};
