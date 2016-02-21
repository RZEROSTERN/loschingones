var Marionette = require('backbone.marionette'),
	timelineTemplate = require('../templates/timeline.handlebars');

var TimelineView = Marionette.LayoutView.extend({
	template: timelineTemplate,
	regions: {
    	'tree': '#tree',
    	'svg': '#svg'
  	},
  	onRender: function () {
  		console.log("HELLO WORLD");
  	}
});
module.exports = TimelineView;