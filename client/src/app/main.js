/**
 * Bootstrap file
 */

var App = require('./App');
App.start();

// Export to global
// Use it to test app requests outside the app
// @TODO: Remove when dev is done
window.Plantree = App;