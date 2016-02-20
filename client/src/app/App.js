var Backbone = require('backbone'),
    Marionette = require('backbone.marionette');

var App = Marionette.Application.extend({
    initialize: function (opts) {
        // Initialize submodules, routers, etc
        // Render main layout
        this.on('start', function () {
            // Start history
            if (Backbone.history) Backbone.history.start();
            console.log('Inited!');
        });
    }
});

module.exports = new App();