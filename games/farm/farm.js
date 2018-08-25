var Lands = [];
var Trees = [];
var Animals = [];
var types = {Lands, Trees, Animals}

var Landmode = false;


/*function update(){
	var type;
	for (var i = types.length - 1; i >= 0; i--) {
		type = types[i];
		for (var i = type.length - 1; i >= 0; i--) {
			type[i].setIcon();
		}
	}
}*/

function toggleLand(){
	if (Landmode) {
		Landmode = false;
		document.getElementById("webPage").style.cursor = 'url(icons/land.png), all-scroll';
	} else {
		Landmode = true;
		document.getElementById("webPage").style.cursor = "auto";
	}
}

function harvest(event){
	var clicked = event.target;
	
}