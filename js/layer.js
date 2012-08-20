define(["backbone","underscore"], function(Backbone, _) {
	
	"use strict";

	var Layer = Backbone.View.extend({
		initialize: function() {

		}, 
		render: function(ctx) {
			ctx.fillStyle = this.options.color;
			ctx.fillRect(0,0,this.options.width,this.options.height);

			return this;
		},

		getOffset: function(keys) {
			var x = 0,
				y = 0,
				speed = this.options.offsetSpeed || 4;				

			for(var key in keys) {
				if(key === "65") {
					x = x + speed;						
				} else if(key === "68") {
					x = x - speed;
				} else if(key === "87") {
					y = y + speed;
				} else if(key === "83") {
					y = y - speed;
				}
			}

			return {x: x, y: y};	
		}	
	});

	return Layer;
});