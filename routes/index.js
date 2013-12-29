
/*
 * GET home page.
 */
exports.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

exports.index = function(req, res) {
    res.render('index');
};

exports.partials = function(req, res) {
    var name = req.params.name;
    if (name == 'jarvis') {
        exports.ensureAuthenticated(req, res, function() {
            res.render('partials/jarvis')
        });
    } else {
        res.render('partials/' + name);
    }
};

