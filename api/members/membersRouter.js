const express = require('express');
// const checkRole = require('./membersMiddleware')
const axios = require('axios');
const authRequired = require('../middleware/authRequired');
const Members = require('./membersModel');
const router = express.Router();
const Families = require('../families/familiesModel');

// checkRole.grantAccess('readAny', 'members'),
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

// checkRole.grantAccess('readOwn', 'members'),
router.get('/:id', authRequired, function (req, res) {
  let getData = async (id) => {
    const test = await axios.post(
      'http://a-labs29-family-promise.eba-syir5yx3.us-east-1.elasticbeanstalk.com/predict',
      { member_id: id }
    );
    return test;
  };
  const family_id = String(req.params.id);
  Members.findById(family_id)
    .then(async (members) => {
      try {
        const data = await getData(members.id);
        const final = {
          ...members,
          predicted_exit_destination: data.data.exit_strategy,
        };
        res.status(200).json(final);
      } catch (err) {
        res.status(404).json({ error: err });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// checkRole.grantAccess('createOwn', 'members'),
router.post('/', authRequired, async (req, res) => {
  const memberData = req.body;

  const familyId = memberData['family_id'] || 0;

  try {
    const family = await Families.findById(familyId);

    if (!family) {
      return res.status(404).json({ message: "Family doesn't exist" });
    }

    const member = await Members.create(memberData);

    res.status(201).json({ message: 'member created', member: member[0] });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// heckRole.grantAccess('updateOwn', 'members'),
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

// checkRole.grantAccess('deleteAny', 'members')
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
