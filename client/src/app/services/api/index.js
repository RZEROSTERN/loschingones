var Service = require('backbone.service')
    $ = require('jquery'),
    config = {
        apiurl: "mockup"
    }

var APIService = Service.extend({
    
    requests: {
        'getToken': 'getToken',
        'saveTree': 'saveTree',
        'loadTree': 'loadTree',
        'reqEmail': 'reqEmail'
    },
    
    getToken: function (uid) {
        if (config.apiurl === 'mockup') {
            return new Promise(function (resolve, reject) {
                if (uid === '000000') reject('Generic error');
                resolve({ token: '1234567890abcdef' });
            });
        }
        return $.ajax({
            url: config.apiurl + '/?r=documents/new-document&id=' + uid,
            type: 'POST',
            dataType: 'json'
        });
    },
    
    saveTree: function (uid, token, rev, tree) {
        if (config.apiurl === 'mockup') {
            return new Promise(function (resolve, reject) {
                if (uid === '000000' ) reject('Generic error');
                if (uid !== '000000' && token !== '1234567890abcdef') reject('Error 401. Not authorized');
                resolve({ status: 'ok' });
            });
        }
        return $.ajax({
            url: config.apiurl + '/?r=documents/save-data-to-document',
            type: 'POST',
            // data: 'auth=' + token + '&id=' + uid + '&rev=' + rev + '&data=' + JSON.stringify(tree),
            data: {
                auth: token,
                id: uid,
                rev: rev,
                data: JSON.stringify(tree)
            },
            dataType: 'json'
        });
    },
    
    loadTree: function (uid) {
        if (config.apiurl === 'mockup') {
            return new Promise(function (resolve, reject) {
                if (uid === '000000' ) reject('Generic error');
                resolve({ status: 'ok' });
            });
        }
        return $.ajax({
            url: config.apiurl + '/r=documents/gather-existing-document&id=' + uid,
            type: 'GET',
            dataType: 'json'
        });
    },
    
    reqEmail: function (uid, token) {
        if (config.apiurl === 'mockup') {
            return new Promise(function (resolve, reject) {
                if (uid === '000000' ) reject('Generic error');
                if (uid !== '000000' && token !== '1234567890abcdef') reject('Error 401. Not authorized');
                resolve({ status: 'ok' });
            });
        }
        return $.ajax({
            url: config.apiurl + '/',
            type: 'POST',
            data: {},
            dataType: 'json'
        });
    }
    
});

module.exports = new APIService();