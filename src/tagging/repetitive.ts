import lexicon = require("en-lexicon");
import slang from "./slang";

function tryToken(token:string):string{
	if(!countRepitions(token)) return "";
	token = token.toLowerCase();
	token = removeRepition(token);
	if(lexicon.lexicon[token]) return lexicon.lexicon[token].split("|")[0];
	if(slang(token)) return slang(token);
	return tryToken(token);
}

function countRepitions(token:string):number{
	return token.split("").filter((a)=>token.indexOf(a)!==token.lastIndexOf(a)).length;
}

function removeRepition(token:string):string{
	return token.replace(/(.)(?=\1)/,"");
}

export default tryToken;