var Marionette = require('backbone.marionette'),
    SessionService = require('../services/session'),
    copyLinkTemplate = require('../templates/copyLink.handlebars');

var CopyLinkView = Marionette.ItemView.extend({

  template: copyLinkTemplate,

  events: {
    'click a': 'link_onClick'
  },

  link_onClick: function (e) {
    e.preventDefault();
    this.$el.find('input').focus().select();
    try {
      var copyCmd = document.execCommand('copy');
      if (!copyCmd) throw new Error('Exec command copy failed');
    } catch (err) {
      copy.warn('Unable to copy.');
    }
  }
});

module.exports = CopyLinkView;