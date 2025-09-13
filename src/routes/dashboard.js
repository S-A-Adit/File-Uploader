const express = require("express");
const { ensureAuth } = require("../middleware/auth");
const prisma = require("../config/db");

const router = express.Router();

router.get("/upload", async (req, res) => {
  try {
    const folders = await prisma.folder.findMany({
      where: { userId: req.user.id }, // only this user's folders
      orderBy: { createdAt: "asc" }, // optional: oldest → newest
    });

    res.render("upload", { user: req.user, folders });
  } catch (err) {
    console.error(err);
    res.redirect("/dashboard");
  }
});
router.post("/upload", async (req, res) => {
  try {
    console.log("Upload request received:", req.body);
    // TODO: handle file saving or DB entry here
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.redirect("/dashboard");
  }
});

router.get("/", ensureAuth, async (req, res) => {
  try {
    const folders = await prisma.folder.findMany({
      where: { userId: req.user.id },
    });

    const files = await prisma.file.findMany({
      where: { userId: req.user.id },
      include: { folder: true },
    });

    res.render("dashboard", { user: req.user, folders, files });
  } catch (err) {
    console.error(err);
    res.render("dashboard", { user: req.user, folders: [], files: [] });
  }
});

module.exports = router;
