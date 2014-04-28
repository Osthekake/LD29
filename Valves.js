var Valves = {
	order : "",
	correctOrder : "cacab",
	turn : function(which) {
		this.order += which;
	},
	test : function() {
		console.log("Pulled lever with valve order: " + this.order);
		if(this.order == this.correctOrder){
			game.gui = new GUI("valves_correct");	
		}else{
			game.gui = new GUI("valves_wrong");	
		}
		this.order = "";
	}
}