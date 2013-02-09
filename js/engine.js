define(["underscore", "jquery", "layer"], function(_, $, Layer) {
	
	"use strict";

	var Engine = (function() {

		var options, Engine, interval, $canvas, ctx,
			layers, keys;

		Engine = function(_options) {

			options = _.extend(
				{
					fps   : 10,
					width : 780,
					height: 450,
					'$canvas'  : $('#canvas')
				},
				_options);
	
			layers = [];
			keys   = {};

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
					}, 1000/options.fps+100);				    
				});

				interval = setInterval(function() {
					scope.render.call(scope);
				}, 1000/options.fps);

			},

			addLayer: function(i, layer) {
				layers.push(layer);
			},

			stop: function() {
				clearInterval(interval);
				$(document).off('keydown.engine')
				$(document).off('keyup.engine');
			},

			render: function() {			
				_.each(layers, function(layer) {
					layer.render(ctx, keys);
				});				
			}
		};

		return Engine;

	})();

	return Engine;

});