const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get notes");
});
router.get("/:id", (req, res) => {
  res.send("Get note by ID " + req.params.id);
});
router.post("/", (req, res) => {
  res.send("create note");
});

module.exports = router;
