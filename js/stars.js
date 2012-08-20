define(['layer', 'underscore'], function(Layer, _) {
	
	"use strict";

	var generateStars = function(width, height, density) {

		if(density === null) {
			density = 10;
		}

		var x, y, stars = [], itr = 1/density * 100, seed, seed2;

		for(x = -1 * width; x < 2 * width; x+=itr) {
			for(y = -1 * width; y < 2 * height; y+=itr ) {
				seed = (new Date().getTime() + "").substring(11) * 1;
				seed2 = (new Date().getTime() + "").substring(11) * 1;

				stars.push({
					r: Math.random() * 1.2 * Math.random() * 1.3,
					x: x + ((Math.random() > .49 ? 1 : -1) * seed),
					y: y + ((Math.random() > .49 ? 1 : -1) * seed2)
				});
			}
		}

		return stars;
	};

	return Layer.extend({
		initialize: function() {
			this.stars = generateStars(this.options.width, this.options.height, 3);
		},
		render: function(ctx, keys) {
			var offset=this.getOffset(keys),
				x = offset.x,
				y = offset.y,
				scope = this;

			_.each(this.stars, function(star) {
				star.x = star.x + x;
				star.y = star.y + y;

				if(star.x < 0 || star.y < 0 || star.x > scope.options.width || star.y > scope.options.height) {
					return;
				}

				ctx.beginPath();
		        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI, false);
		        ctx.fillStyle = "#ffffff";
		        ctx.fill();
			});
		}
	});

});