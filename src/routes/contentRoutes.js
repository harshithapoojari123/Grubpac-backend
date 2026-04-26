const express = require("express");
const router = express.Router();

const {
  uploadContent,
  getAllContent,
  getPendingContent,
  approveContent,
  rejectContent,
  getTeacherContent,
  getLiveContent
} = require("../controllers/contentController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// =========================
// 📌 TEACHER ROUTES
// =========================

// Upload content
router.post(
  "/upload",
  authMiddleware,
  roleMiddleware("TEACHER"),
  upload.single("file"),
  uploadContent
);

// View own uploaded content
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("TEACHER"),
  getTeacherContent
);

// =========================
// 📌 PRINCIPAL ROUTES
// =========================

// View all content
router.get(
  "/all",
  authMiddleware,
  roleMiddleware("PRINCIPAL"),
  getAllContent
);

// View pending content
router.get(
  "/pending",
  authMiddleware,
  roleMiddleware("PRINCIPAL"),
  getPendingContent
);

// Approve content
router.put(
  "/approve/:id",
  authMiddleware,
  roleMiddleware("PRINCIPAL"),
  approveContent
);

// Reject content
router.put(
  "/reject/:id",
  authMiddleware,
  roleMiddleware("PRINCIPAL"),
  rejectContent
);

// Get live content (student access)
router.get("/live/:teacherId", getLiveContent);

module.exports = router;