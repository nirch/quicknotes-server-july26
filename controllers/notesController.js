function getNotes(req, res) {
  res.status(200).send("Hello Notes!");
}

function getNoteById(req, res) {
  res
    .status(200)
    .json({ id: req.params.id, content: "Hello get specific note" });
}

function addNote(req, res) {
  res.status(201).json({ content: "Hello Create Note!" });
}

module.exports = { getNotes, getNoteById, addNote };
