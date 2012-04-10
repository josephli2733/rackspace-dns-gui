var db = require('./db');

var auth = module.exports = function auth() {
};

var rsdb = new db();

auth.prototype.checkSessionDns = function(req, res, next) {
	if (req.session.dns_name) {
		console.log("session exists " + req.session.dns_name);
		console.log("auth token " + req.session.dns_auth_token);
		console.log("acct num " + req.session.dns_acct_num);
		next();
	} else {
		req.flash('error', 'Session Expired: Please login again.');
		res.redirect('/login');
	}
};

auth.prototype.authenticate = function(req, res, next) {
	rsdb.getKey(req.body.username, req.body.password, function(err, data) {
		if (err)
			throw err;
		if (data) {
			var dbres = JSON.parse(data);
			if (dbres.results.length == 0) {
				req.flash('error', 'Incorrect Credentials: Please login again.');
				res.redirect('/login');
			} else {
				req.session.dns_name = dbres.results[0].name;
				req.session.dns_key = dbres.results[0].key;
				next();
			}
		} else {
			req.flash('error', 'Incorrect Credentials: Please login again.');
			res.redirect('/login');
		}
	});
};

auth.prototype.logout = function(req, res, next) {
	req.session.dns_name = null;
	req.session.dns_auth_token = null;
	req.session.dns_acct_num = null;
	req.session.dns_key = null;
	next();
};
