
//Required functions for
//	Debug					:	CL(booleanToPrint,TextToPrint)
//	MySQL queries			:	sqlQuery(database,query,booToReturnFields)
//	Taking input from POSTs	:	sqlEscape

var mysql = require('mysql'),
	dbHost = 'localhost',
	dbUser = 'root',
	dbPassword = 'akrontacos',
	dbTable = 'world';

exports.sqlEscape = function(stringThis){
	if(typeof(stringThis)== 'undefined'){
		return '';
	}
    return stringThis.replace(/['";]/g, function (match) {
        return '\\' + match;
    });
};

exports.sqlQuery = function(databaseName,SQLquery, boolReturn, callback){
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


exports.CL = function(booleanValue, write){
	if(booleanValue){
		console.log(write);
	}
}

exports.sendHTMLFile = function(res,fileLocation) {
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
			//fs.readFile(__dirname+'/public/skillCoverage.html',function(err,data){
			fs.readFile(__dirname+fileLocation,function(err,data){
			
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
}

exports.resRenderUserName = function(req,res,rendering,list){
	if (typeof(req.session.userName) != 'undefined'){
		list.userName=req.session.userName;
	}
	res.render(rendering,list);
}


	