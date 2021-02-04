// Endpoint for total number of beds at the shelter
const express = require('express');
const authRequired = require('../middleware/authRequired');

const Beds = require('./bedsModel');
const router = express.Router();

router.get('/', authRequired, function (req, res) {
  Beds.findAll()
    .then((beds) => {
      res.status(200).json(beds);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.put('/', authRequired, (req, res) => {
  const bed = req.body;
  if (bed) {
    Beds.findAll()
      .then(
        Beds.update(bed)
          .then((updated) => {
            res
              .status(200)
              .json({ message: `note beds updated`, beds: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update beds`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find beds`,
          error: err.message,
        });
      });
  }
});

module.exports = router;
