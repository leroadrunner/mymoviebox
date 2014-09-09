Meteor.subscribe("Movies");
Movies = new Meteor.Collection("movies");

function isSelected(imdbId) {
  return ! Movies.findOne( {'imdbID': imdbId, 'selected': Meteor.userId()});
}

function addToList(imdbId) {
    movieId = Movies.findOne( { 'imdbID': imdbId} )._id ;
    Movies.update({ _id: movieId}, { $addToSet: {selected: Meteor.userId()}});
}

function removeFromList(imdbId) {
    movieId = Movies.findOne( { 'imdbID': imdbId} )._id ;
    Movies.update({ _id: movieId}, { $pull: {selected: Meteor.userId()}});
}

Session.setDefault('modalState', false);
Session.setDefault('moviesFilter', {});

Template.movies.items = function () {
  /* var sumListRaw = Movies.find({selected: Meteor.userId()}, {fields: {size: 1}}).fetch();
  var sumList = 0;
  _.each(sumListRaw, function(val){ sumList += parseInt(val.size) ;});
  console.log(sumList/1024/1024); */
  return Movies.find(Session.get('moviesFilter')) ;
}; 

Template.movies.events({
  'click .item': function (evt) {
    Router.setMovie(this.imdbID); 
    $('body').addClass( 'modal-open' ); 
  },
  'click .add-to-list': function (evt) {
    evt.stopPropagation();
    addToList(this.imdbID);
  },
  'click .remove-from-list': function (evt) {
    evt.stopPropagation();
    removeFromList(this.imdbID);
  }    
});

Template.movies.helpers({
  selected: function () {
    return isSelected(this.imdbID);
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
  'click .add-to-list': function (evt) {
    evt.stopPropagation();
    addToList(this.imdbID);
  },
  'click .remove-from-list': function (evt) {
    evt.stopPropagation();
    removeFromList(this.imdbID);
  }  
});

Template.modal.helpers({
  selected: function () {
    return isSelected(this.imdbID);
  }
});
Template.modal.movie = function () {
  return Movies.findOne({imdbID: Session.get('currentPage')}) ;
}