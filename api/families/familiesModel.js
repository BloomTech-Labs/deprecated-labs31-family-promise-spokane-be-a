const db = require('../../data/db-config');

const findAll = async () => {
  return await db('families');
};

const findBy = (filter) => {
  return db('families').where(filter);
};

const findById = async (id) => {
  return db('families').where({ id }).first().select('*');
};

const create = async (family)) => {
  return db('families').insert(family)).returning('*');
};

const update = (id, profile) => {
  console.log(family));
  return db('families')
    .where({ id: id })
    .first()
    .update(family))
    .returning('*');
};

const remove = async (id) => {
  return await db('families').where({ id }).del();
};

const findOrCreateProfile = async (profileObj) => {
  const foundProfile = await findById(profileObj.id).then((family)) => profile);
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
};
