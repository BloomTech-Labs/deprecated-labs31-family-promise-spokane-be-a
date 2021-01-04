const express = require('express');
const authRequired = require('../middleware/authRequired');
// const checkRole = require('./familiesMiddleware');
const Families = require('./familiesModel');

const Logs = require('../guestLogs/logsModel');

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

// this returns all members by family id
router.get('/:id/members', authRequired, function (req, res) {
  Families.findAllFamilyMembersById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// this return a family object based on user Id
router.get('/user/:id', function (req, res) {
  const { id } = req.params;

  Families.findFamilyByUserId(id)
    .then((family) => {
      res.status(200).json(family);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// returns alll family info like vehicles as well as all guest info
router.get('/:id/household', function (req, res) {
  const family_id = req.params;

  Families.findAllHouseholdInfo(family_id)
    .then((household) => {
      res.status(200).json(household);
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
  console.log(family_id);
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
router.post('/', authRequired, async (req, res) => {
  const families = req.body;
  if (families) {
    const user_id = families.id || 0;
    try {
      await Families.findById(user_id).then(async (pf) => {
        if (pf == undefined) {
          //families not found so lets insert it
          await Families.create(families).then((families) =>
            res
              .status(200)
              .json({ message: 'families created', families: families[0] })
          );
        } else {
          res.status(400).json({ message: 'families already exists!' });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'families missing' });
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
