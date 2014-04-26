/*
 * various overload stuff for browser compatibility.
 * (For update loop hook)
 */
requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     window.oRequestAnimationFrame ||
     window.msRequestAnimationFrame ||
     function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
       window.setTimeout(callback, 1000/60);
     };
})();

/* 
 * Main game loop. Targets for update and draw 
 * should be in 'objects' or 'level' fields.
 * For cleaner rendering, stop the game loop while 
 * building new level objects.
 */
function GameLoop(canvas) {
	var canvas = canvas;
	var context = canvas.getContext("2d");
	context.save();
	var game = this;
	game.running = false;
		
	//Level object. Must implement update and draw.
	this.level = undefined;

	//gui object. Rendered on top of other things
	this.gui = undefined;

	//start rendering and updating.
	this.start = function() {
		game.running = true;
		window.requestAnimationFrame(this.run);
	}

	this.loadLevel = function(levelname) {
		game.stop();
		game.level = new Level(levelname);
		game.start();
	}

	//stop rendering and updating.
	this.stop = function() {
		game.running = false;
	}

	//the update method
	this.update = function(time) {
		if(game.gui)
			game.gui.update(time);
		else 
			Hero.update(time);
		if(game.level)
			game.level.update(time);
	}

	//the draw method.
	this.draw = function(){
		if(!game.running){
			//loading screen
			return;
		}
		context.restore();
		context.clearRect(0, 0, canvas.width, canvas.height);
		if(game.level){
			game.level.draw(context);
		}
		if(game.gui){
			game.gui.draw(context);
			
		}
	}

	var lastUpdate = 0;
	//hook for update and draw.
	this.run = function(time) {
		var delta = time - lastUpdate;
		lastUpdate = time;
		game.update(delta);
		game.draw();
		if(game.running){
			window.requestAnimationFrame(game.run);
		}
	}
};