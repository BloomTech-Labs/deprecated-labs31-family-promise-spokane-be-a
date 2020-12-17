// Supervisors should be able to view all guests currently checked into the shelter.
const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant('guest')
    .createOwn('logs')
    .readOwn('logs')
    .updateOwn('logs')
    .deleteOwn('log');

  ac.grant('case-manager').extend('guest').readAny('logs').updateAny('logs');

  ac.grant('supervisor').extend('case-manager').extend('guest');

  ac.grant('executive director')
    .extend('guest')
    .extend('case-manager')
    .extend('supervisor')
    .readAny('logs')
    .updateAny('logs')
    .deleteAny('logs')
    .createAny('logs');

  return ac;
})();
