class Generator {
	constructor(x, y, cooldown = 1000) {
		this.width = 20;
		this.height = 20;
		this.x = x;
		this.y = y;

		this.direction = 0;
		this.rotation_speed = 0.001;

		this.cooldown = cooldown;
		this.remaining_cooldown = this.cooldown + 0;

		this.draw();
	}

	draw() {
		const line_x = this.x + this.width * Math.cos(this.direction);
		const line_y = this.y - this.height * Math.sin(this.direction);
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(line_x, line_y);
		context.lineTo(line_x + 5 * Math.cos(this.direction - Math.PI * 5 / 6), line_y - 5 * Math.sin(this.direction - Math.PI * 5 / 6));
		context.moveTo(line_x, line_y);
		context.lineTo(line_x + 5 * Math.cos(this.direction - Math.PI * 7 / 6), line_y - 5 * Math.sin(this.direction - Math.PI * 7 / 6));
		context.stroke();
	}

	update(delta) {
		this.direction += delta * this.rotation_speed;
		this.remaining_cooldown -= delta;

		this.draw();

		while (this.remaining_cooldown <= 0) {
			const bubble = new Bubble(this.x, this.y, this.direction);
			bubble.update(0 - this.remaining_cooldown);
			bubbles.push(bubble);

			this.remaining_cooldown += this.cooldown;
		}
	}
}

class Vector {
	constructor(x = 0, y = 0, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	// normalize() {

	// }
}

function hit(bubble1, bubble2) {
	const distance = get_distance(bubble1, bubble2);
	return (distance < bubble1.radius * 2 || distance < bubble2.radius * 2);
}

function dir(direction) {
	return (direction + 2 * Math.PI) % (2 * Math.PI);
}

class Bubble {
	constructor(x, y, direction = 0, speed = 0.1) {
		this.radius = 10;
		this.x = x;
		this.y = y;
		this.set_direction(direction);
		this.speed = speed;

		this.draw();
	}

	set_direction(value) {
		this.direction = dir(value);
	}

	draw() {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		context.stroke();
	}

	update(delta) {
		this.x += Math.cos(this.direction) * this.speed * delta;
		this.y += Math.sin(this.direction + Math.PI) * this.speed * delta;

		if ((this.x - this.radius) <= 0 && this.direction > (Math.PI / 2) && this.direction < (Math.PI * 3 / 2)) {
			this.set_direction(Math.PI - this.direction);
		}
		if ((this.x + this.radius) >= canvas_width && !(this.direction >= (Math.PI / 2) && this.direction <= (Math.PI * 3 / 2))) {
			this.set_direction(Math.PI - this.direction);
		}

		if ((this.y - this.radius) <= 0 && this.direction > 0 && this.direction < Math.PI) {
			this.set_direction(Math.PI * 2 - this.direction);
		}
		if ((this.y + this.radius) >= canvas_height && !(this.direction >= 0 && this.direction <= Math.PI)) {
			this.set_direction(Math.PI * 2 - this.direction);
		}

		this.draw();
	}
}