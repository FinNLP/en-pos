const inflectors = require("en-inflectors");
const rules = require("./pre_brill_rules.js");
const lexicon = require("en-lexicon").lexicon;
module.exports = function(tags,tokens){
	return tags.map((tag,index)=>{
		if(tag.blocked) return tag;
		var prev = (tags[index-1] || {});
		var prev2 = (tags[index-2] || {});
		var prev3 = (tags[index-3] || {});
		var prev4 = (tags[index-4] || {});
		var next = (tags[index+1] || {});
		var token = tokens[index].toLowerCase();


		if(/^('?)\d+(-|\/|:)?(\d+)?$/.test(token)) return {
			pos:"CD",
			confidence:1,
			blocked:true
		};

		if((!prev.pos)&&token==="that") return {
			pos:"DT",
			confidence:tag.confidence+1,
			blocked:true
		};

		// people were asking substantially more than what they ate.
		// +0.0007
		if(index>5 && tag.pos==="VBD" && ~["PRP","WP","IN","JJR"].indexOf(prev.pos) && ~(lexicon[token]||"").indexOf("VBN")){
			if 	((prev.pos === "PRP" && prev2.pos ==="WP" && prev3.pos === "IN" && prev4.pos === "JJR")||
				(prev.pos === "WP" && prev2.pos ==="IN" && prev3.pos === "JJR")||
				(prev.pos === "IN" && prev2.pos ==="JJR")||
				(prev.pos ==="JJR")
			) return {
				pos:"VBN",
				confidence:tag.confidence+0.2,
				blocked:tag.blocked
			};
		}

		// I've been browskied again. (made up verbs)
		if 	(token.length > 3 && /[^e]ed$/.test(token) &&
			(!lexicon[token]) && (prev.pos) &&
			(!~token.indexOf("-")) &&
			(!/^[A-Z][a-z]+/g.test(tokens[index]))
		) {
			return {
				pos:"VBN",
				confidence:tag.confidence,
				blocked:tag.blocked
			};
		}
		
		// I'm deemphtarulating again.
		if 	(token.length > 4 &&
			(!~["NNP","NNPS","VBG"].indexOf(tag.pos)) &&
			(!~["VBG","DT","JJ","NN"].indexOf(prev.pos)) &&
			((!prev.pos) || !/^[A-Z][a-z]+/g.test(tokens[index])) &&
			(!~rules.ing_exceptions.indexOf(token)) && (!lexicon[token]) &&
			~(lexicon[token]||"").indexOf("VBG")
		) {
			return {
				pos:"VBG",
				confidence:tag.confidence,
				blocked:tag.blocked
			};
		}

		if(tag.pos === "JJ" && next.pos === "DT" && /VB/.test(lexicon[token])) {
			return {
				pos:lexicon[token].split("|").find(x=>x.startsWith("V")),
				confidence:tag.confidence,
				blocked:tag.blocked,
			};
		}
		
		// I'm deemphtarulatin again.
		if 	(token.length > 4 && token.endsWith('in') && tag.pos === 'NN' &&
			((!prev.pos) || !/^[A-Z][a-z]+/g.test(token)) &&
			(prev.pos !== 'NN' && prev.pos !== 'JJ' && prev.pos !== 'DT' && prev.pos !== 'VBG') &&
			(~(lexicon[token+"g"]||"").indexOf("VBG"))
		) return {
			pos:"VBG",
			confidence:tag.confidence,
			blocked:tag.blocked
		};

		
		if (prev.pos === 'TO' && ~inflectors.infinitives.indexOf(token)) return {
			pos:"VB",
			confidence:tag.confidence+1,
			blocked:true
		};
		
		if (tag.pos === 'NN' && (!lexicon[token]) && inflectors.isPlural(token)) {
			return {
				pos:"NNS",
				confidence:tag.confidence+0.3,
			};
		}
	
		return tag;
	});
};