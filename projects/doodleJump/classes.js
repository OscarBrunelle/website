class Player {
	constructor() {
		this.image = document.getElementById("player");
		this.width = this.image.width;
		this.height = this.image.height;
		this.reset();
	}

	reset(){
		this.x = canvas.width / 2 - this.width / 2;
		this.y = canvas.height * 2 / 3;
		this.speedX = 1.5;
		this.speedY = 0;
		this.gravity = 0.05;
		this.gravitySpeed = 0;
		this.xDirection = 0;
		this.leftDirection = false;
		this.rightDirection = false;
	}

	update() {
		this.move();
		this.draw();
	}

	draw() {
		context.drawImage(this.image, this.x, this.y - yDiff, this.width, this.height);
	}

	move() {
		this.x = (this.x + this.xDirection * this.speedX) % canvas.width;
		if (this.x < 0) {
			this.x = canvas.width + this.x;
		}
		this.gravitySpeed = Math.min(this.gravitySpeed + this.gravity, 5);
		this.y += this.speedY + this.gravitySpeed;
		if (this.y < canvas.height / 3) {
			yDiff = this.y - canvas.height / 3;
			this.y = canvas.height / 3;
		} else {
			yDiff = 0;
		}
		if (this.hitBottom()) endGame();
		springs.forEach(spring => {
			this.hitSpring(spring);
		});
		pads.forEach(pad => {
			this.hitPad(pad);
		});
	}

	hitPad(pad) {
		if (this.gravitySpeed > 0) {
			if ((this.x <= pad.x + pad.width && this.x + this.width >= pad.x) && (this.y + this.height <= pad.y + 2 && this.y + this.height >= pad.y - 2)) {
				this.gravitySpeed = -3;
			}
		}
	}

	hitSpring(spring) {
		if (this.gravitySpeed > 0) {
			if ((this.x <= spring.x + spring.width && this.x + this.width >= spring.x) && (this.y + this.height <= spring.y + 2 && this.y + this.height >= spring.y - 2)) {
				this.gravitySpeed = -6;
			}
		}
	}

	hitBottom() {
		if (this.y > canvas.height) return true;
	}
}

class Pad {
	constructor(x, y) {
		this.image = padImage;
		this.x = x;
		this.y = y;
		this.width = padImage.width;
		this.height = padImage.height;
	}

	update() {
		this.y -= yDiff;
		this.draw();
	}

	draw() {
		context.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
}

class Spring {
	constructor(x, y) {
		this.image = springImage;
		this.x = x;
		this.y = y;
		this.width = this.image.width;
		this.height = this.image.height;
	}

	update() {
		this.y -= yDiff;
		this.draw();
	}

	draw() {
		context.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
}