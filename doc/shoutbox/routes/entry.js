const Entry = require('../lib/entry');

exports.list = (req, res, next) => {
	let page = req.page;
	Entry.getRange(page.from, page.to, (err, entries) => {
		if (err) throw next(err);

		res.render('entries', {
			title: 'Entries',
			entries: entries
		});
	});
};
