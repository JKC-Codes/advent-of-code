function countTotalFlashes(data, steps = 100) {
	let energyLevels = [...data];
	let totalFlashes = 0;

	for(let i = 0; i < steps; i++) {
		let flashes = [];

		energyLevels = energyLevels.map((levels, row) => {
			return levels.map((level, column) => {
				const newLevel = level + 1;

				if(newLevel === 10) {
					flashes.push([row, column]);
				}

				return newLevel;
			})
		});

		for(const [row, column] of flashes) {
			increment(row - 1, column - 1, energyLevels, flashes);
			increment(row - 1, column, energyLevels, flashes);
			increment(row - 1, column + 1, energyLevels, flashes);
			increment(row, column - 1, energyLevels, flashes);
			increment(row, column + 1, energyLevels, flashes);
			increment(row + 1, column - 1, energyLevels, flashes);
			increment(row + 1, column, energyLevels, flashes);
			increment(row + 1, column + 1, energyLevels, flashes);
		}

		for(const [row, column] of flashes) {
			if(energyLevels[row][column] > 9) {
				energyLevels[row][column] = 0;
			}
		}

		totalFlashes += flashes.length;
	}

	return totalFlashes;


	function increment(row, column, energyLevels, flashes) {
		if(energyLevels[row] !== undefined && energyLevels[row][column] !== undefined) {
			const newLevel = energyLevels[row][column] + 1;

			if(newLevel === 10) {
				flashes.push([row, column]);
			}

			energyLevels[row][column] = newLevel;
		}
	}
}


const sample = [
	[5,4,8,3,1,4,3,2,2,3],
	[2,7,4,5,8,5,4,7,1,1],
	[5,2,6,4,5,5,6,1,7,3],
	[6,1,4,1,3,3,6,1,4,6],
	[6,3,5,7,3,8,5,4,7,8],
	[4,1,6,7,5,2,4,6,4,5],
	[2,1,7,6,8,4,1,7,2,1],
	[6,8,8,2,8,8,1,1,3,4],
	[4,8,4,6,8,4,8,5,5,4],
	[5,2,8,3,7,5,1,5,2,6]
];
const expectation = 1656;
const test = countTotalFlashes(sample);
console.assert(test === expectation, `\n\tExpected: ${expectation}\n\tGot: ${test}`);

const input = `6636827465
6774248431
4227386366
7447452613
6223122545
2814388766
6615551144
4836235836
5334783256
4128344843`.split('\n')
.map(energy => energy.split('').map(level => Number(level)));

console.log(countTotalFlashes(input));