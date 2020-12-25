const express = require('express');
const Notes = require('./notesModel');
const authRequired = require('../middleware/authRequired');
const router = express.Router();
const Families = require('../families/familiesModel');

router.get('/', authRequired, async (req, res) => {
  try {
    const notes = await Notes.findAll();

    res.status(200).json({ notes });
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', authRequired, function (req, res) {
  const { id } = req.params;
  Notes.findById(id)
    .then((notes) => {
      if (notes) {
        res.status(200).json(notes);
      } else {
        res.status(404).json({ error: 'notes Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', authRequired, async (req, res) => {
  const newNote = req.body;

  const id = newNote['family_id'] || 0;

  try {
    // Verify if family exists

    const family = await Families.findById(id);

    if (!family) {
      return res
        .status(404)
        .json({ message: `Family with id of ${id} does not exist` });
    }

    // Create note

    let note = await Notes.create(newNote);

    note = note[0];

    res.status(201).json({ note });
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', authRequired, async (req, res) => {
  const updatedNote = req.body;
  const { id } = req.params;

  try {
    // Update note

    let note = await Notes.findByIdAndUpdate(id, updatedNote);

    note = note[0];

    // If nothing is returned, the note doesn't exist

    if (!note) {
      return res
        .status(404)
        .json({ message: `Note with id of ${id} does not exist` });
    }

    res.status(200).json({ note });
  } catch {
    res.status(500).json({
      message: `Could not update note with id of '${id}'`,
    });
  }
});

router.delete('/:id', authRequired, async (req, res) => {
  const { id } = req.params;
  try {
    let note = await Notes.findByIdAndRemove(id);

    note = note[0];

    if (!note) {
      return res
        .status(404)
        .json({ message: `Note with id of ${id} does not exist` });
    }

    res.status(204).json({ message: 'Deleted' });
  } catch {
    res.status(500).json({
      message: `Could not delete note with ID: ${id}`,
    });
  }
});

module.exports = router;
