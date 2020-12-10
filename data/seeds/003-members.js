
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('members').del()
    .then(function () {
      // Inserts seed entries
      return knex('members').insert([
       {
          family_id: 1,
          demographics: { "first_name":"Joe", "last_name": "Clemmons", "gender": "male", "relationship": "cousin", "DOB": "10-23-1992", "SSN": 9999, "income":20000, "employer":'union', "race":'White'},
          bearers: {"alcohol_abuse": false, "developmental_disabilities":false, "chronic_health_issues":false,"drug_abuse":false, "HIV-AIDs":false, "mental_illness":false, "physical_disabilities":false, "list_indefinite_conditions": null, "list_issues": null},
          schools: { "highest_grade_completed": "12th grade", "enrolled_status":false, "reason_not_enrolled": "finished", "attendance_status": "inactive", "school_type": null, "school_name":null, "mckinney_school": false },
          flag:'none',
          pet:0
        }
      ]);
    });
};
