function getSyntaxErrorScore(data) {
	const pairs = {
		'(': ')',
		'[': ']',
		'{': '}',
		'<': '>'
	}
	const scores = {
		')': 3,
		']': 57,
		'}': 1197,
		'>': 25137,
	}
	const illegalCharacters = data.reduce((acc, cur) => {
		const openChunks = [];

		for(const chunk of cur) {
			switch(chunk) {
				case '(':
				case '[':
				case '{':
				case '<':
					openChunks.push(chunk);
					break;
				default:
					if(chunk !== pairs[openChunks.pop()]) {
						return acc.concat(chunk);
					}
			}
		}

		return acc;
	}, []);

	return illegalCharacters.reduce((acc, cur) => {
		return acc + scores[cur];
	}, 0);
}


const sample = [
	['[','(','{','(','<','(','(',')',')','[',']','>','[','[','{','[',']','{','<','(',')','<','>','>'],
	['[','(','(',')','[','<','>',']',')',']','(','{','[','<','{','<','<','[',']','>','>','('],
	['{','(','[','(','<','{','}','[','<','>','[',']','}','>','{','[',']','{','[','(','<','(',')','>'],
	['(','(','(','(','{','<','>','}','<','{','<','{','<','>','}','{','[',']','{','[',']','{','}'],
	['[','[','<','[','(','[',']',')',')','<','(','[','[','{','}','[','[','(',')',']',']',']'],
	['[','{','[','{','(','{','}',']','{','}','}','(','[','{','[','{','{','{','}','}','(','[',']'],
	['{','<','[','[',']',']','>','}','<','{','[','{','[','{','[',']','{','(',')','[','[','[',']'],
	['[','<','(','<','(','<','(','<','{','}',')',')','>','<','(','[',']','(','[',']','(',')'],
	['<','{','(','[','(','[','[','(','<','>','(',')',')','{','}',']','>','(','<','<','{','{'],
	['<','{','(','[','{','{','}','}','[','<','[','[','[','<','>','{','}',']',']',']','>','[',']',']']
];
const expectation = 26397;
const test = getSyntaxErrorScore(sample);
console.assert(test === expectation, `\n\tExpected: ${expectation}\n\tGot: ${test}`);

