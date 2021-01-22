const request = require('supertest');
const express = require('express');

const notes = require('../../api/notes/notesModel');
const notesRouter = require('../testRoutes/notesRouter');
const test = require('../testMiddleWare');
const app = express();
app.use(express.json());
// app.use(test);
jest.mock('../../api/notes/notesModel');
// mock the auth middleware completely
// jest.mock('../t.js', () => jest.fn((req, res, next) => next()));

describe('profiles router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested

    app.use('/notes', test, notesRouter);
    jest.clearAllMocks();
  });

  describe('GET /notes', () => {
    it('should return 200', async () => {
      notes.findAll.mockResolvedValue([]);
      const res = await request(app).get('/notes');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(notes.findAll.mock.calls.length).toBe(1);
    });
  });

  describe('GET /notes/:id', () => {
    it('should return 200 when profile found', async () => {
      notes.findById.mockResolvedValue({
        id: 1,
        family_id: 1,
        author_id: '00u2lgca4zIaSTPqE5d6',
        subject: 'Please be aware of sensitive information',
        content:
          'Guest has been previously flagged, be cautious of his temper and mood swings',
        date: '2020-12-14T03:15:31.031Z',
        time: '2020-12-14T03:15:31.031Z',
      });
      const res = await request(app).get('/notes/1');

      expect(res.status).toBe(200);
      expect(res.body.notes.subject).toBe(
        'Please be aware of sensitive information'
      );
      expect(notes.findById.mock.calls.length).toBe(1);
    });

    it('should return 404 when no user found', async () => {
      notes.findById.mockResolvedValue();
      const res = await request(app).get('/notes/d376de0577681ca93614');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('notes Not Found');
    });
  });

  describe('POST /profile', () => {
    it('should return 200 when profile is created', async () => {
      const note = {
        family_id: 1,
        author_id: '00u2lgca4zIaSTPqE5d6',
        subject: 'Please be aware of sensitive information',
        content:
          'Family came in after fire destroyed their home, young Jacob is still in the recovering.',
        date: '2020-12-14T03:15:31.031Z',
        time: '2020-12-14T03:15:31.031Z',
      };
      notes.findById.mockResolvedValue(undefined);
      notes.create.mockResolvedValue([Object.assign({ id: 2 }, note)]);
      const res = await request(app).post('/notes').send(note);

      expect(res.status).toBe(200);
      expect(res.body.notes.subject).toBe(
        'Please be aware of sensitive information'
      );
      expect(notes.create.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /profile', () => {
    it('should return 200 when profile is created', async () => {
      const user = {
        id: 1,
        family_id: 1,
        author_id: '00u2lgca4zIaSTPqE5d6',
        subject: 'Please be aware of sensitive information',
        content: 'N/A',
        date: '2020-12-14T03:15:31.031Z',
        time: '2020-12-14T03:15:31.031Z',
      };
      notes.findById.mockResolvedValue(user);
      notes.update.mockResolvedValue([user]);

      const res = await request(app).put(`/notes/${user.id}`).send(user);
      expect(res.status).toBe(200);
      expect(res.body.notes.content).toBe('N/A');
      expect(notes.update.mock.calls.length).toBe(1);
    });
  });
});
