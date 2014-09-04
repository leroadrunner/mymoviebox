Movies = new Meteor.Collection("movies");

Meteor.startup(function() {	
	Meteor.publish('Movies', function() {
		return Movies.find();
	});
	console.log('---- server start');
});