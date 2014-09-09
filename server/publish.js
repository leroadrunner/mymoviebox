Movies = new Meteor.Collection("movies");
UserData = new Meteor.Collection("userData");

Meteor.startup(function() {	
	Meteor.publish('UserData', function() {
    return UserData.find({'userId': this.userId}) ;
	});  
	console.log('---- server start');
});

Accounts.onCreateUser(function(options, user) {
  Movies.find().fetch().forEach(function(movie){
    UserData.insert({userId: user._id, movie: movie, selected: 'n'});
  });
  return user;
});