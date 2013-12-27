var passport = require('passport');
var User = require('../models/user');

exports.register= function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if (err) {
            res.json({
                message: 'User already exists'
            });
            return;
        }

        passport.authenticate('local')(req, res, function() {
            res.json({
                loggedIn: true
            });
        });
    });
};
