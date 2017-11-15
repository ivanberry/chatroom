module.exports = (fn, perpage = 10) => {
	return function(req, res, next) {
		let page = Math.max(parseInt(req.param('page') || '1', 10), 1) - 1;

		fn((err, total) => {
			if (err) throw next(err);

			req.page = res.locals.page = {
				number: page,
				perpage,
				from: page * perpage,
				to: page * perpage + perpage - 1,
				total,
				count: Math.ceil(total / perpage)
      };
      
      next();
		});
	};
};
