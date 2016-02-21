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
		r.drag(function(dx,dy){
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
		group.add(r);
	},
	start:function(el){
		var s = Snap("#svg");
		//mockup
		var stack = s.group();
		Tree.taskStackElement(s,stack,20,$(el).height() - 80,0,200,50);
		Tree.taskStackElement(s,stack,20,$(el).height() - 80,1,200,50);
		Tree.taskStackElement(s,stack,20,$(el).height() - 80,2,200,50);
		stack.attr(Tree.taskStackStyle);
	}
}
module.exports = Tree;