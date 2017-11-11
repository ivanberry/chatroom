const redis = require('redis');
const bcrypt = require('bcrypt');

const db = redis.createClient();

class User {
	constructor(obj) {
    let { id, pass} = obj;
    this.id = id;
    this.pass = pass;
	}

	save(fn) {
		if (this.id) {
			this.update(fn);
		} else {
			let user = this;
			db.incr('user:ids', (err, id) => {
				user.id = id;
				user.hasPassword(err => {
					if (err) return fn(err);
					user.update(fn);
				});
			});
		}
	}

	update(fn) {
		let user = this;
		let id = user.id;
		db.set(`user:id:${user.name}`, id, err => {
			if (err) return fn(err);
			db.hmset(`user:${id}`, user, err => {
				fn(err);
			});
		});
	}

	hasPassword(fn) {
		let user = this;
		bcrypt.genSalt(12, (err, salt) => {
			if (err) return fn(err);
			user.salt = salt;
			bcrypt.hash(user.pass, salt, (err, hash) => {
				if (err) return fn(err);
				user.pass = hash;
				fn();
			});
		});
	}
}

module.exports = User;

let tobi = new User({
	name: 'Tobi',
	pass: 'im a ferrt',
	age: 1
});

console.log(tobi);

tobi.save(err => {
	if (err) throw err;
	console.log(`user id is ${tobi.id}`);
});
