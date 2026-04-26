const express = require("express");
const app = express();
require("dotenv").config();

const sequelize = require("./config/db");

// Models
const User = require("./models/User");
const Content = require("./models/Content");

// Routes
const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");

app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// ROUTES 
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.use("/auth", authRoutes);
app.use("/content", contentRoutes);

User.hasMany(Content, { foreignKey: "uploadedBy" });

Content.belongsTo(User, { foreignKey: "uploadedBy" });

const authMiddleware = require("./middlewares/authMiddleware");

app.get("/test", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user
  });
});

// DB CONNECTION 
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB Connected");

    await sequelize.sync({ alter: true });
    console.log("✅ Tables Synced");

    const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
    

  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
}

startServer();