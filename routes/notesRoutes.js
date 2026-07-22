const express = require("express");
const {
  getNotes,
  addNote,
  getNoteById,
} = require("../controllers/notesController");

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", addNote);

module.exports = router;
