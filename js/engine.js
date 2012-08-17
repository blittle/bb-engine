define(["underscore", "jquery"], function(_, $) {
	
	"use strict";

	function generateStars(width, height, density) {

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
	}

	function getPlayer() {
		var player = {
			player: true,
			img: new Image(),
			sx: 0,
			sy: 0,
			sw: 85,
			sh: 54,
			dx: 0,
			dy: 0,
			dw: 85,
			dh: 54,
			aniOffset: {
				total: 4,
				width: 85
			}
		};

		player.img.src = "css/sprite_ufo.png";

		return player;
	}

	function generatePlanet() {
		var player = {
			img: new Image(),
			sx: 0,
			sy: 0,
			sw: 300,
			sh: 300,
			dx: -150,
			dy: -150,
			dw: 200,
			dh: 200
		};

		player.img.src = "css/planet.png";

		return player;
	}

	var Engine = (function() {

		var options, Engine, interval, $canvas, ctx,
			stars, entities, events, keys;

		Engine = function(_options) {

			options = _.extend(
				{
					fps   : 10,
					width : 780,
					height: 450,
					'$canvas'  : $('#canvas')
				},
				_options);

			stars = generateStars(options.width, options.height, 5);
			entities = [generatePlanet(), getPlayer()];
			events = [];
			keys = {};

			$canvas = options.$canvas;
			$canvas.attr('width',  options.width);
			$canvas.attr('height', options.height);

			ctx = $canvas[0].getContext("2d");			
		};

		Engine.prototype = {
			start: function() {
				var scope = this;

				$(document).on('keydown.engine', function(e) {
					keys[e.which] = true;
				});

				$(document).on('keyup.engine', function (e) {
					setTimeout(function() {
						delete keys[e.which];
					}, 10000/options.fps+100);				    
				});

				interval = setInterval(function() {
					scope.render.call(scope);
				}, 1000/options.fps);

			},

			stop: function() {
				clearInterval(interval);
				$(document).off('keydown.engine')
				$(document).off('keyup.engine');
			},

			render: function() {	
				var x = 0,
					y = 0;

				ctx.fillStyle = "#000000";
				ctx.fillRect(0,0,options.width,options.height);

				for(var key in keys) {
					if(key === "65") {
						x = x + 4;						
					} else if(key === "68") {
						x = x - 4;
					} else if(key === "87") {
						y = y + 4;
					} else if(key === "83") {
						y = y - 4;
					}
				}	

				_.each(stars, function(star) {
					star.x = star.x + x;
					star.y = star.y + y;

					if(star.x < 0 || star.y < 0 || star.x > options.width || star.y > options.height) {
						return;
					}

					ctx.beginPath();
			        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI, false);
			        ctx.fillStyle = "#ffffff";
			        ctx.fill();
				});

				_.each(entities, function(e) {
					var ex, ey, i = 1, width = e.sx;

					if(e.player) {
						ex = e.dx + options.width/2  - (e.dw/2);
						ey = e.dx + options.height/2 - (e.dh/2);	
					} else {
						ex = e.dx = e.dx + x;
						ey = e.dy = e.dy + y;
					}

					if(e.aniOffset) {
						i =  e.i ? e.i : 0;
						if(i === e.aniOffset.total) {
							i = 0;
						}
						e.i = ++i;
						width = e.sw * e.i;

						ctx.drawImage(e.img,width - e.sw,e.sy,e.sw,e.sh,ex,ey,e.dw,e.dh);
					} else {
						ctx.drawImage(e.img,e.sx,e.sy,e.sw,e.sh,ex,ey,e.dw,e.dh);
					}

					
				});
				
			}
		};

		return Engine;

	})();

	return Engine;

});