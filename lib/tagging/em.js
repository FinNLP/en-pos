const lexicon = require("en-lexicon");
const EMs = [];
for (var entry in lexicon.lexicon) {
	if(!lexicon.lexicon.hasOwnProperty(entry)) continue;
	else if(lexicon.lexicon[entry].pos !== "EM") continue;
	else EMs.push(entry);
}
module.exports = function(token){
	if(~EMs.indexOf(token)) return "EM";
};