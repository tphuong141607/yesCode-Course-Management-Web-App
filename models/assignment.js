var mongoose = require('mongoose');

var assignmentSchema = new mongoose.Schema({
	number: Number,
	title: String,
	body: String,
	totalPoint: Number,
	status: Boolean,
	dateDue: {type: Date, default: Date.now},
	dateCreated: {type: Date, default: Date.now},
	// Reference to the Comment's ID
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model('Assignment', assignmentSchema);