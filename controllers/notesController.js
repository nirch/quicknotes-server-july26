const { sequelize } = require("../db/models/index.js");
const notesModel = require("../models/notesModel.js");
const { Note } = sequelize.models;

async function getNotes(req, res) {
  const notes = await notesModel.getNotes();
  res.status(200).json(notes);
}

async function getNotesORM(req, res) {
  const notes = await Note.findAll();
  res.status(200).json(notes);
}

async function getNoteById(req, res) {
  const note = await notesModel.getNoteById(req.params.id);

  if (!note) {
    throw { ...new Error(), message: "Unknown note id", status: 404 };
  }

  res.status(200).json(note);
}

async function addNote(req, res) {
  const newNote = await notesModel.addNote(req.body);
  res.status(201).json(newNote);
}

module.exports = { getNotes, getNoteById, addNote, getNotesORM };
