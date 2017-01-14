const preBrill = require("./pre_brill.js");
const brill = require("./brill.js");
const postBrill = require("./post_brill.js");
module.exports = function(tags,tokens){
	// Stage A manual smoothing
	tags = preBrill(tags,tokens);
	// Brill Smoothing
	tags = brill(tags,tokens);
	// Stage B manual smoothing
	tags = postBrill(tags,tokens);
	return tags;
};