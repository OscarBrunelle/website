/*
Inspired by: https://github.com/LebsterFace/Raycast-Tests
*/

let canvas, context;

let lightPos = {
	x: 30,
	y: 30
};
let rects = [];

function createRect(x, y, w, h, color) {
	rects.push({
		x: x,
		y: y,
		w: w,
		h: h,
		color: color
	});
	context.fillStyle = color;
	context.fillRect(x, y, w, h);
}

function distanceBetween(x1, y1, x2, y2) {
	const A = x2 - x1,
		B = y2 - y1;
	return Math.sqrt(A * A + B * B);
}

function check(vector, line) {
	const x1 = line.x1,
		y1 = line.y1,
		x2 = line.x2,
		y2 = line.y2;

	const x3 = vector.x1,
		y3 = vector.y1,
		x4 = vector.x2,
		y4 = vector.y2;

	const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
	if (den === 0) return null;

	const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den,
		u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / den;

	if (0 < t && t < 1 && 0 < u) {
		const PX = x1 + t * (x2 - x1),
			PY = y1 + t * (y2 - y1);
		return {
			x: PX,
			y: PY,
			distance: distanceBetween(vector.x1, vector.y1, PX, PY)
		};
	}

	return null;
}

let nextM = 5;

function calculateRay(x, y, angle) {
	let vect = {
		x1: x,
		y1: y,
		x2: x + Math.cos(angle),
		y2: y + Math.sin(angle)
	};

	let shortestDistance = null,
		intersection = null;

	for (const rect of rects) {
		let lines = [];
		lines.push({
			x1: rect.x,
			y1: rect.y,
			x2: rect.x + rect.w,
			y2: rect.y
		});
		lines.push({
			x1: rect.x + rect.w,
			y1: rect.y,
			x2: rect.x + rect.w,
			y2: rect.y + rect.h
		});
		lines.push({
			x1: rect.x + rect.w,
			y1: rect.y + rect.h,
			x2: rect.x,
			y2: rect.y + rect.h
		});
		lines.push({
			x1: rect.x,
			y1: rect.y + rect.h,
			x2: rect.x,
			y2: rect.y
		});
		for (const line of lines) {
			const c = check(vect, line);
			if (c != null) {
				if (shortestDistance == null || c.distance < shortestDistance) {
					shortestDistance = c.distance;
					intersection = {
						x: c.x,
						y: c.y,
						color: rect.color
					};
				}
			}
		}
	}
	if (intersection == null) {
		let lines = [];
		lines.push({
			x1: 0,
			y1: 0,
			x2: 0 + canvas.width,
			y2: 0
		});
		lines.push({
			x1: 0 + canvas.width,
			y1: 0,
			x2: 0 + canvas.width,
			y2: 0 + canvas.height
		});
		lines.push({
			x1: 0 + canvas.width,
			y1: 0 + canvas.height,
			x2: 0,
			y2: 0 + canvas.height
		});
		lines.push({
			x1: 0,
			y1: 0 + canvas.height,
			x2: 0,
			y2: 0
		});
		for (const line of lines) {
			const c = check(vect, line);
			if (c != null) {
				if (shortestDistance == null) {
					shortestDistance = c.distance;
					intersection = {
						x: c.x,
						y: c.y,
						color: "white"
					};
				}
			}
		}
	}
	if (intersection == null) {
		return;
	}

	context.strokeStyle = "white";
	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(intersection.x, intersection.y);
	context.stroke();
	context.fillStyle = intersection.color;
	context.fillRect(intersection.x, intersection.y, 1, 1);
	return;


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
	// context.strokeStyle = "white";
	// context.beginPath();
	// context.moveTo(x, y);
	// context.lineTo(prevX, prevY);
	// context.stroke();
}

let aIterations = 3600;

function calculateRays() {
	context.clearRect(0, 0, canvas.width, canvas.height);

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

	requestAnimationFrame(calculateRays);
}

