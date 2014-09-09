////////// Tracking selected list in URL //////////

var MMBRouter = Backbone.Router.extend({
  routes: {
    "mylist": "getMyList",
    "home"  : "getAllMovies",
    ":movie": "setMovie"    
  },
  setMovie: function (imdbID) {
    this.navigate(imdbID, true);
    Session.set('currentPage', imdbID);
    Session.set('modalState', true);    
  },      
  unsetMovie: function () {
    this.navigate('/', true);
    Session.set('modalState', false);    
  },
  getMyList: function () {
    this.navigate('mylist', true);
    Session.set('moviesFilter', {selected: Meteor.userId()});  
    $('#mylist').addClass( 'active' );
    $('#home').removeClass( 'active' );    
  },
  getAllMovies: function () {
    this.navigate('home', true);
    Session.set('moviesFilter', {});  
    $('#home').addClass( 'active' );
    $('#mylist').removeClass( 'active' );      
  }
  
});

Router = new MMBRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
}); 