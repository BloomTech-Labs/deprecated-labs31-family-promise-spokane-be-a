const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant('guest').readOwn('families').updateOwn('families');

  ac.grant('case-manager')
    .extend('guest')
    .readAny('families')
    .updateAny('families');

  ac.grant('supervisor')
    .extend('case-manager')
    .extend('guest')
    .createOwn('families')
    .updateAny('families');

  ac.grant('executive director')
    .extend('guest')
    .extend('case-manager')
    .extend('supervisor')
    .readAny('families')
    .updateAny('families')
    .deleteAny('families')
    .createAny('families');

  return ac;
})();
