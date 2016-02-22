var SessionService = require('../services/session');

module.exports = {
  index: function () {
    SessionService.request('newSession').then(function (newUid) {
      // Require App here because object is not ready on
      // module definition.
      var App = require('../App');
      App.routers.main.navigate('tree/' + newUid, true);
    });
  },
  viewTree: function (uid) {
    console.log('viewTree', uid);
    /*SessionService.request('resumeSession', uid).then(function (data) {
      console.log('Trigger event for view to render', data);
    });*/
  }
};