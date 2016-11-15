var URL = require('url');

module.exports = function(app) {
	app.enable('trust proxy');
	app.request.__proto__.href = function(relative) {
		if (relative && (relative.startsWith('http') || relative.startsWith('//'))) return relative;
		var href = URL.format({
			protocol: this.get('x-forwarded-proto') || this.protocol,
			host: this.get('host'),
			pathname: this.path,
			query: this.query
		});
		if (relative) href = URL.resolve(href, relative);
		return href;
	};
	return app;
};

