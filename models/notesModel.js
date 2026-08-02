const { nanoid } = require("nanoid");
const { sequelize } = require("../db/models/index.js");
const cloudinary = require('cloudinary').v2;
const fs = require("fs");

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
  let cloudinaryURL = null;
  if (filePath) {
    // It is better to implement this in a retires mechanism
    try {
      const uploadResult = await cloudinary.uploader.upload(filePath);
      cloudinaryURL = uploadResult.url;
    } finally {
      fs.promises.unlink(filePath);
    }
  }

  const query = `
  INSERT INTO notes (title, text, user_id, image_url)
  VALUES (:title, :text, :userId, :cloudinaryURL)
  RETURNING *
  `;

  const [results, metadata] = await sequelize.query(query, {
    replacements: {
      title: newNote.title,
      text: newNote.text,
      userId,
      cloudinaryURL,
    },
  });

  return results[0];
}

module.exports = { getNotes, getNoteById, addNote };
