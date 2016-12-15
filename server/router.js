function router(app, express, passport) {
	//переопределяем %
	var ejs = require('ejs');
	ejs.delimiter = "?";
	//подключаем ejs к express
 	app.set('view engine', 'ejs');

 	//подключаем статику
 	app.use(express.static(__dirname + "/../public"));

	//get запрос
	app.get('/', function(req, res) {
		//main тип пересылаемых данных
		// res.type('text/html');
		//позволяет пересылать текстовые данные
		// res.send('main page');
		//подключаем шаблон index (в путь views и ejs не писать)
		res.render('template', {page:"main", title: "Home", partial: "start-game"});
	});
	app.get('/index', function(req, res) {
		res.render("pages/index");
	});
	app.get('/profile', function(req, res) {
		res.render("pages/profile");
	});
	app.get('/rooms', function(req, res) {
		res.render("pages/rooms");
	});
	app.get('/game', function(req, res) {
		res.render("pages/game");
	});

	app.use(function(req, res){
		res.status(404);
		res.render('template', {page:"404", title: "404 error"});
	});

	app.use(function(err, req, res, next) {
		console.log(err);
		res.status(500);
		res.render('template', {page:"500", title: "500 error"});
	});

	// =====================================
   // LOGIN ===============================
   // =====================================
   // show the login form
   app.get('/login', function(req, res) {

	   // render the page and pass in any flash data if it exists
	   res.render('login.ejs', { message: req.flash('loginMessage') });
   });

   // process the login form
   // app.post('/login', do all our passport stuff here);

   // =====================================
   // SIGNUP ==============================
   // =====================================
   // show the signup form
   app.get('/signup', function(req, res) {

	   // render the page and pass in any flash data if it exists
	   res.render('signup.ejs', { message: req.flash('signupMessage') });
   });

   // process the signup form
   // app.post('/signup', do all our passport stuff here);

   // =====================================
   // PROFILE SECTION =====================
   // =====================================
   // we will want this protected so you have to be logged in to visit
   // we will use route middleware to verify this (the isLoggedIn function)
   app.get('/profile', isLoggedIn, function(req, res) {
	   res.render('profile.ejs', {
		   user : req.user // get the user out of session and pass to template
	   });
   });

   // =====================================
   // LOGOUT ==============================
   // =====================================
   app.get('/logout', function(req, res) {
	   req.logout();
	   res.redirect('/');
   });

   // route middleware to make sure a user is logged in

}
function isLoggedIn(req, res, next) {

   // if user is authenticated in the session, carry on
   if (req.isAuthenticated())
	   return next();

   // if they aren't redirect them to the home page
   res.redirect('/');
}
module.exports = router;
