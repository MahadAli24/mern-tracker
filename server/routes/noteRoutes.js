const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const auth = require("../middleware/auth");

// create
router.post("/", auth, async (req, res) => {
  try {
    req.body.user = req.userId;
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// read all
router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ user: req.userId });
  res.json(notes);
});

// read one
router.get("/:id", auth, async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ error: "not found" });
  res.json(note);
});

// update
router.put("/:id", auth, async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(note);
});

// delete
router.delete("/:id", auth, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
