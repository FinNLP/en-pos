module.exports = function(tags,tokens){
	// Stage A manual smoothing
	tags = require("./manual_a.js")(tags,tokens);
	// Brill Smoothing
	tags = require("./brill.js")(tags,tokens);
	// Stage B manual smoothing
	tags = require("./manual_b.js")(tags,tokens);
	return tags;
};