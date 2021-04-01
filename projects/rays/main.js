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

let nextM = 5;

function calculateRay(x, y, angle) {
	let prevX = x + 0;
	let prevY = y + 0;
	let nextX = prevX + nextM * Math.cos(angle);
	let nextY = prevY + nextM * Math.sin(angle);
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
			break;
		}
		prevX = nextX;
		prevY = nextY;
		nextX += nextM * Math.cos(angle);
		nextY += nextM * Math.sin(angle);
	}
	context.strokeStyle = "white";
	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(prevX, prevY);
	context.stroke();
}

let aIterations = 500;

function calculateRays(event = null) {
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (event != null) {
		const mousePos = getMousePos(canvas, event);
		lightPos.x = mousePos.x / mousePos.parentWidth * canvas.width;
		lightPos.y = mousePos.y / mousePos.parentHeight * canvas.height;
	}

	let insideRect = false;
	for (const rect of rects) {
		context.fillStyle = "darkgrey";
		context.fillRect(rect.x, rect.y, rect.w, rect.h);
		if (!insideRect && rect.x <= lightPos.x && rect.y <= lightPos.y && (rect.x + rect.w) >= lightPos.x && (rect.y + rect.h) >= lightPos.y) {
			insideRect = true;
		}
	}

	if (!insideRect) {
		for (let a = 0; a < aIterations; a++) {
			let angle = 360 * a / aIterations;
			let radAngle = angle * Math.PI / 180;
			calculateRay(lightPos.x, lightPos.y, radAngle);
		}
	}
}

function load() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	canvas.addEventListener("click", calculateRays);

	for (let i = 0; i < 5; i++) {
		createRect(random_int(0, canvas.width - 200), random_int(0, canvas.height - 200), 200, 200);
	}

	calculateRays();

	document.getElementById("nextM").addEventListener("input", function (e) {
		nextM = parseInt(e.target.value);
	});
	document.getElementById("aIterations").addEventListener("input", function (e) {
		aIterations = parseInt(e.target.value);
	});
}

document.onload = load();