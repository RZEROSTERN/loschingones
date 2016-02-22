var Service = require('backbone.service'),
    APIService = require('../api'),
    md5 = require('md5'),
    now = require('../../utils').now;

var SessionService = Service.extend({
    start: function () {
        this.uid = null;
        this.token = null;
        this.rev = null;
        this.data = {};
    },
    
    requests: {
        'newSession': 'newSession',
        'resumeSession': 'resumeSession',
        'setUid': 'setUid',
        'getUid': 'getUid',
        'set': 'set',
        'get': 'get',
        'del': 'del',
        'has': 'has',
        'save': 'save'
    },
    
    newSession: function () {
        this.uid = md5(navigator.userAgent + now());
        this.token = null;
        this.rev = null;
        this.data = {};
        console.log('uid set', this);
        return this.uid;
    },

    resumeSession: function (uid) {
        this.uid = uid;
        this.token = 'TODO-GET';
        this.rev = 'TODO-GET';
        return APIService.request('loadTree', this.uid).then(function (data) {
            this.data = data;
        }).catch(function (err) {
            console.error('Load tree:', err);
        });
    },

    getUid: function () {
        return this.uid;
    },

    setUid: function (uid) {
        this.uid = uid;
    },
    
    set: function (key, data) {
        this.data[key] = data;
    },
    
    get: function (key, defaultValue) {
        if (!this.has(key)) return defaultValue;
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
        return this.uid !== null && this.token !== null && this.rev !== null;
    },
    
    save: function () {
        // Sync to server
        if (this.canBeSynced()) {
            return APIService.request('saveTree', this.uid, this.token, this.rev, this.get('tree', {}))
            .then(function (rres) {
                this.rev = rres.rev;
                return rres;
            }.bind(this));
        }
        APIService.request('getToken', this.uid).then(function (res) {
            this.token = res.jwt;
            this.rev = res.couchrev;
            return APIService.request('saveTree', this.uid, this.token, this.rev, this.get('tree', {}))
            .then(function (rres) {
                this.rev = rres.rev;
                return rres;
            }.bind(this));
        }.bind(this)).catch(function (err) {
            // Handle error
            console.error('Save tree:', err);
        });
    }
    
});

module.exports = new SessionService();