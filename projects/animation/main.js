let canvas, context;
let frameAnimationInterval;
let animationsRunning = false;

class Animation {
	constructor(name, source, numberFrames, loop = false){
		this.name = name;
		this.source = source;
		this.numberFrames = numberFrames;
		this.loop = loop;
		this.frames = [];
		this.currentFrame = 0;
		this.way = 1;
		this.finishedLoading = false;
	}

	loadFrames(){
		for (let frameIndex = 0; frameIndex < this.numberFrames; frameIndex++) {
			let frame = document.createElement("img");
			frame.src = "images/" + this.source + "/" + this.source + frameIndex + ".png";

			if (frame.complete) {
				this.frames.push(frame);
			} else {
				frame.addEventListener('load', this.addFrame(frame));
				frame.addEventListener('error', function() {
					alert('error')
				});
			}
		}
	}

	addFrame(frame){
		this.frames.push(frame);
	}
}

let animations = [
	new Animation("Ghost", "ghost", 3, true),
	new Animation("Guy", "guy", 2, true),
	new Animation("Ghost fuck", "ghostFuck", 12, true),
];

function setup(){
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	animationsRunning = false;
	loadFrames();
	toggleAnimations();
}

function loadFrames(){
	for (let i = 0; i < animations.length; i++) {
		let animation = animations[i];
		animation.loadFrames();
	}
}

function drawNextFrames(){
	let x = 10, y = 10;
	let imageWidth = 32, imageHeight = 32;

	context.clearRect(0, 0, canvas.width, canvas.height);
	//context.clearRect(x, y, imageWidth, imageHeight);
	for (let i = 0; i < animations.length; i++) {
		let animation = animations[i];
		context.drawImage(animation.frames[animation.currentFrame], x, y, imageWidth, imageHeight);
		if (animation.loop) {
			animation.currentFrame += animation.way;
			if (animation.currentFrame === 0 || animation.currentFrame >= animation.numberFrames - 1) {
				animation.way *= -1;
			}
		} else {
			animation.currentFrame = (animation.currentFrame + animation.way) % animation.numberFrames;
		}

		x += imageWidth;
		if ((x + imageWidth) > canvas.width) {
			x = 10;
			y += imageHeight;
		}
	}
}

function toggleAnimations(){
	let toggleAnimationsButton = document.getElementById("toggleAnimationsButton");

	if (animationsRunning) {
		clearInterval(frameAnimationInterval);
		toggleAnimationsButton.innerHTML = "START IIIIT";
	} else {
		frameAnimationInterval = setInterval(drawNextFrames, 100);
		toggleAnimationsButton.innerHTML = "STOP IT";
	}

	animationsRunning = !animationsRunning;
}

document.onload = setup();