const prisma = require("../config/db"); // assuming src/db.js exports new PrismaClient()
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join("/tmp", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.getIndex = (req, res) => {
  if (req.isAuthenticated()) {
    // user is logged in → redirect to dashboard
    return res.redirect("/dashboard");
  }
  // not logged in → show login page
  res.render("login", { user: req.user });
};

// Create a new folder
exports.createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    console.log("createFolder → req.user:", req.user); // 👈 debug
    console.log("createFolder → req.body:", req.body);

    if (!name) {
      return res.redirect("/dashboard"); // or handle error
    }

    await prisma.folder.create({
      data: {
        name,
        userId: req.user.id, // ensure user is logged in
      },
    });

    res.redirect("/dashboard"); // stay on same route
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating folder");
  }
};

exports.uploadMiddleware = upload.single("file");

// Render upload page
exports.getUploadPage = async (req, res) => {
  const folders = await prisma.folder.findMany({
    where: { userId: req.user.id },
  });

  res.render("upload", { user: req.user, folders });
};

// Handle actual file upload
exports.uploadFile = async (req, res) => {
  try {
    console.log("File received:", req.file);
    console.log("Body received:", req.body);
    console.log("User received:", req.user);

    const { folderId } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;
    await prisma.file.create({
      data: {
        name: req.file.originalname,
        size: req.file.size,
        folderId: folderId ? parseInt(folderId) : null,
        userId: req.user?.id || 1, // TEMP: replace 1 with a test user if needed
        url: fileUrl,
      },
    });

    res.redirect("/dashboard");
  } catch (err) {
    console.error("Upload failed because:", err);
    res.status(500).send("Upload failed");
  }
};

//Get Folder View
exports.getFolders = async (req, res) => {
  try {
    const folders = await prisma.folder.findMany({
      where: { userId: req.user.id },
      include: {
        _count: { select: { files: true } }, // count files in each folder
      },
      orderBy: { createdAt: "desc" },
    });

    res.render("folder", {
      user: req.user,
      folders,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        req.user?.name || "U"
      )}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching folders");
  }
};

//Get Files View
exports.getFiles = async (req, res) => {
  try {
    const files = await prisma.file.findMany({
      where: { userId: req.user.id },
      include: { folder: true },
      orderBy: { uploadedAt: "desc" },
    });

    res.render("files", { files, user: req.user });
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).send("Error fetching files");
  }
};
exports.getFileDetails = async (req, res) => {
  try {
    const file = await prisma.file.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { folder: true },
    });

    if (!file) return res.status(404).send("File not found");

    res.render("file-details", { file, user: req.user });
  } catch (err) {
    console.error("Error fetching file details:", err);
    res.status(500).send("Error fetching file details");
  }
};
