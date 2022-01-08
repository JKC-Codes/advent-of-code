function getElementDifference(data, steps = 40) {
	const template = data.shift();
	const startingRules = {};
	const repeatRules = {};
	const counts = {};

	data.forEach(rule => {
		const [key, value] = rule.split(' -> ');
		startingRules[key] = value;
	})

	for(const letter of template) {
		counts[letter] = (counts[letter] || 0) + 1;
	};

	for(let i = 1; i < template.length; i++) {
		const left = template[i - 1];
		const right = template[i];
		const additionalCounts = polymerise(left, right, steps);

		for(const [letter, count] of Object.entries(additionalCounts)) {
			counts[letter] = (counts[letter] || 0) + count;
		}
	}

	return Math.max(...Object.values(counts)) - Math.min(...Object.values(counts));


	function polymerise(left, right, step) {
		if(step === 0) {
			return {};
		}

		if(repeatRules[left + right]?.[step]) {
			return repeatRules[left + right][step];
		}

		const middle = startingRules[left + right] || '';

		if(middle) {
			const leftCounts = polymerise(left, middle, step - 1);
			const rightCounts = polymerise(middle, right, step - 1);
			const totalCounts = {[middle]: 1};

			for(const [letter, count] of Object.entries(leftCounts)) {
				totalCounts[letter] = (totalCounts[letter] || 0) + count;
			}

			for(const [letter, count] of Object.entries(rightCounts)) {
				totalCounts[letter] = (totalCounts[letter] || 0) + count;
			}

			if(!repeatRules[left + right]) {
				repeatRules[left + right] = [];
			}

			repeatRules[left + right][step] = totalCounts;

			return totalCounts;
		}
		else {
			return {};
		}
	}
}


const sample = [
	'NNCB',
	'CH -> B',
	'HH -> N',
	'CB -> H',
	'NH -> C',
	'HB -> C',
	'HC -> B',
	'HN -> C',
	'NN -> C',
	'BH -> H',
	'NC -> B',
	'NB -> B',
	'BN -> B',
	'BB -> N',
	'BC -> B',
	'CC -> N',
	'CN -> C',
];
const expectation = 2188189693529;
const test = getElementDifference(sample);
console.assert(test === expectation, `\n\tExpected: ${expectation}\n\tGot: ${test}`);

const input = `CFFPOHBCVVNPHCNBKVNV

KO -> F
CV -> H
CF -> P
FK -> B
BN -> P
VN -> K
BC -> H
OP -> S
HS -> V
HK -> N
CC -> F
CK -> V
OC -> S
SN -> C
PK -> H
BB -> S
PO -> F
HF -> K
BV -> P
HP -> F
VF -> H
BP -> H
CH -> C
KN -> O
NP -> F
FS -> F
BH -> B
VB -> P
OS -> S
KK -> O
SO -> P
NB -> O
PS -> O
KV -> O
CS -> P
PN -> O
HB -> V
NF -> P
SC -> S
NH -> N
HV -> K
FN -> V
KS -> P
BO -> C
KP -> V
OK -> B
OV -> P
CN -> C
SB -> H
VP -> C
HC -> P
FB -> F
VS -> K
PH -> C
VC -> H
KH -> B
SH -> B
BK -> N
SP -> P
SF -> B
OO -> B
VH -> K
PP -> C
FV -> P
KC -> P
CO -> S
NO -> O
FO -> K
SK -> O
ON -> K
VO -> H
VV -> H
CP -> P
FC -> B
FP -> N
FH -> C
KF -> F
PB -> C
NN -> K
SS -> O
CB -> C
HH -> S
FF -> S
KB -> N
HO -> O
BF -> N
PV -> K
OB -> B
OH -> N
VK -> V
NV -> H
SV -> F
NC -> P
OF -> V
NS -> V
PF -> N
HN -> K
BS -> S
NK -> H
PC -> O`.split('\n').filter(step => step);

console.log(getElementDifference(input));