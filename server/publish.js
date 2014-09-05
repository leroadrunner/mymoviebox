Movies = new Meteor.Collection("movies");
UserData = new Meteor.Collection("userData");

Meteor.startup(function() {	
	Meteor.publish('Movies', function() {
		return Movies.find();
	});
	Meteor.publish('UserData', function() {
    return UserData.find({'userId': this.userId}) ;
	});  
	console.log('---- server start');
});

Accounts.onCreateUser(function(options, user) {
  UserData.insert({userId: user._id, moviesList: Movies.find().fetch()});
  console.log(user);
  return user;
});