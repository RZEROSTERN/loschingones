
var Service = require('backbone.service'),
    APIService = require('../api'),
    md5 = require('md5'),
    now = require('../../utils').now,
    localStorage = require('../../utils').localStorage;

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
        'getTree': 'getTree',
        'set': 'set',
        'get': 'get',
        'del': 'del',
        'has': 'has',
        'save': 'save'
    },

    _sessionToLocal: function (uid) {
        // Don't save not saved sessions
        if (this.token === null || this.rev === null) return;
        localStorage.set('ses-' + uid, this.token + '|' + this.rev);
    },

    _sessionFromLocal: function (uid) {
        var data = localStorage.get('ses-' + uid);
        if (data !== null) {
            // Not anon
            var arr = data.split('|');
            this.token = arr[0];
            this.rev = arr[1];
        }
    },
    
    newSession: function () {
        this.setUid(md5(navigator.userAgent + now()));
        this.token = null;
        this.rev = null;
        this._sessionToLocal(this.uid);
        this.data = {};
        return this.uid;
    },

    resumeSession: function (uid) {
        this.setUid(uid);
        this._sessionFromLocal(uid);
        return APIService.request('loadTree', this.uid).then(function (data) {
            this.data = { tree: data };
            this.trigger('setData', this.data);
            return data;
        }.bind(this));
    },

    getUid: function () {
        return this.uid;
    },

    setUid: function (uid) {
        this.uid = uid;
        this.trigger('setUid', uid);
    },
    
    getTree: function () {
        return this.get('tree', {});
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
                this._sessionToLocal(this.uid);
                return rres;
            }.bind(this));
        }
        APIService.request('getToken', this.uid).then(function (res) {
            this.token = res.jwt;
            this.rev = res.couchrev;
            return APIService.request('saveTree', this.uid, this.token, this.rev, this.get('tree', {}))
            .then(function (rres) {
                this.rev = rres.rev;
                this._sessionToLocal(this.uid);
                return rres;
            }.bind(this));
        }.bind(this));
    }
    
});

module.exports = new SessionService();