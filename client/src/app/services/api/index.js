var Service = require('backbone.service')
    $ = require('jquery'),
    config = require('../../config');

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
            url: config.apiurl + '/',
            type: 'GET',
            data: {},
            dataType: 'json'
        });
    },
    
    saveTree: function (uid, token, tree) {
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
    },
    
    loadTree: function (uid, token) {
        if (config.apiurl === 'mockup') {
            return new Promise(function (resolve, reject) {
                if (uid === '000000' ) reject('Generic error');
                if (uid !== '000000' && token !== '1234567890abcdef') reject('Error 401. Not authorized');
                resolve({ status: 'ok' });
            });
        }
        return $.ajax({
            url: config.apiurl + '/',
            type: 'GET',
            data: {},
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