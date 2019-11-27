var express 		= require('express'),
	app 			= express(),
	methodOverride 	= require('method-override'), 
	bodyParser  	= require('body-parser'),
	jsdom 			= require('jsdom'),
	mongoose 		= require('mongoose'),
	passport 		= require('passport'),
	Holidays 		= require('date-holidays'),
	localStrategy 	= require('passport-local');

var hd = new Holidays();
hd.init('US', 'la', 'no');
var a = hd.getHolidays(2016)
console.log(a[0]);

var Student = require('./models/student');

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
app.get('/home', function(req, res){
	res.render('home');
});

app.get('/', function(req, res){
	res.render('home');
});


//-----------------------------//
// AUTH ROUTES				   //
//-----------------------------//

// ---------- LOG-IN
// Show the login form
app.get('/login', function(req, res){
	res.render('login');
});

// handle sign up logic
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

// handle sign up logic
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






