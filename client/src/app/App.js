var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    MainLayout = require('./views/MainLayout');

var App = Marionette.Application.extend({
    initialize: function (opts) {
        this.mainLayoutView = new MainLayout();
        this.mainLayoutView.render();
        // Initialize submodules, routers, etc
        this.on('start', function () {
            // Start history
            if (Backbone.history) Backbone.history.start();
            console.log('Inited!');
        });
    }
});

// Singleton export
module.exports = new App();