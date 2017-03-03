import lexicon = require("en-lexicon");

export default function(word:string,sensitive?:boolean):string{
	if(!sensitive) word = word.toLowerCase();
	const entry = lexicon.lexicon[word];
	return entry ? entry.split("|")[0] : "";
};