require("dotenv").config();
const express = require("express");
const { ensureAuth } = require("./src/middleware/auth");
const path = require("path");
const prisma = require("./src/config/db");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const session = require("express-session");

const initPassport = require("./src/config/passport");

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.static(path.join(__dirname, "src", "public")));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 1 week
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      sessionModelName: "Session",
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true, // This will use 'id' as session ID
    }),
  })
);

// Passport
initPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// 👇 Make `user` available in all EJS views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use("/", require("./src/routes/index"));
app.use("/", require("./src/routes/auth"));
app.use("/dashboard", require("./src/routes/dashboard"));
app.use("/", require("./src/routes/folders"));

// Start server
app.listen(PORT, () => {
  console.log(`MiniDrive server running: http://localhost:${PORT}`);
});
