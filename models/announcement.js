var mongoose = require('mongoose');

var announcementSchema = new mongoose.Schema({
	title: String,
	body: String,
	status: Boolean,
	dateScheduled: {type: Date, default: Date.now},
	dateCreated: {type: Date, default: Date.now},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model('Announcement', announcementSchema);