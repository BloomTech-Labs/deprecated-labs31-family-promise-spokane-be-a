const express = require('express');
const authRequired = require('../middleware/authRequired');
const restrictTo = require('../middleware/restrictTo');
// const checkRole = require('./familiesMiddleware');
const Families = require('./familiesModel');

const Logs = require('../guestLogs/logsModel');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Familes:
 *      type: array
 *      required:
 *        - user_id
 *        - case_number
 *        - phone_one
 *        - phone_two
 *        - safe_alternate
 *        - emergencyContact
 *        - vehicle
 *        - last_permanent_address
 *        - gov_benefit
 *        - insurance
 *        - domestic_violenece_info
 *        - pets
 *        - avatar_url
 *        - percent_complete
 *      properties:
 *        user_id:
 *          type: string
 *          description: This is a foreign key (the okta user ID)
 *        case_number:
 *          type: integer
 *        phone_one:
 *          type: object
 *        phone_two:
 *          type: object
 *        safe_alternate:
 *          type: object
 *        emergencyContact:
 *          type: object
 *        vehicle:
 *          type: object
 *        last_permanent_address:
 *          type: object
 *        homeless_info:
 *          type: object
 *        gov_benefits:
 *          type: object
 *        insurance:
 *          type: object
 *        domestic_violence_info:
 *          type: object
 *        pets:
 *          type: string
 *        avatar_url:
 *          type: string
 *        percent_complete:
 *          type: string
 * /families:
 *  get:
 *    description: Returns a list of families
 *    summary: Get a list of all families
 *    security:
 *      - okta: []
 *    tags:
 *      - Families
 *    responses:
 *      200:
 *        description: array of families
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Families'
 *              example:
 *                - user_id: 00u2lh0bsAliwLEe75d6
 *                  case_number: 22
 *                  phone_one: '{"name":"Thomas Shelby", "number":"202-555-0177", "safeToLeaveMssg":true}'
 *                  phone_two: '{"name": "Maria Shelby", "number":"770-555-0114", "safeToLeaveMssg":false}'
 *                  safe_alternate: '{"name":"Mark Shelby","number":"809-323-5959"}'
 *                  emergencyContact: '{ "name": "Steve Martin", "number":"410-555-0173"}'
 *                  vehicle: '{"make": "BMW", "model": "K1200LT", "year": 2007, "color": "red", "license_plate":"699-VHT"}'
 *                  last_permanent_address: '7271 Hickory Rd Sterling VA 20164 '
 *                  homeless_info: '{ "current_location": "car", "length_at_current_location": "3 days",
 *                    "prior_location": "relatives", "length_at_prior_location": "2 weeks", "homeless_start_date":
 *                    "26-AUG-2019", "num_times_homeless": 2, "total_len_homeless": 1 }'
 *                  gov_benefits: '{ "foodstamps": true, "cps_fps": false, "RRH": false, "housing_voucher":
 *                    false, "veteran_services": true, "snap": true }'
 *                  insurance: '{"has_insurance": true, "members_covered": 2, "health_insurance_type":
 *                    "Medicare", "pregnancies": false}'
 *                  domestic_violence_info: '{ "fleeing_dv": false, "anonymity_preferred": true, "date_last_incident":
 *                    false, "has_court_order": false, "YWCA_contacted": false }'
 *                  pets: 0
 *                  avatar_url: https://microlancer.lancerassets.com/v2/services/91/166a65bdfc45e5ade4cee71859b871/large_avatar.jpg
 *                  percent_complete: 0
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

