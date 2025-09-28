# Mini-Drive

_A lightweight cloud storage app built with Node.js, Express, and Prisma_

---

## 📖 Overview

Mini-Drive is a simple yet powerful cloud storage solution that allows users to:

- Store files securely
- Organize files into folders
- Generate sharable links for collaboration

---

## 🚀 Live Demo

[Try it here](https://club-house-qkcw.onrender.com/)

## ✨ Features

- ✅ Signup & Login Authentication (with Passport.js)
- ✅ Upload Files
- ✅ Store Files in Database with Prisma
- ✅ Create Folders
- ✅ Organize Files into Folders

---

## 🛠 Tech Stack

- **Frontend**: HTML, Tailwind CSS, EJS
- **Backend**: Node.js, Express
- **Database ORM**: Prisma
- **Authentication**: Passport.js
- **Database**: PostgreSQL
- **Session Store**: Prisma Session Store

---

## 📂 Project Structure

```text
FILE-UPLOADER/
│── prisma/
│   ├── migrations/
│   ├── dev.db
│   └── schema.prisma
│
│── src/
│   ├── config/
│   │   ├── db.js
│   │   └── passport.js
│   ├── controller/
│   │   ├── authController.js
│   │   └── indexController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── public/
│   │   └── helper/share.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── folders.js
│   │   └── index.js
│   └── views/
│       ├── dashboard.ejs
│       ├── file-details.ejs
│       ├── files.ejs
│       ├── folder.ejs
│       ├── index.ejs
│       ├── login.ejs
│       ├── register.ejs
│       ├── share.ejs
│       └── upload.ejs
│
│── .env
│── .gitignore
│── package.json
│── server.js
│── README.md
```

## ⚙️ Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/minidrive.git
cd minidrive
```

## 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/minidrive"
SESSION_SECRET="your-secret-key"
PORT=3000
```

## 4. Database Setup

Run Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev

```

### 5. Start the Server

```bash
npm run dev
## 🚀 Usage
```

- **Signup:** Requires Name, Email, and Password.
- **Login:** Requires Email and Password.
- **Upload:**
  1. Click the upload button.
  2. Choose a file.
  3. Select a folder (or root).
  4. Press upload.
- **View Files:** Go to `/files`.
- **Organize:** Move files into folders.

## 📌 Routes

```javascript
app.use("/", require("./src/routes/index"));
app.use("/", require("./src/routes/auth"));
app.use("/dashboard", ensureAuth, require("./src/routes/dashboard"));
app.use("/", require("./src/routes/folders"));

router.get("/login", ensureGuest, getLogin);
router.post(
  "/login",
  ensureAuth,
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);
router.get("/register", getRegister);
router.post("/register", postRegister);
router.get("/logout", logout);

router.get("/upload", async(req, res));
router.post("/upload", async(req, res));
router.get("/", ensureAuth, async(req, res));

router.post("/folders/create", indexController.createFolder);
router.get("/upload", (req, res));
router.get("/folders", indexController.getFolders);

router.get("/", getIndex);
router.get("/upload", getUploadPage);
router.post("/upload", uploadMiddleware, uploadFile);
router.get("/files", getFiles);
router.get("/file/:id", ensureAuth, getFileDetails);
```

## 🔮 Future Improvements

**📂 Increase file size limits**
**🗑️ Delete files**
**🗑️ Preview for files when file detail is checked**
**🔗 The share link does not get the fiel at the moment**
**🔗 Share files & collaborate**
**📝 Allow editing, commenting, and activity tracking**
**📝 Provide a Tree Structure so that folders can be created within folders**

## License

MIT © 2025 Adit Syed Afnan

```

```
