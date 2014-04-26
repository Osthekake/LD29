function intersectRect(r1, r2) {
	//console.log("Testing intersection " + r1 + "  " + r2);
	return !(r2.x > r1.x + r1.width || 
		r2.x + r2.width < r1.x || 
		r2.y > r1.y + r1.height ||
		r2.y + r2.height < r1.y);
}

function Level(name) {
	var level = this;
	var levelData = Levels[name];
	console.log("Building level. ("+name+") level data:");
	console.log(levelData);
	this.objects = [];
	for (var i = 0; i < levelData.objects.length; i++) {
		level.objects.push(new LevelObject(levelData.objects[i]));
	};

	this.background = undefined;
	Hero.moveTo(levelData.spawn);
	Hero.level = level;
	this.setBGImage = function(file){
		var img = new Image();
		img.src = file;
		img.onload = function () {
		  level.background = img;
		}
	}
	if(levelData.src){
		level.setBGImage(levelData.src);
	}

	this.update = function(delta) {
		for (var i = level.objects.length - 1; i >= 0; i--) {
			level.objects[i].update(delta);
		};
	}
	this.draw = function(context) {
		if(level.background)
			context.drawImage(level.background, 0, 0);
		for (var i = level.objects.length - 1; i >= 0; i--) {
			level.objects[i].draw(context);
		};
		Hero.draw(context);
	}
}

var Hero = {
	sprite : new Sprite("hero"),
	moving : null,
	location : {x:0, y:0, height:90, width:70},
	moveTo : function(where) { 
		this.location.x = where.x;
		this.location.y = where.y;
	},
	update : function(delta) {
		this.sprite.update(delta);
		this.moving = null;
		Keyboard.trigger(this);
		if(this.moving != null){
			if("left" == this.moving){
				this.location.x -= delta * 0.7;
				if(this.location.x < 0)
					this.location.x = 0;
			}else if("right" == this.moving){
				this.location.x += delta * 0.7;
				if(this.location.x > 730)
					this.location.x = 730;
			}
		}
		this.intersects = [];
		if(this.level){
			for (var i = 0; i < this.level.objects.length; i++) {
				var obj = this.level.objects[i];
				if(obj.conversation && obj.intersects(this.location))
					if(obj.mandatory){
						console.log("interract with something ");
						console.log(obj.conversation);
						game.gui = new GUI(obj.conversation);
					}else{
						this.intersects.push(this.level.objects[i]);	
					}
			};
		}
	},
	intersects : [],
	level : null,
	draw : function(context){
		this.sprite.draw(this.location, context);
		if(this.intersects.length > 0){
			context.fillStyle = Settings.popupColor;
			context.font = Settings.font;
			context.fillText("Press [enter] to interact", 250, 100);
		}
	},
	//keyboard input
	right : function(){
		this.moving = "right"
	},
	left :  function(){
		this.moving = "left"
	},
	enter : function(){
		console.log("interract with something ");
		console.log(this.intersects[0].conversation);
		game.gui = new GUI(this.intersects[0].conversation);
	}
}

function LevelObject(data) {
	var object = this;
	object.sprite = new Sprite(data.sprite);
	object.bounds = data.bounds;
	object.conversation = data.conversation;
	object.mandatory = data.mandatory;

	this.update = function(delta) {
		// change animation frame
		object.sprite.update(delta);
	}
	this.draw = function(context){
		//draw sprite with correct animation frame
		object.sprite.draw(object.bounds, context);
	}
	this.intersects = function(rect){
		return intersectRect(object.bounds, rect);
	}
}

function Sprite(spriteID) {
	var sprite = this;
	sprite.frames = 0; //todo: sprites
	sprite.currentFrame = 0;
	this.update = function(delta) {

	}
	this.draw = function(bounds, context) {
		context.fillStyle = "red";
		context.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
	}
}

var Levels = {
	"surface" : {
		spawn : {x:700, y:500},
		exit : {x:100, y:500, leadsTo:"well"},
		src : "meadow.png",
		objects : [
			{
				sprite : "tree",
				bounds : {x:50, y:500, width:50, height:100},
				conversation : "test"
			},
			{
				sprite : "bush",
				bounds : {x:750, y:500, width:50, height:100},
				conversation : undefined
			},
			{
				sprite : "hole",
				bounds : {x:300, y:560, width:150, height:20},
				conversation : "Intro",
				mandatory : "hole"
			}
		]
	},
	"hole" : {
		spawn : {x:400, y:500},
		exit : {x:100, y:500, leadsTo:"well"},
		src : "bottom.png",
		objects : [
			{
				sprite : "light",
				bounds : {x:300, y:0, width:100, height:300},
				conversation : undefined
			}
		]
	}
};