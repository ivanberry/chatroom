/* GET home page. */
exports.index = (req, res) => {
	res.render('index', { title: 'Express' });
};

exports.notFound = (req, res) => {
	res.status(404).format(
		{
			html: () => {
				res.render('404');
			}
		},
		{
			json: () => {
				res.end({
					messag: 'Resource not found'
				});
			}
		},
		{
			xml: () => {
				res.write('<error>\n');
				res.write(' <message>Resource not found</message>\n');
				res.end('</error>\n');
			}
		}
	);
};
