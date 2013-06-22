var mysql = require('mysql');
var url = require('url');
var common = require('../common.js'),
    CL = common.CL,
	sqlQuery = common.sqlQuery,
	resRenderUserName = common.resRenderUserName,
	sendHTMLFile = common.sendHTMLFile,
	sqlEscape = common.sqlEscape;

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