const inflectors = require("en-inflectors");

const taggers = {
	nonLetters:require("./non_letters.js"),
	lexicon:require("./lexicon.js"),
	givenNames:require("./given_names.js"),
	cities:require("./cities.js"),
	complexWords:require("./complex_words.js"),
	meta:require("./meta.js"),
	suffixes:require("./suffixes.js"),
	repetitive:require("./repetitive.js"),
	slang:require("./slang.js"),
	potentialProper:require("./potential_proper.js"),
};

/**
 * Returns an array of initial tokens 
 * when given an array of tags
 * @param  {Array} 	tokens 		The array of tokens to test
 * @return {Array}        		The resulting array of tags (objects)
**/

module.exports = function(tokens,tokensMeta){
	return tokens.map((token,index)=>{

		// dictionary stage
		var lexiconSensitive = taggers.lexicon(token,true);
		if(lexiconSensitive) return {confidence:1,pos:lexiconSensitive};

		var nonLetter = taggers.nonLetters(token);
		if(nonLetter) return {confidence:1,pos:nonLetter,blocked:true};

		var givenNameSensitive = taggers.givenNames(token,true);
		if(givenNameSensitive) return {confidence:0.9,pos:givenNameSensitive,blocked:true};

		var citiesSensitive = taggers.cities(token,true);
		if(citiesSensitive) return {confidence:0.9,pos:citiesSensitive,blocked:true};

		// Semi dictionary stage
		var lexiconInsensistive = taggers.lexicon(token);
		if(lexiconInsensistive) return {confidence:0.8,pos:lexiconInsensistive};

		var givenNameInsensitive = taggers.givenNames(token);
		if(givenNameInsensitive) return {confidence:0.9,pos:givenNameInsensitive,blocked:true};

		var citiesInsensitive = taggers.cities(token);
		if(citiesInsensitive) return {confidence:0.9,pos:citiesInsensitive,blocked:true};

		var complex = taggers.complexWords(token);
		if(complex) return {confidence:0.7,pos:complex};

		// Meta stage
		var meta = taggers.meta(((tokensMeta||[])[index])||{});
		if(meta) return {confidence:0.6,pos:meta};

		var suffixBased = taggers.suffixes(token);
		if(suffixBased) return {confidence:0.5,pos:suffixBased};

		// Irregular stage
		var repetitive = taggers.repetitive(token);
		if(repetitive) return {confidence:0.4,pos:repetitive};

		var slang = taggers.slang(token);
		if(slang) return {confidence:0.3,pos:slang};

		var pnnp = taggers.potentialProper(token);
		if(pnnp) return {confidence:0.2,pos:pnnp};

		// defaulting
		return{confidence:0.1,pos:inflectors.isPlural(token)?"NNS":"NN"};
	});
};