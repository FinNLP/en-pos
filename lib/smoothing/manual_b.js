const inflectors = require("en-inflectors");
module.exports = function(tags,tokens){
	return tags.map((tag,index)=>{
		if(tag.blocked) return tag;
		var prev = tags[index-1] || {};
		var prev2 = tags[index-2] || {};
		var prev3 = tags[index-3] || {};
		var prev4 = tags[index-4] || {};
		var next = tags[index+1] || {};
		var token = tokens[index].toLowerCase();

		if(tag.pos==="VBD"){
			if(prev2.pos === "MD" && prev.pos === "VB" && tag.pos==="VBD") tag.pos = "VBN";
			else if(tokens[index-1] === "has" || tokens[index-1] === "have") tag.pos = "VBN";
			else if(tokens[index-1] === "being" || tokens[index-1] === "be") tag.pos = "VBN";
		}
		else if(~inflectors.infinitives.indexOf(tag.pos)) {
			if(prev.pos === "TO" || prev.pos === "MD" || (prev.pos === "RB" && tags[index-2]==="MD")) tag.pos = "VB";
		}
		else if((token === "when" || token === "how") && tag.pos === "RB") tag.pos = "WRB";
		else if(tag.pos === "VBD" && (next.pos === "JJ" || next.pos.startsWith("N")) && prev.pos === "IN") tag.pos = "JJ";
		else if(tag.pos === "JJ" && token.endsWith("ing") && next.pos === "JJ") tag.pos = "VBG";
		else if (tag.pos === 'JJ' && (prev.pos === 'VBZ' || prev.pos === 'VBP') && next.pos === 'TO') tag.pos = 'VBN';
		return tag;
	});
};