const colors = ["blue", "red", "green", "yellow", "orange", "pink", "cyan", "purple"];
const numberRects = 8;

function load() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	canvas.addEventListener("mousemove", function (event) {
		const mousePos = getMousePos(canvas, event);
		lightPos.x = mousePos.x / mousePos.parentWidth * canvas.width;
		lightPos.y = mousePos.y / mousePos.parentHeight * canvas.height;
	});

	for (let i = 0; i < numberRects; i++) {
		createRect(random_int(0, canvas.width - 200), random_int(0, canvas.height - 200), 200, 200, colors[random_int(0, colors.length - 1)]);
	}

	document.getElementById("aIterations").addEventListener("input", function (e) {
		aIterations = parseInt(e.target.value);
	});

	calculateRays();
}

document.onload = load();

//return intersection point and distance
function whereDoLineSegmentsIntersect(p, p2, q, q2) {

}

/**
 * @author Peter Kelley
 * @author pgkelley4@gmail.com
 */

/**
 * See if two line segments intersect. This uses the 
 * vector cross product approach described below:
 * http://stackoverflow.com/a/565282/786339
 * 
 * @param {Object} p point object with x and y coordinates
 *  representing the start of the 1st line.
 * @param {Object} p2 point object with x and y coordinates
 *  representing the end of the 1st line.
 * @param {Object} q point object with x and y coordinates
 *  representing the start of the 2nd line.
 * @param {Object} q2 point object with x and y coordinates
 *  representing the end of the 2nd line.
 */
function doLineSegmentsIntersect(p, p2, q, q2) {
	var r = subtractPoints(p2, p);
	var s = subtractPoints(q2, q);

	var uNumerator = crossProduct(subtractPoints(q, p), r);
	var denominator = crossProduct(r, s);

	if (uNumerator != 0 && denominator == 0) {
		// lines are paralell
		return false;
	}

	if (uNumerator == 0 && denominator == 0) {
		// They are coLlinear

		// Do they touch? (Are any of the points equal?)
		if (equalPoints(p, q) || equalPoints(p, q2) || equalPoints(p2, q) || equalPoints(p2, q2)) {
			return true
		}
		// Do they overlap? (Are all the point differences in either direction the same sign)
		return !allEqual(
				(q.x - p.x < 0),
				(q.x - p2.x < 0),
				(q2.x - p.x < 0),
				(q2.x - p2.x < 0)) ||
			!allEqual(
				(q.y - p.y < 0),
				(q.y - p2.y < 0),
				(q2.y - p.y < 0),
				(q2.y - p2.y < 0));
	}

	var u = uNumerator / denominator;
	var t = crossProduct(subtractPoints(q, p), s) / denominator;

	return (t >= 0) && (t <= 1) && (u >= 0) && (u <= 1);
}

/**
 * Calculate the cross product of the two points.
 * 
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 * 
 * @return the cross product result as a float
 */
function crossProduct(point1, point2) {
	return point1.x * point2.y - point1.y * point2.x;
}

/**
 * Subtract the second point from the first.
 * 
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 * 
 * @return the subtraction result as a point object
 */
function subtractPoints(point1, point2) {
	var result = {};
	result.x = point1.x - point2.x;
	result.y = point1.y - point2.y;

	return result;
}

/**
 * See if the points are equal.
 *
 * @param {Object} point1 point object with x and y coordinates
 * @param {Object} point2 point object with x and y coordinates
 *
 * @return if the points are equal
 */
function equalPoints(point1, point2) {
	return (point1.x == point2.x) && (point1.y == point2.y)
}

/**
 * See if all arguments are equal.
 *
 * @param {...} args arguments that will be compared by '=='.
 *
 * @return if all arguments are equal
 */
function allEqual(args) {
	var firstValue = arguments[0],
		i;
	for (i = 1; i < arguments.length; i += 1) {
		if (arguments[i] != firstValue) {
			return false;
		}
	}
	return true;
}