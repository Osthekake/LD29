/*
 * This is where all the conversations in the game go.
 * 
 * NB: forgetting a , will cause errors. (but that's ok. :) )
 * 
 * Conversations are sets of screens.
 * Options are 'pointers' between screens (or back to the same screen).
 */
var Conversations = {
	"test" : { //this is the id of the conversation. This is important when loading the conversation in the game.
		"start" : "screen01", //this is the id of the first screen to be displayed when the conversation starts.
		"screens" : { //'screens' are one side of text, with corresponding answer options
			"screen01" : {  //this is the id or key of a screen options with 'leadsTo' equal to this will cause this screen to appear.
				"text" : "Hello person of inadequate altitude.\nLine breaks are fun.",
				"options" : [//these are the _IDS_ of the options which are appropriate for this screen.
					"insult01",
					"greet01",
					"polite",
					"leave" 
					// For graphical reasons, 4 is probably the highest number of options you should have.
				]
			},
			"screen02" : {  
				"text" : "Why, I never!",
				"options" : [
					"leave" 
				]
			}//, other screens go here. "id" : {stuff},//, other screens go here. "id" : {stuff},
		},
		"options" : { //options are separate from the screens. This is so you can use the same option on several screens. (they will lead to the same screen every time, however)
			"insult01" : { //this is the id of the option. should correspond to the ids in options of the appropriate screens.
				"leadsTo" : "screen02", //this is the key of the screen. This option leads to screen01 when picked.
				"text" : "You stink." //this is the option as it is presented to the player.
			},
			"unused" : {
				"leadsTo" : undefined,
				"text" : "This option is not used."
			},
			"greet01" : {	
				"leadsTo" : "screen01",
				"text" : "I greet you fellow subterranian.",
				yields : "politeness"
			},
			"polite" : {
				"leadsTo" : "screen01",
				"text" : "I am so polite!.",
				requires : ["politeness"]
			},
			"leave" : {
				"leadsTo" : undefined, //leadsTo as undefined will cause the conversation to end
				"text" : "(leave)"
			}//, other options go here.
		}
	},//, other conversations go here
	"Intro" : {
		"start" : "intro01",
		"screens" : {
			"intro01" : {
				"text" : "Walking home one sunny day, you take a short-cut through a field.\nThis is a mistake.\nAfter several close encounters with manure, you catch yourself just\nin time from falling into a deep hole. Who the hell leaves deep holes\naround the place where people can just fall through them?",
				"options" : [
					"coverhole01"]
			},
			"intro02" : {
				"text" : "You find an old door, which looks like it was covering the hole until\nrecently. It's pretty heavy. It has a rope attached to the middle of one\nside. This does not make it any easier to drag.\nYou take a break from dragging it and sit beside the hole. The smell of\ncool water comes up from it: it's an old well, not just a mysterious\nhole. That makes a lot more sense.\nStill dangerous though.\nYou stand up to drag the door again when you see something\nshining in the water. It's quite far down.",
				"options" : [
					"shiny01"]
			},
			"intro03" : {
				"text" : "It's too far away. You'll need to go in the well.",
				"options" : [
					"shiny02"]
			},
			"intro04" : {
				"text" : "Are you sure? Wells are dangerous.",
				"options" : [
					"shiny03"]
			},
			"intro05" : {
				"text" : "You take firm hold of the rope and start lowering yourself down\nthe well. The door shifts position as your weight drags it towards\nthe well. Then it stops and gets stuck on some rocks which were\napparently used to anchor it in place over the well. You reach\nthe end of the rope, your feet touching water, the shiny thing\n- coins? A sword? A crown? - tantalisingly close but just\nout of reach...",
				"options" : [
					"badidea01"]
			},
			"intro06" : {
				"text" : "Letting go of the rope is your third bad idea. You drop into the\nwater with a massive splash and soak yourself pretty effectively.\nAt least there's not much water in here. Plus, the shiny thing is\njust in reach.",
				"options" : [
					"shiny04"]
			},
			"intro07" : {
				"text" : "It seems to be stuck.",
				"options" :[
					"shiny05"]
			},
			"intro08" : {
				"text" : "It's a lever.\nThe floor drops out from under you. You briefly manage to cling\nto the lever, saying \"argh\", but you're already tired from dragging\nthat damn door and you fall down, into another pool of water,\nbut that falls as well.",
				"options" : [
					"scream01"]
			},
			"intro09" : {
				"text" : "You seem to be falling for a long time. You keep hitting other pools\nof water, which then start dropping as well.\nThis is odd.",
				"options" : [
					"scream02"]
			},
			"intro10" : {
				"text" : "With an enormous splash, you and what appears to be half of a\nlake drop into something and stop falling, although it takes you a\nminute to realise this in your frantic swim to the surface.\nYou drift for a while until your head stops spinning.",
				"options" : [
					"swim01"]
			},
			"intro11" : {
				"text" : "There's light to see by but it seems to be coming from beneath\nyou rather than above. It's a weird green-blue that you identify\nas phosphorescence. Eventually. You're not thinking too fast\nright now.\nThe shore is only twenty metres wide, but there's no sign of\nanother body of water. Actually, there's no sign of anything,\nwhich is really weird.",
				"options" : [
					"edge01"]
			},
			"intro12" : {
				"text" : "Far down.\nReally far down.\nThere is literally nothing below you except spots of phosphorescence.\nAlthough they could be your eyes playing tricks with you from all of\nthat down. You back away from the edge and look around for\nabsolutely anything else that could take your mind off all of that\ndown that appears to be waiting for another lever incident.",
				"options" : [
					"clockwise01",
					"anticlockwise01"]
			},
			"intro13" : {
				"text" : "You resolve never to pull another lever. This resolution fades when\nyou find a bridge concertina'd up a few hundred metres around\nthe lip of what you are growing to suspect is a giant bowl.\nThere's a lever on the side.",
				"options" :[
					"lever01"]
			},
			"intro14" : {
				"text" : "This is your first good idea since you took the short-cut.\nWell done.",
				"options" :[
				"goforth01"]
			}
		},
		"options" : {
			"coverhole01" : {
				"leadsTo" : "intro02",
				"text" : "Look for something to cover the hole with"
			},
			"shiny01" : {
				"leadsTo" : "intro03",
				"text" : "Reach for the shiny"
			},
			"shiny02" : {
				"leadsTo" : "intro04",
				"text" : "Use the rope and door to climb down the well to reach the shiny"
			},
			"shiny03" : {
				"leadsTo" : "intro05",
				"text" : "The shiny calls to me. I must have it. Use the rope. Carefully"
			},
			"shiny04" : {
				"leadsTo" : "intro07",
				"text" : "Take the shiny!"
			},
			"shiny05" : {
				"leadsTo" : "intro08",
				"text" : "Pull harder! Shiny shiny shiny!"
			},
			"badidea01" : {
				"leadsTo" : "intro06",
				"text" : "Let go of the rope. Yes I know it's a bad idea. Do it anyway"
			},
			"scream01" : {
				"leadsTo" : "intro09",
				"text" : "ARGH!"
			},
			"scream02" : {
				"leadsTo" : "well",
				"text" : "AAAA - gack water up nose - AARGH",
				levelTransition : true
			},
			"swim01" : {
				"leadsTo" : "intro11",
				"text" : "Swim to the shore"
			},
			"edge01" : {
				"leadsTo" : "intro12",
				"text" : "Approach the edge cautiously and look down"
			},
			"clockwise01" : {
				"leadsTo" : "intro13",
				"text" : "Go clockwise round the lake"
			},
			"anticlockwise01" : {
				"leadsTo" : "intro13",
				"text" : "Go anticlockwise round the lake"
			},
			"lever01" : {
				"leadsTo" : "intro14",
				"text" : "Pull the lever"
			},
			"goforth01" : {
				"leadsTo" : "well",
				"text" : "Gather yourself and venture forth across the bridge",
				levelTransition : true
			}
		}
	},
	"newspaper" : {
		"start" : "newspaper01",
		"screens" : {
			"newspaper01" : {
				"text" : "You find a single sheet of pulpy paper. It smells a little like\nmushrooms. It appears to be written in English. That's really\nconvenient, isn't it?\nThree articles attract your attention.",
				"options" : [
					"page01",
					"page02",
					"page03"]
			},
			"newspaper02" : {
				"text" : "What would you like to read now?",
				"options" : [
					"page01",
					"page02",
					"page03",
					"exit01"]
			},
			"listings01" : {
				"text" : "A list of names are followed by various numbers. You can guess\nat Wins, Losses, Draws, and total points, but there are a lot\nof other numbers and abbreviations you don't understand.\nThe top ranked fighters are Sir Face and Sir Passable. They seem\nto be better than the rest by a long way.\nThere's a small advert beneath the list which says \"Knight\nFight Night, where knights fight with all their might all night!\"",
				"options" : [
					"more01",
					"exit01"]
			},
			"index01" : {
				"text" : "There's a graph and a brief discussion of shares. Plumber Bros\nKingdom of Mushrooms is holding steady, Sticky Fingers Glue\nSuppliers is at rock top, and Guy d'Ropes Security is\ndropping sharply.",
				"options" : [
					"more01",
					"exit01"]
			},
			"travel01" : {
				"text" : "Various announcements about bridge closures and travel\nrestrictions before the newly created Annual Hyper-Productive\nVegetable Boiling Experiment and Explosive Over-Production\ncelebratory cornucopia.",
				"options" : [
					"more01",
					"exit01"
				]
			}
		},
		"options" : {
			"page01" : {
				"leadsTo" : "listings01",
				"text" : "Read the Knight Fight Listings",
				"grants" : "tfbluffinfo"
			},
			"page02" : {
				"leadsTo" : "index01",
				"text" : "Read the Drow Jones Index"
			},
			"page03" : {
				"leadsTo" : "travel01",
				"text" : "Read the Travel Advisory notice"
			},
			"exit01" : {
				"leadsTo" : undefined,
				"text" : "Put the paper down"
			},
			"more01" : {
				"leadsTo" : "newspaper02",
				"text" : "Read more"
			}
		}
	},
	"notebook" : {
		"start" : "notebook01",
		"screens" : {
			"notebook01" : {
				"text" : "You see a notebook under a patch of small red mushrooms. You\npick it up, because you're nosy like that. Looks like it was\nsoaked in water for a while, but it's dried out and might still\nhave some useful information. You start flicking through it.",
				"options" : [
					"notecont01"]
			},
			"notebook02" : {
				"text" : "The first few pages are references to various different\ninterviews with Knight Fight fans and with the knights\nthemselves.",
				"options" : [
					"notemore01",
					"noteskip01"]
			},
			"notebook03" : {
				"text" : "There's not much that you understand here, but you notice that\nboth Sir Face and Sir Passable seem to respect each other a lot.\nSir Face mentions that Sir Passable has the best armour she's\never seen, and Sir Passable says that Sir Face's stance is\nrock solid and hard to breach.",
				"options" : [
					"noteskip01"]
			},
			"notebook04" : {
				"text" : "What you can make out here suggests that the writer was\ninvestigating the locations of the Knight Fights and the damage\ndone. There are a lot of question marks and underlines.",
				"options" : [
					"notemore02",
					"noteskip02"]
			},
			"notebook05" :{
				"text" : "Maybe if you could dry the book out and add fingerprint dust to\nit, that stuff sticks to everything. Not that you have personal\nexperience of it or anything.",
				"options" : [
					"noteskip02"]
			},
			"notebook06" : {
				"text" : "The notebook finishes abruptly with what looks like a map\nlocation and a spatter of dark brown liquid.",
				"options" : [
					"notecont02"]
			},
			"notebook07" : {
				"text" : "You pocket the notebook, trying hard not to touch the blood.",
				"options" : [
					"noteend01"
				]
			}
		},
		"options" : {
			"notecont01" : {
				"leadsTo" : "notebook02",
				"text" : "Keep reading"
			},
			"notecont02" : {
				"leadsTo" : "notebook07",
				"text" : "Is that blood? Oh my"
			},
			"notemore01" : {
				"leadsTo" : "notebook03",
				"text" : "Read more about the knights"
			},
			"notemore02" : {
				"leadsTo" : "notebook05",
				"text" : "Try to make out more"
			},
			"noteskip01" : {
				"leadsTo" : "notebook04",
				"text" : "Skip to the next section"
			},
			"noteskip02" : {
				"leadsTo" : "notebook06",
				"text" : "Skip to the next section"
			},
			"noteend01" : {
				"leadsTo" : undefined,
				"text" : "Go back to looking around"
			}
		}
	},
	"townfans" : {
		"start" : "townfans01",
		"screens" : {
			"townfans01" : {
				"text" : "A group of people wearing team colours are standing talking\nabout the upcoming match between Sir Face and Sir Passable.",
				"options" : [
					"tflisten01",
					"tftalk01",
					"tfleave01"]
			},
			"townfans02" : {
				"text" : "The group are evenly split between Sir Face and Sir Passable,\nexcept one loud fan of Sir Pryce who gets shouted down a lot.",
				"options" : [
					"tflisten02",
					"tftalk02",
					"tfleave01"]
			},
			"townfans03" : {
				"text" : "The group looks at your clothes a little oddly but are happy to\ninclude you in the conversation. Unfortunately you just fell\nthrough a well and you know nothing about this place.",
				"options" : [
					"tfbluff01",
					"tfbluff02",
					"tfleave02"]
			},
			"townfans04" : {
				"text" : "They stare at you and turn away, muttering about strange\nforeigners. Today is not your day.",
				"options" : [
					"tfleave03"]
			},
			"townfans05" : {
				"text" : "Your analysis sparks an argument, but it's a friendly one. You\n don't learn anything particularly interesting about the fights\nbut you do notice that Sir Pryce's advocate says that \"The only\nway is down\", which strikes you as a little odd.\nThe conversation winds down and you wander off, pondering a\nworld in which up is safe and down is scary, until you trip on\na mushroom and decide to watch where you're going instead.",
				"options" : [
					"tfleave02"]
			},
			"townfans06" : {
				"text" : "They notice you listening in and walk away, looking at you oddly.\nNot your lucky day, it seems.",
				"options" : [
					"tfleave03"]
			},
			"townfans07" : {
				"text" : "You join in with Sir Pryce's fan, because he clearly needs a hand.\nThe conversation's pretty boring though.",
				"options" : [
				"tfleave01"]
			}
		},
		"options" : {
			"tflisten01" : {
				"leadsTo" : "townfans02",
				"text" : "Listen in to their conversation"
			},
			"tflisten02" : {
				"leadsTo" : "townfans06",
				"text" : "Listen a little longer"
			},
			"tftalk01" : {
				"leadsTo" : "townfans03",
				"text" : "Join in"
			},
			"tftalk02" : {
				"leadsTo" : "townfans07",
				"text" : "Join in"
			},
			"tfleave01" : {
				"leadsTo" : undefined,
				"text" : "Leave them to it"
			},
			"tfleave02" : {
				"leadsTo" : undefined,
				"text" : "Smile and walk away"
 			},
 			"tfleave03" : {
 				"leadsTo" : undefined,
 				"text" : "Walk away quickly"
 			},
			"tfbluff01" : {
				"leadsTo" : "townfans04",
				"text" : "How hard can this be? Come on you reds!"
			},
			"tfbluff02" : {
				"leadsTo" : "townfans05",
				"requires" : ["tfbluffinfo"],
				"text" : "You read the paper, you got this one"
			}
		}
	},
	"official" : {
		"start" : "official01",
		"screens" : {
			"official01" : {
				"text" : "A very officious looking official is standing guard here.",
				"options" : [
					"offtalk01",
					"offleave01"]
			},
			"official02" : {
				"text" : "You ask if you can get past. She says no.",
				"options" : [
					"offwhy01",
					"offsorry01",
					"offleave01"]
			},
			"official03" : {
				"text" : "She ignores your politeness.\nYou stick your tongue out. She ignores that too.",
				"options" : [
					"offleave01"]
			},
			"offical04" : {
				"text" : "She quotes a very long piece of legislation at you. You're\npretty sure it translates to \"Because I said so\".",
				"options" : [
					"offleave01",
					"offwhy01"]
			}
		},
		"options" : {
			"offtalk01" : {
				"leadsTo" : "official02",
				"text" : "She looks friendly enough. Talk to her"
			},
			"offleave01" : {
				"leadsTo" : undefined,
				"text" : "She's clearly not moving. Leave"
			},
			"offsorry01" : {
				"leadsTo" : "official03",
				"text" : "Apologise and leave"
			}
			"offwhy01" : {
				"leadsTo" : "offical04",
				"text" : "Ask why"
			}
		}
	},
	
};
