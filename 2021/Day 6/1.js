const sample = [3,4,3,1,2];

function getPopulation(data, days = 80) {
	let totalSpawnCount = data.length;

	for(timer of data) {
		totalSpawnCount += countSpawn(days - timer - 1);
	}

	return totalSpawnCount;

	function countSpawn(daysLeft) {
		if(daysLeft < 0) {
			return 0;
		}
		else {
			const spawnCount = 1 + Math.floor(daysLeft / 7);
			let childrenSpawnCount = 0;

			for(let i = 0; i < spawnCount; i++) {
				childrenSpawnCount += countSpawn(daysLeft - 9 - (i * 7));
			}

			return spawnCount + childrenSpawnCount;
		}
	}
}


const expectation1 = 26;
const test1 = getPopulation(sample, 18);
console.assert(test1 === expectation1, `\n\tExpected: ${expectation1}\n\tGot: ${test1}`);

const expectation2 = 5934;
const test2 = getPopulation(sample, 80);
console.assert(test2 === expectation2, `\n\tExpected: ${expectation2}\n\tGot: ${test2}`);


const input = `1,3,4,1,5,2,1,1,1,1,5,1,5,1,1,1,1,3,1,1,1,1,1,1,1,2,1,5,1,1,1,1,1,4,4,1,1,4,1,1,2,3,1,5,1,4,1,2,4,1,1,1,1,1,1,1,1,2,5,3,3,5,1,1,1,1,4,1,1,3,1,1,1,2,3,4,1,1,5,1,1,1,1,1,2,1,3,1,3,1,2,5,1,1,1,1,5,1,5,5,1,1,1,1,3,4,4,4,1,5,1,1,4,4,1,1,1,1,3,1,1,1,1,1,1,3,2,1,4,1,1,4,1,5,5,1,2,2,1,5,4,2,1,1,5,1,5,1,3,1,1,1,1,1,4,1,2,1,1,5,1,1,4,1,4,5,3,5,5,1,2,1,1,1,1,1,3,5,1,2,1,2,1,3,1,1,1,1,1,4,5,4,1,3,3,1,1,1,1,1,1,1,1,1,5,1,1,1,5,1,1,4,1,5,2,4,1,1,1,2,1,1,4,4,1,2,1,1,1,1,5,3,1,1,1,1,4,1,4,1,1,1,1,1,1,3,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,5,1,2,1,1,1,1,1,1,1,1,1`
.split(',')
.map(timer => Number(timer));

console.log(getPopulation(input));