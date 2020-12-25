const supertest = require('supertest');
const db = require('../../data/db-config')
const app = require('../../api/app');
const knexCleaner = require('knex-cleaner');

beforeEach(async () => {
    await db.seed.run()
  });

  afterAll(async () => {
      await db.destroy()
  })

jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

describe('/members crud operations', () => {
    it('gets an array of members', async () => {
        const res = await supertest(app).get('/members');
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.notes).toBeInstanceOf(Array)
    })
})