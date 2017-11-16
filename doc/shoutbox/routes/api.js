const auth = require('basic-auth');
const User = require('../lib/user');

exports.auth = function(req, res, next) {
  let credentials = auth(req);
  if (credentials) {
    User.authenticate(credentials.name, credentials.pass, next);
  }
};

exports.user = (req, res, next) => {
  User.get(req.params.id, (err, user) => {
    if (err) return next(err);
    if (!user.id) return res.end(404);
    res.json(user);
  });
};