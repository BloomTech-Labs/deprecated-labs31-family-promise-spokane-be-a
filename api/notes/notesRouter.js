const express = require('express');
const Notes = require('./notesModel');
const authRequired = require('../middleware/authRequired');
const router = express.Router();
const { verifyNoteExists, verifyFamilyExists } = require('./notesMiddleware');

router.get('/', authRequired, async (req, res) => {
  try {
    const notes = await Notes.findAll();

    res.status(200).json({ notes });
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', authRequired, verifyNoteExists, async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Notes.findById(id);

    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', authRequired, verifyFamilyExists, async (req, res) => {
  const newNote = req.body;

  try {
    const note = await Notes.create(newNote);

    res.status(201).json({ note: note[0] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', authRequired, verifyNoteExists, async (req, res) => {
  const updatedNote = req.body;
  const { id } = req.params;

  try {
    let note = await Notes.findByIdAndUpdate(id, updatedNote);

    res.status(200).json({ note: note[0] });
  } catch {
    res.status(500).json({
      message: `Could not update note with id of '${id}'`,
    });
  }
});

router.delete('/:id', authRequired, verifyNoteExists, async (req, res) => {
  const { id } = req.params;
  try {
    await Notes.findByIdAndRemove(id);

    res.status(204).json({ message: 'Deleted' });
  } catch {
    res.status(500).json({
      message: `Could not delete note with ID: ${id}`,
    });
  }
});

module.exports = router;
