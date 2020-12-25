const db = require('../../data/db-config');

const findAll = async (queries) => {
  return await db('notes').modify((qb) => {
    if (queries.shareable) {
      qb.where({ shareable: queries.shareable });
    }
  });
};

const findBy = (filter) => {
  return db('notes').where(filter);
};

//a function to find member by id
const findById = (id) => {
  return db('notes').where({ id }).first().select('*');
};

//a function to find ALL notes by family id
const findByFamilyId = (family_id) => {
  return db('families').where({ id: family_id }).first().select('*');
};

const create = (note) => {
  return db('notes').insert(note).returning('*');
};

const update = (id, note) => {
  return db('notes').where({ id: id }).first().update(note).returning('*');
};

const remove = (id) => {
  return db('notes').where({ id }).del();
};

const findOrCreateNote = async (noteObj) => {
  const foundNote = await findById(noteObj.id).then((note) => note);
  if (foundNote) {
    return foundNote;
  } else {
    return await create(noteObj).then((newNote) => {
      return newNote ? newNote[0] : newNote;
    });
  }
};

const findByIdAndRemove = (id) => {
  return db('notes').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  findOrCreateNote,
  findByFamilyId,
  findByIdAndRemove,
};
