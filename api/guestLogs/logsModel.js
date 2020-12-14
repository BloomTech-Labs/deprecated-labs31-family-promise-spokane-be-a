const db = require('../../data/db-config');

const findAll = async () => {
  return await db('logs');
};

const findBy = (filter) => {
  return db('logs').where(filter);
};

//a function to find log by its id
const findById = async (id) => {
  return db('logs').where({ id }).first().select('*');
};

//a function to find ALL logs by family id
// needs works
const findByFamilyId = async (family_id) => {
  return db('logs').where({ family_id }).first().select('*');
};

//a function to find ALL logs by user id
// needs work
const findByUserId = async (user_id) => {
  return db('logs').where({ user_id }).first().select('*');
};

const create = async (log) => {
  return db('logs').insert(log).returning('*');
};

const update = (id, log) => {
  return db('logs').where({ id: id }).first().update(log).returning('*');
};

const remove = async (id) => {
  return await db('logs').where({ id }).del();
};

const findOrCreateLog = async (logObj) => {
  const foundLog = await findById(logObj.id).then((log) => log);
  if (foundLog) {
    return foundLog;
  } else {
    return await create(logObj).then((newLog) => {
      return newLog ? newLog[0] : newLog;
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
  findOrCreateLog,
  findByFamilyId,
  findByUserId,
};
