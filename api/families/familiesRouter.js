const express = require('express');
const authRequired = require('../middleware/authRequired');
// const checkRole = require('./familiesMiddleware');
const Families = require('./familiesModel');
const Logs = require('../guestLogs/logsModel');
const { verifyUserId } = require('./familiesMiddleware');
const router = express.Router();

//  checkRole.grantAccess('readAny', 'families'),
router.get('/', authRequired, function (req, res) {
  Families.findAll()
    .then((families) => {
      res.status(200).json(families);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

// checkRole.grantAccess('readOwn', 'families'),
router.get('/:id', authRequired, function (req, res) {
  const id = String(req.params.id);
  Families.findById(id)
    .then((families) => {
      if (families) {
        res.status(200).json(families);
      } else {
        res.status(404).json({ error: 'Families Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id/members', authRequired, function (req, res) {
  Families.findAllFamilyMembersById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id/notes', authRequired, function (req, res) {
  const { role } = req.user;
  const { id } = req.params;

  Families.findAllNotesByFamilyId(id, role)
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//get all logs by family id
router.get('/:id/logs', authRequired, function (req, res) {
  const family_id = String(req.params.id);

  Logs.findByFamilyId(family_id)
    .then((logs) => {
      if (logs) {
        res.status(200).json(logs);
      } else {
        res.status(404).json({ error: 'logs Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// checkRole.grantAccess('createOwn', 'families'),

router.post('/', authRequired, verifyUserId, async (req, res) => {
  const newFamily = req.body;

  try {
    const family = await Families.create(newFamily);

    res.status(201).json({ families: family[0] });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// not found
// checkRole.grantAccess('updateOwn', 'families'),
router.put('/', (req, res) => {
  const families = req.body;
  const id = req.params.id;
  if (families) {
    Families.findById(id)
      .then(
        Families.update(id, families)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'families created', families: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update families '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find families '${id}'`,
          error: err.message,
        });
      });
  }
});

// checkRole.grantAccess('deleteAny', 'families'),
router.delete('/:id', authRequired, (req, res) => {
  const id = req.params.id;
  try {
    Families.findById(id).then((families) => {
      Families.remove(families.id).then(() => {
        res.status(200).json({
          message: `families '${id}' was deleted!`,
          families: families,
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete families with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
