function countPaths(data) {
	const pathsMap = {};
	const paths = [];

	data.forEach(pathArray => {
		if(!pathsMap[pathArray[0]]) {
			pathsMap[pathArray[0]] = new Set();
		}

		if(!pathsMap[pathArray[1]]) {
			pathsMap[pathArray[1]] = new Set();
		}

		pathsMap[pathArray[0]].add(pathArray[1]);
		pathsMap[pathArray[1]].add(pathArray[0]);
	})

	for(const cave of pathsMap.start) {
		followPath('start', cave, []);
	}

	function followPath(caveFrom, caveCurrent, path) {
		path = Array.from(path);
		path.push(caveFrom);

		if(caveCurrent === 'end') {
			path.push(caveCurrent);
			paths.push(path);
			return;
		}

		for(const cave of pathsMap[caveCurrent]) {
			if(/[a-z]/.test(cave) && path.includes(cave)) {
				continue;
			}
			else {
				followPath(caveCurrent, cave, path);
			}
		}
	}

	return paths.length;
}


const sample1 = [
	['start', 'A'],
	['start', 'b'],
	['A', 'c'],
	['A', 'b'],
	['b', 'd'],
	['A', 'end'],
	['b', 'end']
];
const expectation1 = 10;
const test1 = countPaths(sample1);
console.assert(test1 === expectation1, `\n\tExpected: ${expectation1}\n\tGot: ${test1}`);

const sample2 = [
	['dc', 'end'],
	['HN', 'start'],
	['start', 'kj'],
	['dc', 'start'],
	['dc', 'HN'],
	['LN', 'dc'],
	['HN', 'end'],
	['kj', 'sa'],
	['kj', 'HN'],
	['kj', 'dc']
];
const expectation2 = 19;
const test2 = countPaths(sample2);
console.assert(test2 === expectation2, `\n\tExpected: ${expectation2}\n\tGot: ${test2}`);

const sample3 = [
	['fs', 'end'],
	['he', 'DX'],
	['fs', 'he'],
	['start', 'DX'],
	['pj', 'DX'],
	['end', 'zg'],
	['zg', 'sl'],
	['zg', 'pj'],
	['pj', 'he'],
	['RW', 'he'],
	['fs', 'DX'],
	['pj', 'RW'],
	['zg', 'RW'],
	['start', 'pj'],
	['he', 'WI'],
	['zg', 'he'],
	['pj', 'fs'],
	['start', 'RW']
];
const expectation3 = 226;
const test3 = countPaths(sample3);
console.assert(test3 === expectation3, `\n\tExpected: ${expectation3}\n\tGot: ${test3}`);

const input = `lg-GW
pt-start
pt-uq
nx-lg
ve-GW
start-nx
GW-start
GW-nx
pt-SM
sx-GW
lg-end
nx-SM
lg-SM
pt-nx
end-ve
ve-SM
TG-uq
end-SM
SM-uq`.split('\n')
.map(paths => paths.split('-'));

console.log(countPaths(input));