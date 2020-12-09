exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: '', password: '', role: '' },
        { id: 2, username: '', password: '', role: '' },
        { id: 3, username: '', password: '', role: '' }
      ]);
    });
};
