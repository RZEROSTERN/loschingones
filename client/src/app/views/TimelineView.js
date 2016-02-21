var Marionette = require('backbone.marionette'),
  TreeLib = require("../lib/tree"),
	timelineTemplate = require('../templates/timeline.handlebars');

var TimelineView = Marionette.LayoutView.extend({
	template: timelineTemplate,
	regions: {
    	'tree': '#tree',
    	'svg': '#svg'
  	},
  	onRender: function () {
  		console.log("HELLO WORLD");
      TreeLib.start(this.svg.el);
  	}
});
module.exports = TimelineView;