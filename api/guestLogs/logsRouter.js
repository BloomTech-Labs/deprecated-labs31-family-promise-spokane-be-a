// The get all logs by family id is located in family router

const express = require('express');

const Logs = require('./logsModel');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Logs:
 *      type: object
 *      required:
 *        - supervisor_id
 *        - family_id
 *        - checked_in
 *        - date
 *        - time
 *      properties:
 *        supervisor_id:
 *          type: string
 *          description: This is a foreign key (the okta user ID)
 *        family_id:
 *          type: integer
 *        checked_in:
 *          type: boolean
 *        on_sight:
 *          type: boolean
 *        date:
 *          type: string
 *        time:
 *          type: string
 *      example:
 *        - supervisor_id: '00u2lgca4zIaSTPqE5d6'
 *          family_id: 1
 *          checked_in: true
 *          on_sight: false
 *          date: '2020-12-14T03:15:31.031Z'
 *          time: '2020-12-14T03:15:31.031Z'
 * /logs:
 *  get:
 *    description: Returns a list of Logs
 *    summary: Get a list of all Logs
 *    security:
 *      - okta: []
 *    tags:
 *      - Logs
 *    responses:
 *      200:
 *        description: array of Logs
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Logs'
 *              example:
 *                 - supervisor_id: 1
 *                   family_id: '00u2lgca4zIaSTPqE5d6'
 *                   checked_in: true
 *                   on_sight: false
 *                   date: '2020-12-14T03:15:31.031Z'
 *                   time: '2020-12-14T03:15:31.031Z'
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

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

/**
 * @swagger
 * components:
 *  parameters:
 *    logsId:
 *      name: id
 *      in: path
 *      description: ID of the logs to return
 *      required: true
 *      example: 00u2lgca4zIaSTPqE5d6
 *      schema:
 *        type: string
 *
 * /logs/{id}:
 *  get:
 *    description: Find logs by ID
 *    summary: Returns a single logs
 *    security:
 *      - okta: []
 *    tags:
 *      - Logs
 *    parameters:
 *      - $ref: '#/components/parameters/logsId'
 *    responses:
 *      200:
 *        description: A logs object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Logs'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'log not found'
 */

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
/**
 * @swagger
 * /logs:
 *  post:
 *    summary: Add a log
 *    security:
 *      - okta: []
 *    tags:
 *      - Logs
 *    requestBody:
 *      description: note object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Logs'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'log not found'
 *      200:
 *        description: A log object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: note created
 *                Logs:
 *                  $ref: '#/components/schemas/Logs'
 */
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

/**
 * @swagger
 * /logs/{id}:
 *  put:
 *    summary: Update a log
 *    security:
 *      - okta: []
 *    tags:
 *      - Logs
 *    requestBody:
 *      description: log object to  be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Logs'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A Log object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Note updated
 *                Logs:
 *                  $ref: '#/components/schemas/Logs'
 */

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

/**
 * @swagger
 * /logs/{id}:
 *  delete:
 *    summary: Removes a log
 *    security:
 *      - okta: []
 *    tags:
 *      - Logs
 *    parameters:
 *      - $ref: '#/components/parameters/logsId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A log object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Log was deleted.
 *                Logs:
 *                  $ref: '#/components/schemas/Logs'
 */

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  try {
    Logs.findById(id).then((logs) => {
      Logs.remove(logs['family_id']).then(() => {
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
