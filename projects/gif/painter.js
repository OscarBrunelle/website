let canvas, context;
let rawW = 10, rawH = 10;
let canvasClicked = false;
let paintingColor, brushSize;

function drawFunc(e) {
	canvasClicked = true;
	let pos = getMousePos(canvas, e);
	let cw = canvas.offsetWidth;
	let ch = canvas.offsetHeight;
	let x = Math.floor(pos.x / cw * rawW); // gifWidth;
	let y = Math.floor(pos.y / ch * rawH); // gifHeight;

	x -= Math.floor(brushSize / 2);
	y -= Math.floor(brushSize / 2);

	if (paintingColor != "eraser") {
		context.fillStyle = "#" + paintingColor;
		context.fillRect(x, y, brushSize, brushSize);
	} else {
		context.clearRect(x, y, brushSize, brushSize);
	}
}

function createCanvas() {
	canvas = document.getElementById("drawing-canvas");
	context = canvas.getContext("2d");

	canvas.addEventListener("mousedown", drawFunc);

	canvas.addEventListener("mousemove", function(e) {
		if (canvasClicked) {
			drawFunc(e);
		}
	});

	canvas.addEventListener("mouseup", function(e) {
		canvasClicked = false;
	});

	canvas.addEventListener("mouseleave", function(e) {
		canvasClicked = false;
	});
}

function eraseCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}