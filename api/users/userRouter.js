const express = require('express');
const authRequired = require('../middleware/authRequired');
// const checkRole = require('./userMiddleware')
const Users = require('./userModel');
const router = express.Router();
const restrictTo = require('../middleware/restrictTo');

router.get('/me', authRequired, function (req, res) {
  const { user } = req;
  res.status(200).json({
    user,
  });
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Profile:
 *      type: object
 *      required:
 *        - id
 *        - email
 *        - name
 *        - avatarUrl
 *      properties:
 *        id:
 *          type: string
 *          description: This is a foreign key (the okta user ID)
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        avatarUrl:
 *          type: string
 *          description: public url of profile avatar
 *      example:
 *        id: '00uhjfrwdWAQvD8JV4x6'
 *        email: 'frank@example.com'
 *        name: 'Frank Martinez'
 *        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *
 * /Users:
 *  get:
 *    description: Returns a list of Users
 *    summary: Get a list of all Users
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    responses:
 *      200:
 *        description: array of Users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Profile'
 *              example:
 *                - id: '00uhjfrwdWAQvD8JV4x6'
 *                  email: 'frank@example.com'
 *                  name: 'Frank Martinez'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *                - id: '013e4ab94d96542e791f'
 *                  email: 'cathy@example.com'
 *                  name: 'Cathy Warmund'
 *                  avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/geneseleznev/128.jpg'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get(
  '/',
  authRequired,
  restrictTo('executive_director', 'case_manager', 'supervisor'),
  function (req, res) {
    Users.findAll()
      .then((profiles) => {
        res.status(200).json(profiles);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  }
);

router.post('/', authRequired, function (req, res) {
  Users.findOrCreateProfile(req.body)
    .then(() => {
      res.status(201).json({ message: 'Profile created' });
    })
    .catch(() => {
      res.status(500).json({ message: 'Unable to create profile' });
    });
});

/**
 * @swagger
 * components:
 *  parameters:
 *    profileId:
 *      name: id
 *      in: path
 *      description: ID of the profile to return
 *      required: true
 *      example: 00uhjfrwdWAQvD8JV4x6
 *      schema:
 *        type: string
 *
 * /profile/{id}:
 *  get:
 *    description: Find Users by ID
 *    summary: Returns a single profile
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    parameters:
 *      - $ref: '#/components/parameters/profileId'
 *    responses:
 *      200:
 *        description: A profile object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profile'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Profile not found'
 */
router.get(
  '/:id',
  authRequired,
  restrictTo('executive_director', 'case_manager', 'supervisor'),
  function (req, res) {
    const id = String(req.params.id);
    Users.findById(id)
      .then((profile) => {
        if (profile) {
          res.status(200).json(profile);
        } else {
          res.status(404).json({ error: 'ProfileNotFound' });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
);

router.get('/:id/family', authRequired, async (req, res) => {
  console.log('hit');
  try {
    const family = await Users.findFamilyByUserId(req.params.id);

    console.log(family);

    if (!family) {
      res.status(404).json({ message: 'Unable to find family for that user' });
    }

    res.status(200).json({
      family: family[0],
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /profile:
 *  post:
 *    summary: Add a profile
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    requestBody:
 *      description: Profile object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profile'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Profile not found'
 *      200:
 *        description: A profile object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: profile created
 *                profile:
 *                  $ref: '#/components/schemas/Profile'
 */

/**
 * @swagger
 * /profile:
 *  put:
 *    summary: Update a profile
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    requestBody:
 *      description: Profile object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Profile'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A profile object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: profile created
 *                profile:
 *                  $ref: '#/components/schemas/Profile'
 */
router.put(
  '/:id',
  authRequired,
  restrictTo('executive_director', 'case_manager', 'supervisor'),
  (req, res) => {
    const profile = req.body;
    const { id } = req.params;
    Users.findById(id)
      .then(
        Users.update(id, profile)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'profile updated', profile: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update profile '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find profile '${id}'`,
          error: err.message,
        });
      });
  }
);
/**
 * @swagger
 * /profile/{id}:
 *  delete:
 *    summary: Remove a profile
 *    security:
 *      - okta: []
 *    tags:
 *      - profile
 *    parameters:
 *      - $ref: '#/components/parameters/profileId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A profil object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Profile '00uhjfrwdWAQvD8JV4x6' was deleted.
 *                profile:
 *                  $ref: '#/components/schemas/Profile'
 */
router.delete('/:id', restrictTo('executive_director'), (req, res) => {
  const id = req.params.id;
  try {
    Users.findById(id).then((profile) => {
      Users.remove(profile.id).then(() => {
        res
          .status(200)
          .json({ message: `Profile '${id}' was deleted.`, profile: profile });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete profile with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
