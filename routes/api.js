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

exports.login = function(req, res) {
    passport.authenticate('local')(req, res, function() {
        res.json({
            message: "Successfully Logged In"
        });
    })
};

exports.setHueInfo = function(req, res) {
    if (req.user) {
        req.user.bridgeIp = req.body.bridgeIp;
        req.user.hueUsername = req.body.hueUsername;

        req.user.save(function(err, user) {
            if (err) return;
            res.json({
                message: "Successfully saved hue information"
            });
        });
    }
};
