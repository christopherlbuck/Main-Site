
/**
 * Module dependencies.
 */
var express = require('express')
  , passport = require('passport')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , url = require('url')
  , LocalStrategy = require('passport-local').Strategy;
  


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
var app = express(),
	mysql = require('mysql');

//Ajax app variable
//Not needed

//Session requirements
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

//Session logic
passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


//SQL connection to one database	
var client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'akrontacos',
	database: 'world'
});
//client.connect();
var dbHost = 'localhost';
var dbUser = 'root';
var dbPassword = 'akrontacos';
var dbTable = 'world';

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

//app.get('/users', user.list);//?
//app.get('/dnd/notes', routes.dnd_notes);//Moved to authenticated section
//app.get('/dnd/notes1', routes.dnd);//?
//app.get('/game/chess' , routes.gameChess); //Moved to authenticated section
app.get('/login',routes.login)

//Get section requiring to be logged in
//app.get('/dnd/skill',ensureAuthenticated, routes.skills);
app.get('/dnd/skill',ensureAuthenticated, function(req,res) {
	var thingsToDo = 2;
	var setThisHeader = function(){
		res.setHeader("Content-Type", "text/html");
		thingsToDo--;
		respond(endIt);
	}
	var writeThisHeader = function(){
		res.writeHeader(200, {"Content-Type": "text/html"});  
		thingsToDo--;
		respond(endIt);
	}	
	var respond = function(callback){
		if (thingsToDo==0){
			fs = require('fs')
			fs.readFile(__dirname+'/public/skillCoverage.html',function(err,data){
				if (err) throw err;
				res.write(data);
				callback();
			});
		}
	};
	var endIt = function(){
		res.end();
	}
  	setThisHeader();
	writeThisHeader();
});
app.get('/dnd/notes',ensureAuthenticated, routes.dnd_notes);
app.get('/game/chess', ensureAuthenticated , routes.gameChess);
app.get('/game/create',ensureAuthenticated, routes.gameCreation);
app.get('/game/myGames',ensureAuthenticated, routes.myGames);
app.get('/game/myGames1',ensureAuthenticated, routes.myGamesMultiTable);
//app.get('/dnd',ensureAuthenticated , routes.dnd);

//Get every other page
//app.get('*',routes.seriouslyyoufail);

//Post section
app.post('/dnd/tags', ensureAuthenticated, function(req,res){
	//Debug section
	var debugThis = false;
	var pH = 'PostDnDTags-';
	
	var q1='insert into notestag (name) values (\''+sqlEscape(req.body.newtagname)+'\')';
	CL(debugThis,pH+'q1:'+q1);
	sqlQuery('dnd',q1,false,function(){
		res.redirect('/dnd/notes');
	});
});


app.post('/game/chess', ensureAuthenticated, function(req,res){
	//Debug section
	var debugPC=true;
	var pH='PostChessMove-';
	
	var url_parts = url.parse(req.url, true);
	//console.log(url_parts.query);
	CL(debugPC,pH+'req.body.gameID:'+req.body.gameID);
	var q1='select moveNumber, gameState, player1ID, player2ID, winner from chessgamestate where id='+sqlEscape(req.body.gameID);
	CL(debugPC,pH+'q1:'+q1);
	sqlQuery('games',q1, true,function(fields,results){
		previousMove=results[0].gameState;
		//In case the movement takes a piece, remove that piece first
		CL(debugPC,pH+'req.body.lbFirst:'+req.body.lbFirst);
		var r0 = String.fromCharCode(60);
		var r1 = String.fromCharCode((parseInt(req.body.lbFirst)+60));
		CL(debugPC,pH+'String.fromCharCode(req.body.lbFirst+60):'+r1);
		CL(debugPC,pH+'req.body.lbSecond:'+req.body.lbSecond);
		var r2 = String.fromCharCode((parseInt(req.body.lbSecond)+60));
		CL(debugPC,pH+'String.fromCharCode(req.body.lbSecond+60):'+r2);
		thisMove=results[0].gameState.replace(r2,r0);
		//Move the piece
		thisMove=thisMove.replace(r1,r2);
		CL(debugPC,pH+'previousMove:'+previousMove);
		CL(debugPC,pH+'thisMove    :'+thisMove);
		
		//Decide valid if the move is valid
		var validMove=true;
		
		//Check to see if it's the currently logged in user
		if(req.session.user.id!=results[0]['player'+((results[0].moveNumber%2)+1)+'ID'])validMove=false;
		CL(debugPC,pH+'req.session.user.id:'+req.session.user.id);
		var whosTurn='player'+((results[0].moveNumber%2)+1)+'ID';
		CL(debugPC,pH+'whosTurn:'+whosTurn);
		var whosTurnDB=results[0][whosTurn];
		CL(debugPC,pH+'whosTurnDB:'+whosTurnDB);
		
		//Check to see if a move has been played
		if(previousMove==thisMove)validMove=false;
		
		//Check to see if there is a winner
		if(results[0].winner!=0)validMove=false;
		
		var q2='update chessgamestate set moveNumber = '+(results[0].moveNumber+1)+', gameState = \''+thisMove+'\' where id='+sqlEscape(req.body.gameID);
		CL(debugPC,pH+'q2:'+q2);
		CL(debugPC,pH+'validMove:'+validMove);
		if(validMove){
			sqlQuery('games',q2,false,function(){
				res.redirect('/game/chess?id='+req.body.gameID);
			});
		}
		else{
			res.redirect('/game/chess?id='+req.body.gameID);
		}
	});
	
});

