Movies = new Meteor.Collection("movies");

Meteor.startup(function() {	
	Meteor.publish('Movies', function() {
    if (this.userId) {
      return Movies.find() ;
    } else {
      this.ready();
    }
	});  
	console.log('---- server start');
});
