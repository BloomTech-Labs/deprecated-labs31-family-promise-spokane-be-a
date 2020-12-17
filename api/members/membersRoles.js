// Supervisors should be able to log "flags" associated with a guest that show up prominently when the guest's file is viewed:
const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant('guest')
    .readOwn('members')
    .updateOwn('members')
    .createOwn('members');

  ac.grant('case-manager')
    .extend('guest')
    .readAny('members')
    .updateAny('members');

  ac.grant('supervisor')
    .extend('case-manager')
    .extend('guest')
    .createOwn('members')
    .updateAny('members');

  ac.grant('executive director')
    .extend('guest')
    .extend('case-manager')
    .extend('supervisor')
    .readAny('members')
    .updateAny('members')
    .deleteAny('members')
    .createAny('members');

  return ac;
})();
