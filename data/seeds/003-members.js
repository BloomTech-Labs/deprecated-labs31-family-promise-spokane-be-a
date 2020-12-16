exports.seed = function (knex) {
  // Deletes ALL existing entries
  // We are anticipating possible changes to the tables so we want the delete to run to minimize errors when seeding.
  // This should be taking out once front end greenlights the table and we ready to persist real data
  return knex('members')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('members').insert([
        {
          family_id: 1,
          demographics: {
            first_name: 'Joe',
            last_name: 'Clemmons',
            gender: 'male',
            relationship: 'cousin',
            DOB: '10-23-1992',
            SSN: 9999,
            income: 20000,
            employer: 'union',
            race: 'White',
          },
          barriers: {
            alcohol_abuse: false,
            developmental_disabilities: false,
            chronic_health_issues: false,
            drug_abuse: false,
            'HIV-AIDs': false,
            mental_illness: false,
            physical_disabilities: false,
            list_indefinite_conditions: null,
            list_issues: null,
          },
          schools: {
            highest_grade_completed: '12th grade',
            enrolled_status: false,
            reason_not_enrolled: 'finished',
            attendance_status: 'inactive',
            school_type: null,
            school_name: null,
            mckinney_school: false,
          },
          flag: null,
        },
      ]);
    });
};
