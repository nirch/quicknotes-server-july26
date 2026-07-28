const fs = require("fs");
const {nanoid} = require("nanoid");
const { sequelize } = require("../db/models/index.js");


async function getNotes() {
  const [results] = await sequelize.query(`
    SELECT *
    FROM notes
    `);
  return results;
}

async function getNoteById(id) {
  const notes = await getNotes();
  const note = notes.find((note) => note.id === id);
  return note;
}

async function addNote(newNote) {
  const notes = await getNotes();
  newNote.id = nanoid(7);
  newNote.date = new Date();
  notes.push(newNote);
  await fs.promises.writeFile("./data/notes.json", JSON.stringify(notes));
  return newNote;
}

module.exports = { getNotes, getNoteById, addNote };
