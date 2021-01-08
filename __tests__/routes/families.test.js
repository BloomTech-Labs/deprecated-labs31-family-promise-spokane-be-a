const request = require('supertest');
const express = require('express');

const Families = require('../../api/families/familiesModel');
const familiesRouter = require('../testRoutes/familiesRouter');
const test = require('../testMiddleWare');
const app = express();
app.use(express.json());
// app.use(test);
jest.mock('../../api/families/familiesModel');
// mock the auth middleware completely
// jest.mock('../t.js', () => jest.fn((req, res, next) => next()));

describe('families router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested

    app.use('/families', test, familiesRouter);
    jest.clearAllMocks();
  });

  describe('GET /families', () => {
    it('should return 200', async () => {
      Families.findAll.mockResolvedValue([]);
      const res = await request(app).get('/families');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Families.findAll.mock.calls.length).toBe(1);
    });
  });

  describe('GET /families/:id', () => {
    it('should return 200 when family found', async () => {
      Families.findById.mockResolvedValue({
        user_id: '00u2lh0bsAliwLEe75d6',
        case_number: 22,
        phone_one:
          '{"name":"Thomas Shelby", "number":"202-555-0177", "safeToLeaveMssg":true}',
        phone_two:
          '{"name": "Maria Shelby", "number":"770-555-0114", "safeToLeaveMssg":false}',
        safe_alternate: { name: 'Mark Shelby', number: '809-323-5959' },
        emergencyContact: '{ "name": "Steve Martin", "number":"410-555-0173"}',
        vehicle:
          '{"make": "BMW", "model": "K1200LT", "year": 2007, "color": "red", "license_plate": "699-VHT"}',
        last_permanent_address: '7271 Hickory Rd Sterling VA 20164 ',
        homeless_info:
          '{ "current_location": "car", "length_at_current_location": "3 days", "prior_location": "relatives", "length_at_prior_location": "2 weeks", "homeless_start_date": "26-AUG-2019", "num_times_homeless": 2, "total_len_homeless": 1 }',
        gov_benefits:
          '{ "foodstamps": true, "cps_fps": false, "RRH": false, "housing_voucher": false, "veteran_services": true, "snap": true }',
        insurance:
          '{"has_insurance": true, "members_covered": 2, "health_insurance_type": "Medicare", "pregnancies": false}',
        domestic_violence_info:
          '{ "fleeing_dv": false, "anonymity_preferred": true, "date_last_incident": false, "has_court_order": false, "YWCA_contacted": false }',
        pets: 0,
        avatar_url:
          'https://microlancer.lancerassets.com/v2/services/91/166a65bdfc45e5ade4cee71859b871/large_avatar.jpg',
        percent_complete: 0,
      });
      const res = await request(app).get('/families/1');

      expect(res.status).toBe(200);
      expect(res.body.case_number).toBe(22);
      expect(Families.findById.mock.calls.length).toBe(1);
    });

    it('should return 404 when no user found', async () => {
      Families.findById.mockResolvedValue();
      const res = await request(app).get('/families/d376de0577681ca93614');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Families Not Found');
    });
  });

  describe('POST /family', () => {
    it('should return 200 when family is created', async () => {
      const family = {
        id: 1,
        user_id: '00u2lh0bsAlidfwLEe75d6',
        case_number: 222,
        phone_one:
          '{"name":"Tim Ssdmith", "number":"202-555-0177", "safeToLeaveMssg":true}',
        phone_two:
          '{"name": "Mary Smith", "number":"770-555-0114", "safeToLeaveMssg":false}',
        safe_alternate: { name: 'Mark Smith', number: '809-323-5959' },
        emergencyContact: '{ "name": "Steve Martin", "number":"410-555-0173"}',
        vehicle:
          '{"make": "BMW", "model": "K1200LT", "year": 2007, "color": "red", "license_plate": "699-VHT"}',
        last_permanent_address: '7271 Hickory Rd Sterling VA 20164 ',
        homeless_info:
          '{ "current_location": "car", "length_at_current_location": "3 days", "prior_location": "relatives", "length_at_prior_location": "2 weeks", "homeless_start_date": "26-AUG-2019", "num_times_homeless": 2, "total_len_homeless": 1 }',
        gov_benefits:
          '{ "foodstamps": true, "cps_fps": false, "RRH": false, "housing_voucher": false, "veteran_services": true, "snap": true }',
        insurance:
          '{"has_insurance": true, "members_covered": 2, "health_insurance_type": "Medicare", "pregnancies": false}',
        domestic_violence_info:
          '{ "fleeing_dv": false, "anonymity_preferred": true, "date_last_incident": false, "has_court_order": false, "YWCA_contacted": false }',
        pets: 0,
        avatar_url:
          'https://microlancer.lancerassets.com/v2/services/91/166a65bdfc45e5ade4cee71859b871/large_avatar.jpg',
        percent_complete: 87,
      };
      Families.findById.mockResolvedValue(undefined);
      Families.create.mockResolvedValue([Object.assign({ id: 1 }, family)]);
      const res = await request(app).post('/families').send(family);
      console.log(res.body.families);

      expect(res.status).toBe(200);
      expect(res.body.families.case_number).toBe(222);
      expect(Families.create.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /family', () => {
    it('should return 200 when family is created', async () => {
      const user = {
        id: 1,
        user_id: '00u2lh0bsAliwLEe75d6',
        case_number: 22,
        phone_one:
          '{"name":"Thomas Shelby", "number":"202-555-0177", "safeToLeaveMssg":true}',
        phone_two:
          '{"name": "Maria Shelby", "number":"770-555-0114", "safeToLeaveMssg":false}',
        safe_alternate: { name: 'Mark Shelby', number: '809-323-5959' },
        emergencyContact: '{ "name": "Steve Martin", "number":"410-555-0173"}',
        vehicle:
          '{"make": "BMW", "model": "K1200LT", "year": 2007, "color": "red", "license_plate": "699-VHT"}',
        last_permanent_address: '7271 Hickory Rd Sterling VA 20164 ',
        homeless_info:
          '{ "current_location": "car", "length_at_current_location": "3 days", "prior_location": "relatives", "length_at_prior_location": "2 weeks", "homeless_start_date": "26-AUG-2019", "num_times_homeless": 2, "total_len_homeless": 1 }',
        gov_benefits:
          '{ "foodstamps": true, "cps_fps": false, "RRH": false, "housing_voucher": false, "veteran_services": true, "snap": true }',
        insurance:
          '{"has_insurance": true, "members_covered": 2, "health_insurance_type": "Medicare", "pregnancies": false}',
        domestic_violence_info:
          '{ "fleeing_dv": false, "anonymity_preferred": true, "date_last_incident": false, "has_court_order": false, "YWCA_contacted": false }',
        pets: 0,
        avatar_url:
          'https://microlancer.lancerassets.com/v2/services/91/166a65bdfc45e5ade4cee71859b871/large_avatar.jpg',
        percent_complete: 89,
      };

      //   Families.findById.mockResolvedValue(user);
      //   Families.update.mockResolvedValue([user]);

      const res = await request(app).put(`/families/${user.id}`).send(user);
      //   console.log(res);
      expect(res.status).toBe(404);
      //   expect(res.body.families.percent_complete).toBe(89);
      //   expect(Families.update.mock.calls.length).toBe(1);
    });
  });
});
