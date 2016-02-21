var Marionette = require('backbone.marionette'),
    layoutTemplate = require('../templates/layout.handlebars'),
    TimelineView = require("./TimelineView"),
    CopyLinkView = require('./CopyLinkView'),
    SessionService = require('../services/session');

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
        if (confirm('Are you sure you want to create a new tasktree? If you haven\'t saved this one, it will be lost forever.')) {
            SessionService.request('newSession').then(function (newUid) {
                // Require App here because object is not ready on
                // module definition.
                var App = require('../App')
                App.routers.main.navigate('tree/' + newUid, true);
            });
        }
    },
    save_click: function (e) {
        e.preventDefault();
        console.log('save');
        // In a perfect world, this would be on a
        // controller or a listener, not on the view.
        SessionService.request('save');
    },

    onRender: function () {
      this.link.show(new CopyLinkView());
      this.main.show(new TimelineView());
    }
});

module.exports = MainLayout;