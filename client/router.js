////////// Tracking selected list in URL //////////

var MMBRouter = Backbone.Router.extend({
  routes: {
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
  }    
});

Router = new MMBRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
}); 