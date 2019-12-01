var express = require("express");
var router = express.Router({mergeParams: true});
var Comment 	= require('../models/comment'),
	Assignment 	= require('../models/assignment');

//--------------------------------------//
// NESTED RESTFUL ROUTES for COMMENTS   //
//--------------------------------------//

// NEW route (input form)
router.get('/new', isLoggedIn, function(req, res) {
	// req.parems.id is from the URL (:/id)
	Assignment.findById(req.params.id, function(err, foundAssignment){
		if (err) {
			console.log(err);
		} else {
			res.render("comment/new", {assignment: foundAssignment});
		}
	});
});

// CREATE route (add the new comment into our db and redirect back to the show page)
router.post('/', isLoggedIn, function(req, res) {
	// req.parems.id is from the URL (:/id)
	Assignment.findById(req.params.id, function(err, foundAssignment){
		if (err) {
			console.log(err);
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
				} else {
					foundAssignment.comments.push(comment);
					foundAssignment.save();
					res.redirect('/assignments/' + foundAssignment._id);
				}
			});
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
