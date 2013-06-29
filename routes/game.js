var mysql = require('mysql');
var url = require('url');
var common = require('../common.js'),
    CL = common.CL,
	sqlQuery = common.sqlQuery,
	resRenderUserName = common.resRenderUserName,
	sendHTMLFile = common.sendHTMLFile,
	sqlEscape = common.sqlEscape;

exports.myGamesMultiTable = function(req,res){
	//Debug section
	var dmG =true;
	var pH ='GetmyGames1-';
	
	var numOfQueries = 2;
	var tablesToPass = new Array(numOfQueries);
	CL(dmG,pH+'tablesToPass.length'+tablesToPass.length);
	
	var respondFunction = function(thisArray,indexValue){
		tablesToPass[indexValue]=thisArray;
		numOfQueries--;
		
		if(numOfQueries==0){
			resRenderUserName(req,res,'tables', { title: 'Your Open Games', listOfTables : tablesToPass})
		}
	}
	
	
	//Currently checks chess only by checking chessgamestate table
	//Check invites table when created
	var q1='select id, player1ID, player2ID from chessgamestate where winner=0 and (player1ID = '+req.session.user.id+ ' or player2ID = '+req.session.user.id+')';
	CL(dmG,pH+'q1:'+q1);
	sqlQuery('games',q1, true, function(fields,results){
		for(var i=0;i<results.length;i++){
			var thisID = results[i].id;
			//results[i].id="þ<a href=\"/games/chess?id="+thisID+"\">"+thisID+'</a>';
			results[i].id={
				filler:"þ",
				hrefValue:'/game/chess?id='+thisID,
				textValue:thisID
			}
			CL(dmG,pH+'q1-results[i].id new value:'+results[i].id);
		}
		
		thisTable=new Array('All games',fields,results);
		respondFunction(thisTable,1);
	});
	var q2='select id, player1ID, player2ID from chessgamestate where winner=0 and ((player1ID = '+req.session.user.id+ ' and moveNumber%2=0) or player2ID = '+req.session.user.id+' and moveNumber%2=1 )';
	
	CL(dmG,pH+'q2:'+q2);
	sqlQuery('games',q2, true, function(fields,results){
		CL(dmG,pH+'typeof(results):'+typeof(results));
		if(typeof(results) === undefined || typeof(results) === 'undefined'){
			thisTable=new Array('Games of my turn',fields,{});
			respondFunction(thisTable,0);
		}
		else{
			//for(var i=0;i<length(results);i++){
			results.forEach(function(resultsI){
				var thisID = resultsI.id;
				//results[i].id="þ<a href=\"/games/chess?id="+thisID+"\">"+thisID+'</a>';
				resultsI.id={
					filler:"þ",
					hrefValue:'/game/chess?id='+thisID,
					textValue:thisID
				}
				CL(dmG,pH+'q2-results[i].id new value:'+resultsI.id);
			});
			thisTable=new Array('Games of my turn',fields,results);
			respondFunction(thisTable,0);
		}
	});
}

exports.gameChess = function(req, res){
	var debugChess=false;
	var pH='gameChess-';
	var url_parts = url.parse(req.url, true);
	var boardStateTable=new Array();
	var sql = 'select gameState, id, specialPieces, winner, player1ID, player2ID, moveNumber from chessgamestate where id='+url_parts.query.id;
	sqlQuery('games',sql,true,function(fields,results){
			CL(debugChess,pH+'results.length:'+results.length);
			if (results.length!=1){
				CL(debugChess,pH+'in redirect:');
				res.redirect('/youfail');
				res.render('layout', {title:'You Fail'});
			}
			var eOR = results[0]; //expectedOneResult
			var gameState = eOR.gameState;
			var boardState = new Array(64);
			for(var i=0;i<gameState.length;i++){//2 being the number players in game
				var color = 'W';
				if (i>=gameState.length/2)
					color = 'B';
				if (gameState.length == 8*4)
					var strPiece = '';
					var piece = i % 16;
					switch(piece){
						case 0: strPiece = color + 'K'; break;
						case 1: strPiece = color + 'Q'; break;
						case 2:
						case 3: strPiece = color + 'B'; break;
						case 4: 
						case 5: strPiece = color + 'N'; break;
						case 6:
						case 7: strPiece = color + 'R'; break;
						default:strPiece = color + 'P'
					}
					boardState[gameState.charCodeAt(i)-60-1]=strPiece;
			}
			for(var i=0;i<boardState.length;i++){
				if(!boardState[i] && 0){
					boardState[i]=emptyTableCell;
				}
			}
			var numberOfColumns=8;
			var arrayTemp = new Array(numberOfColumns);
			for(var i=0;i<boardState.length;i++){
				arrayTemp[i%numberOfColumns]=boardState[i];
				if ((i % numberOfColumns) == numberOfColumns -1 ){
					boardStateTable.push(arrayTemp);
					arrayTemp = new Array(numberOfColumns);
				}
			}
			CL(debugChess,pH+'boardStateTable:'+boardStateTable);
			var myMove =false;
			if((eOR.moveNumber%2==1 && eOR.player1ID==req.session.user.id) || (eOR.moveNumber%2==0 && eOR.player2ID==req.session.user.id)){
				myMove=true;
			}
			resRenderUserName(req,res,'chessBoard',{title:'Chess Board', boardState : boardStateTable, indexValue:0, id:url_parts.query.id, myTurn:myMove})
		}
	);
};

exports.gameCreation = function(req, res){
	var dGC=false;
	CL(dGC,"gameCreation : Entrance");
	var sql = 'select id as ID, gameName as Name, maxNumberOfPlayers as numPlayers from gameList';
	CL(dGC,"gameCreation : First SQL Query");
	sqlQuery('games',sql,true,function(fields,results){
			CL(dGC,"gameCreation : Within the query")
			//waitForArray.push(results);
			resRenderUserName(req,res,'gameCreation',{title:'Create Game', games : results})
	});
	CL(dGC,"gameCreation : Entering loop to stay unless queries are completed");
	CL(dGC,"gameCreation : Sending response");
}

exports.skills = function(req,res){
	sendHTMLFile(res,'/public/skillCoverage.html');
}

exports.gameChessTest = function(req, res){
	//Send requires the following:
	//CSSs
	//JSs
	//JSONdoc

	//Initialize variables
	var arrCSSs = new Array();
	var arrJSs = new Array();
	var JSONdoc = new Array();
	
	//Populate CSS array
	arrCSSs.push('http://code.jquery.com/ui/1.10.0/themes/ui-darkness/jquery-ui.css');
	arrCSSs.push('../stylesheets/Chess.css');
	
	//Populate JS array
	arrJSs.push('http://code.jquery.com/jquery-latest.min.js');
	arrJSs.push('http://code.jquery.com/ui/1.10.0/jquery-ui.js');
	arrJSs.push('../javascripts/chessBoard.js');
	
	//I do not know wheather to send an array or string
	
	
	resRenderUserName(req,res,'boards',{title:'Game Test', CSSs : arrCSSs, JSs : arrJSs, JSONDoc:JSONdoc})
}