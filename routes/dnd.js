var mysql = require('mysql');
var url = require('url');
var common = require('../common.js'),
    CL = common.CL,
	sqlQuery = common.sqlQuery,
	resRenderUserName = common.resRenderUserName,
	sendHTMLFile = common.sendHTMLFile,
	sqlEscape = common.sqlEscape;

exports.dndNotes = function(req, res){
  //Get note list
  var sql = 'select id,date_format(dateTime,\'%Y-%m-%d %r \') as \'Date added\' , note as Note, submittedByUserID as User from notes order by dateTime desc';
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
