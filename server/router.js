function router(app) {
	//get запрос

	app.get('/', function(req, res) {
		console.log("request /");
		//main тип пересылаемых данных
		res.type('text/plain');
		//позволяет пересылать текстовые данные
		res.send('main page');
	});
	app.get('/game', function(req, res) {
		console.log("game");
		res.type('text/plain');
		res.send('game page');
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