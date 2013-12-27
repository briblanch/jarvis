
/*
 * GET home page.
 */
var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated) {
        return next();
    }
    res.redirect('/');
};

exports.index = function(req, res) {
    res.render('index');
};

exports.partials = function(req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};

