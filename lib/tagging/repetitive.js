const lexicon = require("en-lexicon").lexicon;
const slang = require("./slang.js");

function tryToken(token){
	if(!countRepitions(token)) return;
	token = token.toLowerCase();
	token = removeRepition(token);
	if(lexicon[token]) return lexicon[token].pos;
	if(slang(token)) return slang;
	return tryToken(token);
}

function countRepitions(token){
	return token.split("").filter((a)=>token.indexOf(a)!==token.lastIndexOf(a)).length;
}

function removeRepition(token){
	return token.replace(/(.)(?=\1)/,"");
}

module.exports = tryToken;