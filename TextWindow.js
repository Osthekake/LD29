var lineheight = 30;

/*
 * A text window to be drawn on a canvas.
 *
 */
function TextWindow(text) {
	console.log("Made text window");
	var tw = this;
	this.height = 400;
	this.lines = text.split('\n');
	if(this.lines.length * lineheight > this.height)
		console.log("Warning: TextWindow cannot contain text. (too many lines)");
	this.update = function(delta) {
		//nothing?
	}
	this.setText = function(text){
		this.lines = text.split('\n');
	}
	this.draw = function(context) {
		context.moveTo(25, 25);
		context.lineTo(25, 375);
		context.lineTo(775, 375);
		context.lineTo(775, 25);
		context.lineTo(25, 25);
		context.stroke();
		context.fillStyle = Settings.textFieldColor;
		context.fillRect(25,25,750,350); 

		context.fillStyle = Settings.textColor;
		context.font = Settings.font;
		context.textBaseline = "top";
		for (var i = tw.lines.length - 1; i >= 0; i--) {
			context.fillText(tw.lines[i], 50, 50 + lineheight * i);	
		};
	}
}

function OptionsWindow(options, gui) {
	var ow = this;
	this.options = options;
	this.gui = gui;
	this.selected = 0;

	this.update = function(delta) {
		Keyboard.trigger(ow);
	}
	this.setOptions = function(options) {
		ow.options = options;
	}

	//keyboard input
	this.up = function(){
		ow.selected = ow.selected -1;
		if(ow.selected < 0)
			ow.selected = ow.options.length-1;
	}
	this.down =  function(){
		ow.selected = ow.selected +1;
		if(ow.selected >= ow.options.length)
			ow.selected = 0;
	}
	this.enter = function(){
		gui.selectOption(ow.options[ow.selected]["leadsTo"]);
		ow.selected = 0;
	}

	//rendering
	this.draw = function(context) {		
		context.moveTo(25, 425);
		context.lineTo(25, 575);
		context.lineTo(775, 575);
		context.lineTo(775, 425);
		context.lineTo(25, 425);
		context.stroke();
		context.fillStyle = Settings.textFieldColor;
		context.fillRect(25,425,750,150); 

		context.fillStyle = Settings.selectedColor;
		context.fillRect(30, 445 + ow.selected * lineheight, 740, lineheight);

		context.fillStyle = Settings.textColor;
		context.font = Settings.font;
		context.textBaseline = "top"
		
		for (var i = 0; i < ow.options.length; i++) {
			context.fillText(ow.options[i]["text"], 50, 450 + lineheight * i);
		};
	}
}

function GUI(conversationID) {
	var gui = this;

	gui.conversationID = conversationID;
	gui.conversation = Conversations[conversationID];
	gui.currentScreenName = gui.conversation["start"];
	gui.currentScreen = gui.conversation["screens"][gui.currentScreenName];
	console.log(gui.currentScreen);
	
	this.buildOptions = function() {
		var s = gui.currentScreen;
		var options = [];
		var optionStrings = s["options"];
		for (var i = 0; i < optionStrings.length; i++) {
			options.push(gui.conversation["options"][optionStrings[i]]);
		};
		return options;
	}

	var text = this.currentScreen["text"];
	this.options = new OptionsWindow(this.buildOptions(), gui);
	this.text = new TextWindow(text);

	this.selectOption = function(option) {
		gui.currentScreenName = option;
		gui.currentScreen = gui.conversation["screens"][gui.currentScreenName];
		if(!gui.currentScreen){
			//leave conversation
			console.log("Leaving conversation")
			game.gui = null;
			return;
		}
		gui.options.setOptions(gui.buildOptions());
		gui.text.setText(gui.currentScreen["text"]);
	}

	this.update = function(delta) {
		gui.options.update(delta);
		gui.text.update(delta);
	}
	this.draw = function(context) {
		gui.options.draw(context);
		gui.text.draw(context);
	}

}