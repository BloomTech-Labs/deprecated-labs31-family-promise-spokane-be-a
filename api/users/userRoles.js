// All users should be able to view and update a user profile.
// New guests should have a profile created for them.
const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant('guest').readOwn('profile').updateOwn('profile');

  ac.grant('case-manager')
    .extend('guest')
    .readAny('profile')
    .updateAny('profile');

  ac.grant('supervisor')
    .extend('case-manager')
    .extend('guest')
    .createAny('profile')
    .updateAny('profile');

  ac.grant('executive director')
    .extend('guest')
    .extend('case-manager')
    .extend('supervisor')
    .readAny('profile')
    .updateAny('profile')
    .deleteAny('profile')
    .createAny('profile');

  return ac;
})();
