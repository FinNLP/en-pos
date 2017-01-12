const inflectors = require("en-inflectors");

/**
 * Returns an array of initial tokens 
 * when given an array of tags
 * @param  {Array} 	tokens 		The array of tokens to test
 * @return {Array}        		The resulting array of tags (objects)
**/

module.exports = function(tokens){
	return tokens.map((token)=>{
		
		// Dictionary stage
		var em = require("./em.js")(token);
		if(em) return {confidence:1,pos:em,blocked:true};

		var nonLetter = require("./non_letters.js")(token);
		if(nonLetter) return {confidence:1,pos:nonLetter,blocked:true};

		var lexiconSensitive = require("./lexicon.js")(token,true);
		if(lexiconSensitive) return {confidence:1,pos:lexiconSensitive};

		// Semi dictionary stage
		var lexiconInsensistive = require("./lexicon.js")(token);
		if(lexiconInsensistive) return {confidence:0.8,pos:lexiconInsensistive};

		var complex = require("./complex_words.js")(token);
		if(complex) return {confidence:0.7,pos:complex};

		// Meta stage
		var meta = require("./meta.js")(token);
		if(meta) return {confidence:0.6,pos:meta};

		var suffixBased = require("./suffix.js")(token);
		if(suffixBased) return {confidence:0.5,pos:suffixBased};

		// Irregular stage
		var repetitive = require("./repetitive.js")(token);
		if(repetitive) return {confidence:0.4,pos:repetitive};

		var slang = require("./slang.js")(token);
		if(slang) return {confidence:0.3,pos:slang};

		var pnnp = require("./potential_proper.js")(token);
		if(pnnp) return {confidence:0.2,pos:pnnp};

		// defaulting
		return{confidence:0.1,pos:inflectors.isPlural(token)?"NNS":"NN"};
	});
};