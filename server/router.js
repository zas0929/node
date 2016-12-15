function router(app, express, passport) {
	//переопределяем %
	var ejs = require('ejs');
	ejs.delimiter = "?";
	//подключаем ejs к express
 	app.set('view engine', 'ejs');

 	//подключаем статику
 	app.use(express.static(__dirname + "/../public"));
 ;

 	var dataToPage = {
 						partial:"start-game",
 					};
	
 	var userModel = require("./../models/user.js"); 
	//get запрос
	app.get('/', function(req, res) {
		//main тип пересылаемых данных
		// res.type('text/html');
		//позволяет пересылать текстовые данные
		// res.send('main page');
		//подключаем шаблон index (в путь views и ejs не писать)
		dataToPage.page = "main";
		dataToPage.title = "Home";
		dataToPage.auth = req.isAuthenticated();
		res.render('template', dataToPage);
	});
	// app.get('/index', function(req, res) {
	// 	res.render('template', {page:"index", title: "Home", partial: "start-game"} "pages/index");
	// });
	app.get('/profile', isLoggedIn, function(req, res) {
		dataToPage.page = "profile";
		dataToPage.title = "Profile";
		dataToPage.auth = req.isAuthenticated();

		userModel.findOne({_id:req.user._id}, function(err, user){
			dataToPage.user = user;
			res.render('template', dataToPage );
		})	
	});

	app.post('/profile', isLoggedIn, function(req, res) {
		userModel.findOne({_id:req.user._id}, function(err, user){
			console.log(req.body);
		})		
	});

	app.get('/rooms', isLoggedIn, function(req, res) {
		dataToPage.page = "rooms";
		dataToPage.title = "rooms";
		dataToPage.auth = req.isAuthenticated();
		res.render('template', dataToPage);
	});
	app.get('/game', isLoggedIn, function(req, res) {
		dataToPage.page = "game";
		dataToPage.title = "game";
		dataToPage.auth = req.isAuthenticated();
		res.render('template', dataToPage );
	});
	
	

	// =====================================
   // LOGIN ===============================
   // =====================================
   // show the login form
	app.post('/signin', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
   // process the login form
   // app.post('/login', do all our passport stuff here);

   // =====================================
   // SIGNUP ==============================
   // =====================================
   // show the signup form
  	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

    app.get('/logout', function(req, res) {
	   req.logout();
	   res.redirect('/');
   	});

   // route middleware to make sure a user is logged in
   app.use(function(req, res){
		res.status(404);
		res.render('template', {page:"404", title: "404 error"});
	});

	app.use(function(err, req, res, next) {
		console.log(err);
		res.status(500);
		res.render('template', {page:"500", title: "500 error"});
	});


   // process the signup form
   // app.post('/signup', do all our passport stuff here);

   // =====================================
   // PROFILE SECTION =====================
   // =====================================
   // we will want this protected so you have to be logged in to visit
   // we will use route middleware to verify this (the isLoggedIn function)
   // app.get('/profile', isLoggedIn, function(req, res) {
	  //  res.render('profile.ejs', {
		 //   user : req.user // get the user out of session and pass to template
	  //  });
   // });

   // =====================================
   // LOGOUT ==============================
   // =====================================


}
function isLoggedIn(req, res, next) {

   // if user is authenticated in the session, carry on
   if (req.isAuthenticated())
	   return next();

   // if they aren't redirect them to the home page
   res.redirect('/');
}
module.exports = router;
