var Marionette = require('backbone.marionette'),
    SessionService = require('../services/session'),
    copyLinkTemplate = require('../templates/copyLink.handlebars');

var CopyLinkView = Marionette.ItemView.extend({
    
  initialize: function () {
      this._uid = '';
      SessionService.on('setUid', function (uid) {
          this._uid = uid;
          this.render();
      }.bind(this));
  },

  template: copyLinkTemplate,

  events: {
    'click a': 'link_onClick'
  },
  
  render: function () {
    this.$el.html(this.template({ uid: this._uid }));
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