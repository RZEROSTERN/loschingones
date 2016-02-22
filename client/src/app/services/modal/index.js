var Service = require('backbone.service'),
    ModalView = require('./view');

var ModalService = Service.extend({
    start: function () {
        this.view = new ModalView();
        this.view.render();
    },
    
    requests: {
        'show': 'show',
        'hide': 'hide'
    },
    
    show: function () {
        this.view.show();
    },
    
    hide: function () {
        this.view.hide();
    }
});

module.exports = new ModalService();