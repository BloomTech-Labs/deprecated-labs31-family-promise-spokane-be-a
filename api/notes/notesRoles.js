// Case Managers should be able to look up guests and log notes associated with ongoing case management.
// Case Managers should be able to view and edit and Guests should be able to view those notes.
const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant('guest').readOwn('notes');

  ac.grant('case-manager').extend('guest').readAny('notes').updateAny('notes');

  ac.grant('supervisor')
    .extend('case-manager')
    .extend('guest')
    .createAny('notes')
    .updateAny('notes');

  ac.grant('executive director')
    .extend('guest')
    .extend('case-manager')
    .extend('supervisor')
    .readAny('notes')
    .updateAny('notes')
    .deleteAny('notes')
    .createAny('notes');

  return ac;
})();
