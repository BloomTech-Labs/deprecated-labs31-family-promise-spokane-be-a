exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('logs')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('logs').insert([
        {
          supervisor_id: '00u2lh0bsAliwLEe75d6',
          family_id: 1,
          reservation_status: true,
          waitlist: false,
          on_site_7pm: true,
          on_site_10pm: true,
          date: '',
          time: '',
          beds_reserved: 5,
          actual_beds_reserved: 5,
          members_staying: [],
        },
        {
          supervisor_id: '00u2lh0bsAliwLEe75d6',
          family_id: 1,
          reservation_status: true,
          waitlist: false,
          on_site_7pm: true,
          on_site_10pm: true,
          date: '',
          time: '',
          beds_reserved: 5,
          actual_beds_reserved: 5,
          members_staying: [],
        },
        {
          supervisor_id: '00u2lh0bsAliwLEe75d6',
          family_id: 1,
          reservation_status: true,
          waitlist: false,
          on_site_7pm: true,
          on_site_10pm: true,
          date: '',
          time: '',
          beds_reserved: 5,
          actual_beds_reserved: 5,
          members_staying: [],
        },
        {
          supervisor_id: '00u2lh0bsAliwLEe75d6',
          family_id: 1,
          reservation_status: true,
          waitlist: false,
          on_site_7pm: true,
          on_site_10pm: true,
          date: 'Wed Feb 3 2021',
          time: '12:30',
          beds_reserved: 5,
          actual_beds_reserved: 5,
          members_staying: [],
        },
      ]);
    });
};
