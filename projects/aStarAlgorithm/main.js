let inter, curri, sol;

function ca(){
	let x = sol[curri][0], y = sol[curri][1];
	let sq = squares[x][y];
	if (sq.state === STATES.NEUTRAL) {
		sq.state = STATES.PATH;
		sq.draw();
	}
	curri++;
	if (curri == sol.length) clearInterval(inter);
}


function findBestPath(){
	let bestPath = findBestPathCall(startCoordinates, []);
	sol = bestPath, curri = 0;
	inter = setInterval(ca, 500);
}

function findBestPathCall(coordinates = [0, 0], currentSolution){
	if (!checkPosition(coordinates)) return null;
	let tsol = Array.from(currentSolution);
	tsol.push(coordinates);
	let square = squares[coordinates[0]][coordinates[1]];
	if (square.state === STATES.END) {
		console.log("hit the end!");
		return tsol;
	}

	let x = coordinates[0], y = coordinates[1];

	let toTest = [
		[x + 1, y],
		[x, y + 1],
		[x - 1, y],
		[x, y - 1]
	];

	let solution = null;

	for (let i = 0; i < toTest.length; i++) {
		let positions = toTest[i];
		if (!inSolution(positions, tsol)) {
			let possibleSolution = findBestPathCall(positions, tsol);
			if (possibleSolution != null && possibleSolution != []) {
				if (solution === null || possibleSolution.length < solution.length)
					solution = Array.from(possibleSolution);
			}
		}
	}

	return solution;
}

function checkPosition(coordinates){
	let x = coordinates[0];
	let y = coordinates[1];

	return !(x < 0 || y < 0 || x >= iLength || y >= jLength || squares[x][y].state === STATES.OBSTACLE);
}

function inSolution(positions, solution){
	for (let i = 0; i < solution.length; i++) {
		let solutionPositions = solution[i];
		if (positions[0] == solutionPositions[0] && positions[1] == solutionPositions[1]){
			return true;
		}
	}

	return false;
}

document.onload = createRandomArray();