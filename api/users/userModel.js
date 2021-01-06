const db = require('../../data/db-config');

const findAll = async () => {
  return await db('users');
};

const findBy = (filter) => {
  return db('users').where(filter);
};

const findById = async (id) => {
  return db('users').where({ id }).first('*');
};

const findByOktaId = async (okta_id) => {
  return db('users').where({ okta_id });
};

const findFamilyByUserId = (user_id) => {
  return db('families').where({ user_id }).returning('*');
};

const create = async (profile) => {
  return db('users').insert(profile).returning('*');
};

const update = (id, profile) => {
  console.log(profile);
  return db('users').where({ id: id }).first().update(profile).returning('*');
};

const remove = async (id) => {
  return await db('users').where({ id }).del();
};

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await findById(profileObj.id).then((profile) => profile);
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
  findFamilyByUserId,
};
