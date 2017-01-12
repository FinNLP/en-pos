const inflectors = require("en-inflectors");

/**
 * 
 * Tests a given token against a regex to see
 * if it's (potentially) a proper noun.
 * 
 * @param  {String} 	token 	token to test
 * @return {String|undefined}   NNP or NNPS or undefined (if it's not proper noun)
 * 
**/
module.exports = function(token){
	const regex = /^([A-Z])(('[A-Z])?)[A-Za-z0-9.]+$/;
	if(!regex.test(token)) return;
	if(inflectors.isPlural(token)) return "NNP";
	else return "NNPS";
};