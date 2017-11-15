function parseField(field) {
	return field;
}

function getFieldVal(req, field) {
	let val = req.body;
	field.forEach(prop => {
		val = val[prop];
	});
	return val;
}

exports.required = field => {
	field = parseField(field);
	return function(req, res, next) {
		if (getFieldVal(req, field)) {
			next();
		} else {
			res.redirect('back');
		}
	};
};

exports.lengthAbove = (field, len) => {
  field = parseField(field);
  return function (req, res, next) {
    if (getFieldVal(req, field).length > len) {
      next();
    } else {
      res.redirect('back');
    }
  };
};
