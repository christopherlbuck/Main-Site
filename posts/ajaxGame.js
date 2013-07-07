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
	
exports.submitMoveChess = function(req,res){
	var debugPC=true;
	var pH='submitMoveChess-';

	//console.log(req.body);
	res.contentType('json');
	//console.log(JSON.stringify({response:'json'}));
	
	//ajaxSubmittion
	aS=req.body;
	
	//query creation
	var q1 = "select moveNumber, gameState, specialPieces from chessgamestate where id="+sqlEscape(aS.id);
	CL(debugPC,pH+'q1:'+q1);
	sqlQuery('games', q1, true, function(fields,results){
		CL(debugPC,pH+'typeof(results[0]):'+typeof(results[0]));
		if( typeof(results[0]) != undefined || typeof(results[0]) != 'undefined'){
			if(results[0].gameState == aS.originalGameState){
				//No security
				var q1_2 = "insert into chessgamehistory (chessGameID, moveNumber, gameState) values ("+aS.id+","+(results[0].moveNumber+1)+",\'"+aS.chessGameState+"\')";
				var q1_3 = "update chessgamestate set moveNumber="+(results[0].moveNumber+1)+', gameState = \''+sqlEscape(aS.chessGameState)+'\', specialPieces = \''+ aS.specialPieces +'\' where id='+sqlEscape(aS.id);
				
				CL(debugPC,pH+'q1_2:'+q1_2);
				CL(debugPC,pH+'q1_3:'+q1_3);
				
				sqlQuery('games', q1_2, true, function(fields,results){});
				sqlQuery('games', q1_3, true, function(fields,results){});
				
				CL(debugPC,pH+''+aS.originalGameState);
				CL(debugPC,pH+''+sqlEscape(aS.chessGameState));
				CL(debugPC,pH+''+results[0].gameState);
				
				res.write(JSON.stringify({response:'json'}));
				res.end();
			}
			else{
				CL(debugPC,pH+''+aS.originalGameState);
				CL(debugPC,pH+''+results[0].gameState);
				
				res.write(JSON.stringify({response:'json'}));
				res.end();
			}
		}
		else{
			res.write(JSON.stringify({response:'json'}));
			res.end();
		}
	});
};





	