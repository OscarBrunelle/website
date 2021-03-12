let player1 = new Player();
let player2 = new Player();
const players = [player1, player2];

let frameId;
let previousUpdateTime;
function update(timestamp) {
	let currentTime = new Date();
	let deltaTime = currentTime - previousUpdateTime;
	previousUpdateTime = currentTime;

	for (const player of players) {
		if (player.queue.length > 0) {
			const unit = player.queue[0];
			unit.remainingTime -= deltaTime;
			let percentage = (1 - unit.remainingTime / unit.trainingTime) * 100;
			percentage = Math.min(percentage, 100);
			document.getElementById("ui-queue-progress-current").style.width = percentage + "%";
			if (unit.remainingTime <= 0) {
				player.queue.pop();
				player.units.push(unit);
				unit.svgRef.style.display = "";
			}
		} else if (player == player1) {
			document.getElementById("ui-queue-progress-current").style.width = "0%";
		}
		for (const turret of player.turrets) {
			turret.update(deltaTime);
		}
		for (const unit of player.units) {
			unit.update(deltaTime);
		}
	}

	frameId = requestAnimationFrame(update);
}

function loadAOW() {
	previousUpdateTime = new Date();
	frameId = requestAnimationFrame(update);
	document.getElementById("ui-units").addEventListener("click", function(event) {
		let stats = player1.age.units[0];
		// var clone = $.extend(true, Object.create(Object.getPrototypeOf(child)), child);
		player1.queue.push(new Unit([...stats]));
	});
}

document.onload = loadAOW();