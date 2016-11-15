function router(app, express) {
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
	})

	app.use(function(err, req, res, next) {
		console.log(err);
		res.status(500);
		res.render('template', {page:"500", title: "500 error"});
	})

}
module.exports = router;
