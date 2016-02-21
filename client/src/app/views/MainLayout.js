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
    
    events: {
        'click a[href="#new"]': 'new_click',
        'click a[href="#save"]': 'save_click'
    },
    
    new_click: function (e) {
        e.preventDefault();
        console.log('new');
    },
    save_click: function (e) {
        e.preventDefault();
        console.log('save');
        // DO NOT USE THIS
        var s = require('../services/session');
        s.request('save');
    },

    onRender: function () {
      this.link.show(new CopyLinkView());
      this.main.show(new TimelineView());
    }
});

module.exports = MainLayout;