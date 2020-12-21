const express = require('express');
// const checkRole = require('./notesMiddleware')
const Notes = require('./notesModel');
const authRequired = require('../middleware/authRequired');
const router = express.Router();

// checkRole.grantAccess('readAny', 'notes'),
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

// checkRole.grantAccess('readOwn', 'notes'),
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

// checkRole.grantAccess('updateAny', 'notes'),
router.post('/', authRequired, async (req, res) => {
  const notes = req.body;
  if (notes) {
    const id = notes['family_id'] || 0;
    try {
      await Notes.findByFamilyId(id).then(async (pf) => {
        if (pf) {
          console.log(pf);
          //notes not found so lets insert it
          await Notes.create(notes).then((notes) =>
            res.status(200).json({ message: 'notes created', notes: notes[0] })
          );
        } else {
          res.status(400).json({ message: 'family id doesnt exist!' });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'notes missing' });
  }
});

// checkRole.grantAccess('updateAny', 'notes'),
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

//checkRole.grantAccess('deleteAny', 'notes'),
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
