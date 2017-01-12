module.exports = function (token) {
	return token.split("-").map((x)=>x.charAt(0).toUpperCase()+x.substr(1).toLowerCase()).join("-");
};