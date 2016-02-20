var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    MainLayout = require('./views/MainLayout'),
    routers = require('./routers');

var App = Marionette.Application.extend({
    initialize: function (opts) {
        // Render main layout
        this.mainLayoutView = new MainLayout();
        this.mainLayoutView.render();
        // Initialize submodules, routers, etc
        this.routers = {
            main: new routers.MainRouter()
        };
        this.on('start', function () {
            // Start history
            if (Backbone.history) Backbone.history.start();
        });
    }
});

// Singleton export
module.exports = new App();