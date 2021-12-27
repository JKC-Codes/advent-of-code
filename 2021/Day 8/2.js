function countDigits(data) {
	let total = 0;

	for(entry of data) {
		const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
		const patterns = entry[0].map(signal => new Set(signal.split('')));
		const patternsBySize = new Map();
		const wireToSegment = new Map();

		for(const pattern of patterns) {
			if(patternsBySize.has(pattern.size)) {
				patternsBySize.get(pattern.size).push(new Set(pattern));
			}
			else {
				patternsBySize.set(pattern.size, [new Set(pattern)]);
			}
		}

		for(const letter of letters) {
			wireToSegment.set(letter, new Set(letters));
		}

		const missingWires = patternsBySize.get(6).reduce((acc, cur) => {
			return acc.concat(letters.filter(letter => {
				return !Array.from(cur).includes(letter);
			}));
		}, []);

		narrow(['c', 'd', 'e'], missingWires);
		narrow(['c', 'f'], Array.from([...patternsBySize.get(2)][0]));
		narrow(['a', 'c', 'f'], Array.from([...patternsBySize.get(3)][0]));
		narrow(['b', 'c', 'd', 'f'], Array.from([...patternsBySize.get(4)][0]));

		const message = entry[1].reduce((acc, cur) => {
			return acc + decode(cur);
		}, '');

		total += Number(message, 10);


		function narrow(knownSegments, knownWires) {
			for(const [wire, segments] of wireToSegment) {
				if(knownWires.includes(wire)) {
					segments.forEach(segment => {
						if(!knownSegments.includes(segment)) {
							segments.delete(segment);
						}
					})
				}
				else {
					segments.forEach(segment => {
						if(knownSegments.includes(segment)) {
							segments.delete(segment);
						}
					})
				}
			}
		}

		function decode(pattern) {
			switch(pattern.length) {
				case 2: return 1;
				case 3: return 7;
				case 4: return 4;
				case 7: return 8;
			}

			const patternToDigit = {
				'abcefg': 0,
				'acdeg': 2,
				'acdfg': 3,
				'abdfg': 5,
				'abdefg': 6,
				'abcdfg': 9,
			}

			const decodedPattern = pattern.split('').map(wire => {
				return Array.from(wireToSegment.get(wire))[0];
			}).sort().join('');

			return patternToDigit[decodedPattern];
		}
	}

	return total;
}


const sample1 = [
	[
		['acedgfb', 'cdfbe', 'gcdfa', 'fbcad', 'dab', 'cefabd', 'cdfgeb', 'eafb', 'cagedb', 'ab'],
		['cdfeb', 'fcadb', 'cdfeb', 'cdbaf']
	],
];
const expectation1 = 5353;
const test1 = countDigits(sample1);
console.assert(test1 === expectation1, `\n\tExpected: ${expectation1}\n\tGot: ${test1}`);

const sample2 = [
	[
		['be','cfbegad','cbdgef','fgaecd','cgeb','fdcge','agebfd','fecdb','fabcd','edb'],
		['fdgacbe','cefdb','cefbgd','gcbe']
	],
	[
		['edbfga','begcd','cbg','gc','gcadebf','fbgde','acbgfd','abcde','gfcbed','gfec'],
		['fcgedb','cgb','dgebacf','gc']
	],
	[
		['fgaebd','cg','bdaec','gdafb','agbcfd','gdcbef','bgcad','gfac','gcb','cdgabef'],
		['cg','cg','fdcagb','cbg']
	],
	[
		['fbegcd','cbd','adcefb','dageb','afcb','bc','aefdc','ecdab','fgdeca','fcdbega'],
		['efabcd','cedba','gadfec','cb']
	],
	[
		['aecbfdg','fbg','gf','bafeg','dbefa','fcge','gcbea','fcaegb','dgceab','fcbdga'],
		['gecf','egdcabf','bgf','bfgea']
	],
	[
		['fgeab','ca','afcebg','bdacfeg','cfaedg','gcfdb','baec','bfadeg','bafgc','acf'],
		['gebdcfa','ecba','ca','fadegcb']
	],
	[
		['dbcfg','fgd','bdegcaf','fgec','aegbdf','ecdfab','fbedc','dacgb','gdcebf','gf'],
		['cefg','dcbef','fcge','gbcadfe']
	],
	[
		['bdfegc','cbegaf','gecbf','dfcage','bdacg','ed','bedf','ced','adcbefg','gebcd'],
		['ed','bcgafe','cdgba','cbgef']
	],
	[
		['egadfb','cdbfeg','cegd','fecab','cgb','gbdefca','cg','fgcdab','egfdb','bfceg'],
		['gbdfcae','bgc','cg','cgb']
	],
	[
		['gcafb','gcf','dcaebfg','ecagb','gf','abcdeg','gaef','cafbge','fdbac','fegbdc'],
		['fgae','cfgab','fg','bagce']
	]
];
const expectation2 = 61229;
const test2 = countDigits(sample2);
console.assert(test2 === expectation2, `\n\tExpected: ${expectation2}\n\tGot: ${test2}`);

