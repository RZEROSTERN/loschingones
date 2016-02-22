var Marionette = require('backbone.marionette'),
    newItemTemplate = require('../../templates/newItem.handlebars');

var ModalView = Marionette.ItemView.extend({
    events: {
        'click .btn': 'onSubmit'
    },
    onSubmit: function (e) {
        console.log('submit', e);
        this.hide();
    },
    el: $('<div class="modal"></div>').appendTo('#app'),
    template: newItemTemplate,
    
    show: function () {
        this.$el.find('.desc').first().val('');
        this.$el.fadeIn();
    },
    
    hide: function () {
        this.$el.fadeOut();
    },
    
    onRender: function () {
        this.$el.hide();
        this.$el.css('left', ((window.innerWidth / 2) - (this.$el.width() / 2)) + 'px');
    }
});

module.exports = ModalView;