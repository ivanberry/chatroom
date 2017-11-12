const redis = require('redis');
const bcrypt = require('bcrypt');

const db = redis.createClient();

class User {
	constructor(obj) {
		if (obj) {
			let { pass, name, age } = obj;
			this.name = name;
			this.pass = pass;
			this.age = age;
		}
	}

	static getByName(name, fn) {
		//how about the user don't exsit?
		User.getId(name, (err, id) => {
			if (err) return fn(err);
			User.get(id, fn);
		});
	}

	static getId(name, fn) {
		db.get(`user:id:${name}`, fn);
	}

	static get(id, fn) {
		db.hgetall(`user:${id}`, (err, user) => {
			if (err) return fn(err);
			//if the user is not exits?
			fn(null, new User(user));
		});
	}

	static authenticate(name, pass, fn) {
		User.getByName(name, (err, user) => {
			if (err) return fn(err);
			if (!user.id) return fn();
			bcrypt.hash(pass, user.salt, (err, hash) => {
				if (err) return fn(err);
				if (hash === user.pass) return fn(null, user);
				fn();
			});
		});
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
