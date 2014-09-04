Movies = new Meteor.Collection("movies");

Meteor.startup(function() {	
	Meteor.publish('Movies', function() {
		return Movies.find();
	});
	console.log('---- server start');
});

Accounts.onCreateUser(function(options, user) {
  user.moviesList = Movies.find().fetch();
  return user;
});