var mongoose = require("mongoose");
var Assignment = require("./models/assignment");
var Comment   = require("./models/comment");
 
var data = [
    {
		number: 1,
		title: "Lorem ipsum dolor sit amet",
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		totalPoint: 15,
		status: false,
		dateDue: 12/05/2019
    },
		
    {
        number: 2,
		title: "Lorem ipsum dolor sit amet",
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		totalPoint: 20,
		status: false,
		dateDue: 12/05/2019
    },
	
    {
        number: 2,
		title: "Lorem ipsum dolor sit amet",
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		totalPoint: 20,
		status: false,
		dateDue: 12/05/2019
    }
]
 
function seedDB(){
	
   // Remove all current assignments
   Assignment.remove({}, function(err){
        if(err){
            console.log(err);
        }
	   
	    // Remove all current comments 
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
			
             // Add a few assignments
            data.forEach(function(seed){
                Assignment.create(seed, function(err, assignment){
                    if(err){
                        console.log(err)
                    } else {
						
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    assignment.comments.push(comment);
                                    assignment.save();
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;