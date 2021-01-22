const express = require('express');
// const checkRole = require('./membersMiddleware')
const axios = require('axios');
const authRequired = require('../middleware/authRequired');
const Members = require('./membersModel');
const router = express.Router();
const Families = require('../families/familiesModel');

/**
 * @swagger
 * components:
 *  schemas:
 *    Members:
 *      type: array
 *      required:
 *        - id
 *        - family_id
 *        - date_of_enrollment
 *        - household_type
 *        - length_of_stay
 *        - demographics
 *        - barriers
 *        - schools
 *        - case_members
 *        - predicted_exit_destination
 *        - flag
 *        - percent_complete
 *      properties:
 *        id:
 *          type: integer
 *        family_id:
 *          type: integer
 *        date_of_enrollment:
 *          type: string
 *        household_type:
 *          type: string
 *        length_of_stay:
 *          type: string
 *        demographics:
 *          type: object
 *        barriers:
 *          type: object
 *        schools:
 *          type: object
 *        case_members:
 *          type: integer
 *        homeless_info:
 *          type: object
 *        predicted_exit_destination:
 *          type: string
 *        flag:
 *          type: string
 *        percent_complete:
 *          type: integer
* /members:
 *  get:
 *    description: Returns a list of members
 *    summary: Get a list of all members
 *    security:
 *      - okta: []
 *    tags:
 *      - Members
 *    responses:
 *      200:
 *        description: array of members
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Members'
 *              example:
 *                - id: 1
 *                  family_id: 1
 *                  date_of_enrollment: '2020-10-09T17:38:31.123Z'
 *                  household_type: Adults and Children
 *                  length_of_stay: 16 weeks
 *                  demographics:
 *                    first_name: Thomas
 *                    last_name: Shelby
 *                    gender: male
 *                    relationship: Dad
 *                    DOB: 1-03-1988
 *                    SSN: 9999
 *                    income: 20000
 *                    employer: union
 *                    race:
 *                    - White
 *                    ethnicity: Caucasian
 *                  barriers:
 *                    alcohol_abuse: true
 *                    developmental_disabilities: false
 *                    chronic_health_issues: false
 *                    drug_abuse: false
 *                    HIV_AIDs: false
 *                    mental_illness: false
 *                    physical_disabilities: true
 *                    list_indefinite_conditions: NA
 *                    list_issues: NA
 *                  schools:
 *                    highest_grade_completed: 12th grade
 *                    enrolled_status: false
 *                    reason_not_enrolled: finished
 *                    attendance_status: inactive
 *                    school_type: NA
 *                    school_name: NA
 *                    mckinney_school: false
 *                  case_members: 3
 *                  predicted_exit_destination: permanent exit
 *                  flag:
 *                  percent_complete: 0               
 
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

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

/**
 * @swagger
 * components:
 *  parameters:
 *    memberId:
 *      name: id
 *      in: path
 *      description: ID of the Member to return
 *      required: true
 *      example: 1
 *      schema:
 *        type: integer
 *
 * /members/{id}:
 *  get:
 *    description: Find Member by ID
 *    summary: Returns a single Member
 *    security:
 *      - okta: []
 *    tags:
 *      - Members
 *    parameters:
 *      - $ref: '#/components/parameters/memberId'
 *    responses:
 *      200:
 *        description: A member object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Members'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Member not found'
 */

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

/**
 * @swagger
 * /members:
 *  post:
 *    summary: Add a Member
 *    security:
 *      - okta: []
 *    tags:
 *      - Members
 *    requestBody:
 *      description: Member object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Members'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Member not found'
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
 *                Members:
 *                  $ref: '#/components/schemas/Members'
 */

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

/**
 * @swagger
 * /members/{id}:
 *  put:
 *    summary: Update a member
 *    security:
 *      - okta: []
 *    tags:
 *      - Members
 *    requestBody:
 *      description: Member object to  be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Members'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A Member object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Member updated
 *                Members:
 *                  $ref: '#/components/schemas/Members'
 */

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
              .json({ message: 'member updated', members: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update member '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find member '${id}'`,
          error: err.message,
        });
      });
  }
});

/**
 * @swagger
 * /members/{id}:
 *  delete:
 *    summary: Remove a member
 *    security:
 *      - okta: []
 *    tags:
 *      - Members
 *    parameters:
 *      - $ref: '#/components/parameters/memberId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A member object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Member '00uhjfrwdWAQvD8JV4x6' was deleted.
 *                Members:
 *                  $ref: '#/components/schemas/Members'
 */

// checkRole.grantAccess('deleteAny', 'members')
router.delete('/:id', authRequired, (req, res) => {
  const id = req.params.id;
  try {
    Members.findById(id).then((members) => {
      Members.remove(members['family_id']).then(() => {
        res
          .status(200)
          .json({ message: `member '${id}' was deleted.`, members: members });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete member with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
