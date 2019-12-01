// ALL PURPOSE ROUTES 
var express = require("express");
var router = express.Router();
var passport = require("passport");
var Student 	= require('../models/student'),
	Faculty 	= require('../models/faculty');

//-----------------------------//
// REGULAR ROUTES (front-end)  //
//-----------------------------//
// ROOT Page Route
router.get('/upload', isLoggedIn, function(req, res) {
	res.render('upload');
});

router.post('/upload', isLoggedIn, function(req, res) {
	upload(req, res, (err) => {
		if(err) {
			res.render('upload', {
				msg: err
			});
		} else {
			if (req.file == undefined) {
				res.render('upload', {
					msg: 'Error: no File Selected'
				});
			} else {
				res.render('syllabus', {
				});
			}
		}
	});
});

router.get('/syllabus', isLoggedIn, function(req, res) {
	res.render('syllabus');
});

router.get('/', isLoggedIn, function(req, res){
	res.render('home');
});


//-----------------------------//
// AUTH ROUTES				   //
//-----------------------------//

// ---------- LOG-IN
//	1. Show the login form
router.get('/login', function(req, res){
	res.render('login');
});

router.post('/login', logIn, function(req, res) {
});

// ---------- REGISTER
// Show the register form
router.get('/register', function(req, res){
	res.render('register');
});

// handle register logic
router.post('/register', function(req, res) {
	if (req.body.accountType === 'student') {
		var newStudent = new Student({username: req.body.username,
									fName: req.body.fname,
									lName: req.body.lname,
									DOB: req.body.DOB,
									phone: req.body.phone});
		console.log(newStudent);
		Student.register(newStudent, req.body.password, function(err, student){
			if(err){
				console.log(err);
				return res.render('register');
			}

			// If the student successfully signup, he will be login
			passport.authenticate('student')(req, res, function(){
				res.redirect('/');
			});
		});
		
	} else if (req.body.accountType === 'faculty') {
		var newFaculty = new Faculty({username: req.body.username,
									fName: req.body.fname,
									lName: req.body.lname,
									DOB: req.body.DOB,
									phone: req.body.phone});
		
		Faculty.register(newFaculty, req.body.password, function(err, faculty){
			if(err){
				console.log(err);
				return res.render('register');
			}

			// If the Faculty successfully signup, he will be login
			passport.authenticate('faculty')(req, res, function(){
				res.redirect('/');
			});
		});
	}
	
});

// ----------- LOG OUT
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/login');
});
 

// Middleware function
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

function logIn(req, res, next){
	if(req.body.accountType === 'faculty') {
		passport.authenticate('faculty')(req, res, function(){
			res.redirect('/');
		});
		
	} else if(req.body.accountType === 'student') {
		passport.authenticate('student')(req, res, function(){
			res.redirect('/');
		});
	}
	return next();
}


module.exports = router;

