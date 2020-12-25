const db = require('../../data/db-config');

const findAll = async () => {
  return await db('families');
};

const findBy = (filter) => {
  return db('families').where(filter);
};

const findById = (id) => {
  return db('families').where({ id }).returning('*');
};

const findByUserId = (user_id) => {
  return db('families').where({ user_id }).returning('*').first();
};

const create = (family) => {
  return db('families').insert(family).returning('*');
};

const update = (id, family) => {
  return db('families').where({ id: id }).first().update(family).returning('*');
};

const remove = async (id) => {
  return await db('families').where({ id }).del();
};

const findOrCreateFamily = async (familyObj) => {
  const foundFamily = await findById(familyObj.id).then((profile) => profile);
  if (foundFamily) {
    return foundFamily;
  } else {
    return await create(familyObj).then((newFamily) => {
      return newFamily ? newFamily[0] : newFamily;
    });
  }
};

const findAllFamilyMembersById = (id) => {
  return db('members').where({ family_id: id }).returning('*');
};

const findAllNotesByFamilyId = async (id, role) => {
  return db('notes')
    .where({ family_id: id })
    .returning('*')
    .modify((qb) => {
      // Only send back the shareable notes if the user is a guest

      if (role == 'guest') {
        qb.where({ shareable: true });
      }
    });
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  findOrCreateFamily,
  findAllFamilyMembersById,
  findAllNotesByFamilyId,
  findByUserId,
};
