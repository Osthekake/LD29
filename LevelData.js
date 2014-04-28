

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
	"down_arrow" : {
		src : "objects/down.png",
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
		src : "objects/elevator.png",
		bounds: {width:50, height:100},
		frames: 1
	},
	"valve" : {
		src : "objects/valve.png",
		bounds: {width:50, height:50},
		frames: 1
	},
	"notepad" : {
		src : "objects/notepad.png",
		bounds: {width:50, height:50},
		frames: 1
	},
	"lever" : {
		src : "objects/lever.png",
		bounds: {width:50, height:50},
		frames: 1
	},
	"fans" : {
		src : "objects/fans.png",
		bounds: {width:300, height:120},
		frames: 1
	},
	"guard" : {
		src : "objects/guard.png",
		bounds: {width:50, height:120},
		frames: 1
	},
	"face" : {
		src : "objects/face.png",
		bounds: {width:70, height:120},
		frames: 1
	},
	"passable" : {
		src : "objects/passable.png",
		bounds: {width:70, height:120},
		frames: 1
	},
	"glue" : {
		src : "objects/glue.png",
		bounds: {width:130, height:700},
		frames: 3
	},
	"underminer" : {
		src : "objects/underminer.png",
		bounds: {width:70, height:70},
		frames: 1
	},
	"squire" : {
		src : "objects/squire.png",
		bounds: {width:70, height:70},
		frames: 1
	},
	"bridgie" : {
		src : "objects/bridgie.png",
		bounds: {width:120, height:120},
		frames: 1
	},
	"cbat" : {
		src : "objects/cbat.png",
		bounds: {width:50, height:50},
		frames: 3
	},
	"scratches" : {
		src : "objects/scratches.png",
		bounds: {width:100, height:100},
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
		conversationOnLoad : "falling",
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
					position : "up"
				}
			}
		]
	},
	"hole" : {
		spawn : {
			"surface" : {x:400, y:500},
			"bridge01" : {x:0, y:520}
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
				transition : "bridge01",
				hint : "Go left"
			}
		]
	},
	"bridge01" : {
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
			},
			{
				sprite : "cbat",
				bounds : {x:130, y:400, width:50, height:50}
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
				transition : "bridge01",
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
			},{
				sprite : "paper",
				bounds : {x:550, y:310, width:50, height:50},
				conversation : "newspaper",
				hint : "read newspaper"
			},{
				sprite : "fans",
				bounds : {x:40, y:250, width:300, height:120},
				conversation : "townfans",
				hint : "Speak to crowd"
			}
		]
	},
	"ruins" : {
		spawn : {
			"ship" : {x:700, y:240},
			"bridge02" : {x:10, y:240}
		},
		src : "bg/battlefield.png",
		objects : [
			{
				sprite : "right_arrow",
				bounds : {x:750, y:270, width:50, height:50},
				transition : "ship",
				hint : "Go right"
			},{
				sprite : "left_arrow",
				bounds : {x:10, y:270, width:50, height:50},
				transition : "bridge02",
				hint : "Go left"
			},{
				sprite : "face",
				bounds : {x:210, y:210, width:70, height:120},
				conversation : "sirface1",
				hint : "Sir Face"
			},{
				sprite : "squire",
				bounds : {x:130, y:250, width:70, height:70},
				conversation : "squire",
				hint : "Sir Face's squire"
			},{
				sprite : "passable",
				bounds : {x:410, y:210, width:70, height:120},
				hint : "Sir Passable",
				conversation : "sirpass1"
			},{
				sprite : "bridgie",
				bounds : {x:510, y:230, width:120, height:120},
				conversation : "bridgie",
				hint : "Bridgie"
			}
		]
	},
	"bridge02" : {
		spawn : {
			"ruins" : {x:700, y:390},
			"cavern" : {x:10, y:390}
		},
		src : "bg/corridor02.png",
		objects : [
			{
				sprite : "right_arrow",
				bounds : {x:750, y:420, width:50, height:50},
				transition : "ruins",
				hint : "Go right"
			},{
				sprite : "left_arrow",
				bounds : {x:10, y:420, width:50, height:50},
				transition : "cavern",
				hint : "Go left"
			},
			{
				sprite : "guard",
				bounds : {x:200, y:370, width:50, height:120},
				conversation : "official",
				destroyTrigger : "bribe",
				blocking : 220,
				hint : "Official."
			},
			{
				sprite : "cbat",
				bounds : {x:210, y:100, width:50, height:50}
			}
		]
	},
	"cavern" : {
		spawn : {
			"bridge" : {x:700, y:70},
			"overlook_high" : {x:0, y:70},
			"overlook_low" : {x:0, y:470}
		},
		src : "bg/elevator.png",
		objects : [
			{
				sprite : "right_arrow",
				bounds : {x:750, y:100, width:50, height:50},
				transition : "bridge02",
				hint : "Go right"
			},{
				sprite : "left_arrow",
				bounds : {x:10, y:100, width:50, height:50},
				transition : "overlook_high",
				hint : "Go left"
			},{
				sprite : "left_arrow",
				bounds : {x:10, y:470, width:50, height:50},
				transition : "overlook_low",
				hint : "Go left"
			},
			{
				sprite : "lift",
				bounds : {x:330, y:30, width:120, height:150},
				elevator : {
					distance : 400,
					position : "up"
				},
				hint : "Use elevator"
			},
			{
				sprite : "underminer",
				bounds : {x:580, y:470, width:70, height:70},
				conversation : "underminer",
				hint : "Hooded figure"
			},
			{
				sprite : "scratches",
				bounds : {x:580, y:70, width:100, height:100},
				conversation : "damage",
				hint : "Scratches on wall"
			}
		]
	},
	"overlook_high" : {
		spawn : {
			"cavern" : {x:700, y:100},
			"factory" : {x:600, y:100}
		},
		src : "bg/overlook.png",
		objects : [
			{
				sprite : "right_arrow",
				bounds : {x:750, y:130, width:50, height:50},
				transition : "cavern",
				hint : "Go right"
			},{
				sprite : "down_arrow",
				bounds : {x:600, y:130, width:50, height:50},
				transition : "factory",
				hint : "Follow ledge",
				blocking : 590
			},
			{
				sprite : "notepad",
				bounds : {x:660, y:510, width:50, height:50}
			},
			{
				sprite : "cbat",
				bounds : {x:230, y:350, width:50, height:50}
			}
		]
	},
	"overlook_low" : {
		spawn : {
			"cavern" : {x:700, y:450}
		},
		src : "bg/overlook.png",
		objects : [
			{
				sprite : "right_arrow",
				bounds : {x:750, y:470, width:50, height:50},
				transition : "cavern",
				hint : "Go right",
				blocking : 620
			},
			{
				sprite : "notepad",
				bounds : {x:660, y:510, width:50, height:50},
				conversation : "notebook",
				remove : true,
				hint : "Small notepad"
			}
		]
	},
	"factory" : {
		spawn : {
			"overlook_high" : {x:700, y:320}
		},
		src : "bg/valves.png",
		objects : [
			{
				sprite : "right_arrow",
				bounds : {x:750, y:350, width:50, height:50},
				transition : "overlook_high",
				hint : "Go right"
			},
			{
				sprite : "valve",
				bounds : {x:230, y:290, width:50, height:50},
				onInterract : function(){Valves.turn("a");},
				hint : "Turn valve (a)"
			},
			{
				sprite : "valve",
				bounds : {x:330, y:290, width:50, height:50},
				onInterract : function(){Valves.turn("b");},
				hint : "Turn valve (b)"
			},
			{
				sprite : "valve",
				bounds : {x:430, y:290, width:50, height:50},
				onInterract : function(){Valves.turn("c");},
				hint : "Turn valve (c)"
			},
			{
				sprite : "lever",
				bounds : {x:630, y:370, width:50, height:50},
				onInterract : function(){Valves.test();},
				hint : "Pull lever"
			}, 
			{
				sprite : "cbat",
				bounds : {x:50, y:330, width:50, height:50},
				hint : "A carrier bat",
				conversation : "carrierbat"
			}
		]
	},
	"goingUp" : {
		spawn : {
			"factory" : {x:340, y:520}
		},
		src : "bg/well.png",
		objects : [
			{
				sprite : "light",
				bounds : {x:300, y:0, width:100, height:100},
				transition : "surface02",
				hint : "Ooh"
			},
			{
				sprite : "glue",
				bounds : {x:300, y:600, width:130, height:700},
				mandatory : true,
				elevator : {
					distance : 500,
					position : "down"
				}
			}
		]
	},
	"surface02" : {
		spawn : {
			"goingUp" : {x:340, y:520}
		},
		conversationOnLoad : "end",
		src : "bg/meadow.png",
		objects : [
			{
				sprite : "glue",
				bounds : {x:100, y:400, width:130, height:700}
			}
		]
	}
};