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
 *    Users:
 *      type: object
 *      required:
 *        - id
 *        - email
 *        - first_name
 *        - last_name
 *        - role
 *      properties:
 *        id:
 *          type: string
 *          description: This is a foreign key (the okta user ID)
 *        email:
 *          type: string
 *        first_name:
 *          type: string
 *        last_name:
 *          type: string
 *        role:
 *          type: string
 *      example:
 *        - id: '00u2lgpiiPT4y3njs5d6'
 *          email: 'executivedirector@gmail.com'
 *          first_name: 'Freddie'
 *          last_name: 'Thorne'
 *          role: 'executive_director'
 * /users:
 *  get:
 *    description: Returns a list of Users
 *    summary: Get a list of all users
 *    security:
 *      - okta: []
 *    tags:
 *      - User
 *    responses:
 *      200:
 *        description: array of Users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Users'
 *              example:
 *                 - id: '00u2lgpiiPT4y3njs5d6'
 *                   email: 'executivedirector@gmail.com'
 *                   first_name: 'Freddie'
 *                   last_name: 'Thorne'
 *                   role: 'executive_director'
 *                 - id: '00u2lhigtb8N47Jii5d6'
 *                   email: 'supervisor@gmail.com'
 *                   first_name: 'Arthur'
 *                   last_name: 'Shelby'
 *                   role: 'supervisor'
 *                 - id: '00u2lgca4zIaSTPqE5d6'
 *                   email: 'casemanager@gmail.com'
 *                   first_name: 'Linda'
 *                   last_name: 'Shelby'
 *                   role: 'case_manager'
 *                 - id: '00u2lh0bsAliwLEe75d6'
 *                   email: 'guest@gmail.com'
 *                   first_name: 'Thomas'
 *                   last_name: 'Shelby'
 *                   role: 'guest'
 *                 - id: '00u2lhpc533MESNSA5d6'
 *                   email: 'pending@gmail.com'
 *                   first_name: 'Ruby'
 *                   last_name: 'Rose'
 *                   role: 'pending'
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
 *    userId:
 *      name: id
 *      in: path
 *      description: ID of the user to return
 *      required: true
 *      example: 00uhjfrwdWAQvD8JV4x6
 *      schema:
 *        type: string
 *
 * /users/{id}:
 *  get:
 *    description: Find Users by ID
 *    summary: Returns a single user
 *    security:
 *      - okta: []
 *    tags:
 *      - User
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    responses:
 *      200:
 *        description: A user object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'User not found'
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

/**
 * @swagger
 * components:
 *  parameters:
 *    userId:
 *      name: id
 *      in: path
 *      description: ID of the user to return
 *      required: true
 *      example: 00uhjfrwdWAQvD8JV4x6
 *      schema:
 *        type: string
 *
 * /users/{id}/family:
 *  get:
 *    description: Find families by ID of user
 *    summary: Returns a family object
 *    security:
 *      - okta: []
 *    tags:
 *      - User
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    responses:
 *      200:
 *        description: A family object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'User not found'
 */
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
 * /users:
 *  post:
 *    summary: Add a user
 *    security:
 *      - okta: []
 *    tags:
 *      - User
 *    requestBody:
 *      description: user object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'User not found'
 *      200:
 *        description: A user object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: profile created
 *                users:
 *                  $ref: '#/components/schemas/Users'
 */

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update a user
 *    security:
 *      - okta: []
 *    tags:
 *      - User
 *    requestBody:
 *      description: User object to  be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A user object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: user updated
 *                User:
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
 * /users/{id}:
 *  delete:
 *    summary: Remove a user
 *    security:
 *      - okta: []
 *    tags:
 *      - User
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A user object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: User '00uhjfrwdWAQvD8JV4x6' was deleted.
 *                User:
 *                  $ref: '#/components/schemas/Users'
 */
router.delete('/:id', restrictTo('executive_director'), (req, res) => {
  const id = req.params.id;
  try {
    Users.findById(id).then((profile) => {
      Users.remove(profile.id).then(() => {
        res
          .status(200)
          .json({ message: `User '${id}' was deleted.`, profile: profile });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete user with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
