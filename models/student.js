var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var studentSchema = new mongoose.Schema({
	username: String,
	password: String,
	fName: String,
	lName: String,
	DOB: Date,
	phone: Number
	// Should add grade in (both students and faculties have access to the same GRADE ID)
});

studentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Student", studentSchema);