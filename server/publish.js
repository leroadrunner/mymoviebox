Movies = new Meteor.Collection("movies");
UserData = new Meteor.Collection("userData");

Meteor.startup(function() {	
	Meteor.publish('Movies', function() {
		return Movies.find();
	});
	Meteor.publish('UserData', function() {
    return UserData.find({'userId': this.userId}) ;
    // return UserData.find({}) ;
	});  
	console.log('---- server start');
});

Accounts.onCreateUser(function(options, user) {
  Movies.find().fetch().forEach(function(movie){
    console.log(movie);
    console.log("------------------");    
  });
  UserData.insert({userId: user._id, moviesList: Movies.find().fetch()});
//  UserData.insert({moviesList: Movies.find().fetch()});
  console.log(user);
  return user;
});