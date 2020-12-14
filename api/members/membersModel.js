const db = require('../../data/db-config');

const findAll = async () => {
  return await db('members');
};

const findBy = (filter) => {
  return db('members').where(filter);
};

const findByfamilyId = async (id) => {
  return db('families').where({ id }).first().select('*');
};

//an endpoint to find member by id
const findById = async (id) => {
  return db('members').where({ id }).first().select('*');
};

//an endpoint to find ALL members by family id
const findMembersByFamilyId = async (family_id) => {
  return db('members').where({ family_id }).first().select('*');
};

const create = async (profile) => {
  return db('members').insert(profile).returning('*');
};

const update = (id, profile) => {
  console.log(profile);
  return db('members').where({ id: id }).first().update(profile).returning('*');
};

const remove = async (family_id) => {
  return await db('members').where({ family_id }).del();
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
  create,
  update,
  remove,
  findOrCreateProfile,
  findByfamilyId,
};
