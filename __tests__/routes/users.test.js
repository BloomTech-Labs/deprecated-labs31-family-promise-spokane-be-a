const request = require('supertest');
const express = require('express');

const Users = require('../../api/users/userModel');
const userRouter = require('../testRoutes/userRouter');
const test = require('../testMiddleWare');
const app = express();
app.use(express.json());
// app.use(test);
jest.mock('../../api/users/userModel');
// mock the auth middleware completely
// jest.mock('../t.js', () => jest.fn((req, res, next) => next()));

describe('profiles router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested

    app.use('/users', test, userRouter);
    jest.clearAllMocks();
  });

  describe('GET /users', () => {
    it('should return 200', async () => {
      Users.findAll.mockResolvedValue([]);
      const res = await request(app).get('/users');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Users.findAll.mock.calls.length).toBe(1);
    });
  });

  describe('GET /users/:id', () => {
    it('should return 200 when profile found', async () => {
      Users.findById.mockResolvedValue({
        id: '00u2lgpiiPT4y3njs5d6',
        email: 'executivedirector@gmail.com',
        first_name: 'Freddie',
        last_name: 'Thorne',
        role: 'executive_director',
      });
      const res = await request(app).get('/users/00u2lgpiiPT4y3njs5d6');

      expect(res.status).toBe(200);
      expect(res.body.email).toBe('executivedirector@gmail.com');
      expect(Users.findById.mock.calls.length).toBe(1);
    });

    it('should return 404 when no user found', async () => {
      Users.findById.mockResolvedValue();
      const res = await request(app).get('/users/d376de0577681ca93614');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('ProfileNotFound');
    });
  });

  describe('POST /profile', () => {
    it('should return 200 when profile is created', async () => {
      const profile = {
        email: 'executivemanagerr@gmail.com',
        first_name: 'Jay',
        last_name: 'Leno',
        role: 'executive_manager',
      };
      // Users.findById.mockResolvedValue(undefined);
      // Users.create.mockResolvedValue([
      //   Object.assign({ id: 'd376de0577681ca93614' }, profile),
      // ]);
      const res = await request(app).post('/users').send(profile);

      expect(res.status).toBe(200);
      expect(res.body.profile.id).toBe('d376de0577681ca93614');
      expect(Users.create.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /profile', () => {
    it('should return 200 when profile is created', async () => {
      const user = {
        id: '00u2lgpiiPT4y3njs5d6',
        email: 'executivedirector@gmail.com',
        first_name: 'Freddie',
        last_name: 'Smith',
        role: 'executive_director',
      };
      Users.findById.mockResolvedValue(user);
      Users.update.mockResolvedValue([user]);

      const res = await request(app).put(`/users/${user.id}`).send(user);
      expect(res.status).toBe(200);
      expect(res.body.profile.last_name).toBe('Smith');
      expect(Users.update.mock.calls.length).toBe(1);
    });
  });
});
