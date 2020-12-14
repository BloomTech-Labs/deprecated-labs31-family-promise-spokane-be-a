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

//a function to find member by id
const findById = async (id) => {
  return db('members').where({ id }).first().select('*');
};

//a function to find ALL members by family id
const findMembersByFamilyId = async (family_id) => {
  return db('members').where({ family_id }).first().select('*');
};

const create = async (member) => {
  return db('members').insert(member).returning('*');
};

const update = (id, member) => {
  console.log(member);
  return db('members').where({ id: id }).first().update(member).returning('*');
};

const remove = async (family_id) => {
  return await db('members').where({ family_id }).del();
};

const findOrCreateMember = async (memberObj) => {
  const foundMember = await findById(memberObj.id).then((member) => member);
  if (foundMember) {
    return foundMember;
  } else {
    return await create(memberObj).then((newMember) => {
      return newMember ? newMember[0] : newMember;
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
  findOrCreateMember,
  findByfamilyId,
  findMembersByFamilyId,
};
