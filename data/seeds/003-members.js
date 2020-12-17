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
          date_of_enrollment: '2020-10-09T17:38:31.123Z',
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
            HIV_AIDs: false,
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
          case_members: 3,
        },
        {
          family_id: 1,
          date_of_enrollment: '2020-10-09T17:38:31.123Z',
          demographics: {
            first_name: 'Josh',
            last_name: 'Clemmons',
            gender: 'male',
            relationship: 'son',
            DOB: '10-23-2002',
            SSN: 9999,
            income: 20000,
            employer: null,
            race: 'White',
          },
          barriers: {
            alcohol_abuse: false,
            developmental_disabilities: false,
            chronic_health_issues: false,
            drug_abuse: false,
            HIV_AIDs: false,
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
          case_members: 3,
          flag: null,
        },
      ]);
    });
};
