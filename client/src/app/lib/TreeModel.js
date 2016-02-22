var Backbone = require('backbone');
module.exports = Backbone.Model.extend({
	defaults:{
		hasFlagSelected: false,
		hasTaskSelected: false
	},
	initialize:function(){
		this.on("select:flag",function(){
			console.log("FLAG SELECTED")
		});
	}
});