class Generator {
	constructor(x, y, cooldown = 5000) {
		this.width = 10;
		this.height = 10;
		this.x = x - this.width / 2;
		this.y = y - this.height / 2;

		this.direction = 0;
		this.rotation_speed = 0.001;

		this.cooldown = cooldown;
		this.remaining_cooldown = this.cooldown + 0;

		this.create_svg();
	}

	create_svg() {
		this.doccontainer = svgcontainer(svg, this.x, this.y, this.width, this.height);
		svgrect(this.doccontainer, 0, 0, this.width, this.height, "generator");
	}

	update(delta) {
		this.direction += delta * this.rotation_speed;
		this.remaining_cooldown -= delta;

		while (this.remaining_cooldown <= 0) {
			const bubble = new Bubble(this.x + this.width / 2, this.y + this.height / 2, this.direction);
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

function dir(direction) {
	return (direction + 2 * Math.PI) % (2 * Math.PI);
}

class Bubble {
	constructor(x, y, direction = 0, speed = 0.05) {
		this.radius = 2.5;
		this.x = x;
		this.y = y;
		this.direction = dir(direction);
		this.speed = speed;

		this.create_svg();
	}

	create_svg() {
		this.doccontainer = svgcontainer(svg, this.x, this.y, this.radius * 2, this.radius * 2);
		svgcircle(this.doccontainer, 0, 0, this.radius, "bubble");
	}

	update_svg() {
		this.doccontainer.setAttributeNS(null, "x", this.x);
		this.doccontainer.setAttributeNS(null, "y", this.y);
	}

	update(delta) {
		this.x += Math.cos(this.direction) * this.speed * delta;
		this.y += Math.sin(this.direction + Math.PI) * this.speed * delta;

		if ((this.x - this.radius) < 0 && this.direction > (Math.PI / 2) && this.direction < (Math.PI * 3 / 2)) {
			this.direction = dir(Math.PI - this.direction);
		}
		if ((this.x + this.radius) > svg_width && !(this.direction >= (Math.PI / 2) && this.direction <= (Math.PI * 3 / 2))) {
			this.direction = dir(Math.PI - this.direction);
		}

		if ((this.y - this.radius) < 0 && this.direction > 0 && this.direction < Math.PI) {
			this.direction = dir(Math.PI * 2 - this.direction);
		}
		if ((this.y + this.radius) > svg_width && !(this.direction >= 0 && this.direction <= Math.PI)) {
			this.direction = dir(Math.PI * 2 - this.direction);
		}

		this.update_svg();
	}
}