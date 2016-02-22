var Backbone = require('backbone');
var Marionette = require('backbone.marionette'),
  TreeLib = require("../lib/tree"),
	timelineTemplate = require('../templates/timeline.handlebars');
var model = {
	data : {
		markerflag: -1,
		taskflag: -1
	},
	setFlag: function(value){
		console.log(value);
		model.data.markerflag = value;
		model.test();
	},
	test: function(){
		console.log(this.data);
	}
}
var TimelineView = Marionette.LayoutView.extend({
	template: timelineTemplate,
	regions: {
    	'tree': '#tree',
    	'svg': '#svg'
  	},
    onShow: function () {
      console.log("HELLO onShow");
      TreeLib.start(this.svg.el,model.setFlag);
    }
});
module.exports = TimelineView;