function get_distance(pointA, pointB) {
	let a = Math.abs(pointA.x - pointB.x);
	let b = Math.abs(pointA.y - pointB.y);
	return Math.sqrt(a * a + b * b);
}

function get_middle(pointA, pointB) {
	let a = Math.abs((pointA.x - pointB.x) / 2);
	let b = Math.abs((pointA.y - pointB.y) / 2);
	return {
		x: a,
		y: b
	};
}

/**
 * Returns the center point of a given rectangle.
 * @param {Array} rect {x: x, y: y, w: width, h: height}
 * @returns 
 */
function rect_center(rect, round = false) {
	let x = rect.x + rect.w / 2;
	let y = rect.y + rect.h / 2;
	if (round) {
		x = parseInt(x);
		y = parseInt(y);
	}
	return {
		x: x,
		y: y
	}
}

function cons(n, min, max) {
	return (n >= min && n <= max);
}

/**
 * min and max both included
 * @param {Number} min 
 * @param {Number} max 
 * @returns 
 */
function random_int(min = 0, max = 1) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}

function floor(number, rounding = 1) {
	return Math.floor(number / rounding) * rounding;
}

function round_to_nearest(number, rounding) {
	if (rounding == null) {
		console.error("rounding is null");
		return number;
	}
	return (number === rounding || floor(number, rounding) % 1 === rounding) ? floor(number, rounding) : floor(number + rounding, rounding);
}

/**
 * Min and max both included
 * @param {Number} value 
 * @param {Number} min 
 * @param {Number} max 
 */
function check_n(value, min, max) {
	return (value >= min && value <= max);
}

/**
 * Returns the hexadecimal equivalent of a decimal number.
 * Use >>> to convert to unsigned representation.
 * @param {Number} number the decimal number
 */
function dec_to_hex(number) {
	return number.toString(16);
}

/**
 * Returns the binary equivalent of a decimal number.
 * Use >>> to convert to unsigned representation.
 * @param {Number} number the decimal number
 */
function dec_to_bin(number) {
	return number.toString(2);
}

/**
 * Returns the decimal equivalent of a hexadecimal number.
 * @param {String} string the hexadecimal number
 */
function hex_to_dec(string) {
	return parseInt(string, 16);
}

/**
 * Returns the decimal equivalent of a binary number.
 * Does not work for floats yet.
 * @param {String} string the binary number
 */
function bin_to_dec(string) {
	string = string.toString();
	let dec = 0;
	for (let i = string.length - 1; i >= 0; i--) {
		let bin = parseInt(string[i]);
		dec += bin * Math.pow(2, string.length - 1 - i);
	}
	return dec;
}

/**
 * Returns the hexadecimal equivalent of a binary number.
 * Does not work for floats yet.
 * @param {String} string the binary number
 */
function bin_to_hex(string) {
	string = string.toString();
	let dec = "";
	for (let i = string.length - 1; i >= 0; i -= 4) {
		dec = dec_to_hex(bin_to_dec(string.substring(Math.max(0, i - 3), i + 1))) + dec;
	}
	return parseInt(dec);
}

function to_fixed_length(number, length) {
	let string = (("0".repeat(length)) + number).toString();
	return string.substring(string.length - length, string.length);
}

// get_distance ?

function get_middle(x0, y0, x1, y1) {
	const deltaX = (x1 - x0),
		deltaY = (y1 - y0);
	return {
		x: x1 - deltaX / 2,
		y: y1 - deltaY / 2,
		angle: Math.atan2(deltaY, deltaX)
	};
}