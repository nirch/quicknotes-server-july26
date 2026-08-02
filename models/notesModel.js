const { nanoid } = require("nanoid");
const { sequelize } = require("../db/models/index.js");

async function getNotes(userId) {
  const [results] = await sequelize.query(
    `
    SELECT *
    FROM notes
    WHERE user_id=:userId
    `,
    {
      replacements: {
        userId,
      },
    },
  );
  return results;
}

async function getNoteById(id) {
  const query = `
  SELECT *
  FROM notes
  WHERE id=:id
  `;

  const [results] = await sequelize.query(query, {
    replacements: {
      id,
    },
  });

  return results[0];
}

async function addNote(newNote, userId, filePath) {
  const query = `
  INSERT INTO notes (title, text, user_id, image_url)
  VALUES (:title, :text, :userId, :filePath)
  RETURNING *
  `;

  const [results, metadata] = await sequelize.query(query, {
    replacements: {
      title: newNote.title,
      text: newNote.text,
      userId,
      filePath,
    },
  });

  return results[0];
}

module.exports = { getNotes, getNoteById, addNote };
