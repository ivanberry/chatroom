const auth = require('basic-auth');
const User = require('../lib/user');
const Entry = require('../lib/entry');

exports.auth = function(req, res, next) {
  let credentials = auth(req);
  if (credentials) {
    User.authenticate(credentials.name, credentials.pass, (err, user) => {
      if (err) return next(err);
      if (!user) return res.end('404');
      next();
    }); //验证查询客户端是否有查询权限
  }
};

exports.user = (req, res, next) => {
  User.get(req.params.id, (err, user) => {
    if (err) return next(err);
    if (!user.id) return res.end('404'); // 查询是否有对应id的用户
    res.json(user.toJSON());
  });
};

exports.entry = (req, res, next) => {
  let page = req.page;
  Entry.getRange(page.from, page.to, (err, entries) => {
    if (err) return next(err);
    res.json(entries);
  });
};