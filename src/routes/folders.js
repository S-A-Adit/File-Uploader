const express = require("express");
const router = express.Router();
const indexController = require("../controller/indexController");
const { folders } = require("../config/db");
const prisma = require("../config/db");
const { ensureAuth } = require("../middleware/auth");
//const { getUploadPage } = require("../controller/indexController");

// Create folder
router.post("/folders/create", indexController.createFolder);

// Show upload page
router.get("/upload", (req, res) => {
  res.render("upload", { user: req.user, folders });
});
router.get("/folders", indexController.getFolders);
router.get("/folders/:id/share", ensureAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // default 1 day

    const shareLink = await prisma.shareLink.create({
      data: {
        folderId: parseInt(id),
        expiresAt,
      },
    });

    const shareUrl = `${req.protocol}://${req.get("host")}/share/${
      shareLink.id
    }`;

    // Generate avatar URL
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      req.user?.name || "U"
    )}`;

    // Pass both shareUrl and avatarUrl to the template
    res.render("share", { shareUrl, avatarUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating share link");
  }
});

module.exports = router;
