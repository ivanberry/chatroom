const redis = require('redis');
const db = redis.createClient();

class Entry {
	constructor(obj) {
		Object.assign(this, obj);
    }
    
    static getRange(from, to, fn) {
        db.lrange('entries', from, to, (err, items) => {
            if (err) return fn(err);
            let entries = [];
            entries = items.map(item => JSON.parse(item));
            fn(null, entries);
        });
    }

	save(fn) {
		let entryJSON = JSON.stringify(this);

		db.lpush('entries', entryJSON, err => {
			if (err) return fn(err);
			fn();
		});
	}
}

module.exports = Entry;
