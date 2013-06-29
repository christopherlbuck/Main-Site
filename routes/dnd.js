var mysql = require('mysql');
var url = require('url');
var common = require('../common.js'),
    CL = common.CL,
	sqlQuery = common.sqlQuery,
	resRenderUserName = common.resRenderUserName,
	sendHTMLFile = common.sendHTMLFile,
	sqlEscape = common.sqlEscape;
	
exports.dndIndex = function(req, res){
	//Debug section
	var d=false;
	var pH='dndIndex-';
}

exports.dndNotes = function(req, res){
	//Debug section
	var d=false;
	var pH='dndNotes-';

  //Get note list
  var sql = 'select notes.id,date_format(dateTime,\'%Y-%m-%d %r \') as \'Date added\' , note as Note, userName as User from dnd.notes as notes join serverinfo.userinfo as user on user.id=notes.submittedByUserID order by dateTime desc';
  CL(d,pH+'sql:'+sql);
  sqlQuery('dnd',sql,true, function(fields,results){
	var q1 = 'select id, name from notestag where active=1';
	sqlQuery('dnd',q1, true, function(q1fields,q1results){
		resRenderUserName(req,res,'DND', { title: 'DnD Stuffs', tableFields : fields , tableData : results,inputForm:'', tags : q1results});
	});
   });
};

exports.dndSkills = function(req,res){
	sendHTMLFile(res,'/public/skillCoverage.html');
}
