var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var facultySchema = new mongoose.Schema({
	username: String,
	password: String,
	facultyID: String,
	fName: String,
	lName: String,
	DOB: Date,
	phone: Number
});

facultySchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Faculty", facultySchema);



