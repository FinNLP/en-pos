import lexicon = require("en-lexicon");
import slang from "./slang";

function tryToken(token:string):string{
	if(!countRepetitions(token)) return "";
	token = token.toLowerCase();
	token = removeRepetition(token);
	if(lexicon.lexicon[token]) return lexicon.lexicon[token].split("|")[0];
	if(slang(token)) return slang(token);
	return tryToken(token);
}

function countRepetitions(token:string):number{
	return token.split("").filter((a)=>token.indexOf(a)!==token.lastIndexOf(a)).length;
}
function removeRepetition(token:string):string{
	return token.replace(/(.)(?=\1)/,"");
}

export default tryToken;