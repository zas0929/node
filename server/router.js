function router(app, express, passport, io) {
    //переопределяем %
    var ejs = require('ejs');
    ejs.delimiter = "?";
    //подключаем ejs к express
    app.set('view engine', 'ejs');

    //подключаем статику
    app.use(express.static(__dirname + "/../public"));

    var dataToPage = {
        partial: "start-game",
    };

    var userModel = require("./../models/user.js");

    app.get('/', function(req, res) {

        dataToPage.page = "main";
        dataToPage.title = "Home";
        dataToPage.auth = req.isAuthenticated();
        res.render('template', dataToPage);
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        dataToPage.page = "profile";
        dataToPage.title = "Profile";
        dataToPage.auth = req.isAuthenticated();

        userModel.findOne({
            _id: req.user._id
        }, function(err, user) {
            dataToPage.user = user;
            res.render('template', dataToPage);

        })
    });

    app.post('/profile', isLoggedIn, function(req, res) {
        userModel.findOne({
            _id: req.user._id
        }, function(err, user) {
            if (err) {
                res.send("error");
                return;
            }
            user.local.email = req.body.email;
            // user.local.password = user.generateHash(req.body.password);
            user.local.nick = req.body.nick;
            user.local.phone = req.body.phone;
            user.local.fname = req.body.fname;
            user.local.lname = req.body.lname;
            user.save(function(err) {
                if (!err) {
                    res.send("ok");
                    return;
                }
                res.send('error');
            })
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

        res.render('template', dataToPage);
    });

    io.on('connection', function(socket) {
        if (dataToPage.auth) {
            console.log('a user connected');
            console.log(dataToPage.user.local.email + " joined to game");
            var userCheck;
            if (dataToPage.user.local.nick) {
                userCheck = dataToPage.user.local.nick;
            } else {
                userCheck = dataToPage.user.local.email;
            }

            io.emit("new user", userCheck);
            socket.on('user typing', function() {
                console.log(userCheck + ' typing...');
                socket.broadcast.emit("user typing", userCheck + ' typing...')
            })

            socket.on('chat message', function(msg) {
                console.log(userCheck + ': ' + msg);
                io.emit('chat message', userCheck + " : " + msg);
            });
            socket.on('disconnect', function() {
                console.log('user disconnected');
                console.log(userCheck + " disconnected");
                io.emit("user out", userCheck);
            });
        }
    });

    app.post('/signin', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.use(function(req, res) {
        res.status(404);
        dataToPage.page = "404";
        dataToPage.title = "404 error";
        dataToPage.auth = req.isAuthenticated();
        res.render('template', dataToPage);
    });

    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(500);
        dataToPage.page = "500";
        dataToPage.title = "Server Error";
        dataToPage.auth = req.isAuthenticated();
        res.render('template', dataToPage);
    });

}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
module.exports = router;
