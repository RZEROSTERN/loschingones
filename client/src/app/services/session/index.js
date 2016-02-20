var Service = require('backbone.service'),
    md5 = require('md5'),
    now = require('../../utils').now;

var SessionService = Service.extend({
    start: function () {
        this.uid = null;
        this.token = null;
        this.data = {};
    },
    
    requests: {
        'newSession': 'newSession',
        'set': 'set',
        'get': 'get',
        'del': 'del',
        'has': 'has',
        'save': 'save',
        'load': 'load'
    },
    
    newSession: function () {
        this.uid = md5(navigator.userAgent + now());
        this.data = {};
    },

    getUid: function () {
        return this.uid;
    },
    
    set: function (key, data) {
        this.data[key] = data;
    },
    
    get: function (key, defaultValue) {
        if (this.has(key)) return defaultValue;
        return this.data[key];
    },
    
    del: function (key) {
        if (this.has(key)) {
            delete this.data[key];
        }
    },
    
    has: function (key) {
        return this.data[key] !== undefined;
    },
    
    save: function () {
        // Sync to server
    },
    
    load: function () {
        // Load from server
    }
    
});

module.exports = new SessionService();