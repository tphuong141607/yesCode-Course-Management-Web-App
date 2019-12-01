var express 		= require('express'),
	app 			= express(),
	methodOverride 	= require('method-override'), 
	bodyParser  	= require('body-parser'),
	jsdom 			= require('jsdom'),
	mongoose 		= require('mongoose'),
	passport 		= require('passport'),
	Holidays 		= require('date-holidays'),
	localStrategy 	= require('passport-local'),
	multer			= require('multer'),
	path			= require('path'),
	seedDB 			= require("./seeds");
	
/* Calender stuffs
var hd = new Holidays();
hd.init('US', 'la', 'no');
var a = hd.getHolidays(2016)
console.log(a[0]);
*/

//------------------------//
// IMPORT Objects         //
//------------------------//
var Comment 	= require('./models/comment'),
	Student 	= require('./models/student'),
	Faculty 	= require('./models/faculty'),
	Assignment 	= require('./models/assignment');


//------------------------//
// Basic config           //
//------------------------//
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
seedDB(); // seed the DB with default data for testing purpose

//------------------------//
// Jquery Config          //
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

//---------------------------------------//
// Passport Config - Authentication      //
//---------------------------------------//
/*Useful resources:
	• https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize 
	• https://stackoverflow.com/questions/45897332/passport-js-multiple-de-serialize-methods
*/

app.use(require('express-session')({
		secret:'Halloween is the BEST!@#$',
		resave: false,
		saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('faculty', new localStrategy(Faculty.authenticate()));
passport.use('student', new localStrategy(Student.authenticate()));

passport.serializeUser((obj, done) => {
  if (obj instanceof Student) {
    done(null, {id: obj._id, type: 'Student' });
  } else {
    done(null, {id: obj._id, type: 'Faculty' });
  }
});

passport.deserializeUser(function(obj, done) {
    if (obj.type === 'Student') {
		Student.findById(obj.id, function(err, student) {
        done(err, student)});
  	} else {
		Faculty.findById(obj.id, function(err, faculty) {
        done(err, faculty)});
	}
});


app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

//-------------------------------------//
// Set Storage Engine (Upload File)    //
//-------------------------------------//
const storage = multer.diskStorage({
	destination:'./public/uploads/',
	filename: function(req, file, cb) {
		cb(null, "syllabus" + path.extname(file.originalname));
	}
});

// init upload
const upload = multer({
	storage: storage
}).single('myFile'); 


//------------------------//
// IMPORT ROUTES          //
//------------------------//
var commentRoutes 		= require('./routes/comment'),
	assignmentRoutes 	= require('./routes/assignment'),
	allPurposeRoutes 	= require('./routes/index');

app.use(allPurposeRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/assignments/:id/comments", commentRoutes);


//-----------------------------//
// NODE Connection/START       //
//-----------------------------//
const port = process.env.PORT || 3000;
const ip = process.env.IP || "127.0.0.1";
app.listen(port, function(){
    console.log("Server has started .... at port "+ port + " ip: " + ip);
});


