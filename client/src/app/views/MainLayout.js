var Marionette = require('backbone.marionette'),
    layoutTemplate = require('../templates/layout.handlebars'),
    TimelineView = require("./TimelineView"),
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
      this.main.show(new TimelineView());
    }
});

module.exports = MainLayout;