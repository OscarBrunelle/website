let canvas = document.getElementById("game-canvas");
let context = canvas.getContext("2d");

let gameInterval;
let player1 = new Player();
let player2 = new Player();
const players = [player1, player2];

function updateAll() {
	context.clearRect(0, 0, canvas.clientWidth, canvas.height);

	for (const player of players) {
		for (const turret of player.turrets) {
			turret.update();
		}
		for (const unit of player.units) {
			unit.update();
		}
	}
}

function loadAOW() {
	gameInterval = setInterval(updateAll, 15);
	canvas.addEventListener("click", function(event) {
		let child = player1.age.units[0];
		var clone = $.extend(true, Object.create(Object.getPrototypeOf(child)), child);
		player1.units.push(clone);
	});
}

document.onload = loadAOW();