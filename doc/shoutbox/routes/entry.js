const Entry = require('../lib/entry');

exports.list = (req, res, next) => {
	Entry.getRange(0, -1, (err, entries) => {
		if (err) throw next(err);

		res.render('entries', {
			title: 'Entries',
			entries: entries
		});
	});
};