//  checkRole.grantAccess('readAny', 'families'),
router.get('/', authRequired, restrictTo, function (req, res) {
  Families.findAll()
    .then((families) => {
      res.status(200).json(families);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * components:
 *  parameters:
 *    familyId:
 *      name: id
 *      in: path
 *      description: ID of the family to return
 *      required: true
 *      example: 00uhjfrwdWAQvD8JV4x6
 *      schema:
 *        type: string
 *
 * /families/{id}:
 *  get:
 *    description: Find Family by ID
 *    summary: Returns a single family
 *    security:
 *      - okta: []
 *    tags:
 *      - Families
 *    parameters:
 *      - $ref: '#/components/parameters/familyId'
 *    responses:
 *      200:
 *        description: A family object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Families'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Family not found'
 */

// checkRole.grantAccess('readOwn', 'families'),
router.get('/:id', authRequired, function (req, res) {
  const id = String(req.params.id);
  Families.findById(id)
    .then((families) => {
      if (families) {
        res.status(200).json(families);
      } else {
        res.status(404).json({ error: 'Family Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/**
 * @swagger
 * components:
 *  parameters:
 *    familyId:
 *      name: id
 *      in: path
 *      description: ID of the family to return
 *      required: true
 *      example: 00uhjfrwdWAQvD8JV4x6
 *      schema:
 *        type: string
 *
 * /families/{id}/members:
 *  get:
 *    description: Find Members by ID
 *    summary: Returns object of members
 *    security:
 *      - okta: []
 *    tags:
 *      - Families
 *    parameters:
 *      - $ref: '#/components/parameters/familyId'
 *    responses:
 *      200:
 *        description: An array of members
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Families'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Member not found'
 */

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

/**
 * @swagger
 * components:
 *  parameters:
 *    familyId:
 *      name: id
 *      in: path
 *      description: ID of the family to return
 *      required: true
 *      example: 00uhjfrwdWAQvD8JV4x6
 *      schema:
 *        type: string
 *
 * /families/{id}/user:
 *  get:
 *    description: Find Family by user ID
 *    summary: Returns object of families
 *    security:
 *      - okta: []
 *    tags:
 *      - Families
 *    parameters:
 *      - $ref: '#/components/parameters/familyId'
 *    responses:
 *      200:
 *        description: An object of families
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Families'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Family not found'
 */

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

/**
 * @swagger
 * components:
 *  parameters:
 *    familyId:
 *      name: id
 *      in: path
 *      description: ID of the family to return
 *      required: true
 *      example: 00uhjfrwdWAQvD8JV4x6
 *      schema:
 *        type: string
 *
 * /families/{id}/household:
 *  get:
 *    description: Find Family by ID
 *    summary: Returns entire family information (guests, pets)
 *    security:
 *      - okta: []
 *    tags:
 *      - Families
 *    parameters:
 *      - $ref: '#/components/parameters/familyId'
 *    responses:
 *      200:
 *        description: An object of families
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Families'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Family not found'
 */

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

/**
 * @swagger
 * components:
 *  parameters:
 *    familyId:
 *      name: id
 *      in: path
 *      description: ID of the family to return
 *      required: true
 *      example: 00uhjfrwdWAQvD8JV4x6
 *      schema:
 *        type: string
 *
 * /families/{id}/household:
 *  get:
 *    description: Find Family by ID
 *    summary: Returns entire family information (guests, pets)
 *    security:
 *      - okta: []
 *    tags:
 *      - Families
 *    parameters:
 *      - $ref: '#/components/parameters/familyId'
 *    responses:
 *      200:
 *        description: An object of families
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Families'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Family not found'
 */

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

/**
 * @swagger
 * /families:
 *  post:
 *    summary: Add a family
 *    security:
 *      - okta: []
 *    tags:
 *      - Families
 *    requestBody:
 *      description: family object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Families'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Family not found'
 *      200:
 *        description: A family object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: profile created
 *                families:
 *                  $ref: '#/components/schemas/Families'
 */

// checkRole.grantAccess('createOwn', 'families')//
router.post('/', async (req, res) => {
  const families = req.body;
  if (families) {
    const user_id = families.id || 0;
    try {
      await Families.findById(user_id).then(async (pf) => {
        if (pf == undefined) {
          //families not found so lets insert it//
          await Families.create(families).then((families) =>
            res
              .status(200)
              .json({ message: 'family created', families: families[0] })
          );
        } else {
          res.status(400).json({ message: 'family already exists!' });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'family missing' });
  }
});

/**
 * @swagger
 * /families/{id}:
 *  put:
 *    summary: Update a family
 *    security:
 *      - okta: []
 *    tags:
 *      - Families
 *    requestBody:
 *      description: Family object to  be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Families'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A Family object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Family updated
 *                Families:
 *                  $ref: '#/components/schemas/Families'
 */

// not found
// checkRole.grantAccess('updateOwn', 'families'),
router.put('/:id', authRequired, (req, res) => {
  const families = req.body;
  const id = req.params.id;
  if (families) {
    Families.findById(id)
      .then(
        Families.update(id, families)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'Family updated', families: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update family '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find family '${id}'`,
          error: err.message,
        });
      });
  }
});

/**
 * @swagger
 * /families/{id}:
 *  delete:
 *    summary: Remove a family
 *    security:
 *      - okta: []
 *    tags:
 *      - Families
 *    parameters:
 *      - $ref: '#/components/parameters/familyId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A family object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Family '00uhjfrwdWAQvD8JV4x6' was deleted.
 *                Families:
 *                  $ref: '#/components/schemas/Families'
 */

// checkRole.grantAccess('deleteAny', 'families'),
router.delete('/:id', authRequired, (req, res) => {
  const id = req.params.id;
  try {
    Families.findById(id).then((families) => {
      Families.remove(families.id).then(() => {
        res.status(200).json({
          message: `family '${id}' was deleted!`,
          families: families,
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete family with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
