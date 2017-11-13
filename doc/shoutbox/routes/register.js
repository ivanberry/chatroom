const express = require('express');
const router = express.Router();
const User = require('../lib/user');

router.get('/', (req, res) => {
	res.render('register', {
		title: 'Register'
	});
});

/**
 * handle user register
 * store
 * show their homepage
 */
router.post('/', (req, res, next) => {
	let username = req.body.username;
	let pass = req.body.password;
	let age = req.body.age;

	User.getByName(username, (err, user) => {
		if (err) return next(err);

		if (user.id) {
			// res.error('Username already taken');
			res.redirect('back');
		} else {
			user = new User({
				name: username,
        pass: pass,
        age: age
			});

			user.save(err => {
				if (err) return next(err);
				req.session.uid = user.id;
				res.redirect('/');
			});
		}
	});
});

module.exports = router;
