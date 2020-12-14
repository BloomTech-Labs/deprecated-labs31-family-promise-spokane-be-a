exports.seed = function (knex) {
  // Deletes ALL existing entries
  // We are anticipating possible changes to the tables so we want the delete to run to minimize errors when seeding.
  // This should be taking out once front end greenlights the table and we ready to persist real data
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'john', password: 'password', role: 'supervisor' },
        { id: 2, username: 'mark', password: 'guestpassword', role: 'guest' },
      ]);
    });
};
