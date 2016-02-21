var Marionette = require('backbone.marionette'),
    layoutTemplate = require('../templates/layout.handlebars'),
    CopyLinkView = require('./CopyLinkView');

var MainLayout = Marionette.LayoutView.extend({
    el: '#app',
    template: layoutTemplate,
    regions: {
        'main': '#main',
        'header': '.header',
        'link': '#link'
    },

    onRender: function () {
      this.link.show(new CopyLinkView());
    }
});

module.exports = MainLayout;