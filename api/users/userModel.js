const db = require('../../data/db-config');

const findAll = async () => {
  return await db('users');
};

const findBy = (filter) => {
  return db('users').where(filter);
};

const findById = async (id) => {
  return db('users').where({ id });
};

const findByOktaId = async (okta_id) => {
  console.log(okta_id);
  return db('users').where({ okta_id });
};

const create = async (user) => {
  return db('users').insert(user).returning('*');
};

const update = (id, user) => {
  console.log(user);
  return db('users').where({ id: id }).first().update(user).returning('*');
};

const remove = async (id) => {
  return await db('users').where({ id }).del();
};

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await findByOktaId(profileObj.id).then((user) => user);
  if (foundProfile) {
    return foundProfile;
  } else {
    return await create(profileObj).then((newProfile) => {
      return newProfile ? newProfile[0] : newProfile;
    });
  }
};

module.exports = {
  findAll,
  findBy,
  findById,
  findByOktaId,
  create,
  update,
  remove,
  findOrCreateProfile,
};
