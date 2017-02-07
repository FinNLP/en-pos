import inflectors = require("en-inflectors");

export default function(token:string):string{
	const regex = /^([A-Z])(('[A-Z])?)[A-Za-z0-9.]+$/;
	if(!regex.test(token)) return "";
	if(new inflectors.Inflectors(token).isPlural()) return "NNPS";
	else return "NNP";
};