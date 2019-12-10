var mongoose = require("mongoose");
var Announcement = require("./models/announcement");
 
var data = [
    {
		title: "Lorem ipsum dolor sit amet",
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		dateScheduled: 12/05/2019
    },
		
    {
		title: "Lorem ipsum dolor sit amet",
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		dateScheduled: 12/05/2019
    },
	
    {
		title: "Lorem ipsum dolor sit amet",
		body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		dateScheduled: 12/05/2019
    }
]
 
function seedDB(){
	
   // Remove all current assignments
   Announcement.remove({}, function(err){
        if(err){
            console.log(err);
        }
	    
	   // Add a few assignments
        data.forEach(function(seed){
                Announcement.create(seed, function(err, assignment){
                  if(err){
                       console.log(err)
                  }
             });
         });
	   

    }); 
    //add a few comments
}
 
module.exports = seedDB;