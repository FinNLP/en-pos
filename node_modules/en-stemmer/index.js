"use strict";

/**
 * 
 * Porter stemmer in Javascript. Few comments, but it's easy to follow against the rules in the original
 * paper, in Porter, 1980, An algorithm for suffix stripping, Program, Vol. 14, no. 3, pp 130-137.
 *
 * See also:
 * 		- http://www.tartarus.org/~martin/PorterStemmer
 *   	- https://tartarus.org/martin/PorterStemmer/def.txt
 *
 * Revision 1 by 'andargor', Jul 2004
 * Revision 2 (substantially revised) by Christopher McKenzie, Aug 2009
 * Revision 3 as part as compendium (again revised, mainly readability & perf) by 'Ulflander', April 2015
 * Revision 4 Optimized and refractored by Alex Corvi, December 2016
 * 
**/

const step2list = {
	'ational': 'ate',
	'tional': 'tion',
	'enci': 'ence',
	'anci': 'ance',
	'izer': 'ize',
	'bli': 'ble',
	'alli': 'al',
	'entli': 'ent',
	'eli': 'e',
	'ousli': 'ous',
	'ization': 'ize',
	'ation': 'ate',
	'ator': 'ate',
	'alism': 'al',
	'iveness': 'ive',
	'fulness': 'ful',
	'ousness': 'ous',
	'aliti': 'al',
	'iviti': 'ive',
	'biliti': 'ble',
	'logi': 'log'
};

const step3list = {
	'icate': 'ic',
	'ative': '',
	'alize': 'al',
	'iciti': 'ic',
	'ical': 'ic',
	'ful': '',
	'ness': ''
};


/**
 * 
 * RegExp Rules
 * 
**/

// vowel and consonant rules
const c = '[^aeiou]';			// consonant
const v = '[aeiouy]';			// vowel
const C = c + '[^aeiouy]*';	// consonant sequence
const V = v + '[aeiou]*';		// vowel sequence

const M_gr_0 		= 	new RegExp('^(' + C + ')?' + V + C);               		// [C]VC... is m > 0
const M_eq_1 		= 	new RegExp('^(' + C + ')?' + V + C + '(' + V + ')?$');	// [C]VC[V] is m=1
const M_gr_1 		= 	new RegExp('^(' + C + ')?' + V + C + V + C);			// [C]VCVC... is m>1
const v_in_stem 	= 	new RegExp('^(' + C + ')?' + v);						// vowel in stem

// suffix rules
const suffix_nonstd_S = /^(.+?)(ss|i)es$/;
const suffix_std_S = /^(.+?)([^s])s$/;
const suffix_E = /^(.+?)e$/;
const suffix_LL = /ll$/;
const suffix_EED = /^(.+?)eed$/;
const suffix_ED_or_ING = /^(.+?)(ed|ing)$/;
const suffix_Y = /^(.+?)y$/;
const suffix_nonstd_gp1 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
const suffix_nonstd_gp2 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
const suffix_nonstd_gp3 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
const suffix_S_or_T_with_ION = /^(.+?)(s|t)(ion)$/;
const has_C_and_v_but_doesnt_end_with_AEIOUWXY = new RegExp('^' + C + v + '[^aeiouwxy]$');



/**
 * 
 * The stemmer function utilizing all the above rules
 * and stemmer algorithm to stem the input
 * @param  {String} w The target word
 * @return {String}   Stemming result
 * 
**/

const stemmer = function (w) {

	if(w.length < 3) return w;
	if(w.charAt(0) === "y") w = w.charAt(0).toUpperCase() + w.substr(1);

	// STEIP 1.a -----------------------------------------
	if (suffix_nonstd_S.test(w)) w = w.replace(suffix_nonstd_S,'$1$2');	
	else if (suffix_std_S.test(w)) w = w.replace(suffix_std_S,'$1$2');

	// STEIP 1.b -----------------------------------------
	// When it ends with "eed" & the stem confirms with M_gr_0
	if (suffix_EED.test(w)) {
		let stem = (suffix_EED.exec(w) || [])[1];
		if (M_gr_0.test()) w = w.substr(0,w.length-1);
	}

	else if (suffix_ED_or_ING.test(w)) {
		let stem = (suffix_ED_or_ING.exec(w) || [])[1];
		if (v_in_stem.test(stem)) {
			w = stem;
			if (/(at|bl|iz)$/.test(w)) w = w + 'e';
			else if (new RegExp('([^aeiouylsz])\\1$').test(w)) w = w.substr(0,w.length-1);
			else if (new RegExp('^' + C + v + '[^aeiouwxy]$').test(w))w = w + 'e';
		}
	}

	// STEIP 1.c -----------------------------------------
	if (suffix_Y.test(w)) {
		let stem = (suffix_Y.exec(w) || [])[1];
		if (v_in_stem.test(stem)) w = stem + 'i';
	}

	// Step 2 -----------------------------------------
	if (suffix_nonstd_gp1.test(w)) {
		let result = suffix_nonstd_gp1.exec(w);
		let stem = result[1];
		let suffix = result[2];
		if (M_gr_0.test(stem)) w = stem + step2list[suffix];
	}

	// Step 3 -----------------------------------------
	if (suffix_nonstd_gp2.test(w)) {
		let result = suffix_nonstd_gp2.exec(w);
		let stem = result[1];
		let suffix = result[2];
		if (M_gr_0.test(stem)) w = stem + step3list[suffix];
	}

	// Step 4 -----------------------------------------
	if (suffix_nonstd_gp3.test(w)) {
		let result = suffix_nonstd_gp3.exec(w);
		let stem = result[1];
		if (M_gr_1.test(stem)) w = stem;
	}
	else if (suffix_S_or_T_with_ION.test(w)) {
		let result = suffix_S_or_T_with_ION.exec(w);
		let stem = result[1] + result[2];
		if (M_gr_1.test(stem)) w = stem;
	}

	// Step 5 -----------------------------------------
	if (suffix_E.test(w)) {
		let result = suffix_E.exec(w);
		let stem = result[1];
		if (M_gr_1.test(stem) || (M_eq_1.test(stem) && !(has_C_and_v_but_doesnt_end_with_AEIOUWXY.test(stem)))) w = stem;
	}
	if (suffix_LL.test(w) && M_gr_1.test(w)) w = w.substr(0,w.length-1);
	// and turn initial Y back to y
	if(w.charAt(0) === "Y") w = w.charAt(0).toLowerCase() + w.substr(1);

	return w;
};

module.exports = stemmer;