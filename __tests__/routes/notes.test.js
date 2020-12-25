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

describe('/notes crud operations', () => {
    it('gets an array of notes', async () => {
        const res = await supertest(app).get('/notes');
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.notes).toBeInstanceOf(Array)
    })

    
    it('creates a new note', async () => {
        const newNote = {
            family_id: 1,
            author_id: '00u2lhigtb8N47Jii5d6',
            subject: 'Late check-in',
            content: 'Guest will be coming in late tonight',
            shareable: false
        }
        
        const res = await supertest(app).post('/notes').send(newNote)
        
        const note = res.body.note || false
        
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe('application/json')

        expect(note).toBeTruthy()
        expect(note.id).toBeTruthy()
        expect(note.subject).toBe('Late check-in')
        expect(note.content).toBe('Guest will be coming in late tonight')
        expect(note.shareable).toBe(false)
    })

    it('gets a single note by id', async () => {
        const res = await supertest(app).get(`/notes/1`)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.note).toBeTruthy()
    })
    
    it('updates note by id', async () => {
        const updatedNote = {
            subject: 'Bruce',
            content: 'Wayne',
            shareable: false
        }
        const res = await supertest(app).put('/notes/1').send(updatedNote)

        const note = res.body.note || false

        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(note).toBeTruthy()
        expect(note.subject).toBe('Bruce')
        expect(note.content).toBe('Wayne')
        expect(note.shareable).toBe(false)
    })

    it('deletes note by id', async () => {
        const res = await supertest(app).delete('/notes/1')
        expect(res.statusCode).toBe(204)
    })
})

