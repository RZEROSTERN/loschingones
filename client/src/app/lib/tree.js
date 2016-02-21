var Snap = require("snapsvg");
var $ = require("jquery");
var Tree = {
	taskStackStyle:{
		    fill: "#bada55",
		    stroke: "#000",
		    strokeWidth: 5
	},
	taskStackElement:function(snap,group,xOffset,yOffset,elNumber,width,height){
		var r = snap.rect(xOffset,yOffset - (elNumber * 70),width,height);
		r.drag(function(){
			//on move
			console.log("IN DRAG",this,x,y);
			this.x = x;
			this.y = y;
		},function(x,y){
			//on start
			console.log("START DRAG",this,x,y);
		});
		group.add(r);
	},
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
		bigCircle.hover(function(){
			console.log("jklj");
		});
		//mockup
		var stack = s.group();
		Tree.taskStackElement(s,stack,20,$(el).height() - 80,0,200,50);
		Tree.taskStackElement(s,stack,20,$(el).height() - 80,1,200,50);
		Tree.taskStackElement(s,stack,20,$(el).height() - 80,2,200,50);
		stack.attr(Tree.taskStackStyle);
	}
}
module.exports = Tree;