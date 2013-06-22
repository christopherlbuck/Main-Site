/**
 * Module dependencies.
 */

var mysql = require('mysql');
var url = require('url');
var emptyTableCell = '&nbsp;';
var debug=true,
	games = './games.js';
	
var common = require('../common.js'),
    CL = common.CL,
	sqlQuery = common.sqlQuery,
	sqlEscape = common.sqlEscape;


//app.post('/dnd/tags', ensureAuthenticated, function(req,res){
exports.dndTags = function(req,res){
	//Debug section
	var debugThis = false;
	var pH = 'PostDnDTags-';
	
	var q1='insert into notestag (name) values (\''+sqlEscape(req.body.newtagname)+'\')';
	CL(debugThis,pH+'q1:'+q1);
	sqlQuery('dnd',q1,false,function(){
		res.redirect('/dnd/notes');
	});
}


//app.post('/game/chess', ensureAuthenticated, function(req,res){
exports.gameChess = function(req,res){
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
	
}

//app.post('/dnd/notes',ensureAuthenticated, function(request, response){
exports.dndNotes = function(request, response){
	var sql='INSERT INTO notes (note, submittedByUserID) '+'VALUES(\''+sqlEscape(request.body.note)+'\','+request.session.user.id+')';
	if(request.body.note.length > 0){
		sqlQuery('dnd',sql, false, function(){
			response.redirect('/dnd/notes');
		});
	}
	else{
		response.redirect('/dnd/notes');
	}
}

//app.post('/login', function(req,res){
exports.login = function(req,res){
	//Debug section
	var dpLogin=false;
	var validLogin=false;

	//Local server w/o mySQL Debug
	var loginRedirectTest ='/';
	var loginRedirectTest = req.body.priorURL;
	if(req.body.username=='AJ'){
		req.session.userName=sqlEscape(req.body.username);
		req.session.user={
					id : -1
				}
		res.redirect(loginRedirectTest);
	}
	var sql='select count(*) as bool,id from userinfo where userName=\''+sqlEscape(req.body.username)+'\' and passwordHashed=\'' + sqlEscape(req.body.password)+'\'';
	sqlQuery('serverinfo',sql,true, function(fields,results){
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
	});
	
}

//app.post('/game/create',ensureAuthenticated, function(req,res){
exports.gameCreate = function(req,res){
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
}







	