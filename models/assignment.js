var mongoose = require('mongoose');

var assignmentSchema = new mongoose.Schema({
	number: Number,
	title: String,
	body: String,
	dateDue: {type: Date},
	dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Assignment', assignmentSchema);