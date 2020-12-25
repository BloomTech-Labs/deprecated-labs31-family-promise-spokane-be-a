const { roles } = require('./familiesRoles');
const Families = require('./familiesModel');
const Users = require('../users/userModel');

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.verifyUserId = async (req, res, next) => {
  const user_id = req.body.user_id;
  try {
    const userExists = await Users.findById(user_id);
    const familyExists = await Families.findByUserId(user_id);

    if (familyExists) {
      return res
        .status(400)
        .json({ messsage: 'User already belongs to a family' });
    }

    if (!userExists) {
      return res.status(400).json({ messsage: 'User does not exist' });
    }

    next();
  } catch (error) {
    res.status(500).json({ messsage: 'Internal server error' });
  }
};
