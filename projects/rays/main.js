let canvas, context;

let lightPos = {
	x: 30,
	y: 30
};
let rects = [];

function createRect(x, y, w, h) {
	rects.push({
		x: x,
		y: y,
		w: w,
		h: h
	});
	context.fillStyle = "darkgrey";
	context.fillRect(x, y, w, h);
}

let nextM = 20;

function calculateRay(x, y, angle) {
	let nextX = x + nextM * Math.cos(angle);
	let nextY = y + nextM * Math.sin(angle);
	let it = 0;
	while (nextX >= 0 && nextY >= 0 && nextX <= canvas.width && nextY <= canvas.height && it++ < (canvas.width / nextM + 10)) {
		let inRectFlag = false;
		for (const rect of rects) {
			if (rect.x <= nextX && rect.y <= nextY && (rect.x + rect.w) >= nextX && (rect.y + rect.h) >= nextY) {
				inRectFlag = true;
				break;
			}
		}
		if (inRectFlag) {
			return;
		}
		context.strokeStyle = "white";
		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(nextX, nextY);
		context.stroke();
		nextX += nextM * Math.cos(angle);
		nextY += nextM * Math.sin(angle);
	}
}

let aIterations = 100;

function calculateRays(event = null) {
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (event != null) {
		lightPos = getMousePos(canvas, event);
	}

	for (const rect of rects) {
		context.fillStyle = "darkgrey";
		context.fillRect(rect.x, rect.y, rect.w, rect.h);
	}

	for (let a = 0; a < aIterations; a++) {
		let angle = 360 * a / aIterations;
		let radAngle = angle * Math.PI / 180;
		calculateRay(lightPos.x, lightPos.y, radAngle);
	}
}

function load() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	canvas.addEventListener("mousemove", calculateRays);

	let rect0 = createRect(100, 100, 100, 100);
	let rect1 = createRect(100, 300, 100, 100);
	let rect2 = createRect(300, 100, 100, 100);
	let rect3 = createRect(300, 300, 100, 100);

	calculateRays();
}

document.onload = load();