const User = require('../lib/user');

exports.form = (req, res) => {
  res.render('login', {
    title: 'Login'
  });
};

/**
 * check username and password
 * set session id
 * redirect to their homepage
 */
exports.login = (req, res, next) => {
  let body = req.body,
  username = body.name,
  pass = body.password;

  User.authenticate(username, pass, (err, user) => {
    if (err) throw next(err);
    if (user) {
      req.session.uid = user.id;
      res.redirect('/');
    } else {
      // res.error('Sorry! invalid credentias');
      res.redirect('back');
    }
  });
};

// exports.logout = (req, res) => {

// };