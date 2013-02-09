define(['layer', 'underscore'], function(Layer, _) {
	
	"use strict";

	var generateStars = function(width, height, density) {

		if(density === null) {
			density = 10;
		}

		var x, y, stars = [], itr = 1/density * 100, seed, seed2;

		for(x = -1 * width; x < width; x+=itr) {
			for(y = -1 * width; y < height; y+=itr ) {
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
			var scope = this;

			this.stars = generateStars(this.options.width * 4, this.options.height * 4, 3);

			this.subCanvas = document.createElement('canvas');
			this.subCanvas.width = this.options.width * 4;
			this.subCanvas.height = this.options.width * 4;

			this.subCtx = this.subCanvas.getContext('2d');

			_.each(this.stars, function(star) {
				scope.subCtx.beginPath();
		        scope.subCtx.arc(star.x, star.y, star.r, 0, 2 * Math.PI, false);
		        scope.subCtx.fillStyle = "#ffffff";
		        scope.subCtx.fill();
			});

			this.x = 0;
			this.y = 0;
		},
		render: function(ctx, keys) {
			var offset=this.getOffset(keys);
			this.x += offset.x;
			this.y += offset.y;

			ctx.drawImage(this.subCanvas, this.x, this.y);			
		}
	});

});