exports.form = (req, res) => {
  res.render('login', {
    title: 'Login'
  });
};

exports.submit = (req, res) => {
  res.render();
};

exports.logout = (req, res) => {

};