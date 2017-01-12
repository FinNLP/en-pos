const cities = require("cities-list");
const capitalize = require("./capitalize.js");
module.exports = function(token,sensitive){
	if(!sensitive) token = capitalize(token);
	if(cities[token]) return "NNP";
};