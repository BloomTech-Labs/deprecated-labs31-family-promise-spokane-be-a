const express = require('express');
const authRequired = require('../middleware/authRequired');
const Members = require('./membersModel');
const router = express.Router();

router.get('/', authRequired, function (req, res) {
  Members.findAll()
    .then((members) => {
      res.status(200).json(members);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', authRequired, function (req, res) {
  const family_id = String(req.params.id);
  Members.findById(family_id)
    .then((members) => {
      if (members) {
        res.status(200).json(members);
      } else {
        res.status(404).json({ error: 'members Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', authRequired, async (req, res) => {
  const members = req.body;
  if (members) {
    const id = members['family_id'] || 0;
    try {
      await Members.findMembersByFamilyId(id).then(async (pf) => {
        if (pf) {
          //members not found so lets insert it
          await Members.create(members).then((members) =>
            res
              .status(200)
              .json({ message: 'members created', members: members[0] })
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
    res.status(404).json({ message: 'members missing' });
  }
});

router.put('/:id', authRequired, (req, res) => {
  const members = req.body;
  const id = req.params.id;
  if (members) {
    Members.findById(id)
      .then(
        Members.update(id, members)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'members created', members: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update members '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find members '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', authRequired, (req, res) => {
  const id = req.params.id;
  try {
    Members.findById(id).then((members) => {
      Members.remove(members['family_id']).then(() => {
        res
          .status(200)
          .json({ message: `members '${id}' was deleted.`, members: members });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete members with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
