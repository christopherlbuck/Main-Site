

/**
 * Module dependencies.
 */
var express = require('express'),
    passport = require('passport'),
    routes = require('./routes'),
    routesDND = require('./routes/dnd'),
    routesGame = require('./routes/game'),
	posts = require('./posts'),
	postsDND = require('./posts/dnd.js'),
	postsGame = require('./posts/game.js'),
    http = require('http'),
    path = require('path'),
    url = require('url'),
    LocalStrategy = require('passport-local').Strategy,
    common = require('./common'),
    CL = common.CL,
	sqlQuery = common.sqlQuery,
	sqlEscape = common.sqlEscape,
	sendHTMLFile = common.sendHTMLFile;
  


//Authentication section
var ensureAuthenticated = function(req, res, next) {
	var debugThis= false;
	var pH='ensureAuthenticated-';
  if (req.session.userName !== undefined) {
  	var urlParts = url.parse(req.url, true);
	var firstPath = urlParts.pathname.split('/')[1];
	var q1 = 'select count(*) as bool from usertags where name=\''+firstPath+'\'';
	var paths = urlParts.pathname.split('/').length;
	if(paths<3)next();
	sqlQuery('serverinfo',q1,true, function(fields,results){
		CL(debugThis,pH+'results[0].bool:'+results[0].bool);
		if(results[0].bool)return next();
		res.redirect('/youfail');
	});
  }
  else{
  	path=url.parse(req.url, true).path;
	CL(debugThis,pH+'path:'+path);
  	res.redirect('/login?urlPath='+path);
  }
  
}

//Website app variable
var app = express();

//Session requirements
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

// all environments
//app.set('port', process.env.PORT || 80);
app.set('port', 8081);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.set( "db", db );
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Get section 
app.get('/', routes.index);
app.get('/login',routes.login)

//Get section requiring to be logged in
app.get('/dnd/skill',ensureAuthenticated, routesDND.dndSkills);
app.get('/dnd/notes',ensureAuthenticated, routesDND.dndNotes);
app.get('/game/chess', ensureAuthenticated , routesGame.gameChess);
app.get('/game/create',ensureAuthenticated, routesGame.gameCreation);
//app.get('/game/myGames',ensureAuthenticated, routesGame.myGames);
app.get('/game/myGames',ensureAuthenticated, routesGame.myGamesMultiTable);

//Get every other page
//Having issues with the catch all blocks public requests
//app.get('*',routes.seriouslyyoufail);

//Post section
app.post('/dnd/tags', ensureAuthenticated, postsDND.dndTags);
app.post('/game/chess', ensureAuthenticated, postsGame.gameChess);
app.post('/dnd/notes',ensureAuthenticated, postsDND.dndNotes);
app.post('/login', posts.login);
app.post('/game/create',ensureAuthenticated, postsGame.gameCreate);


//Web server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server (app) listening on port ' + app.get('port'));
});





	