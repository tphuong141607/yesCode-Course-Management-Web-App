var express 		= require('express'),
	app 			= express(),
	methodOverride 	= require('method-override'), 
	bodyParser  	= require('body-parser'),
	jsdom 			= require('jsdom'),
	mongoose 		= require('mongoose'),
	passport 		= require('passport'),
	Holidays 		= require('date-holidays'),
	localStrategy 	= require('passport-local');

/* Calender stuffs
var hd = new Holidays();
hd.init('US', 'la', 'no');
var a = hd.getHolidays(2016)
console.log(a[0]);
*/

//------------------------//
// IMPORT Objects         //
//------------------------//
var Student = require('./models/student');
var Assignment = require('./models/assignment');


//------------------------//
// Jquery                 //
//------------------------//
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);


//------------------------//
// Mongoose/Model Config  //
//------------------------//
// Tell Express to listen for requests (start server)
mongoose.connect('mongodb://localhost/BBProject', {
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connect to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
}); 


//------------------------//
// Basic config           //
//------------------------//
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));


//-----------------------//
// Passport Config       //
//-----------------------//
app.use(require('express-session')({
		secret:'Halloween is the BEST!@#$',
		resave: false,
		saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(Student.authenticate()));
passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});


//-----------------------------//
// REGULAR ROUTES (front-end)  //
//-----------------------------//
// ROOT Page Route
app.get('/home', isLoggedIn, function(req, res){
	res.render('home');
});

app.get('/', isLoggedIn, function(req, res){
	res.render('home');
});

//-----------------------------   //
// RESTFUL ROUTES for ASSIGNMENTS //
//-----------------------------   //

// INDEX route (show all assignments)
app.get('/assignment', function(req, res){
	Assignment.find({}, function(err, allAssignments){
		if(err) {
			console.log("Error!");
		} else {
			res.render('assignment/index', {assignment:allAssignments});
		}
	});	
});


// NEW route (input form)
app.get('/assignment/new', isLoggedIn, function(req, res){
	res.render('assignment/new');
});


// CREATE route (add the new assignment into our db)
app.post('/assignment', isLoggedIn, function(req, res){
	// Create assignment
	Assignment.create(req.body.assignment, function(err, newAssignment){
		if(err){
			res.render('new');
		} else {
			res.redirect('/assignment');
		}
	})
});

/*
// SHOW route (show the detail info of a specific assignment)
app.get('/projects/:id', function(req, res){
	Project.findById(req.params.id, function(err, foundProject){
		if(err) {
			res.redirect('/projects');
		} else {
			res.render('projects/show', {project:foundProject});
		}
	});
});

// EDIT route (input form)
app.get('/projects/:id/edit', isLoggedIn, function(req, res){
	Project.findById(req.params.id, function(err, foundProject){
		if(err) {
			res.redirect('/projects');
		} else{
			res.render('projects/edit', {project:foundProject});
		}
	})
});

// UPDATE route (update the edited input into our db)
app.put('/projects/:id', isLoggedIn, function(req, res){
	Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, updateProject){
		if(err){
			res.redirect('/projects');
		} else {
			res.redirect('/projects/' + req.params.id);
		}
	});
});

// DELETE route (remove data from the db)
app.delete('/projects/:id', isLoggedIn, function(req, res){
	Project.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect('/projects');
		} else {
			res.redirect('/projects');
		}
	});
});

*/

//-----------------------------//
// AUTH ROUTES				   //
//-----------------------------//

// ---------- LOG-IN
//	1. Show the login form
app.get('/login', function(req, res){
	res.render('login');
});

//	2. handle Login logic
app.post('/login', 

	// check if the account is correct
	passport.authenticate('local', {
		successRedirect:'/home', // If yes, redirect to home
		failureRedirect:'/login' // If not, login again
	}), 
	function(req, res) {
});


// ---------- REGISTER
// Show the register form
app.get('/register', function(req, res){
	res.render('register');
});

// handle register logic
app.post('/register', function(req, res) {
	var newStudent = new Student({username: req.body.username});
	Student.register(newStudent, req.body.password, function(err, student){
		if(err){
			console.log(err);
			return res.render('register');
		}

		// If the student successfully signup, he will be login
		passport.authenticate('local')(req, res, function(){
			res.redirect('/home');
		});
	});
});

// ----------- LOG OUT
app.get('/logout', function(req, res){
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


//-----------------------------//
// NODE Connection/START       //
//-----------------------------//
const port = process.env.PORT || 3000;
const ip = process.env.IP || "127.0.0.1";
app.listen(port, function(){
    console.log("Server has started .... at port "+ port + " ip: " + ip);
});






