let gameInterval;
let player1 = new Player();
let player2 = new Player();
const players = [player1, player2];

let previousUpdateTime;
function updateAll() {
	let currentTime = new Date();
	let deltaTime = currentTime - previousUpdateTime;
	previousUpdateTime = currentTime;

	for (const player of players) {
		if (player.queue.length > 0) {
			const unit = player.queue[0];
			unit.remainingTime -= deltaTime;
			let percentage = unit.remainingTime / unit.trainingTime * 100;
			document.getElementById("ui-queue-progress-current").style.width = percentage + "%";
			if (unit.remainingTime <= 0) {
				unit = player.queue.pop();
				player.units.push(unit);
			}
		}
		for (const turret of player.turrets) {
			turret.update(deltaTime);
		}
		for (const unit of player.units) {
			unit.update(deltaTime);
		}
	}
}

function loadAOW() {
	previousUpdateTime = new Date();
	gameInterval = setInterval(updateAll, 15);
	gameView.addEventListener("click", function(event) {
		let child = player1.age.units[0];
		var clone = $.extend(true, Object.create(Object.getPrototypeOf(child)), child);
		player1.queue.push(clone);
	});
}

document.onload = loadAOW();