app.post('/dnd/notes',ensureAuthenticated, function(request, response){
  var client = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
	database: 'dnd'
	});
	var sql='INSERT INTO notes (note, submittedByUserID) '+'VALUES(\''+sqlEscape(request.body.note)+'\','+request.session.user.id+')';
	if(request.body.note.length > 0)
	sqlQuery('dnd',sql, false, function(){
		response.redirect('/dnd/notes');
	});
});

app.post('/login', function(req,res){
	var dpLogin=false;
	var validLogin=false;
	var client = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
	database: 'serverinfo'
	});
	
	var loginRedirectTest ='/game/chess?id=5';
	CL(dpLogin,'req.url:'+req.url);
	var loginRedirectTest = req.body.priorURL;
	
	CL(dpLogin,'login-referer:'+loginRedirectTest);
	
	CL(dpLogin,'postLogin value of req.username:'+req.body.username);
	CL(dpLogin,'postLogin value of req.password:'+req.body.password);
	var sql='select count(*) as bool,id from userinfo where userName=\''+sqlEscape(req.body.username)+'\' and passwordHashed=\'' + sqlEscape(req.body.password)+'\'';
	CL(dpLogin,'postLogin value of sql:'+sql);
	client.query(sql,
		function(err, results, fields) {
			CL(dpLogin,'My login result is:'+results[0].bool);
			if(results[0].bool){
				req.session.userName=sqlEscape(req.body.username);
				req.session.user={
					id : results[0].id
				}
				CL(dpLogin,'postLogin value in sql-results[0].id'+results[0].id);
				CL(dpLogin,'postLogin value in sql-req.session.userId'+req.session.userId);
				//res.redirect('/');
				res.redirect(loginRedirectTest);
			}
			else{
				console.log('App.js/login post: req.session.userName value:'+req.session.userName);
				res.redirect('/login');
			}
	}
);
	client.end()
	
});

app.post('/game/create',ensureAuthenticated, function(req,res){
	//Debug section
	var debugCR =false;
	CL(debugCR,'PostCreation-req.body.gameSelected:'+req.body.gameSelected);
	CL(debugCR,'PostCreation-req.body.dropNumPlayers:'+req.body.dropNumPlayers);
	for(var i=0;i<(req.body.dropNumPlayers)-1;i++){
		CL(debugCR,'PostCreation-req.body.challengerPlayer'+(i+1)+':'+req.body["challengerPlayer"+(i+1)]);
	}
	
	//Get gameName from ID
	var q1 = 'select gameName from gamelist where id='+sqlEscape(req.body.gameSelected);
	CL(debugCR,'PostCreation-q1:'+q1);
	sqlQuery('games',q1,true,function(fields,results){
		CL(debugCR,'PostCreation-inq1-q1:'+typeof(results));
		CL(debugCR,'PostCreation-inq1-q1.gameName:'+results[0].gameName);
		
		//Concat pieces of game creation SQL syntax
		var gameName=results[0].gameName;
		var q2='select gameState from '+results[0].gameName+'gamestate where id=1';
		var q2='insert into '+gameName+'gamestate (player1ID';
		//Additional player(s)
		for(var i=0;i<(req.body.dropNumPlayers)-1;i++){
			q2+=',player'+(i+2)+'ID';
		}
		q2+=') values ('+req.session.user.id;
		//Additional player(s) value(s) taken from POST
		for(var i=0;i<(req.body.dropNumPlayers)-1;i++){
			q2+=','+sqlEscape(req.body['challengerPlayer'+(i+1)]);
		}
		q2+=')';
		
		CL(debugCR,'PostCreation-inq1-q2:'+q2);
		
		sqlQuery('games',q2,false,function(){;});
		
		//TODO
		//Write addition query to redirect to the newly created game
		res.redirect('/game/create');
	});
	CL(debugCR,'PostCreation-q1 return typeof:'+ typeof(q1r));
});

//Ajax server


//Web server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});





//Required functions for
//	Debug					:	CL(booleanToPrint,TextToPrint)
//	MySQL queries			:	sqlQuery(database,query,booToReturnFields)
//	Taking input from POSTs	:	sqlEscape

var sqlEscape = function(stringThis){
	if(typeof(stringThis)== 'undefined'){
		return '';
	}
    return stringThis.replace(/['";]/g, function (match) {
        return '\\' + match;
    });
};

var sqlQuery = function(databaseName,SQLquery, boolReturn, callback){
	//Debug section
	var debugSQLQ=false;
	var pH='sqlQuery-';//prompt Header
	
	var client = mysql.createConnection({
	    host: dbHost,
	    user: dbUser,
	    password: dbPassword,
		database: databaseName
	});
	
	//Body of function
	var arrReturn = new Array();
	var timePeriod=10000;
	client.query(SQLquery,
		function(err, results, fields) {
			CL(debugSQLQ,pH+'Inside of Client.query arrReturn.length:'+arrReturn.length);
			CL(debugSQLQ,pH + 'typeof(arrReturn):'+typeof(arrReturn));
			CL(debugSQLQ,pH + 'typeof(arrReturn[0]):'+typeof(arrReturn[0]));
			if(boolReturn==true){
				callback(fields,results);
			}
			else{
				callback();
			}
			client.end();
		}
	);

}


var CL = function(booleanValue, write){
	if(booleanValue){
		console.log(write);
	}
}


	