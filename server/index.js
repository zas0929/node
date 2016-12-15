var config = require("./../config");
//подключаем express
var express = require("express");

var app = express();

var router = require("./router.js");

var port     = process.env.PORT || config.get("port");
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');




// configuration ===============================================================
mongoose.connect("mongodb://localhost/"+config.get("dbname")); // connect to our database

require('./../config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
// require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


function server(config) {

		// console.log('I am '+serverName+' !');
	router(app, express, passport);

	app.listen(config.get("port"), function() {
		console.log("I am ready on port " +config.get("port"));
	})
}

module.exports = server;
