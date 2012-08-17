define(['jquery', 'backbone','bbengine'], function($, Backbone, BBEngine){

    var View = Backbone.View.extend({

        // Represents the actual DOM element that corresponds to your View (There is a one to one relationship between View Objects and DOM elements)
        el: 'body',

        // View constructor
        initialize: function() {

           this.engine = new BBEngine({
                fps: 60
           });   

           this.engine.start();

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