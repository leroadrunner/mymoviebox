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
    // http://docs.mongodb.org/manual/tutorial/query-documents/#match-a-field-in-the-embedded-document-using-the-array-index
    console.log(UserData.find( { 'moviesList.imdbID': "tt0119217"}, { moviesList: { $elemMatch: { imdbID: "tt0119217" }}}).fetch());
    // console.log(UserData.find( { moviesList: { $elemMatch: { imdbID: "tt0119217" }}}).fetch());   
    // :TODO: changer la collection avec un forEach avec userID+imdbID pour chaq record
    // console.log(UserData.find( { moviesList: { imdbID: "tt0119217"}}).fetch()) ; 
    // console.log(Movies.find().fetch()) ; 
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
