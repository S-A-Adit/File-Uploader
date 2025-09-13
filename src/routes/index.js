const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { ensureAuth } = require("../middleware/auth");

const {
  getFiles,
  getFileDetails,
  getIndex,
  uploadFile,
  uploadMiddleware,
  getUploadPage,
} = require("../controller/indexController");

// Multer setup (local storage)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // ensure the folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Homepage
router.get("/", getIndex);

// Upload page
router.get("/upload", getUploadPage);

// Handle file upload (attach multer middleware directly here)
router.post("/upload", uploadMiddleware, uploadFile);
router.get("/files", getFiles);
router.get("/files/:id", ensureAuth, getFileDetails);
module.exports = router;
