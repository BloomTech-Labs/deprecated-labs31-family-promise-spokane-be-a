const db = require('../../data/db-config');

const findAll = async () => {
  return await db('logs');
};

const findBy = (filter) => {
  return db('logs').where(filter);
};

//a function to find log by its id
const findById = async (reservation_id) => {
  return db('logs').where({ reservation_id }).select('*');
};
const findByFamilyId = async (family_id) => {
  return db('logs').where({ family_id }).select('*');
};

const create = async (log) => {
  return db('logs').insert(log).returning('*');
};

const update = (reservation_id, log) => {
  return db('logs')
    .where({ reservation_id: reservation_id })
    .first()
    .update(log)
    .returning('*');
};

const remove = async (reservation_id) => {
  return db('logs').where({ reservation_id }).del();
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
  findByFamilyId,
  create,
  update,
  remove,
  findOrCreateLog,
};
