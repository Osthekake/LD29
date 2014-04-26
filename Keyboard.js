
var Keyboard = {
    keys : {},
    keyPress : function (evt) {
        if (this.keys[evt.keyCode] > 0) { return; }
        this.keys[evt.keyCode] = evt.timeStamp || (new Date()).getTime();
    },
    keyRelease : function (evt) {
        //this.keys[evt.keyCode] = 0;
    },
    trigger : function(actor){
    	//enter
    	if(actor != null && this.keys[13]){
    		actor.enter();
    		this.keys[13] = 0;
		}
    	//left
    	if(actor != null && this.keys[37]){
    		actor.left();
    		this.keys[37] = 0;
		}
    	//up
    	if(actor != null && this.keys[38]){
    		actor.up();
    		this.keys[38] = 0;
		}
    	//right
    	if(actor != null && this.keys[39]){
    		actor.right();
    		this.keys[39] = 0;
 		}
    	//down
    	if(actor != null && this.keys[40]){
    		actor.down();
    		this.keys[40] = 0;
    	}
    }
};
window.addEventListener("keydown", Keyboard.keyPress.bind(Keyboard));
window.addEventListener("keyup", Keyboard.keyRelease.bind(Keyboard));
