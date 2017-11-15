const Entry = require('../lib/entry');

exports.get = (req, res) => {
    res.render('post', {
        title: 'Post'
    });
};

exports.post = (req, res, next) => {
    let data = req.body;
    let entry = new Entry({
        'username': res.locals.user.name,
        'title': data.title,
        'body': data.body
    });
    entry.save(err => {
        if (err) throw next(err);
        res.redirect('/');
    });
};