var mysql = require('mysql');
var output = '';
var url = require('url');
var emptyTableCell = '&nbsp;';
var debug=true,
	games = './games.js';
	
var common = require('../common'),
    CL = common.CL,
	sqlQuery = common.sqlQuery,
	sqlEscape = common.sqlEscape;
	
exports.myGames = games.myGames;
exports.gameChess = games.gameChess;





var resRenderUserName = function(req,res,rendering,list){
	var debugThisSection = false;
	CL(debugThisSection, 'resRenderUserName: reached.')
	CL(debugThisSection, 'req.session.userName is of type :'+typeof(req.session.userName))
	CL(debugThisSection, 'req.session.userName has the current value of:'+req.session.userName)
	CL(debugThisSection, 'rendering value:'+rendering)
	CL(debugThisSection, 'list value:'+list)
	CL(debugThisSection, 'list value is of type :'+typeof(list))
	if (typeof(req.session.userName) != 'undefined'){
		list.userName=req.session.userName;
	}
	res.render(rendering,list);
}

var client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'akrontacos',
	database: 'world'
});

var dbHost = 'localhost';
var dbUser = 'root';
var dbPassword = 'akrontacos';
var dbTable = 'world';


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
			CL(dmG,pH+'results[i].id new value:'+results[i].id);
		}
		
		thisTable=new Array('All games',fields,results);
		respondFunction(thisTable,1);
	});
	var q2='select id, player1ID, player2ID from chessgamestate where winner=0 and ((player1ID = '+req.session.user.id+ ' and move%2==0) or player2ID = '+req.session.user.id+' and move%2==1 )';
	
	CL(dmG,pH+'q1:'+q2);
	sqlQuery('games',q2, true, function(fields,results){
		CL(dmG,pH+'typeof(results):'+typeof(results));
		if(typeof(results) != undefined){
			for(var i=0;i<results.length;i++){
				var thisID = results[i].id;
				//results[i].id="þ<a href=\"/games/chess?id="+thisID+"\">"+thisID+'</a>';
				results[i].id={
					filler:"þ",
					hrefValue:'/game/chess?id='+thisID,
					textValue:thisID
				}
				CL(dmG,pH+'results[i].id new value:'+results[i].id);
			}
			
			thisTable=new Array('Games of my turn',fields,results);
			respondFunction(thisTable,0);
		}
		else{
			thisTable=new Array('Games of my turn',fields,{});
			respondFunction(thisTable,0);
		}
	});
}


exports.seriouslyyoufail = function(req,res){
	//Debug section
	var debugThis = false;
	var pH='SeriouslyYouFail-';
	
	//res.render('layout', {title:'You Fail'});
	var q1='select name from youfail, (SELECT FLOOR(MAX(youfail.id) * RAND()) AS randId FROM youfail) AS someRandId WHERE youfail.id = someRandId.randId+1 	'
	CL(debugThis,pH+'q1:'+q1);
	sqlQuery('serverinfo',q1, true, function(fields,results){
		CL(debugThis,pH+'result:'+results);
		resRenderUserName(req,res,'index',{title: 'You Fail', message: results[0].name});
	});
}

exports.login = function(req,res){
	//res.render('login',{title: 'Login'})
	resRenderUserName(req,res,'login',{title: 'Login', referred : url.parse(req.url, true).query.urlPath})
};

exports.index = function(req, res){
  //res.render('index', { title: 'Express' });
  resRenderUserName(req,res,'index',{ title: 'Express', message :'' })
};

exports.dnd = function(req, res){
  //var result;
  var sendTableFields = new Array();
  var sendResults = new Array();
  //Get note list
  var client = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
	database: 'dnd'
	});
	var sql = 'select date_format(dateTime,\'%Y-%m-%d %r \') as \'Date added\' , note as Note from notes order by dateTime desc';
  client.query(sql,
   function(err, results, fields) {
    if (err) throw err;
	//console.log(String.fromCharCode(1))
	sendResults= results.slice(0);
	sendTableFields = fields.slice(0);
	//console.log(fields);
	res.render('DND', { title: 'DnD Stuff', tableFields : fields , tableData : results, additionForm : {}});
   }
  );
  client.end();
  //console.log(sendTableFields);
  
  //Get not addition list
  var sendAddition = new Array();
    var client = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
	database: 'dnd'
	});
	var sql = 'select * from notesaddition order by id';
  client.query(sql,
   function(err, results, fields) {
    if (err) throw err;
	sendAddition = results;
   }
  );
  client.end();
  res.render('DND', { title: 'DnD Stuff', tableFields : {} , tableData : {}, additionForm : sendAddition});
};

exports.dnd_notes = function(req, res){
  //var result;
  var sendTableFields = new Array();
  var sendResults = new Array();
  //Get note list
  var client = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
	database: 'dnd'
	});
	var sql = 'select id,date_format(dateTime,\'%Y-%m-%d %r \') as \'Date added\' , note as Note, submittedByUserID as User from notes order by dateTime desc';
  client.query(sql,
   function(err, results, fields) {
    if (err) throw err;
	sendResults= results.slice(0);
	sendTableFields = fields.slice(0);
	var q1 = 'select id, name from notestag where active=1';
	sqlQuery('dnd',q1, true, function(q1fields,q1results){
		resRenderUserName(req,res,'DND', { title: 'DnD Stuffs', tableFields : fields , tableData : results,inputForm:'', tags : q1results});
	});
	
   }
  );
  client.end();
  //console.log(sendTableFields);
  
  //Get not addition list
  var sendAddition = new Array();
    var client = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
	database: 'dnd'
	});
	var sql = 'select * from notesaddition order by id';
  client.query(sql,
   function(err, results, fields) {
    if (err) throw err;
	sendAddition = results;
   }
  );
  client.end();
};

