const express = require("express");
const {
  getNotes,
  addNote,
  getNoteById,
  getNotesORM,
} = require("../controllers/notesController");
const { noteValidation } = require("../middlewares/noteValidation");
const { authenticate } = require("../middlewares/authenticate");
const multer = require("multer");
const upload = multer({ dest: "public/" });

const router = express.Router();

router.get("/", authenticate, getNotes);
router.get("/orm", getNotesORM);
router.get("/:id", getNoteById);
router.post("/", authenticate, upload.single("image"), noteValidation, addNote);

module.exports = router;
