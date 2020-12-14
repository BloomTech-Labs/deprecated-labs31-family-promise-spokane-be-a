exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('logs')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('logs').insert([
        {
          user_id: 1,
          family_id: 1,
          checked_in: true,
          date: '2020-09-14T17:38:31.123Z',
          time: '2020-09-14T17:38:31.123Z',
        },
        {
          user_id: 1,
          family_id: 1,
          checked_in: true,
          date: '2020-10-14T18:01:40.038Z',
          time: '2020-10-14T18:01:40.038Z',
        },
        {
          user_id: 1,
          family_id: 1,
          checked_in: true,
          date: '2020-11-14T17:38:31.123Z',
          time: '2020-11-14T17:38:31.123Z',
        },
        {
          user_id: 1,
          family_id: 1,
          checked_in: true,
          date: '2020-12-14T17:38:31.123Z',
          time: '2020-12-14T17:38:31.123Z',
        },
        {
          user_id: 1,
          family_id: 1,
          checked_in: true,
          date: '2020-13-14T17:38:31.123Z',
          time: '2020-13-14T17:38:31.123Z',
        },
      ]);
    });
};
