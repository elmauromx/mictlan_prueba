var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger  = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport  = require('passport');
var session   = require('express-session');
var flash     = require('connect-flash');


//var routes = require('./routes/index');
var api = require('./routes/api');
var devices = require('./routes/devices');
var transactions= require('./routes/transactions');
var reports= require('./routes/reports');
var transactionsforms = require('./routes/transactionsforms');
require('dotenv').config();
//var main = require('./routes/main');
//necesario para utilizar los verbos put y delete en formularios
var methodOverride = require('method-override');
var MySQLStore = require('express-mysql-session')(session);

var app = express();
//app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/umd/'));
app.use('/fontawesome', express.static(__dirname + '/node_modules/font-awesome/'));
app.use('/selectize', express.static(__dirname + '/node_modules/selectize/dist/'));
app.use('/datatablesjs', express.static(__dirname + '/node_modules/datatables.net/js/'));
app.use('/datatablescss', express.static(__dirname + '/node_modules/datatables.net-dt/css/'));
app.use('/selectize', express.static(__dirname + '/node_modules/selectize/dist'));
app.use('/bootstrapvalidate', express.static(__dirname + '/node_modules/bootstrap-validate/dist'));
//app.use('/scripts', express.static(__dirname + '/node_modules/'));



//configuración para ejs
app.set('views', path.join(__dirname, 'views'));
app.engine("pug", require("pug").renderFile);
app.set('view engine','pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//console.log(process.env);

var options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port : 3306
};

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'AfPAQdqxrhBLiRDLFhpe3Dmy',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport);


//require('/routes/api.js')(app, passport);
// require('routes/routes.js')(app, passport);

//configuramos methodOverride
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  if (req.isAuthenticated())
    res.locals.displayName = req.session.passport.user.displayName;
  next();
});



// app.use(function(req, res, next) {
//     if (req.session.user == null){
// // if user is not logged-in redirect back to login page //
//         res.redirect('/sdn/login');
//     }   else{
//         next();
//     }
// });
//app.use('/', routes);
app.get('/tlacuilo/', authenticationMiddleware(),function (req, res) {
  // console.log(req.user);
   //console.log(req.isAuthenticated());
  res.render('main', { title: 'Hey', message: 'Hello there!' })
});

app.get('/tlacuilo/logs', authenticationMiddleware(),function (req, res) {
  // console.log(req.user);
   //console.log(req.isAuthenticated());
  res.render('logs');
});

app.get('/tlacuilo/login', function (req, res) {
  res.render('login'/*, { title: 'Hey', message: 'Hello there!' }*/)
});



app.get('/tlacuilo/logout', function (req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("/tlacuilo/login")
});


app.use('/tlacuilo/api', api);
app.use('/tlacuilo/devices', devices);
app.use('/tlacuilo/transactionsforms', transactionsforms);
app.use('/tlacuilo/transactions', transactions);
app.use('/tlacuilo/reports', reports);
//app.use('/sdn/main', main);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

function authenticationMiddleware () {
	return (req, res, next) => {
		//console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
	    if (req.isAuthenticated()) return next();
	    res.redirect('/tlacuilo/login')
	}
}

module.exports = app;
