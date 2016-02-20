var Marionette = require('backbone.marionette'),
    Controller = require('../controllers/MainController');

var MainRouter = Marionette.AppRouter.extend({
  controller: Controller,
  appRoutes: {
    '': 'index'
  }
});

module.exports = MainRouter;