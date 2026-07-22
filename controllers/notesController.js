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

async function addNote(req, res) {
  const newNote = await notesModel.addNote(req.body);
  res.status(201).json(newNote);
}

module.exports = { getNotes, getNoteById, addNote };
