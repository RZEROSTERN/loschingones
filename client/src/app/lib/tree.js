var Snap = require("snapsvg");
var $ = require("jquery");
var Tree = {
	taskStackStyle:{
		   fill: "#bada55",
		    stroke: "#000",
		    strokeWidth: 5
	},
	taskStackElement:function(snap,group,xOffset,yOffset,elNumber,width,height,legend){
		var leg = (legend) ? legend: "Test";
		var g = snap.group();
		var t = snap.text(xOffset + (width/3),yOffset - (elNumber * 70) + height/2,leg);
		var r = snap.rect(xOffset,yOffset - (elNumber * 70),width,height);
		r.attr(Tree.taskStackStyle);
		g.add(r,t);
		g.drag(function(dx,dy){
			//on move
			this.attr({
			transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
        	});
		},function(x,y){
			this.data('origTransform', this.transform().local );
		},function(){
			this.attr({
				transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [0, 0]
        	});
		});
		group.add(g);
	},
	start:function(el){
		var s = Snap("#svg");
		//mockup
		var stack = s.group();
		Tree.taskStackElement(s,stack,20,$(el).height() - 80,0,200,50);
		Tree.taskStackElement(s,stack,20,$(el).height() - 80,1,200,50);
		Tree.taskStackElement(s,stack,20,$(el).height() - 80,2,200,50);
	}
}
module.exports = Tree;