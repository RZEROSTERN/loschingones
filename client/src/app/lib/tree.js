var Snap = require("snapsvg");
var $ = require("jquery");
var Tree = {
	SVGRef:{
		snap: null,
		tl: null,
		linker: null
	},
	taskStackStyle:{
		   fill: "#bada55",
		    stroke: "#000",
		    strokeWidth: 5
	},
	flagStyle:{
		   fill: "#bada55",
		    stroke: "#000",
		    strokeWidth: 1
	},
	taskStackElement:function(snap,group,tlgroup,xOffset,yOffset,elNumber,width,height,legend){
		var leg = (legend) ? legend: "Test";
		var g = snap.group();
		var t = snap.text(xOffset + (width/3),yOffset - (elNumber * 70) + height/2,leg);
		var r = snap.rect(xOffset,yOffset - (elNumber * 70),width,height);
		r.attr(Tree.taskStackStyle);
		g.add(r,t);
		g.drag(function(dx,dy){
			//on move
			this.attr({
			transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy],
        	});
        	this.data("dxx",dx);
        	this.data("dyy",dy);
		},function(x,y){
			this.data('origTransform', this.transform().local );
		},function(){
			var fPos = this.data("dxx");
			if(fPos >= 80){
				var oo = Math.floor(fPos / 45) - 5;
				var pppos = 255 + 45 * oo;
				this.attr({
					transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [pppos, this.data("dyy")]
        		});
        		tlgroup.add(g);
			}else{
			this.attr({
				transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [0, 0]
        	});
			}
		});
		group.add(g);
	},
	start:function(el,flagCallback){
		Tree.SVGRef.snap = Snap("#svg");
		var s = Tree.SVGRef.snap;
		Tree.SVGRef.tl = s.group();
		var tl =  Tree.SVGRef.tl;
		//mockup
		var stack = s.group();
		Tree.taskStackElement(s,stack,tl,20,$(el).height() - 80,0,200,50);
		Tree.taskStackElement(s,stack,tl,20,$(el).height() - 80,1,200,50);
		Tree.taskStackElement(s,stack,tl,20,$(el).height() - 80,2,200,50);
		var markers = s.group();
		tl.add(s.rect(100,20,1100,20));
		for(var i = 0; i < 24; i++){
			var flag = s.rect(100 + (45 * i),10,10,60).attr(Tree.flagStyle); 
			flag.data("index",i);
			flag.hover(function(){
				//console.log(this.data("index"));
			});
			markers.add(flag);	
		}
		tl.add(markers);
		tl.drag(function(dx,dy){
			//on move
			this.attr({
			transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, 0]
        	});
		},function(x,y){
			this.data('origTransform', this.transform().local );
		},function(){
			/*this.attr({
				transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [0, 0]
        	});*/
		});
		console.log(tl);
		
	}
}
module.exports = Tree;