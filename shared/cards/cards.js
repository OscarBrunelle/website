class Card {
	constructor(_number, _sign) {
		this.number = _number;
		this.sign = _sign;
	}

	get value() {
		let values = ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"];
		return values.indexOf(this.number);
	}

	draw(parent) {
		this.svg = svgparent(parent, "0 0 100 200");
		svgrect(this.svg, 0, 0, 100, 200, "border");
		svgtext(this.svg, 10, 10, get_visual_name(this.number), this.sign);
		svgtext(this.svg, 10, 25, get_visual_sign(this.sign), this.sign);
		svgtext(this.svg, 90, 10, get_visual_name(this.number), this.sign);
		svgtext(this.svg, 90, 25, get_visual_sign(this.sign), this.sign);
		svgtext(this.svg, 10, 190, get_visual_name(this.number), this.sign + " bottom");
		svgtext(this.svg, 10, 175, get_visual_sign(this.sign), this.sign + " bottom");
		svgtext(this.svg, 90, 190, get_visual_name(this.number), this.sign + " bottom");
		svgtext(this.svg, 90, 175, get_visual_sign(this.sign), this.sign + " bottom");

		if (this.value > 9) {
			svgtext(this.svg, cols[1], rows[4], get_visual_name(this.number), this.sign + " inner");
		} else {
			const ref = this;

			function sign(x, y) {
				svgtext(ref.svg, x, y, get_visual_sign(ref.sign), ref.sign + " inner" + (y > rows[4] ? " bottom" : ""));
			}
			switch (this.value) {
				case 0:
					sign(cols[1], rows[4]);
					break;
				case 1:
					sign(cols[1], rows[0]);
					sign(cols[1], rows[8]);
					break;
				case 2:
					sign(cols[1], rows[0]);
					sign(cols[1], rows[4]);
					sign(cols[1], rows[8]);
					break;
				case 3:
					sign(cols[0], rows[0]);
					sign(cols[2], rows[0]);
					sign(cols[0], rows[8]);
					sign(cols[2], rows[8]);
					break;
				case 4:
					sign(cols[0], rows[0]);
					sign(cols[2], rows[0]);
					sign(cols[1], rows[4]);
					sign(cols[0], rows[8]);
					sign(cols[2], rows[8]);
					break;
				case 5:
					sign(cols[0], rows[0]);
					sign(cols[2], rows[0]);
					sign(cols[0], rows[4]);
					sign(cols[2], rows[4]);
					sign(cols[0], rows[8]);
					sign(cols[2], rows[8]);
					break;
				case 6:
					sign(cols[0], rows[0]);
					sign(cols[2], rows[0]);
					sign(cols[1], rows[2]);
					sign(cols[0], rows[4]);
					sign(cols[2], rows[4]);
					sign(cols[0], rows[8]);
					sign(cols[2], rows[8]);
					break;
				case 7:
					sign(cols[0], rows[0]);
					sign(cols[2], rows[0]);
					sign(cols[1], rows[2]);
					sign(cols[0], rows[4]);
					sign(cols[2], rows[4]);
					sign(cols[1], rows[6]);
					sign(cols[0], rows[8]);
					sign(cols[2], rows[8]);
					break;
				case 8:
					sign(cols[0], rows[0]);
					sign(cols[2], rows[0]);
					sign(cols[0], rows[3]);
					sign(cols[2], rows[3]);
					sign(cols[1], rows[4]);
					sign(cols[0], rows[5]);
					sign(cols[2], rows[5]);
					sign(cols[0], rows[8]);
					sign(cols[2], rows[8]);
					break;
				case 9:
					sign(cols[0], rows[0]);
					sign(cols[2], rows[0]);
					sign(cols[1], rows[1]);
					sign(cols[0], rows[3]);
					sign(cols[2], rows[3]);
					sign(cols[0], rows[5]);
					sign(cols[2], rows[5]);
					sign(cols[1], rows[7]);
					sign(cols[0], rows[8]);
					sign(cols[2], rows[8]);
					break;

				default:
					break;
			}
		}
	}
}

function get_visual_sign(text_sign) {
	switch (text_sign) {
		case "Trèfle":
			return "♣";
		case "Coeur":
			return "♥";
		case "Pique":
			return "♠";
		case "Carreau":
			return "♦";
		default:
			return text_sign;
	}
}

function get_visual_name(text_name) {
	switch (text_name) {
		case "Valet":
			return "V";
		case "Dame":
			return "D";
		case "Roi":
			return "R";
		default:
			return text_name;
	}
}