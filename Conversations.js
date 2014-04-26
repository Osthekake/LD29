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
				"text" : "I greet you fellow subterranian."
			},
			"leave" : {
				"leadsTo" : undefined, //leadsTo as undefined will cause the conversation to end
				"text" : "(leave)"
			}//, other options go here.
		}
	}//, other conversations go here
};
