function intersectRect(r1, r2) {
	//console.log("Testing intersection " + r1 + "  " + r2);
	return !(r2.x > r1.x + r1.width || 
		r2.x + r2.width < r1.x || 
		r2.y > r1.y + r1.height ||
		r2.y + r2.height < r1.y);
}


var Sprites = {
	"tree" : {
		src : "objects/tree.png",
		bounds: {width:50, height:100},
		frames: 1
	},
	"bush" : {
		src : "objects/bush.png",
		bounds: {width:50, height:70},
		frames: 1
	},
	"hole" : {
		src : "objects/hole.png",
		bounds: {width:150, height:20},
		frames: 1
	},
	"light" : {
		src : "objects/light.png",
		bounds: {width:100, height:300},
		frames: 3
	},
	"hero" : {
		src : "objects/hero.png",
		bounds: {width:70, height:90},
		frames: 1
	},
	"left_arrow" : {
		src : "objects/left.png",
		bounds: {width:50, height:50},
		frames: 4
	},
	"right_arrow" : {
		src : "objects/right.png",
		bounds: {width:50, height:50},
		frames: 4
	},
	"water" : {
		src : "objects/waterblob.png",
		bounds: {width:150, height:150},
		frames: 1
	},
	"paper" : {
		src : "objects/paper.png",
		bounds: {width:50, height:50},
		frames: 1
	},
	"lift" : {
		src : "objects/lift.png",
		bounds: {width:50, height:100},
		frames: 1
	}
};

var Levels = {
	"surface" : {
		spawn : {
			"start" : {x:700, y:500}
		},
		src : "bg/meadow.png",
		objects : [
			{
				sprite : "tree",
				bounds : {x:20, y:300, width:130, height:280},
				conversation : "test"
			},
			{
				sprite : "bush",
				bounds : {x:750, y:500, width:50, height:70},
				conversation : undefined
			},
			{
				sprite : "hole",
				bounds : {x:300, y:560, width:150, height:20},
				conversation : "Intro",
				mandatory : true
			}
		]
	},
	"well" : {
		spawn : {
			"surface" : {x:340, y:20}
		},
		src : "bg/well.png",
		objects : [
			{
				sprite : "hole",
				bounds : {x:300, y:560, width:150, height:20},
				transition : "hole",
				hint : "AAAAAAA",
				mandatory : true
			},
			{
				sprite : "water",
				bounds : {x:300, y:-30, width:130, height:200},
				mandatory : true,
				elevator : {
					distance : 500,
					position : "up",
					debug : "lolololol"
				}
			}
		]
	},
	"hole" : {
		spawn : {
			"surface" : {x:400, y:500},
			"bridge" : {x:0, y:520}
		},
		src : "bg/bottom.png",
		objects : [
			{
				sprite : "light",
				bounds : {x:300, y:0, width:100, height:300},
				conversation : undefined
			},
			{
				sprite : "left_arrow",
				bounds : {x:0, y:520, width:50, height:50},
				transition : "bridge",
				hint : "Go left"
			}
		]
	},
	"bridge" : {
		spawn : {
			"hole" : {x:700, y:50},
			"ship" : {x:50, y:50}
		},
		src : "bg/corridor01.png",
		objects : [
			{
				sprite : "right_arrow",
				bounds : {x:750, y:90, width:50, height:50},
				transition : "hole",
				hint : "Go right"
			},
			{
				sprite : "left_arrow",
				bounds : {x:0, y:90, width:50, height:50},
				transition : "ship",
				hint : "Go left"
			}
		]
	},
	"ship" : {
		spawn : {
			"bridge" : {x:700, y:50},
			"deck" : {x:300, y:50},
			"ruins" : {x:50, y:50}
		},
		src : "bg/ship.png",
		objects : [
			{
				sprite : "right_arrow",
				bounds : {x:750, y:90, width:50, height:50},
				transition : "bridge",
				hint : "Go right"
			},
			{
				sprite : "left_arrow",
				bounds : {x:0, y:90, width:50, height:50},
				transition : "ruins",
				hint : "Go left"
			},
			{
				sprite : "down_arrow",
				bounds : {x:300, y:90, width:50, height:50},
				transition : "deck",
				hint : "Board ship"
			}
		]
	},
	"deck" : {
		spawn : {
			"ship" : {x:700, y:280}
		},
		src : "bg/deck.png",
		objects : [
			{
				sprite : "right_arrow",
				bounds : {x:750, y:290, width:50, height:50},
				transition : "ship",
				hint : "Go right"
			}
		]
	},
	"ruins" : {
		spawn : {
			"ship" : {x:700, y:240}
		},
		src : "bg/battlefield.png",
		objects : [
			{
				sprite : "right_arrow",
				bounds : {x:750, y:270, width:50, height:50},
				transition : "hole",
				hint : "Go right"
			}
		]
	}
};

