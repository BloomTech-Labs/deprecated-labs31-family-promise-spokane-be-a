const db = require('../../data/db-config');

const findAll = async () => {
  return await db('notes');
};

const findBy = (filter) => {
  return db('notes').where(filter);
};

const findById = async (id) => {
  return db('notes').where({ id }).first().select('*');
};

const create = async (note) => {
  return db('notes').insert(note).returning('*');
};

const update = (id, note) => {
  console.log(note);
  return db('notes').where({ id: id }).first().update(note).returning('*');
};

const remove = async (id) => {
  return await db('notes').where({ id }).del();
};

const findOrCreateNote = async (profileObj) => {
  const foundNote = await findById(profileObj.id).then((note) => note);
  if (foundNote) {
    return foundNote;
  } else {
    return await create(profileObj).then((newNote) => {
      return newNote ? newNote[0] : newNote;
    });
  }
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  findOrCreateNote,
};