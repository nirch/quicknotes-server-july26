const express = require("express");
const {
  getNotes,
  addNote,
  getNoteById,
  getNotesORM,
} = require("../controllers/notesController");
const { noteValidation } = require("../middlewares/noteValidation");
const { authenticate } = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, getNotes);
router.get("/orm", getNotesORM);
router.get("/:id", getNoteById);
router.post("/", noteValidation, addNote);

module.exports = router;
