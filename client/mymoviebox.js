Meteor.subscribe("Movies");
Movies = new Meteor.Collection("movies");
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
  'click .no-target': function (evt) {
    evt.stopPropagation();
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
