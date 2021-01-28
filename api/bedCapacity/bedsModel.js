const db = require('../../data/db-config');

const findAll = async () => {
  return await db('bed_capacity');
};

const update = (bed) => {
  return db('bed_capacity').update(bed);
};

const remove = async (bed) => {
  return db('bed_capacity').del(bed);
};

module.exports = {
  findAll,
  update,
  remove,
};
