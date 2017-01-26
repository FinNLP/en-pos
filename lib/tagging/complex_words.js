const lexicon = require("en-lexicon").lexicon;
const rules = [
	{
		regexp:/(CD-CD(s)?)$/,
		pos:"CD"
	},
	{
		regexp:/(NNP-NNP|JJ-NNP|NNP-CD(s)?|1UC|1UC-CD)$/,
		pos:"NNP"
	},
	{
		regexp:/(NNS|NN-VBZ)$/,
		pos:"NNS"
	},
	{
		regexp:/(VB-IN|NN-NN|NN-VBG)$/,
		pos:"NN"
	},
];

module.exports = function(token){
	token = token
	.split("-")
	.map((part)=>{
		if(lexicon[part]) return lexicon[part].split("|")[0];
		if(lexicon[part.toLowerCase()]) return lexicon[part.toLowerCase()].split("|")[0];
		if((part*1).toString()!==NaN.toString()) return "CD";
		if((part.substr(0,part.length-1)*1).toString()!==NaN.toString()) return "CD";
		if(part === part.charAt(0).toUpperCase() + part.substr(1)) return "1UC";
		return "UNKNOWN";
	})
	.join("-");
	return (rules.find((rule)=>rule.regexp.test(token))||{}).pos||"JJ";
};