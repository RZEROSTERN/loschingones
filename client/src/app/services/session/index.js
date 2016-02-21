var Service = require('backbone.service'),
    APIService = require('../api'),
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
        return this.uid;
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
    
    sessionHasStarted: function () {
        return this.uid !== null;
    },
    
    canBeSynced: function () {
        return this.uid !== null && this.token !== null;
    },
    
    save: function () {
        // Sync to server
        if (this.canBeSynced()) {
            return APIService.request('saveTree', this.uid, this.token, this.get('tree', {}));
        }
        APIService.request('getToken', this.uid).then(function (res) {
            this.token = res.token;
            return APIService.request('saveTree', this.uid, this.token, this.get('tree', {}));
        }.bind(this)).catch(function (err) {
            // Handle error
            console.error('Save:', err);
        });
    },
    
    load: function () {
        // Load from server
    }
    
});

module.exports = new SessionService();