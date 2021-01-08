function testRequired(req, res, next) {
  next();
}

module.exports = testRequired;

// Since Okta cannot provide us with tests tokens,
//we decided to make routers without authenication in order to test that CRUD operations would work,
// while using the modeler functions provided by the database
