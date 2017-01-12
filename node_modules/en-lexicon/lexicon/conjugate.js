const inflectors = require("en-inflectors");

/**
 * 
 * This function will conjugate a verb to a specific
 * tense then it will detect the existence of this
 * tense in a given object.
 * 
 * If it does exist it will just return the conjugate
 * verb as a string, otherwise it will return an
 * object so it can be added to the list by the callee
 *
 * Used in both building and extending process.
 * 
 * @param  {Object} object     		Full list of terms to be searched
 * @param  {String} infinitive 		The given verb
 * @param  {String} tense      		Target tense (a Penn Treebank POS tag)
 * @param  {Number} sentiment  		The sentiment of the original verb
 * 
 * @return {String|Object}     
**/
function conjugate(object,infinitive,tense,sentiment){
	// eats, drinks, laughs
	conjugatedVerb = inflectors.conjugate(infinitive, tense);
	if(conjugatedVerb !== infinitive) {
		if (!object[conjugatedVerb]) return {
			conjugated:conjugatedVerb,
			pos: tense,
			sentiment:sentiment,
			infinitive: infinitive
		};
	}
	return conjugatedVerb;
}

module.exports = conjugate;