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








	