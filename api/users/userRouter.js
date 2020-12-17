const express = require('express');
const authRequired = require('../middleware/authRequired');
const checkRole = require('./userMiddleware')
const Users = require('./userModel');
const router = express.Router();

router.get('/', authRequired,checkRole.grantAccess('readAny', 'profile'), function (req, res) {
  Users.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', authRequired,checkRole.grantAccess('readOwn', 'profile'), function (req, res) {
  const id = String(req.params.id);
  Users.findById(id)
    .then((users) => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ error: 'user Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', authRequired,checkRole.grantAccess('createAny', 'profile'), async (req, res) => {
  const users = req.body;
  if (users) {
    try {
      //users not found so lets insert it
      await Users.create(users).then((users) =>
        res.status(200).json({ message: 'users created', users: users[0] })
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'users missing' });
  }
});

router.put('/:id', authRequired,authRequired,checkRole.grantAccess('updateOwn', 'profile') (req, res) => {
  const id = req.params.id;
  const users = req.body;
  if (users) {
    // const id = users.id || 0;
    Users.findById(id)
      .then(
        Users.update(id, users)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'users created', users: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update users '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find users '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', authRequired, checkRole.grantAccess('deleteAny', 'profile'), async (req, res) => {
  const id = req.params.id;
  try {
    Users.remove(id).then(() => {
      res.status(200).json({ message: `users '${id}' was deleted.` });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete users with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
