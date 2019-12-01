var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var studentSchema = new mongoose.Schema({
	username: String,
	password: String,
	fName: String,
	lName: String,
	DOB: Date,
	phone: Number
});

studentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Student", studentSchema);