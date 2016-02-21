var Snap = require("snapsvg");
var $ = require("jquery");
var Tree = {
	start:function(el){
		var s = Snap("#svg");
		// Lets create big circle in the middle:
		var bigCircle = s.circle(150, 150, 100);
		// By default its black, lets change its attributes
		bigCircle.attr({
		    fill: "#bada55",
		    stroke: "#000",
		    strokeWidth: 5
		});
		//$("svg").clone().appendTo(el);

	}
}
module.exports = Tree;