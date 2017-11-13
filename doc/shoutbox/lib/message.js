const session = require('express-session');
const res = session; //add method on response prototype

res.message = function (msg ,type = 'info') {
  let sess = this.req.session;
  sess.message = sess.message || [];
  sess.message.push({
    type,
    string: msg
  });
};

res.error = function (msg) {
  return this.message(msg, 'error');
};

module.exports = (req, res, next) => {
  res.locals.message = req.session.message | [];
  res.locals.removeMessages = function () {
    req.session.messages = [];
  };
  next();
};