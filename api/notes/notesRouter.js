const express = require('express');
const Notes = require('./notesModel');
const authRequired = require('../middleware/authRequired');
const router = express.Router();
const Families = require('../families/familiesModel');

/**
 * @swagger
 * components:
 *  schemas:
 *    Notes:
 *      type: object
 *      required:
 *        - family_id
 *        - author_id
 *        - subject
 *        - content
 *        - date
 *        - time
 *      properties:
 *        family_id:
 *          type: integer
 *        author_id:
 *          type: string
 *          description: This is a foreign key (the okta user ID)
 *        content:
 *          type: string
 *        date:
 *          type: string
 *        time:
 *          type: string
 *      example:
 *        - family_id: 1
 *          author_id: '00u2lgca4zIaSTPqE5d6'
 *          subject: 'Please be aware of sensitive information'
 *          content: 'Family came in after fire destroyed their home, young Jacob is still in the recovering.'
 *          date: '2020-12-14T03:15:31.031Z'
 *          time: '2020-12-14T03:15:31.031Z'
 * /notes:
 *  get:
 *    description: Returns a list of Notes
 *    summary: Get a list of all notes
 *    security:
 *      - okta: []
 *    tags:
 *      - Notes
 *    responses:
 *      200:
 *        description: array of notes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Notes'
 *              example:
 *                 - family_id: 1
 *                   author_id: '00u2lgca4zIaSTPqE5d6'
 *                   subject: 'Please be aware of sensitive information'
 *                   content: 'Family came in after fire destroyed their home, young Jacob is still in the recovering.'
 *                   date: '2020-12-14T03:15:31.031Z'
 *                   time: '2020-12-14T03:15:31.031Z'
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

router.get('/', authRequired, function (req, res) {
  const queries = { ...req.query };

  Notes.findAll(queries)
    .then((notes) => {
      res.status(200).json(notes);
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
 *    notesId:
 *      name: id
 *      in: path
 *      description: ID of the notes to return
 *      required: true
 *      example: 00u2lgca4zIaSTPqE5d6
 *      schema:
 *        type: string
 *
 * /notes/{id}:
 *  get:
 *    description: Find Notes by ID
 *    summary: Returns a single notes
 *    security:
 *      - okta: []
 *    tags:
 *      - Notes
 *    parameters:
 *      - $ref: '#/components/parameters/notesId'
 *    responses:
 *      200:
 *        description: A notes object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Notes'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'notes not found'
 */

router.get('/:id', authRequired, function (req, res) {
  const { id } = req.params;
  Notes.findById(id)
    .then((notes) => {
      if (notes) {
        res.status(200).json(notes);
      } else {
        res.status(404).json({ error: 'notes Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/**
 * @swagger
 * /notes:
 *  post:
 *    summary: Add a note
 *    security:
 *      - okta: []
 *    tags:
 *      - Notes
 *    requestBody:
 *      description: note object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Notes'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'note not found'
 *      200:
 *        description: A note object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: note created
 *                Notes:
 *                  $ref: '#/components/schemas/Notes'
 */

router.post('/', authRequired, async (req, res) => {
  const notes = req.body;
  const famId = notes['family_id'] || 0;
  if (notes) {
    try {
      const family = await Families.findById(famId);

      if (!family)
        return res.status(404).json({ message: "family doesn't exist" });

      const note = await Notes.create(notes);

      res.status(200).json({ message: 'notes created', note: note[0] });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'notes missing' });
  }
});

/**
 * @swagger
 * /notes/{id}:
 *  put:
 *    summary: Update a note
 *    security:
 *      - okta: []
 *    tags:
 *      - Notes
 *    requestBody:
 *      description: note object to  be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Notes'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A Note object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Note updated
 *                Notes:
 *                  $ref: '#/components/schemas/Notes'
 */

router.put('/:id', authRequired, (req, res) => {
  const newNote = req.body;
  const id = req.params.id;
  if (newNote) {
    Notes.findById(id)
      .then(
        Notes.update(id, newNote)
          .then((updated) => {
            res
              .status(200)
              .json({ message: `note ${id} updated`, note: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update notes '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find notes '${id}'`,
          error: err.message,
        });
      });
  }
});

/**
 * @swagger
 * /notes/{id}:
 *  delete:
 *    summary: Removes a note
 *    security:
 *      - okta: []
 *    tags:
 *      - Notes
 *    parameters:
 *      - $ref: '#/components/parameters/notesId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A note object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Note was deleted.
 *                Notes:
 *                  $ref: '#/components/schemas/Notes'
 */

router.delete('/:id', authRequired, (req, res) => {
  const id = req.params.id;
  try {
    Notes.findByIdAndRemove(id).then(() => {
      res.status(204).json({ message: 'deleted' });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete notes with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
