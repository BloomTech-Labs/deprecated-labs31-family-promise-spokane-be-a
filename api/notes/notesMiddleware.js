const { roles } = require('./notesRoles');
const Notes = require('./notesModel');
const Families = require('../families/familiesModel');

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

exports.verifyNoteExists = async (req, res, next) => {
  const { id } = req.params;

  try {
    const note = await Notes.findById(id);

    if (!note) {
      return res
        .status(404)
        .json({ message: `Note with id of ${id} does not exist` });
    }

    next();
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.verifyFamilyExists = async (req, res, next) => {
  const family_id = req.body['family_id'] || 0;

  try {
    const family = await Families.findById(family_id);

    if (!family) {
      return res
        .status(404)
        .json({ message: `Family with id of ${family_id} does not exist` });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
