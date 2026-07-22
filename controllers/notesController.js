const notesModel = require("../models/notesModel.js");

async function getNotes(req, res) {
  const notes = await notesModel.getNotes();
  res.status(200).json(notes);
}

async function getNoteById(req, res) {
  const note = await notesModel.getNoteById(req.params.id);

  note
    ? res.status(200).json(note)
    : res.status(404).json({ error: "Unknown note id" });
}

function addNote(req, res) {
  res.status(201).json({ content: "Hello Create Note!" });
}

module.exports = { getNotes, getNoteById, addNote };
