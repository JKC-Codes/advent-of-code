const sample = [3,4,3,1,2];

function getPopulation(data, days) {
	const newborns = [0, 0];
	const shoal = Array(7).fill(0);
	let totalFish = data.length;

	for(timer of data) {
		shoal[timer]++;
	}

	for(let i = 0; i < days; i++) {
		const index = i % 7;

		totalFish += shoal[index];
		newborns.push(shoal[index]);
		shoal[index] += newborns.shift();
	}

	return totalFish;
}


const expectation1 = 26984457539 ;
const test1 = getPopulation(sample, 256);
console.assert(test1 === expectation1, `\n\tExpected: ${expectation1}\n\tGot: ${test1}`);


const input = `1,3,4,1,5,2,1,1,1,1,5,1,5,1,1,1,1,3,1,1,1,1,1,1,1,2,1,5,1,1,1,1,1,4,4,1,1,4,1,1,2,3,1,5,1,4,1,2,4,1,1,1,1,1,1,1,1,2,5,3,3,5,1,1,1,1,4,1,1,3,1,1,1,2,3,4,1,1,5,1,1,1,1,1,2,1,3,1,3,1,2,5,1,1,1,1,5,1,5,5,1,1,1,1,3,4,4,4,1,5,1,1,4,4,1,1,1,1,3,1,1,1,1,1,1,3,2,1,4,1,1,4,1,5,5,1,2,2,1,5,4,2,1,1,5,1,5,1,3,1,1,1,1,1,4,1,2,1,1,5,1,1,4,1,4,5,3,5,5,1,2,1,1,1,1,1,3,5,1,2,1,2,1,3,1,1,1,1,1,4,5,4,1,3,3,1,1,1,1,1,1,1,1,1,5,1,1,1,5,1,1,4,1,5,2,4,1,1,1,2,1,1,4,4,1,2,1,1,1,1,5,3,1,1,1,1,4,1,4,1,1,1,1,1,1,3,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,5,1,2,1,1,1,1,1,1,1,1,1`
.split(',')
.map(timer => Number(timer));

console.log(getPopulation(input, 256));