const lexicon = require("en-lexicon").lexicon;

/**
 * Get word's POS from lexicon.
 * 
 * @param  {String} 	word        	the word we want to retrieve it's sentiment
 * @param  {Boolean} 	insensitive 	Whether or not the search should be case sensitive
 * @return {String|undefined}           The POS tag
 * 
**/
module.exports = function(word,sensitive){
	word = word || ""; // prevent errors
	if(!sensitive) word = word.toLowerCase();
	var entry = lexicon[word];
	return entry ? entry.split("|")[0] : false;
};