// The get all logs by family id is located in family router
const express = require('express');

const Logs = require('./logsModel');
const router = express.Router();

router.get('/', function (req, res) {
  Logs.findAll()
    .then((logs) => {
      res.status(200).json(logs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

//get a log by log id
router.get('/:id', function (req, res) {
  const log_id = String(req.params.id);
  Logs.findById(log_id)
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
  const logs = req.body;
  if (logs) {
    const id = logs['family_id'] || 0;
    try {
      await Logs.findByFamilyId(id).then(async (pf) => {
        if (pf) {
          console.log(pf);
          //logs not found so lets insert it
          await Logs.create(logs).then((logs) =>
            res.status(200).json({ message: 'logs created', logs: logs[0] })
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
    res.status(404).json({ message: 'logs missing' });
  }
});

router.put('/:id', (req, res) => {
  const newLog = req.body;
  const id = req.params.id;
  if (newLog) {
    Logs.findById(id)
      .then(
        Logs.update(id, newLog)
          .then((updated) => {
            res
              .status(200)
              .json({ message: `note ${id} updated`, logs: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update logs '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find logs '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  try {
    Logs.findById(id).then((logs) => {
      Logs.remove(logs['reservation_id']).then(() => {
        res
          .status(200)
          .json({ message: `logs '${id}' was deleted.`, logs: logs });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete logs with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