function Level(name, from) {
	console.log("Building level. ("+name+") level data:");
	var level = this;
	level.name = name;
	var levelData = Levels[name];
	console.log(levelData);
	this.objects = [];
	for (var i = 0; i < levelData.objects.length; i++) {
		level.objects.push(new LevelObject(levelData.objects[i]));
	};

	this.background = undefined;
	if(levelData.spawn[from])
		Hero.moveTo(levelData.spawn[from]);
	else{
		Hero.moveTo(levelData.spawn[Object.keys(levelData.spawn)[0]]);
	}
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
	controlling : true,
	line : undefined,
	moveTo : function(where) { 
		this.location.x = where.x;
		this.location.y = where.y;
	},
	elevator : function(distance) {
		console.log("starting elevator for hero");
		this.controlling = false;
		console.log("this.location.y " + this.location.y + " distance " + distance);
		this.line = new Line(this.location.y, this.location.y + distance);
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
		if(this.level && this.controlling){
			for (var i = 0; i < this.level.objects.length; i++) {
				var obj = this.level.objects[i];
				if(obj.intersects(this.location)){
					this.intersects.push(this.level.objects[i]);
					if(obj.mandatory){
						this.enter();
					}
				}
			};
		}
		if(this.line){
			//console.log(this);
			var y = this.line.getPos(delta);
			this.location.y = y;
			if(this.line.done()){
				this.line = undefined;
				this.controlling = true;
			}
		}
	},
	intersects : [],
	level : null,
	draw : function(context){
		this.sprite.draw(this.location, context);
		if(this.intersects.length > 0){
			var other = this.intersects[0];
			context.fillStyle = Settings.popupColor;
			context.font = Settings.font;
			if(!other.mandatory && (other.conversation || other.transition))
				context.fillText("Press [enter]", 250, 60);
			if(other.hint)
				context.fillText(other.hint, 270, 20);
		}
	},
	//keyboard input
	right : function(){
		if(this.controlling)
			this.moving = "right"
	},
	left :  function(){
		if(this.controlling)
			this.moving = "left"
	},
	enter : function(){
		if(this.controlling && this.intersects[0]){
			var other = this.intersects[0];
			console.log("interract with something ");
			console.log(other);

			if(other.conversation){
				game.gui = new GUI(other.conversation);	
			}else if(other.transition){
				game.loadLevel(other.transition);
			}else if(other.elevatorData){
				var edata = other.elevatorData;
				//console.log("elevator data");
				//console.log(edata);
				//console.log(edata.debug);
				if(edata.position == "up"){
					Hero.elevator(edata.distance);
					other.elevator(edata.distance);	
					edata.position = "down";
				}else{
					Hero.elevator(-edata.distance);
					other.elevator(-edata.distance);
					edata.position = "up";
				}
				
			}
		}
	}
}

function Line(a, b) {
	var line = this;
	this.a = a;
	this.b = b;
	this.time = 3000;
	this.perTime = (this.b - this.a) / this.time;
	line.timePassed = 0;
	//console.log("Making line from " + this.a + " to " + this.b + " with derivate " + this.perTime);
	this.getPos = function(delta) {
		line.timePassed += delta;
		//console.log("line.a " + line.a + " line.timePassed " + line.timePassed + " line.perTime " + line.perTime);
		var val = line.a + line.timePassed * line.perTime;
		if(line.timePassed > line.time)
			val = line.b;
		//console.log("position will be updated with " + val);
		return val;
	}
	this.done = function() {
		return line.timePassed > line.time;
	}
}

function LevelObject(data) {
	var object = this;
	object.sprite = new Sprite(data.sprite);
	object.bounds = data.bounds;
	object.conversation = data.conversation;
	object.transition = data.transition;
	object.mandatory = data.mandatory;
	object.hint = data.hint;
	object.elevatorData = data.elevator;

	object.line = null;

	this.update = function(delta) {
		// change animation frame
		object.sprite.update(delta);
		//move if on a line.
		if(object.line != null){
			//console.log(object.line);
			var y = object.line.getPos(delta);
			object.bounds.y = y;
			if(object.line.done()){
				object.line = null;
			}
		}
	}
	this.draw = function(context){
		//draw sprite with correct animation frame
		object.sprite.draw(object.bounds, context);
	}
	this.intersects = function(rect){
		return intersectRect(object.bounds, rect);
	}
	this.elevator = function(distance) {
		console.log("starting elevator for object");
		object.line = new Line(object.bounds.y, object.bounds.y + distance);
		console.log(object.line);
	}
}

var millisPrFrame = 300;

function Sprite(spriteName) {
	var sprite = this;
	var spriteData = Sprites[spriteName];
	var img = new Image();
	img.src = spriteData.src;
	img.onload = function () {
		sprite.img = img;
	}
	sprite.frames = spriteData.frames; //todo: sprites
	sprite.bounds = spriteData.bounds;
	sprite.currentFrame = 0;
	sprite.timeSinceLastFrame = 0;
	this.update = function(delta) {
		sprite.timeSinceLastFrame += delta;
		if(sprite.timeSinceLastFrame > millisPrFrame){
			sprite.currentFrame += 1;
			if(sprite.currentFrame > sprite.frames-1)
				sprite.currentFrame = 0;
			sprite.timeSinceLastFrame -= millisPrFrame;
		}

	}
	this.draw = function(bounds, context) {
		if(!sprite.img){
			context.fillStyle = "red";
			context.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
		}else{
			var xpos = sprite.currentFrame * sprite.bounds.width;
			context.drawImage(sprite.img, xpos, 0, sprite.bounds.width, sprite.bounds.height, bounds.x, bounds.y, bounds.width, bounds.height);
		}	
	}
}
