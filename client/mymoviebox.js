Meteor.subscribe("Movies");
Meteor.subscribe("UserData");
Movies = new Meteor.Collection("movies");
UserData = new Meteor.Collection("userData");

Session.setDefault('modalState', false);

Template.movies.items = function () {
  return Movies.find() ;
} 

Template.movies.events({
  'click .item': function (evt) {
    Router.setMovie(this.imdbID); 
    $('body').addClass( 'modal-open' ); 
    // console.log(Meteor.user().profile);
  },
  'click .add-to-list': function (evt) {
    evt.stopPropagation();
    console.log(UserData.find().fetch()[0].moviesList) ;
    // console.log(UserData.find({movieList: "300"}).fetch()) ; 
    // console.log(UserData.find({}, {'0.moviesList': 1}).fetch()) ; 
    console.log(Movies.find().fetch()) ; 
    // console.log(Meteor.user().profile);
    // Session.set('current-song', _.extend(currentSong, { name: event.currentTarget.value }));
  }  
});

Template.modal.modalState = function () {
  var modalState = Session.get('modalState');
  return modalState;
};

Template.modal.events({
  'click .modal-outer': function (evt) {
    // prevent clicks on <a> from refreshing the page.
    evt.preventDefault();
    Router.unsetMovie();  
    $('body').removeClass( 'modal-open' );      
  },
  'click .no-target': function (evt) {
    evt.stopPropagation();
  }  
});

Template.modal.movie = function () {
  return Movies.findOne({imdbID: Session.get('currentPage')}) ;
}
