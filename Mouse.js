/*
 * Use for onclick in order to get local position with the event.
 */
function localOnclick(element, onclickWithPos) {
	return function(event) {
		var pos = getPosition(event, element);
		onclickWithPos(event, pos);
	};
}

/*
 * Translates a mouse event position relative to a specific object.
 */
function getPosition(event, canvas) {
	var x = new Number();
	var y = new Number();
	if (event.x != undefined && event.y != undefined){
		x = event.x;
		y = event.y;
	}else {// Firefox method to get the position
	  	x = event.clientX + document.body.scrollLeft +
		document.documentElement.scrollLeft;
		y = event.clientY + document.body.scrollTop +
		document.documentElement.scrollTop;
	}

	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	return {x:x, y:y};
}