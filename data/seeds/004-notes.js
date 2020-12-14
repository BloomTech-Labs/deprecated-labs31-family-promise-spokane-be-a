
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // We are anticipating possible changes to the tables so we want the delete to run to minimize errors when seeding.
  // This should be taking out once front end greenlights the table and we ready to persist real data
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {
          id: 1, 
          family_id: 2,
          author_id: 1,
          subject: "Please be aware of sensitive information",
          content: "Family came in after fire destroyed their home, youngest is still in the hostipal.",
          date: "2020-12-14T03:15:31.031Z",
          time: "2020-12-14T03:15:31.031Z"
        },
      ]);
    });
};
