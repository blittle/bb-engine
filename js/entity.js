define(['layer'], function(Layer) {
	"use strict";

	return Layer.extend({
		initialize: function() {
			this.img = this.options.img;

			this.file = new Image();
			this.file.src = this.img.src			
		},

		render: function(ctx, keys) {

			var offset, ex, ey, i = 1, width = this.img.sx;

			if(this.options.fixed) {
				ex = this.img.dx
				ey = this.img.dy;	
			} else {
				offset = this.getOffset(keys);

				ex = this.img.dx = this.img.dx + offset.x;
				ey = this.img.dy = this.img.dy + offset.y;
			}

			if(this.img.aniOffset) {
				i =  this.img.i ? this.img.i : 0;
				if(i === this.img.aniOffset.total) {
					i = 0;
				}
				this.img.i = ++i;
				width = this.img.sw * this.img.i;

				ctx.drawImage(this.file,width - this.img.sw,this.img.sy,this.img.sw,this.img.sh,ex,ey,this.img.dw,this.img.dh);
			} else {
				ctx.drawImage(this.file,this.img.sx,this.img.sy,this.img.sw,this.img.sh,ex,ey,this.img.dw,this.img.dh);
			}

		}
	});

})