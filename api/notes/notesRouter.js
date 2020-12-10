const express = require('express');

const Notes = require('./notesModel');
const router = express.Router();

router.get('/', function (req, res) {
  Notes.findAll()
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