const input = `({<{({([<<{<[<<><>><<>>](<()()>)><{{{}<>}}<<<>{}>[<>[]]>>}{[<<[]{}>[<>()]>[(()[])]]<{{<><>}[[]<>]}{<
[(<[[([[(([<{{[]{}}([][])}<<{}[]>([]{})>><{<()()><[][]>}{[()]<()[]>}>]<{({()()}){[{}[]][<>()]}}[{[{}<>]
{{(<[[(<<<(<<[{}{}]{<>()}><{[]{}}([]{})>>([([][]){{}<>}][<()<>>[(){}]]))<{<(<>())[{}<>]>{{[]{}}<<>{}>}}({<
<([({[<[(([[<(()<>){[]<>}><<(){}>{()()}>]](<(({}[]){[][]})<{<>())[<>[]]>>{{{()<>}{(){}}}{[<>()]<{}[]>}
<(((<{<(<{{[[[()<>]{[]()}]][{<()[]><<>{}>}]}}[<{[{[][]}[<><>]]}{{{(){}}[<>()]}{[[]()]{<>[]}}}>{[({{}
{{({[({(({{[<[{}()]([]<>)><<{}()>[<>[]]>]<<{[]{}}([]<>)>{{<>}{<>{}}}}}{{<<[]<>>{<>()}>}<({[]<>}
(([{[(<(<[[(([()[]][{}()])(([][])<{}<>>))]]>)[<(<{{<<><>>(<>[])}<([]<>)[[]{}]>}((<{}[]>[<><>]){{[
{{[<<{<<(<([<<[]()>[[][]]>{[()[]]<()[]>}]){(<(<>{})([])>{<(){}>{<>()]}){[<[]()><<>()>](([][
((<{[{{(<<[(<{<>{}}[<>[]]>{<{}<>>{{}[]}})]>><{([<(<>())[{}()]>{<<>{}>{[]{}}}><([[]()]<[]<>>)(<[]>{()()})>)}>)
{<({{{(<[([<{(<>[])<()[]>}([[]]([]{}))>])[{{[([]){[]{}}]}}{[[{(){}}{<>{}}][[(){}]]]<([<>{}]{{}<>})(
([([{{{[[<<[[(()[])<<><>>]{({}[])}]((([]{})<<>>)({[]<>}[<>[]]))>{(({<>()})([{}[]]<()<>>)){[
{[<(({[<<{{{[({}[]){<>()}]{[()()]{[]()}}}[{<<><>>{<>[]}}<{()()}<()>>]}({<(<><>)[()[]]>([{}()])}{[(<>())(()
<{{[[<{{(<<{<[{}{}]<{}[]>>[{{}[]}[{}()]]}((<()()>{(){}})<((){})>)>[{<({})[[]{}]>([{}<>])}{{[{}()]}{<[
[{[<{<[[({([(<{}<>>[<>()])]<<<{}{}>({}<>)>>)<{(({}[])({}<>))}<{<[]>({}<>)}{{()()}([]())}>>}){<[<[[{}<>]<
{(<{{<{<<(<<<[{}{}]((){})>>{<<{}{}>{()[]}>}>)([({(<>())<<>()>>)(<<()[]>(<>())><<()()>({}())>)]{(<[<><
[{<{[<{([{[({<(){}>([]())}[<<>[]>([]())]){{<(){}>{{}[]}}<[()[]]({})]}](((<{}()>{{}()})))}[[(
<<[{{[<<(<{({{[]{}}{()()}}){<<{}()>({}<>)>(({}<>)[()<>])}}<[[([]{})[<><>]]]((<()()>{<>[]}){{[]{
[[({[({[([({{<[]{}>{(){}}}{[[][]][()()]}}[{<{}><{}()>}({()[]})]){{[[()<>]<[][]>][({}<>)]}}](<({<{}(
[[[((([((<{{[(<>())[{}[]]]{{<>{}}}}}>))<[[[({{{}{}}(()())})({([]{})[<><>]}[([]{}){()[]}])]<{<[{
[{[<[{{([[{(({()()}<{}[]>){{()<>}{{}()}})<<<{}[]>>{<<>[]><{}{}>}>}]{{{[{()()}[<>()}]{{{}}[(){}]}}}
[[{[(({[[[[{(<<>()>(<>()))[<{}[]>{[]<>}]}{{{()<>}<()()>}}]<[<([]<>}{<>[]}>]>](((<{()()}<()()>><<<>[]><<>
({[{({(<{((<<[()[]]<()<>>]<([][])>>[([{}()]<{}{}>){<{}{}>(()[])}])[{([<>()]{()[]}){[()[]]}}([{()<>}
[(({(([[{(<{{<[][]>(()()}}[({}[])]}[(<<>[]><()[]>)]>)<{({{[]{}}[()[]]}[<<>()>(()())])}{(((()[])<[]>)
<(<([[({[((((<{}[]>[{}{}]){[{}<>](<><>)})(([()<>]({})){[{}{}]{[]<>}}))[({(()[])<<>[]>}[[()<>]<()
{[(<<({([{[(<<[][]>(<>())>){<[<>()][[]{}]>(({}[])[(){}])}][(({{}<>}))(<[()()]<()()>>}]}{[{<(<>
[{{({<({<(<[[<{}<>>{()[]}][{()()}]]>){[<{{()[]}[{}()]}>([<()[]><{}<>>](<()[]>))]{[<[<><>]{<>[]}>[<()
{[<<[{<<[[(<(<[][]>[()()])>){<(([]()){{}[]})><<[{}()]<<>>>>}}[[([<{}[]><(){}>][({}())[()<>]])[[{<>[]
{((<[{{<{[<[((()<>)<()()>)]>]}>}((([{[[<<>[]>[[][]]]<[[]()]({}[])]]{[([]{}){()()}]}}<((<[]<
{[[({<{<<{<{{{[]{}}}}>}[[{(([][]){<>[]}){{()<>}}}<<<()[]>[{}[]]>>]<[{[()[]]({}{})}{[{}()]}]>]>>}>}<
[{[(<({{(<(([{()<>}{()<>}]{{[]}(()())]))>(<<{[<><>]<()<>>}[(<>{})<<>{}>]>[{{<>{}}{{}[]}}<[<
{{((<[(([<{{([()][(){}])({<>()}[()<>])}[{[{}<>]<()()>}<{{}}([]<>)>>}(<<[[]{}]<[]<>>>[([]()){[]{}}]>((<<>(
(<<<(<([<<({<<<><>>[{}<>]>{<()>([]<>)}}{{(<><>)}<{<>()}{{}()}>})<<<({}{})<[]<>>>>>]{({({[][]}[{}()])([<>()](
([(<<<(<(([([{<>{}}<(){}>](<{}<>>[{}{}]})][([<()>{{}[]}](<<>()><()[]>))[[{<>()}[<>[]]]{<<>[]>
(<{[[<<<({[<<([]())[()()]>([()[]]{<>{}})>]})[[{<[{<>()}({}{})><(()<>)([]{})>><<<<>()><<>()
[[[{(<[[((<[{<<>[]>({}[])}<[{}{}]{[]<>}>]<{({}{})}{[{}<>]{<><>}}>>([{[[]<>](()<>)}{{<>{}}(<>[]))]{[{{}{}}]})
[(<([[[{<[[<((()()){[][]})>((<{}[]>[()<>])<([]()){<>[]}>)]<<{<<><>>}{{(){}}}>>]<{[<<(){}>({}<>)><<<>()>([]<>
[<((<<[<{[{[{[()[]]{()<>}}(<<>()>[<>()])]}{<[[(){}]{(){}}]{[()]{<>[]}}>{{<[][]>[()()]}[(<>{
[({{([([{[[([<<>{}>[[]()]]({{}()}))][<{{()[]}}<<{}{}>>><[[{}[]][<>()]][{{}[]}(<>{}))>]][{((((){
((<<{(([[[{{<[()[]]({}())>}<[{(){}}]<({}{})<()[]>>>}{((<()<>>([]<>)){[()][()[]]})([{()}<[]{}>]<(<><>
<<<<[([<<(({<[[]()]<<><>>>({[][]})}{([<>{}]<<>()>){{[]{}}}})){[[[[[]{}][(){})]{(()[])(()<>)}]{{[[]<>][{}(
[({{([<{({{[{(()[])<<><>>}(((){})[<>()])>}{{{{{}<>}<{}[]>}{[(){}](()[])}}}}([(([<>{}](<>[]))
([(<({{(<<[([[<>][<>()]])<[{()[]}([]{})]{[()<>][[]{}]}>]><<{[{<><>}<()()>]{{<>[]}>}>>><[<{{
({{(([({{<[<[{{}{}}{{}<>}]((<>{})[[]<>])>(((<><>)<{}()>){{{}{}}{{}{}}})]({<{{}}([][])><<[]{}>
[(<{({{(<<<(<[{}[]]{(){}}>(([]()){<>[])))[{{[]{}}{()()}}{[<>{}][<>]}]>[((<{}<>>[<>[]])[({}[])<[]{}>])[<[{
[(<<<[<<({{{[[(){}]]{<<>{}>{()[]}}}{({<>{}}{[][]})}}{<([()[]]<{}<>>)([{}()]({}[]))>[(<<>()>{[]()})]}}{([{{(
{[{{(({[{<{{[[()<>]<[]<>>]({{}{}}[{}{}])}{(<<>[]>{[]})[[[]{}]{()<>}>}}{<<{{}{}}(()[])>>{{[[]()]
[<[[{(([<<[<[([][])<[]{}}]{<(){}>}>(<<()<>><[][]>><<{}[]>[{}()]>)]><([([[]<>](()[]))[(()<>)<(){}>]][({
<{{<([<([{{{(<[]{}>[[]{}])[{<>{}}([])]}}[<[<<><>>({}<>)]{((){})[[]<>]}><[{()[]}<<>{}>]{{()()
{[<<<([{([{<<(()[]){{}{}}>[(<>{}){{}()}]><[[{}<>][[]()]](<{}()>([]()))>}]){{<{<[()<>][<>()]><
<{[<<[([[{[({[[]<>](<>[])})({([]<>)<[]()>}<([]<>)[<>[]]>)]}[[{[{()<>}{<>{}}][<[]{}>(<>[])]}<({[]<>
[[[[([({(((<<[()<>]>[(()())]>{[{{}()}[[]()]]{[<>()]([][])}})))}(<({(({()[]}[<>()]))<[[()<>]]<{{}()}[()<>]
{[([([<[(<<[<[[]()]<[]<>>>][{<[][]>[<>()]}{({}<>)<()[]>}]><{({<>()}{<><>})<{(){}}({}{})>}<{(
<<({[<<{(<[<({{}[]}{<>[]})[<()()>]>(([<>()][<><>])(<<>{}><()[]>))](<[<{}<>>[{}[]]]({{}{}}(
[<<{<(([<[{(([()<>]({}{})){<<>[]>[()()]})({([])(<>())}[{[][]}[{}[]]])}{({(()())[()[]]}({[]<>}([][])))
((({<[{([(<[(<[]()>)](<[{}()]<[]{}>>(({}())<()[]>))>)[(<[([]<>)(<>{})]>)]][({({[()[]]{<>}}[[[]{}]{()[]}])([<<
[[[(({[<[((({([]){<>{}}})[[{()[]}[{}[]]][{[]<>}]])<<(<[]{}>[<>[]])[<[][]>[{}[]]]>>)[([{{<><>}[[][]]
({<(({{[{{<[((<>())(<>[]))<<<><>>((){})>]([<[][]><{}{}>][[{}()]<<>()>])>((<[[]()]([][])>[<{}[]>{
(({<<([[<[[{<[()()]<[][]}>[{(){}}[{}<>]]}(<{{}<>}{[]<>}>{<(){}>{<><>}})]<<{<<>[]>[<>[]]}{{
<[{([<[({<((<[{}()]([]<>))[(()[])])((({}{})<()<>>){(()<>)}))>{[<<[<>{}][(){}]>{<<><>>(<>[])}>{[
{[([[[{{<<[<<<()()>(()<>)>[({}{})[<>{}]]>([[[]<>]]{<<>>[[][]]})]><<[{(()[])][<()>[{}[]]]]<([{}{}][()<>])(
{(({{<<((<{<<<[]{}>{{}()}><<<>()><()[]>>><<[<>[]]](({}[])[[]{}])>}[[({<>()}{()}){[[]{}]({}())}
<[[{<[({<([<<<()<>>>>([[[]()]{<><>}](<<>[]>[<>]))])(({({[]{}}){{{}()}{(){}}}}[{(()<>)[[]()]}[{<>()}{[][]}]]))
{<[[([{<<<{{[<[]{}>[[]<>]]{({}())<[][]>}}<<<{}{}>>({(){}})>}([{({}())}<([]())[()()]>])>({{[[<>()]{{}{
<{(<[{[[{[<<<{(){}}[<>{}]>{{{}[]}<<>()>}>{[{[]()}<<>>]{<[]{}>[()()]}}>][[[{<<>())[[]<>]}<(<>
[{{<<{{([(<<{{{}}[()]}<(()())(<>())>>(<{[]()}[[]<>]>)>[((<()()><[]{}>}({[]<>}))(({[][]}{[]<>})<(()[])(()[]
([(<<[<{({[[[(()<>)<{}()>]{[{}()]{<>{}}}]{(<(){}>{{}[]}){<<><>><{}[]>}}]}<{[[[()()]{{}{}}]]
{<(((<({<((([<(){}>]){{{<><>}{{}()}}})({<[[]{}]>{({}())}}))>})([[<<<{[{}[]]{[]{}}}<{()<>}({}[])>>>{[
{([[{[[[<<<({{()<>}}(<[]<>>[<><>]))[[[[]<>][{}()]]]>{<<[<>()][[][]]](<{}{}>{[]{}})>[<(<>{}){<><>}>([{}[]]
[[{(<{{{<(<{[[{}()](()[])]}<<{(){}}[()[]]>{[()()]([]())}>>)>[(<<<{[][]}>>[{([][])[(){}]}[(<
<{[(<{<{(<<{<{()[]}(()[])>(([]<>)([]()))}>{((({}[]))<{[]()}{{}()>>)<{<(){}>}<{<>()}<()()>>
<(<[{{[[{<{[{[<>][<>[]]}]{[(<>[])][<{}{}>{<>}]}}(({[()<>]{[]<>}}<{(){}}[[]{}]>)([[<><>]<()()>]<({}[])([]())
{(<{[{[{({{(<<<>{}>><({}())(<>())>)}}{(<<<(){}>{(){}}>(<{}()>(<>()))><[{<>()}{{}()}][{[]<>}(()())]>){<[{{}[]
{[((((({<(([(<[]<>><[]<>>)<<{}()>>](<{()[]}(()<>)>{{{}{}}([]{})})))[<[{([])[<>]}(([]())<{}{}>]]{
(<{[((([{(<<{(()<>){{}[]}}>><<<({}<>)[[]()]>{(<>[])[()()]}>{{{<><>}([]())}}>)[{(([[]()][<>(
<[<<<[(<[[(<<([]{})>([[][]][{}{}])><[<<>[]>[{}[]]]<[<>][()()]>>)][[<<{()[]}(<><>)><<()()>[()<>]>>][{[{[]()
<<{([[<[[<[({[<>[]](()<>)}{({}[]){()[]}}){({{}[]}(<>()))}]<[[<[][]>[[]<>]]<[{}<>]<[]{}>>)>>]<
[((([[{<<[[<{{{}[]}[()<>]}>(<<{}{}>[(){}]>({<>[]}<{}<>>))][<{[{}<>]{[]}}>({[{}{}}[[][]]})]](({[{[][]}]{[{}
[([{<[[{<((<<{[]<>}(()<>)>>{(<<>{}>(()<>))}))[(<[[[][]][<>{}]]{[()[]](()())}><({{}{}}}[({}())]>
{{[({<(({{[({{[]()}<()<>>}{([]()){[]{}}}){[<<>>[<><>]][<{}<>><()[]>]}][{<({}{}><[][]>>{{{}()}<(){}>}}]}}))>}<
{[{[<{{({[({[[{}()][(){}]]{{[][]}<<>()>}}[[(<>[])<[]{}>]((<>[])[{}()])])]})}}>{({{<([{<([]())[{}{}]>{
<{{[{<{<<{{({<{}[]>[(){}]}[[<>()]{(){}}])}}[{{[(()<>)(<><>)]<{()<>}{<>()}>}{({[]()}{{}()})<{{
((((([{{<<[<({()<>}<<>{}))<{{}<>}(<>[])>>{<{(){}}[{}[]]>}]{<<[{}{}]>{{()()}[{}<>]}>}>>([[({(()())<()
(({{[[<[[<<<<<[]()>[{}<>]]>>({[<<><>><{}()>]{{(){}}[<>{}]}}[[([]<>)({}<>)]])>{<[[<{}[]><{}<>>][<<>[]>]](<<[]
<[<([<<[([[[[<{}[]><()>][(<>{}){[]}]]{({()[]}[<>{}])}]([((<>[])(<>[]))[{<>[]}{[]<>}]][(([]{})({}<>
<((<{{({{([<([<>{}](()()))<<(){}>[<>[]>>>({<<>>([]{})})]<[[([]())<<>>]{{<>{}}(()<>)}]>)<[(((<>)<{}<>>)({<>(
{({<({<<[[{[((<>())<()<>>)<(<>[])((){})>]({{[]()}[{}()]}[[{}{}]<{}[])])}({<[(){}](<><>)><{()<>}[{}[]
<[(<<[((([(([[[]<>][<><>]]{{{}{}}[{}[]]}){(({}())<[]{}>)})<(<(()[]){()()}>{<()>[[]{}]}){{[[]{}]([]<
{(<(([{[[<[[[{<>{}}{[]{}}]({(){}})]<[[()()]][[{}[]]]>]{<<{{}{}}[{}{}]>>[(<{}()>([]{}))(<(){}>{<><>}
((<<({({<{<<[<[]{}><()[]>]<(<>()){()[]}>>>}{(((({}<>)({}()))<{[]{}}<<>[]>>)<({[][]}<(){}>){
[[<{((({{{(<{[[]{}}{{}}}<{[]{}}<()>>>{<{{}[]}<[]()>>{[()[]]{[][]}}})([{[[][]]}(([]{})<<><>>)][(<[][]>{{}
(<({[{[(<<(((([]())[<><>]}([<><>]))<[[()<>]<<><>>]{<[]()>{()<>}}>)[<<{[]()}(())>><[<(){}><<>{}
(<<[<(<{<({<[{(){}}{<><>}][<<>()>]>}<[<[()[]]<{}[]>>]<<({}[]]><[[][]]<[]()>>>>)>}><[((<[<<[]<>>>[[<>()][{}(
[((<[{[[([{[[<<>>{<>()}]<[[]{}]<[]<>>>]}<({(()<>))<<<>()><<>[]>>)<{<[]{}>((){})}[({}[]){()()}]>
<<{{({{([{{<<{{}{}}(<>{})><{()()}[{}<>]>><{<[]<>>[[]()]}[<<><>>({})]>}(((<<>{}><{}{}>)([<>{}][{}]))[{`.split('\n')
.map(chunks => chunks.split(''));

console.log(getSyntaxErrorScore(input));