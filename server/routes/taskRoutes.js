const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// CREATE
router.post('/', auth, async (req, res) => {
  try {
    req.body.user = req.userId;
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.userId });
  res.json(tasks);
});

// READ one
router.get('/:id', auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  res.json(task);
});

// UPDATE
router.put('/:id', auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;