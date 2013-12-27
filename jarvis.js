
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var http = require('http');
var https = require('https')
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

var app = express();
var httpApp = express()

// https setup
var httpsOptions = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
};

// =========================================
// Config
// =========================================
httpApp.set('port', process.env.PORT || 8001);
httpApp.get("*", function (req, res, next) {
    res.redirect("https://" + req.headers.host + req.path);
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.logger('dev'));
// app.use(express.cookieParser('jarvis'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser('jarvis'));
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost/jarvis');

// =========================================
// Routes
// =========================================
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('*', routes.index);

//API
app.post('/api/register', api.register);

// http.createServer(httpApp).listen(httpApp.get('port'), function(){
// });

http.createServer(app).listen(app.get('port'), function(){
    console.log("Jarvis is listening on %d", app.get('port'));
});
