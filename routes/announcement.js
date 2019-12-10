var express 		= require("express");
var router 			= express.Router();
var Announcement 	= require('../models/announcement');
var Student 		= require('../models/student');
var Faculty 		= require('../models/faculty');


//------------------------------------//
// RESTFUL ROUTES for ANNOUNCEMENTS   //
//------------------------------------//


// INDEX route (show all annoucements)
router.get('/', isLoggedIn, function(req, res){
	var userTypeStudent = req.user instanceof Student;
	var userTypeFaculty = req.user instanceof Faculty;
	Announcement.find({}, function(err, allAssignments){
		if(err) {
			console.log("Error!");
		} else {
			res.render('announcement/index', {announcement:allAssignments, userTypeStudent:userTypeStudent, userTypeFaculty:userTypeFaculty});
		}
	});	
});


// NEW route (input form)
router.get('/new', isLoggedIn, function(req, res){
	res.render('announcement/new');
});


// CREATE route (add the new assignment into our db)
router.post('/', isLoggedIn, function(req, res){
	// Create assignment
	Announcement.create(req.body.announcement, function(err, newAnnouncement){
		if(err){
			console.log(err);
			res.render('announcement/new');
		} else {
			res.redirect('/announcements');
		}
	})
});


// SHOW route (show the detail info of a specific assignment)
router.get('/:id', isLoggedIn, function(req, res){
	var userTypeStudent = req.user instanceof Student;
	var userTypeFaculty = req.user instanceof Faculty;

	Announcement.findById(req.params.id).exec(function(err, foundAnnouncement){
		if(err) {
			console.log("Cannot find the requested announcement");
			res.redirect('/announcements');
		} else {
			res.render('announcement/show', {announcements:foundAnnouncement, userTypeStudent:userTypeStudent, userTypeFaculty:userTypeFaculty});
		}
	});
});


// EDIT route (input form)
router.get('/:id/edit', isLoggedIn, function(req, res){
	Announcement.findById(req.params.id, function(err, foundAnnouncement){
		if(err) {
			console.log('cannot find the announcement to edit')
			res.redirect('/announcements');
		} else{
			res.render('announcement/edit', {announcement:foundAnnouncement});
		}
	})
});


// UPDATE route (update the edited input into our db)
router.put('/:id', isLoggedIn, function(req, res){
	Announcement.findByIdAndUpdate(req.params.id, req.body.announcement, function(err, updateAnnouncement){
		if(err){
			res.redirect('/announcements');
		} else {
			res.redirect('/announcements/' + req.params.id);
		}
	});
});


// DELETE route (remove data from the db)
router.delete('/:id', isLoggedIn, function(req, res){
	Announcement.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log('Delete fail!');
		} else {
			res.redirect('/announcements');
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

