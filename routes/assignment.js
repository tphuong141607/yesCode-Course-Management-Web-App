var express = require("express");
var router = express.Router();
var Assignment 	= require('../models/assignment');
var Student 	= require('../models/student');
var Faculty 	= require('../models/faculty');


//----------------------------------//
// RESTFUL ROUTES for ASSIGNMENTS   //
//----------------------------------//

// INDEX route (show all assignments)
router.get('/', isLoggedIn, function(req, res){
	var userTypeStudent = req.user instanceof Student;
	var userTypeFaculty = req.user instanceof Faculty;
	Assignment.find({}, function(err, allAssignments){
		if(err) {
			console.log("Error!");
		} else {
			res.render('assignment/index', {assignment:allAssignments, userTypeStudent:userTypeStudent, userTypeFaculty:userTypeFaculty});
		}
	});	
});


// NEW route (input form)
router.get('/new', isLoggedIn, function(req, res){
	res.render('assignment/new');
});


// CREATE route (add the new assignment into our db)
router.post('/', isLoggedIn, function(req, res){
	// Create assignment
	Assignment.create(req.body.assignment, function(err, newAssignment){
		if(err){
			console.log(err);
			res.render('assignment/new');
		} else {
			res.redirect('/assignments');
		}
	})
});


// SHOW route (show the detail info of a specific assignment)
router.get('/:id', isLoggedIn, function(req, res){
	var userTypeStudent = req.user instanceof Student;
	var userTypeFaculty = req.user instanceof Faculty;
	
	// populate function brings back the comments, not just the ID of the comments
	Assignment.findById(req.params.id).populate("comments").exec(function(err, foundAssignment){
		if(err) {
			console.log("Cannot find the requested assignment");
			res.redirect('/assignments');
		} else {
			res.render('assignment/show', {assignment:foundAssignment, userTypeStudent:userTypeStudent, userTypeFaculty:userTypeFaculty});
		}
	});
});


// EDIT route (input form)
router.get('/:id/edit', isLoggedIn, function(req, res){
	Assignment.findById(req.params.id, function(err, foundAssignment){
		if(err) {
			console.log('cannot find the assignment to edit')
			res.redirect('/assignments');
		} else{
			res.render('assignment/edit', {assignment:foundAssignment});
		}
	})
});


// UPDATE route (update the edited input into our db)
router.put('/:id', isLoggedIn, function(req, res){
	Assignment.findByIdAndUpdate(req.params.id, req.body.assignment, function(err, updateAssignment){
		if(err){
			res.redirect('/assignments');
		} else {
			res.redirect('/assignments/' + req.params.id);
		}
	});
});


// DELETE route (remove data from the db)
router.delete('/:id', isLoggedIn, function(req, res){
	Assignment.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log('Delete fail!');
			res.redirect('/assignments');
		} else {
			res.redirect('/assignments');
		}
	});
});


// Middleware function
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}


module.exports = router;



