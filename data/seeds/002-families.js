exports.seed = function (knex) {
  // Deletes ALL existing entries
  // We are anticipating possible changes to the tables so we want the delete to run to minimize errors when seeding.
  // This should be taking out once front end greenlights the table and we ready to persist real data
  return (
    knex('families')
      // .del()
      .then(function () {
        // Inserts seed entries
        return knex('families').insert([
          {
            user_id: '00u2lh0bsAliwLEe75d6',
            case_number: 22,
            phone_one:
              '{"name":"Thomas Shelby", "number":"202-555-0177", "safeToLeaveMssg":true}',
            phone_two:
              '{"name": "Maria Shelby", "number":"770-555-0114", "safeToLeaveMssg":false}',
            safe_alternate: { name: 'Mark Shelby', number: '809-323-5959' },
            emergencyContact:
              '{ "name": "Steve Martin", "number":"410-555-0173"}',
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
          },
        ]);
      })
  );
};