const input = `defabc gcb dbafcg gc gcbed fbecgd begfdac fcbde cfge debag | gfce fgce bdefgca aebgd
eabdc egbda bagcef eg fdageb beg bcfdag egdf agbfd cbgdafe | fdbga bge ebg eg
gfbda feg eg afgcbe fbdcag bfedg gead ecfdabg dfecb gedafb | gedbfa dgae degbf gefdb
ecadfb edg defgcb ecbda fbagcde ge dbeag gacbed agec bdfga | debcaf geafdbc gedab egabd
gcedbf bfeag bcgfdea bcgdaf eg gfe gace cgefab gabcf edfba | gbcfa gfe gef eg
bd bcdgefa dab gcdbaf dabfec cedab gcafde bgcae cafed debf | efcdab dba ebdca edafcb
cdaef fbcedg gdaeb gedcfa cgaed bcfaed gc ceg cgaf eadfbcg | cdfae acfg adbcefg cg
cagbed fbedca cfgdabe ecbda aedfg bcge dfagbc dceag cdg cg | abdec cgd bagdecf eadbc
adbfc fdcabg bg ceabfd bfg bcefga cgbd fgaed fdbag cfbeadg | bfadg bagfcd aefbgcd bg
agbefc aebc cbg cb dafgce deafbgc ebgdf ecfga cgfeb fgdbac | bdfge gefca dgefac ecbfg
cgb cbefgd debac ceadfbg bgceaf gbecd fgdeb cg dgfeab cfdg | fbeacg eafbgcd abcde bfcgdae
aedf fcged abfdcg fcadg ef bgcde efc dgacef fcgbea acebgfd | edbgc geacdf cagdfe bgcfea
gdeba bcafed efbacgd efdacg febadg eg gacdb fadeb bgef ega | bdgae cagbfde cdgba edfbac
gdcae dab bgac cegafdb ab ebafcd gbadce dcefag gfdeb degab | fedabc bcag adceg egbfd
fgcda bgedfa abec bcedfg dgeac dagbe cdeagb ecd ec cfegdba | ecd ce acgde aecdg
dfage becg dceabf beacgf eab acfdgbe gbdcaf bafge fgcab be | dfgcba gcfab eacbfd gaebf
dfabc ecgad fcdabe gfc bedfcg cdagbf dacgf bdgfeac bfag gf | dcfab fagb cgfda agbf
gefcd fad bgfea cgfdea da fbecgd bdgafc dgbfcea cdae edagf | cgfbda gefdc cdea adf
fg efgb fga bdgea adbegf cfeadg fbdag abgdce bdaefcg afbcd | bgfe gebf afgdcbe dbegaf
cagbe dbca gcedfa cga dabfcge ac dgbace fbage cdgeb edcfbg | adfecbg cagedb abcd gbdce
eabdf efb be efcda cabgfd gedfab cdefabg eagb cfedgb gdfba | aebdfcg gecbfd efb efb
ecd fadce acgfd cdgfeb ec edbafg dfcaeb fcegabd abdef ebca | fdeac adcfe dfgeabc dfacbe
egcadbf fca cafbd dceba fa agcfbe fgcdba defgcb afdg cgdfb | gfbcd efdbgc af caf
beca ea fbdegca cafdbg ecagf fae bfgaed efagbc gbafc ecdgf | aegfc adbegcf ea ebgfca
bgacfed gbc fbdeac gc bgfae adcg ecbad begac dabcge gfcdbe | gcb bceagd agcd daebc
ba fgbcead gbaefd ebcfag dagcfe dfeag bdcfg adeb gadfb afb | deba eadb gbefda aecdfg
ab cgfdea dgcbfa aedgc agb efbcadg bagced gbdfe gabde aecb | aefbdgc bfdcag egbda agb
gfcd fecdb fdbeag dcb dgefb ecfab bdecfag bgdeac cd cfgbde | cbaef ecgdbf gdfbe cd
bae dgeabc fdgae aedfb be gfbcad dbecaf cbfda gfcedab cfeb | gfdea fdabc abfcegd gfaed
cegfd dcefba daefc agdcfe cgebfda fg edgcb dgf debgfa cgfa | cfegd debcfa gfd edgfc
dceabg bgcfae fb cfgeb bfc dfceg bcfdea dcfbaeg acebg gfab | aegbdfc bcefg egbac egbfc
ceadgfb cfgadb eagfb eagbcd gebcfa ge age eabdf bacfg gecf | abdef ecagdb bgfea adgbfec
gdcaf egc cebfa cfdaeg cgdfbe eg eagfc gaed fabgced dbcgfa | afgce dcafbeg eadg dgfac
cfdbe dfcgeab ab abgdcf ageb cba eadgc cgadef cdaeb deabcg | efagdc cadeb ab eabg
bgfaedc gcdfe gfbdc fbga cbaedg dcagb gbdcaf bf bfd dacfbe | cgaebd fdgce bf fbdeca
gdabcf acgbefd egafc cda adbe gbadec fgdecb ad cdegb edgca | ecagd ad dcebg gbced
afdebc ebgcfda fabge ecfgdb caefdg dcbg cb fgecd gbcef cfb | eagfb fedgc ebgfc cbfedg
eb fgcade debgfc ebc gadec dfacb ecadb aegb ebcdga dagcfbe | efacbdg cdbaf fdcegb cbdage
gdefac gbdefca aec ce fecagb bfcgda gcafd dceg aefdb cdeaf | cbfaedg cdefag cgdfa cegd
bdegaf fda da ceda edfacg efbacg agdcf bfdgc faecg cgebafd | fdcga daf afd cdgbf
gec fbdgc abdceg febgdc gbacfed decgf facgdb fcbe fadge ec | agdfe cegdf gadcbef cfedg
fbeag bgcea cg cabfed agebcd acgd cadeb cge bgedfc cgaebfd | dfgbce efcbad cge bdcae
gdaef gbafdc gafdce fcadg gedc efbgdca de dfe baefg bcfdae | abcdfe gaefd cgfade dfe
gbcdf gcfa bgdaf dagbe dcegfb bfedca afb cgebdaf fa bafdcg | af fbegadc aegbd gfac
dbgacef ceagfb cfbd ebfdga bd edb bcged aecdg bcgfe fdbceg | db gbeafc befgad dfbegc
bdf bfadeg dbfgeac degcf aebf cgfadb gfdeb bf gdeab bgcdae | fb bgdaec gcfed feba
bgdeaf gbafe cdfeag gecfba debca adgcebf dfe df fdgb efabd | bfdeagc gdbaef fgeabc acdeb
edfcga fdab df fcbead bcagefd dbcage fgebc dcaeb befdc dfe | afbd caedb ebdac cdagef
dcbeg bcag bdaec fcdbeg adcef dfgaeb gcbaed ba begacfd bea | febgdc dbceg agecdbf dbceg
agbc eafbd dgcefb afdbg gaf gdecfa dfgbc fbgcad defcgba ag | edcgfb fadbg dfaeb abefd
abfdcge fadcge gde dcfgb cdgafb gbefd eg fcdgeb ecbg faebd | cgfdb ge dbgafc cegb
ab fbcge fegdbc gab fegad gebaf bgacef ceab fcdbega bcafdg | dgfbac gfacbe gba ab
bed fdage bcafge afebd cdegba fabce fdecab bd dfcb aebfcgd | dbe dgbeafc adebcgf eabfd
cbfdeg gbafe egf bdfgea dfea abceg ef gbdfa daecgfb bdgafc | edaf fabdge ebgac fgaeb
dgba bdcgaf bcdfg bg cgdfe cgb afcdeb bdfcega bdfca gcbeaf | aefdcb dbga cgfed cdfge
gefda gfbed cgfdbea feb dbcgf bgecfd becd fgabec be dfgbac | fgeda agcbdf bdce be
bcfge ab cagbed bea acdeg gdab aecbg fcegbad bcefda adfcge | bgadce dcgea febcg aeb
dagc dcefg gfcdaeb da fgecdb bfeac ead dgfcae eacdf begfda | bdeagf cfedgab dcbgaef ead
dg eadcb fcgd eafgbd fcdgbe bfegc gecbd deg dgcbafe cfegba | ebcad gecfbd ebgcd gfcbeda
bc bgc edbcfg gbafd ecgbfa ebdc gdcaef dfbecag bgfdc egfdc | bgfda fcdgb cgeafb fcbgd
abgf dbfcgae adegf gdabe cbdeg ab bae dgecfa caefdb aedbgf | daefg fbag badfce gbdefac
cabed gabcdf eb cegad fabcgde ebd ebaf fcdeba badfc egdbcf | dbeac cdafb edbfacg eb
degfac adgcf fbgade fae ef egcabfd egacb decf efagc agbcdf | ef fcadeg edcf cgafdb
adcefg agbefcd acdfe cdfba ecfdbg ed eagfc aged edf cegbfa | fcdea gbafec efd fecdgb
dfeacb fge fbgca gfcbe dbeg eg cdefb fbedgc fdbcaeg adecgf | gef dbeg efg becfgd
ae fbdegc gfcdae fbgda fecabd gfecd gdafe edgfcab afe acge | facged adcgfe cgae bacdgef
gfbac cfebda dfg degfca dfgbc cbgdfe dg dcefb edagcbf gbed | caedgfb gdf gd ecgdbf
gcdfea dafbcg gadfc aecdbf cab ba gcbaf abdg cebfgad ecbgf | bca gcfad dcfbage efbcg
gbceaf baegd gab ga agcd gecdb deabgc afedb agebcdf fdbgec | cdgeb gab eagfbc aebdg
ebagcd dgacef gbc gdefcba cbeagf bfadc bedg acdeg bgcda bg | aegdbfc cbg fagecbd agfedc
fcbage dfbage acdebgf ed faed bafge fdegb dge bfdcg egcabd | deg dgfbc bgdefca abcgef
aeg acegd degb dagfcb fadec bgeafc bfagcde eg bdecag gbdac | acefd defca degb cgeabd
bfce fadeg fegdb cdgeb cfdabge bf acdfgb bfd edbcga cebgfd | begadc edfcbag dcefbg bgfed
gc gfac fegcd fedcagb gaedbc cafed edbfg gedafc fecadb gec | adcfe cgdeba egfdc cfedg
egcfb dbac beafcdg cbgea fdeabg gadecb cdgaef cga gadbe ca | dfcabeg cbdgea ca egbca
edgbc fdeb dcfegb cgeafdb dfcaeg gebfc daebcg bfagc fe fec | bgdefc ebdgc ebfd dgbec
bgacde abfgecd caedg ba ebfdc ecfadg bagc eba dbeac gdebfa | cdefag bafedg agbc bcfed
febacg fegda gdbacf ceab cfa cbfeg fgabcde cgaef dgefbc ac | gbcfe beca deafg eagbfcd
debg fgbade gecabf dfaeg fdaegbc gad eagbf fedac dfabcg dg | egbacfd cfead fegadb gd
agfeb cf gcead fgcea gfcdba edagfc bcadeg dfec fca cdfabeg | geacf fbage gdfacb cf
dbfae geacfd eabgc cebfga gd cbgd dfbaecg edbgac adgbe gda | dag gd caefgd gfdceab
edabcg dgaf cgbfe bcdfa efdabc edcfgba ga cag dbgfca gacfb | fdcbag gac ag bdaecg
bf efb efcabd gfba agebdfc deafcg afegd gfeadb gebcd gdbef | bfga bfeadc bcegd fbe
edfgbc fgdc cf bgecf dcaefb efagdcb gdecb bfage cfe dcgeab | dfcg ebgdc fgdc aecbgd
bdgea dgebf ebcdaf ebf fe fabcgd gcfe bgedcf ecgdfab bgfdc | egfc gbcdef bfe fdbcg
ca gdbaef adecg acdfbe cefadg caedbgf afedg eac afcg ecdbg | eadgf dgefab dgeac gadce
dfgecb adcf becfadg cgfdea gfdae dcgae fd dgcaeb dfe egbaf | efcdbg caedfg eacdg dgeafc
agcbe fba dfag fgbca cdagbef fgdcb gcefdb acfdeb af dcbgfa | dcbafe afbcg bfa cdbfg
cead ce dcefga fce afgedb cfebagd agfebc fecgd dafeg cbgfd | fedagb cgbaef egcfba gadfec
dfebga bcadge gdfebac ed beagf eabdf gbafce gdef bdfca ade | ade abcdf bagcde fabcd
adg fgdbce abfgcd ecdgaf cebgdaf gcbad ga bgaf fcbgd edbac | beacd dag fgdcb gda
dbeacf edfcbga bgcde edbac gbac dgb dcegf bcgdea gdafeb bg | cbdge bg cbag ebcda
gafcd dcae cd cgaef bfedcga gfdab cbgfea cdgebf dagcef gdc | afcdg gcd gafdb bgcdaef
edabfg gecfdb adcf abf cfgbade gbace bcfed af bface febdac | eadcbf efabgd fa fba
af eaf daebg fgebac dfaeg geadcfb cfad fedgc dcefgb fadcge | afdge ecgfabd fa fa
dcfga agfdbc db gcbefad baefg fdb gefadc dgabf fgcbde bcad | gdcfa adgbf fbd cgfdeb
cbega fgb agfceb dfbcage dbfca efga dbgefc bcagf bedcag fg | dafbc dbcfa fdbcge ebdgac
eac cbaeg ce acbfg daefcg abgfde bgdeca dbgaecf ebagd cbde | abcedfg cae gbdae ec
gadef daebgfc fge beagd fcebad cbfgde gf afced gfdace agfc | bedfcg geadb gdefbc gf
adbfcg cdbge cfeg beagdfc cbegfd bfdaeg eacbd eg fbgcd egd | ge gdcfab cgebd dacbe
ca cbega abcefdg bfcdea bgdcea abc dgac ebdag ecfbg aebfgd | adgebf debagc bgcae bca
bg edcbg gbd dabegfc dcgae aefdgc cbga dbaegf eadgcb dbefc | cbga cgab adcgeb bgca
egbdf becfga gdcae cdgef cf cdgfea faegcbd dacf cgadeb fcg | cdfge gcdabe befagc cgf
fbade ca eca eabcd cefbag ebacdf fdbaeg cdgbe facd dbagfce | fcbgdae dbace debfgca cbade
fbdceg fgade egfcd fbdacg dgcbf cbed gec ec dgbacef ecagfb | aegdf egdaf gecdf feagd
aef bacedf aedcg bfge efabcg fcbagd fe gfbac fegca abdfceg | cgafb agcfdb gbcafe acfge
bgfc defgbc cf deagf gbcdea baedcf ecfgd ebgdc dcagfeb cdf | fgaed fedcab cdefg dfega
afecbgd bgefca eca gbcaf cgfe bgcdfa bceadf ec cabeg dgabe | ce efbcagd aec fceg
gaeb eafcd dbeafg egf dbfag adfbcg bfcaedg aefgd eg decgfb | fegbda bgfecd adgfe gef
cgb baecd begdc cbdefa adbg ebafgc gcfbead cgfde bgdcea gb | cfedg ebdca adbg eabcd
egafc ac fecdg acfgdb aceb befgcad eadgfb fbgcea cga ebfga | daecbgf bcea fegba ac
afde cefbgda gabdfe cegdab feb bdgae dbcgfe fbgca eabfg fe | dgeba dgcbfe bafge gaecbfd
ceabgd ba cfbagde afdce dba ebcdg abcg fdaegb adbce defcgb | fdgbcea bacg dba agcb
gbcfed eag dceabgf eagfdc febgc bfag eagbcf abdec ag cgeba | gae aeg gfdbace gbfa
gb gbfeda cbead gebdcaf gbdf cgabef beg fgaed gdabe cfgeda | gdbf bgfeac bcead cdefag
bcda fabceg dfecg eadgbc dcgae dfabeg afdgebc dga ad cgbea | dbecag efagdb da fcbeag
gfcdae cf fabgd cdfabe gcdfa fecabgd gdeca fegc dacgeb caf | fegc fca cf aefdbc
efcgb decfga cfbga bfdca gcfbde ag eagb gfa bgcaef gcbfdea | ga egba bfecg gfdcbe
cabedf cedf ace bdace acdgb afgbec fgdeba ce fadbe afgedcb | aebfd ebdacf ace dcef
fecdg cgdfae gecbfa de cagdefb bfdgc egda gacfe ecd cdafbe | dcgbf fgaec facdeg gfcdb
gabfdec dabfge abdeg fa egcbda fdbgac adf efbad efcbd fage | gdabe bgade bfdega afd
cbgad fcabdg cbfdg cgfaed fdg bafg cdabge bfcde fg abfcdeg | bfdaecg cgadeb defcb gdfabc
defba fgae daegbf adfgbc bfadg fegacdb bef bedca ef fbgecd | befda bcegdfa ef badgf
fdgbea agfdcbe bgfeca dag da eacd dagcb becadg fgbdc acegb | ecda adbfeg bgedca cead
gafd cdbaef dbgcf gdeacbf fdacb bcdagf abgdce gd efgcb dbg | gd gbd egfbc gadf
de abdegf edgfb efd gcfedab dbgaf afcdbg aedb fegadc begfc | fde edf ecfgb edba
cbgefd da bdagcf cda cegfabd gfdcb dabcf cfgead dgba acbef | bdfcg bgcafde dbcfga bafdcg
aebfcg gfedabc eadgb bf cafgdb bfg fbce fgcea gcdfae gebaf | afgebc fb fb bgf
gc fgecbd egc gaebf gecbda acbed fcaebd cagd bcgae gfabdce | gacd egbacd abefg egfba
dcfab bgdc efagd acg gc aedcfb cdafg begcfad dabgcf cbefga | cdagf gcfda dbfac cdgb
bcdfea dgce cadfg dae agfde cgdeaf adfegcb bafge ed cdbfga | cgedaf bgfae gafdc fbgae
adgcfe dfagecb gfbcda ba cafegb fbdce eagb agefc cafbe cab | bcedf bac ba fbcde
bfeacd fcdebg fg dbaeg egdaf dcgfae gcfa efadc bcegdfa fge | acdef fgaed gf bdeag
dcgefa ceabfg fagbc beagd df fagcdeb dbafg fgabcd dcfb fgd | egafdc gabde beagd dfbc
ef bgdaefc cagdbe fbcda fgbade aef gfce eagbcf gcabe cfbea | fcdab fgce bcfad acebf
efagbc fbdag afdcb fg bgf begda aedfbcg deafgb gedf cdgbea | dfgab acfdb gf gf
edcagb ecfbadg ebdfg ega fbaedc fecdag ga dacef gfac gaedf | dgbfe ga dcafe ag
bedfacg acbfge cbg badfeg begfc fbcde ecag facdgb gbfea gc | fbced gcb eagc agebdfc
fdgca fbgce gfecd gdeb cdfagbe ed ecd fedacb gfabce dgfbec | afcgd deabfc dfagc begcfa
bfeg dge cgadf cgedf gedfbca cebfad dfebc cdabge cdgefb ge | dbcef ged eg ebfacd
ed cebgadf gefdca cfega dcaegb dfce cgaefb dge gbfda dfaeg | aegdf afgce egd deg
aecfgd fgd cedbag fgecd bfagdc feacbdg gceda gf bcdef eagf | dfbce agced gf geadc
gbcfdae fdgea bdgcae edb edgbfc fagdcb ebca be ebgda adgcb | be edb bed gcbaed
gdef df afdgcb fdb ebcgd begadfc gdcbef efbdc baegdc fabec | dgceab acbef fbedc cgbed
dcbgf feg edfacgb efgadc eg fdace afbced fcged eacg aefbdg | cbaedfg ecag aecfdb efdacg
fdbega gcebaf dacgeb eabdc gabcfde fcdea gcbd bd adb agbce | afced efabdcg afced bda
cd dafcbe adegcb edabfgc bdcga adfgb gabecf cdb egcd cbega | daegbfc afbdg cd debacg
bga becfdg gcbfad gcbdf ag baefcg eadbc dcgab fcgadeb afdg | gfbcead edgcbf gdcab bag
aedgfbc fe cgdaef fbec feg agecb bgadf bacefg afebg cgdeba | aebgcfd gfe aegbf efbcga
afcegd gbdec acd afcgbe ad cagfe gdcea fgbedac edaf dgbacf | cad dagec aecgdf da
gfedc eagcfd becagf cafed ace edbaf dgac feadbcg ca bfecdg | gdac gcadef ac eafdc
gab abfdeg bgdac fadbc gcdfba bfdeac bcfadeg bgfc bg gaedc | bg fcbad gb bg
bgeda agdfcb gdaec cd fcabedg cgabed fgcae bdefag dca cbde | adc baegd febdag eafgbd
gedbca dacbe efda bfd efdcba fd bfacd cgabf cbedfga bcefgd | bafcg baecd fecbgd cagfb
egdc fed ed bgfced bfacd ebagcdf dbefc ebgdfa agbefc cfgeb | bfegcd cfebd agdcbef cafdb
bdg bdfga gdfca dfbae gbafcd fbgc eacbdg aegfcd bg dgceafb | gb bgd gfacde gbcf
egdbc badfec caebg cegdab ed bcdfg aedg afdcegb gfaceb bde | agde adge de egda
adef gdcfba adgbecf af acegb fab bfadeg bfega dbgfec efdbg | bcgea fdcegb degfcb fbedag
gbfe bcdgaf edfag gae gfdeba cfdbeag fgdba gebcad ge cdfea | cgfadbe bgef agcbed cgdfab
dfeca cdbg edafbg gcfbead bcafg cfgadb fgd bfgace dg cgadf | gfcda bgfadc cbgefa gfd
fbaecd bf dacfebg dcfge ecbgf gabf cegfab caebg bfc gdbace | abcge cegab egfdabc dcfeg
cbdfag fgbec gdabfe gfdbaec bdgfc ef fbcdge fbe agceb fced | gbfdc fe cegab cgebf
fdebc adfgcbe acebf fdac df dfb bdaegf abecdf abcegf bgedc | gbcefa ecbgd bafec dbecg
fadc fgc gbcdf bcdga edgfb cegbaf fgbdca fc debgca dafcgeb | dfcbag cabdg fbcgd afcd
dgcef dcgbef afc adfce feagbdc ac deafb cdag gcdfea befagc | ca cfegdab efcda fdeca
febgad ag gdeab afdbecg dcgfbe agfbec fbegd gfad aeg dcaeb | ebgdf abedc dgaf dfbge
daegcb agbcd edg bafdgc faecg gadec bfcgde abde ed fecagdb | baegcd edba efgac cefag
adbcf gcaf bgdac gecdfba efdba fdbcga fecgbd cfd cf adgceb | dcbag abdfc fcd fcd
cfedb cfa acefbd afbdcg edcbafg bfeag acebf ac ecdbgf adec | fedcb edcfbg bfaec gecfabd
cef befdcg dafeb cefdag fbdaceg fadec fc agced bdgace acfg | agcde daefc afcg cgaf
ebagd gd gfdbace fagbde febad gfdb dcebfa dcefag edg gcbea | dageb dg gde gd
de gdecfb baefg fedbg ecdf bacdgf bgfdaec dge acdegb cgdfb | dagfcb dcfe ed de
adgfc ad dcea caefgd cgfdb bfaegc afgec egafdb fegbdca fda | da gfedab ad afd
abf cdgfae acfbg gecbadf ecba efabdg cabgfe gbcfd efagc ab | acgbf fegacd acegf abf
cgbaefd cdage dgef geacdf agfdcb dacfg gcaeb cdefba ed ead | abfgdc abdgfc dagcfeb baceg
fgdec cbfa bf gbcfeda dfb fadbge acdeb dbfce cgbdea cdefab | cfegd fdeabc badecfg dgcfe
eba dacgefb deacb gabfde ecgadb cbdef cage gcbad afbdcg ae | gdfeba ae dfbec agce
daebc gcdeabf bgcfea agfeb bdega dgbeaf dgfa gdb gd bfcged | febdcg egfdcb bdace gdfa
gcbaef fdgbea adgfce bgefacd fdbg egdab daecb gbe bg gfdea | fbdg dfbg aefdg bdfg
dbgfce ec faebg fec fagdc cefga fgecda ebfgcad cdae dgbcfa | cadgf dgbeafc cgeafd ec
gabcef edacbfg dba agecb bdce dacgbf dgcaeb eafdg gadbe bd | dfgea db adb cbdgaf
cbfdgea fbdgca bedagf ae dae bfedca dacfb feca bcged adceb | ea ae fcea ead
daebgc db bagecdf bdaec fgdbea dfeac bgfeca cgdb bed gbaec | dfecbag ebacd bed db
agdcef fdaeg fbcdaeg cbgdae afgbd fea cfde eagcfb gdace ef | bgecda afe defc daegf
dcaegbf fdgeba ad dbafe defbc faebg dacfbg daf egda cfaegb | abedf bfdaeg dbfgea cfagbed
geb bgafecd bcae fgabce aefcg be gadfec gfebc bgdfc gbfeda | ebac be fgace dfebagc
cdfegba eafdc afcgb abcfge bfgd cfagbd adg dcafg cebdga gd | adbecfg cfagb dabgce cafbg
geaf fg acbgd fgd dgfcbae dbaef fgbda ebgdfa egfcbd acefbd | gcdba edfbgc ebcadf gf
cbgfe egac ce ecf bgfeca cbdgf fgbdea fbgceda geafb eafdcb | gecbaf adebcf efc ecf
fcd gfbcd dfbge dc gcbefad dcag afebdc gfbac efabgc fadbcg | bgdfc bcfga bfgdc cd
dg dgeb acedbg bdfagc faceg cfagdbe ebadc daceg afbdce cdg | gdaec afgec gcd eacdb
badeg dfegab efgadcb ad fgcdbe egbdf gcdeaf gad dafb bgcea | dgaeb bgdfe agdbe fbaged
deag ea gabedcf decfb dcfea fcdgae fgcda dgcfab cegabf fae | dcagfbe gafcde fedbc fdbacg
eacfg bged cgdafb dg cegad dgcbea bceadf adg gbdfcea baedc | bcfadg gcfae gbed eabdgc
efdba cegafb bcgdfae gdabe cefbd aef af ebgcdf ebdcfa facd | fdabec gfbeca fea adfc
ab fdeba cgefbd fdgae bea fbdce bdafce egfacb ecbdagf dabc | eba gdafe bdaef gfbeca
feadcb dgfabec gdafb cb ebgc fdcgbe cagefd dfgcb fgedc bcd | gfcde gdcfb fgbced decbfa
fabcde cae ecbfga agbed fbacg cegf cgdabef dbagfc ce acbeg | gbdea gcebfa fdeabc baceg
gfebca cageb dbfcaeg ed aecd edg bdegca ebgafd fcbgd gbdec | fbacge dcebg acde edca
bfgedca ec gacfd gcafbe decb cef gdafeb afebdc efadc dfbea | bdec cfeabd cagfd feadc`
.split('\n')
.map(entry => {
	return entry.split(' | ')
	.map(segment => segment.split(' '));
});

console.log(countDigits(input));