Meteor.subscribe("UserData");
UserData = new Meteor.Collection("userData");

Session.setDefault('modalState', false);

Template.movies.items = function () {
  return UserData.find() ;
};

Template.movies.events({
  'click .item': function () {
    Router.setMovie(this.movie.imdbID); 
    $('body').addClass( 'modal-open' ); 
  },
  'click .add-to-list': function (evt) {
    evt.stopPropagation();
    movieId = UserData.findOne( { 'movie.imdbID': this.movie.imdbID} )._id ;
    UserData.update({ _id: movieId}, {$set: {selected: "y"}})
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

Template.modal.movieDetail = function () {
  console.log(Session.get('currentPage'));
  return UserData.findOne({'movie.imdbID': Session.get('currentPage')}) ;
}
