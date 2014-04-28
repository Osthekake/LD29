var Inventory = {
	list : [],
	printToElement : undefined,
	has : function(what) {
		for (var i = 0; i < this.list.length; i++) {
			if(this.list[i] == what)
				return true;
		};
		return false;
	},
	hasAll : function(what) {
		for (var i = 0; i < what.length; i++) {
			if(!this.has(what[i]))
				return false;
		};
		return true;
	},
	add : function(what) {
		if(this.has(what))
			return;
		this.list.push(what);
		this.printlist();
	},
	printlist : function(){
		if(!this.printToElement){
			console.log("Nowhere to print inventory...");
			return;
		}
		var html = "<ol>";
		for (var i = 0; i < this.list.length; i++) {
			html += "<li>" + this.list[i] + "</li>";
		};
		html += "</ol>";
		this.printToElement.innerHTML = html;
	}
}

var DestroyTriggers = {
	objects : {},
	register : function(object, trigger) {
		this.objects[trigger] = object;
	},
	destroy : function(trigger){
		this.objects[trigger].remove();
	}
}