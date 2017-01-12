const lexicon = require("en-lexicon").lexicon;
const list = [
	["no","nah","nope","n"],
	["yes","yeah","yep","yup","yah","aye","yea","ya"],
	["seriously","srlsy"],
	["why","y"],
	["ok","k","okay","o.k.","oki","okey-dokey","okey-doke"],
	["alright","alrighty"],
	["them","'em"],
	["you","ya","ye","u"],
	["your","yo"],
	["because","cuz","b/c"],
	["please","plz","pwez"],
	["this","dis"],
	["tomorrow","2moro","2mro","2mr"],
	["tonight","2nite","2nt"],
	["today","2day","2dy"],
	["great","gr8"],
	["later","l8r"],
	["thanks","thx","thks","tx","tnx","tanx"],
	["are","'re","r"],
	["am","'m","m"],
	["hello","hi","hey"],
	["love","<3"],
	["babe","bae"],
	["what","dafuq"],
	["fuck","fml"],
	["ugh","facepalm","smh"],
	["laughing","lol","lolz","lulz","lols","lmao","lmfao","rofl","roflmao","roflol"],
	["right","ikr?","ikr"],
];

/**
 * Gives the tag of the more formal version
 * of a token if it's a slang.
 * 
 * @param  {String} 			token 	Slang token to test
 * @return {String|Undefined}       	Either the POS as a string or Undefined
**/
module.exports = function(token){
	token = token.toLowerCase();
	token = (list.find((x)=>~x.indexOf(token))||[])[0];
	return (lexicon[token]||{}).pos;
};