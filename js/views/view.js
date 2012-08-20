define(['jquery', 'backbone','bbengine', 'layer', 'stars', 'entity'],    
function($, Backbone, BBEngine, Layer, Stars, Entity){
 
    var View = Backbone.View.extend({

        // Represents the actual DOM element that corresponds to your View (There is a one to one relationship between View Objects and DOM elements)
        el: 'body',

        // View constructor
        initialize: function() {

            var width  = "780",
                height = "450",
                scope  = this;


            this.engine = new BBEngine({
                fps: 60
            });   

            this.engine.start();

            setTimeout(function() {
                scope.engine.stop();
            }, 10000);

            this.engine.addLayer(0, new Layer({
                color: "#000000",
                width: width,
                height: height     
            }));

            this.engine.addLayer(1, new Stars({
                width: width,
                height: height 
            }));

            this.engine.addLayer(1, new Stars({
                width: width,
                height: height,
                offsetSpeed: 3 
            }));

            this.engine.addLayer(2, new Entity({                
                img: {
                    sx: 0,
                    sy: 0,
                    sw: 300,
                    sh: 300,
                    dx: 0,
                    dy: 0,
                    dw: 200,
                    dh: 200,
                    src: "css/planet.png"
                }
            }));

            this.engine.addLayer(2, new Entity({
                fixed: true,
                img: {
                    sx: 0,
                    sy: 0,
                    sw: 85,
                    sh: 54,
                    dx: width/2  - (85/2),
                    dy: height/2 - (54/2),
                    dw: 85,
                    dh: 54,
                    src: "css/sprite_ufo.png",
                    aniOffset: {
                        total: 4,
                        width: 85
                    }    
                }
            }));



        },

        events: {
            
	    },

        render: function() {
            var scope = this;
            //setTimeout(function() {scope.engine.stop();}, 4000);
        }

    });
	
    // Returns the View class
    return View;
});