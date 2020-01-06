function highlightNumber(number) {
	for (let i = 0; i < grid.length; i++) {
		const column = grid[i];
		for (let j = 0; j < column.length; j++) {
			const currentCase = column[j];
			if (currentCase.number == number) {
				currentCase.highlight = true;
			} else {
				currentCase.highlight = false;
			}
		}
	}
	update();
}