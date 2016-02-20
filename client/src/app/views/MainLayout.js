var Marionette = require('backbone.marionette'),
    layoutTemplate = require('../templates/layout.handlebars');

var MainLayout = Marionette.LayoutView.extend({
    el: '#app',
    template: layoutTemplate,
    regions: {
        main: '#main'
    }
});

module.exports = MainLayout;