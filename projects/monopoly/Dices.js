class Dices {
	constructor(_number_dices) {
		this.number_dices = _number_dices;
	}

	throw() {
		const result = {};

		result.amount = 0;
		result.indiv_results = [];
		for (let i = 0; i < this.number_dices; i++) {
			const res = Math.floor(Math.random() * 6 + 1);;
			result.amount += res;
			result.indiv_results.push(res);
		}

		result.double = true;
		let last_result;
		for (const res of result.indiv_results) {
			if (last_result == null) {
				last_result = res;
			} else if (last_result != res) {
				result.double = false;
				break;
			}
		}
		
		return result;
	}
}