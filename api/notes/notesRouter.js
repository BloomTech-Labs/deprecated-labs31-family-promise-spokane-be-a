const express = require('express');
const Notes = require('./notesModel');
const authRequired = require('../middleware/authRequired');
const router = express.Router();
const Families = require('../families/familiesModel');

router.get('/', authRequired, function (req, res) {
  const queries = { ...req.query };

  Notes.findAll(queries)
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
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
  const note = req.body;

  const id = note['family_id'] || 0;

  try {
    // Verify if family exists

    const family = await Families.findById(id);

    if (!family) {
      return res
        .status(404)
        .json({ message: `Family with id of ${id} does not exist` });
    }

    // Create note

    const newNote = await Notes.create(note);

    res.status(201).json({
      note: newNote[0],
    });
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', authRequired, (req, res) => {
  const newNote = req.body;
  const id = req.params.id;
  if (newNote) {
    Notes.findById(id)
      .then(
        Notes.update(id, newNote)
          .then((updated) => {
            res
              .status(200)
              .json({ message: `note ${id} updated`, notes: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update notes '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find notes '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', authRequired, (req, res) => {
  const id = req.params.id;
  try {
    Notes.findByIdAndRemove(id).then(() => {
      res.status(204).json({ message: 'deleted' });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete notes with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
