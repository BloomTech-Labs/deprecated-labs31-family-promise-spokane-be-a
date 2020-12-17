const express = require('express');

const Families = require('./familiesModel');
const Logs = require('../guestLogs/logsModel');

const router = express.Router();

router.get('/', function (req, res) {
  Families.findAll()
    .then((families) => {
      res.status(200).json(families);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', function (req, res) {
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

router.get('/:id/members', function (req, res) {
  Families.findAllFamilyMembersById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//get all logs by family id
router.get('/:id/logs', function (req, res) {
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

router.post('/', async (req, res) => {
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

router.delete('/:id', (req, res) => {
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
