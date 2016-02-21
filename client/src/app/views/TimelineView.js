var Marionette = require('backbone.marionette'),
  TreeLib = require("../lib/tree"),
	timelineTemplate = require('../templates/timeline.handlebars');

var TimelineView = Marionette.LayoutView.extend({
	template: timelineTemplate,
	regions: {
    	'tree': '#tree',
    	'svg': '#svg'
  	},
    onShow: function () {
      console.log("HELLO onShow");
      TreeLib.start(this.svg.el);
    }
});
module.exports = TimelineView;