exports.gameChess = function(req, res){
	var debugChess=false;
	var pH='gameChess-';
	var client = mysql.createConnection({
		host: dbHost,
		user: dbUser,
		password : dbPassword,
		database : 'games'
	})
	var url_parts = url.parse(req.url, true);
	//console.log(url_parts.query);
	var boardStateTable=new Array();
	var sql = 'select gameState, id, specialPieces, winner, player1ID, player2ID, moveNumber from chessgamestate where id='+url_parts.query.id;
	//var sql ='select * from chessgamestate';
	client.query(sql,
		function(err, results, fields) {
			if (err) throw err;
			//CL(debugChess,pH+'typeof(results[0].gameState):'+typeof(results[0].gameState));
			CL(debugChess,pH+'results.length:'+results.length);
			if (results.length!=1){
				CL(debugChess,pH+'in redirect:');
				res.redirect('/youfail');
				res.render('layout', {title:'You Fail'});
			}
	//console.log(String.fromCharCode(1))
	//res.render('DND', { title: 'DnD Stuff', tableFields : fields , tableData : results });
			//console.log(results);
			var eOR = results[0]; //expectedOneResult
			var gameState = eOR.gameState;
			//console.log(gameState.charCodeAt(0)-60);
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
			//console.log(boardStateTable);
			CL(debugChess,pH+'boardStateTable:'+boardStateTable);
			//res.render('chessBoard',{title:'Chess Board', boardState : boardStateTable})
			resRenderUserName(req,res,'chessBoard',{title:'Chess Board', boardState : boardStateTable, indexValue:0, id:url_parts.query.id})
		}
	);
	client.end();
	
};

exports.gameCreationStatic = function(req, res){
	var dGC=true;
	CL(dGC,"gameCreation : Entrance")
	var waitForArray = new Array();
	var client = mysql.createConnection({
		host: dbHost,
		user: dbUser,
		password : dbPassword,
		database : 'games'
	})
	var sql = 'select id as ID, gameName as Name, maxNumberOfPlayers as numPlayers from gameList';
	CL(dGC,"gameCreation : First SQL Query");
	client.query(sql,
		function(err, results, fields) {
			CL(dGC,"gameCreation : Within the query")
			//waitForArray.push(results);
			resRenderUserName(req,res,'gameCreation',{title:'Create Game', games : results})
		}
		
	);
	var numberOfQueries = 1;
	CL(dGC,"gameCreation : Entering loop to stay unless queries are completed");
	//while(waitForArray.length < numberOfQueries);
	CL(dGC,"gameCreation : Sending response");
	//resRenderUserName(req,res,'gameCreation',{title:'Create Game', games:waitForArray[0]})
	client.end();
}

exports.gameCreation = function(req, res){
	var dGC=false;
	CL(dGC,"gameCreation : Entrance");
	var waitForArray = new Array();
	var client = mysql.createConnection({
		host: dbHost,
		user: dbUser,
		password : dbPassword,
		database : 'games'
	})
	var sql = 'select id as ID, gameName as Name, maxNumberOfPlayers as numPlayers from gameList';
	CL(dGC,"gameCreation : First SQL Query");
	client.query(sql,
		function(err, results, fields) {
			CL(dGC,"gameCreation : Within the query")
			//waitForArray.push(results);
			resRenderUserName(req,res,'gameCreation',{title:'Create Game', games : results})
		}
		
	);
	var numberOfQueries = 1;
	CL(dGC,"gameCreation : Entering loop to stay unless queries are completed");
	//while(waitForArray.length < numberOfQueries);
	CL(dGC,"gameCreation : Sending response");
	//resRenderUserName(req,res,'gameCreation',{title:'Create Game', games:waitForArray[0]})
	client.end();
}



exports.skills = function(req,res){
	//Debug section
	var dT = true;
	var pH = 'skills-';
	
	
	/*fs = require('fs');
	fs.readFile(__dirname +'/../public/pages/skillCoverage.txt', function (err, html) {
	    if (err) {
	        throw err; 
	    }       
		CL(dT,pH+'fs:'+fs);
		res.writeHeader(200, {"Content-Type": "text/html"});  
		res.write(fs);
		res.end();
		});*/
	res.sendfile(__dirname+'../public/pages/skillCoverage.txt');
	//resRenderUserName(req,res,'layout',{title:'Skills'})
}

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

exports.myGames = function(req,res){
	//Debug section
	var dmG =true;
	var pH ='GetmyGames-';
	
	//Currently checks chess only by checking chessgamestate table
	//Check invites table when created
	var q1='select id, player1ID, player2ID from chessgamestate where winner=0 and (player1ID = '+req.session.user.id+ ' or player2ID = '+req.session.user.id+')';
	CL(dmG,pH+'q1:'+q1);
	sqlQuery('games',q1, function(fields,results){
		for(var i=0;i<results.length;i++){
			var thisID = results[i].id;
			//results[i].id="þ<a href=\"/games/chess?id="+thisID+"\">"+thisID+'</a>';
			results[i].id={
				filler:"þ",
				hrefValue:'/game/chess?id='+thisID,
				textValue:thisID
			}
			CL(dmG,pH+'results[i].id new value:'+results[i].id);
		}
		resRenderUserName(req,res,'DND', { title: 'Your Open Games', tableFields : fields , tableData : results})
	});
}