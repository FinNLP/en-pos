const names = require("humannames");
const capitalize = require("./capitalize.js");
module.exports = function(token,sensitive){
	if(!sensitive) token = capitalize(token);
	if(names[token]) return "NNP";
};