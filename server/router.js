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
		res.render('template', {page:"main", title: "Главная"});
	});
	app.get('/about', function(req, res) {
		res.render('template', {page:"about", title: "О нас"});
	});

	app.use(function(req, res){
		res.type("text/plain");
		res.status(404);
		res.send("<h1>404 - not found</h1>")
	})

	app.use(function(err, req, res, next) {
		res.type('text/plain');
		res.status(500);
		res.send('500 - Server error');
	})

} 
module.exports = router;