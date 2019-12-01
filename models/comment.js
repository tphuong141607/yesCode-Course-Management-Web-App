var mongoose = require("mongoose");
 
var commentSchema = new mongoose.Schema({
    text: String,
    author: {type: String, default: "anonymous"},
	datePosted: {type: Date, default: Date.now}
});
 
module.exports = mongoose.model("Comment", commentSchema);

// Nested routes