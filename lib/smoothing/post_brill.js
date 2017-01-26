const inflectors = require("en-inflectors");
const lexicon = require('en-lexicon').lexicon;
module.exports = function(tags,tokens){

	return tags.map((tag,index)=>{
		if(tag.blocked) return tag;
		var prev = tags[index-1] || {pos:""};
		var prev2 = tags[index-2] || {pos:""};
		var prev3 = tags[index-3] || {pos:""};
		var next = tags[index+1] || {pos:""};
		var next2 = tags[index+2] || {pos:""};
		var token = tokens[index].toLowerCase();
		var prevToken = (tokens[index-1]||"").toLowerCase();
		var prevToken2 = (tokens[index-2]||"").toLowerCase();

		if((tag.pos === "NN" || tag.pos === "VBP") && (~(lexicon[token]||"").split("|").indexOf("VB") || ~(lexicon[token]||"").split("|").indexOf("VBP"))){
			if(prev.pos === "TO") tag.pos = "VB";
			if(prev.pos === "MD") tag.pos = "VB";
			if((prevToken === "'s" || prevToken === "us") && prevToken2 === "let") tag.pos = "VB";
		}

		if((tag.pos === "NN" || tag.pos === "VBP") && ~inflectors.infinitives.indexOf(token)) {
			if(prev.pos === "CC" && prev2.pos === "VB" && prev3.pos === "TO") tag.pos = "VB";
			if((prevToken === "n't" || prevToken === "not") && ~["does","do","did"].indexOf(prevToken2)) tag.pos = "VB";
			if(~["does","do","did"].indexOf(prevToken)) tag.pos = "VB";
			if(prev.pos === "'" && prev2.pos === "TO") tag.pos = "VB";
		}

		if(~["am","a.m.","a.m","p.m","pm","p.m."].indexOf(token) && prev.pos === "CD") tag.pos = "RB";

		if(tag.pos === "WDT" && prev.pos.startsWith("NN") && next.pos === "JJ") tag.pos = "IN";
		if(tag.pos === "VBP" && prev.pos === "RB" && prev2.pos === "VBP") tag.pos = "VB";
		if(tag.pos === "JJR" && (next.pos === "," || next.pos === ".") && prev.pos === "NN" && prev2.pos === "DT") tag.pos = "RBR";

		else if(tag.pos === "JJ" && next.pos === ".") {
			if(prev.pos === "DT" && prev2.pos === "IN") tag.pos = "NN";
		}

		else if(tag.pos==="VBD" && ~(lexicon[token]||"").indexOf("VBN")){
			if(prev.pos==="RB") {
				if(prev2.pos === "DT" && prev3.pos === "IN") tag.pos = "VBN";
				if(prev2.pos === "RB" && prev3.pos === "VBZ") tag.pos = "VBN";
				if((prev3.pos.startsWith("N") || prev3.pos === "PRP") && ~["VBZ","VBP","VBD"].indexOf(prev2.pos)) tag.pos = "VBN";
			}
			else if(prev.pos === "DT" && prev2.pos === "IN") tag.pos = "VBN";
			else if(prev.pos === "VBP" && prev2.pos.startsWith("N") && prev3.pos === "DT") tag.pos = "VBN";
			else if((prev2.pos === "MD"||prev2.pos === "TO") && prev.pos === "VB") tag.pos = "VBN";
			else if(prev.pos == "VBD") tag.pos = "VBN";
			else if((tokens[index-1]||"").toLowerCase() === "has" || (tokens[index-1]||"").toLowerCase() === "have") tag.pos = "VBN";
			else if((tokens[index-1]||"").toLowerCase() === "being" || (tokens[index-1]||"").toLowerCase() === "be") tag.pos = "VBN";
			else if(prev.pos.startsWith("V") && next.pos === "IN" && next2.pos.startsWith("N")) tag.pos = "VBN";
			else if((tokens[index+1]||"").toLowerCase() === "by" && (tags[index+2]||"").pos !== "CD" && (tags[index+2]||"").pos !== "SYM") tag.pos = "VBN";
			else if(next.pos.startsWith("N") && prev.pos === "IN") tag.pos = "JJ";
		}

		else if(tag.pos === "VBN" && ~(lexicon[token]||"").indexOf("VBD")) {
			if(prev.pos === "PRP") tag.pos = "VBD";
			if(prev.pos === "RB" && prev2.pos === "PRP") tag.pos = "VBD";
		}

		else if(~inflectors.infinitives.indexOf(tag.pos)) {
			if(prev.pos === "TO" || prev.pos === "MD" || (prev.pos === "RB" && tags[index-2]==="MD")) tag.pos = "VB";
		}
		else if((token === "when" || token === "how") && tag.pos === "RB") tag.pos = "WRB";
		else if(tag.pos === "JJ" && next.pos === "JJ" && ~(lexicon[token]||"").indexOf("VBG")) tag.pos = "VBG";
		else if (tag.pos === 'JJ' && (prev.pos === 'VBZ' || prev.pos === 'VBP') && next.pos === 'TO' && ~(lexicon[token]||"").indexOf("VBN")) tag.pos = 'VBN';
		return tag;
	});
};