const spellingVariations = require("spelling-variations");
const conjugate = require("./conjugate");
const getSentimentScore = require("./get_sentiment.js");
var JSONL = require("./lexicon.json");
const lexicon = {
	lexicon:JSONL,


	/**
	 * Extension function should be given
	 * an object where the key is the word
	 * and the value can be a String (POS tag)
	 * or an object:
	 * pos:"VB",
	 * synonyms:["something"],
	 * 
	**/
	extend:function(terms,a,b,c){
		if(typeof terms !== "object" || terms === null) {
			console.warn("You must pass an object to extend the lexicon");
			return;
		}
		for(var term in terms) {
			if(!terms.hasOwnProperty(term)) continue;
			if(!terms[term]) continue;

			// normalize entry
			if(typeof terms[term] !== "object") {
				terms[term] = {
					pos:terms[term]||"NN",
					sentiment:0,
				};
			}

			// solve sentiment scoring
			if(terms[term].synonyms && !a) terms[term].sentiment = getSentimentScore(terms[term].synonyms,JSONL);

			// add spelling variations to JSONL
			if(!b) new spellingVariations(term).variations().forEach((variation)=>{
				if(!terms[variation]) terms[variation] = terms[term];
			});

			// add verb inflections to JSONL
			if(terms[term].pos.startsWith("V") && !c) {
				
				// eat, drink, laugh
				var VBP = conjugate(terms,term,"VBP",terms[term].sentiment || 0);
				if(typeof VBP === "string") terms[VBP].infinitive = term;
				else terms[VBP.conjugated] = VBP;

				// eats, drinks, laughs
				var VBZ = conjugate(terms,term,"VBZ",terms[term].sentiment || 0);
				if(typeof VBZ === "string") terms[VBZ].infinitive = term;
				else terms[VBZ.conjugated] = VBZ;

				// eaten, gone, laughed
				var VBN = conjugate(terms,term,"VBN",terms[term].sentiment || 0);
				if(typeof VBN === "string") terms[VBN].infinitive = term;
				else terms[VBN.conjugated] = VBN;
				
				// ate, went, laughed
				var VBD = conjugate(terms,term,"VBD",terms[term].sentiment || 0);
				if(typeof VBD === "string") terms[VBD].infinitive = term;
				else terms[VBD.conjugated] = VBD;
				
				// eating, going, laughing
				var VBG = conjugate(terms,term,"VBG",terms[term].sentiment || 0);
				if(typeof VBG === "string") terms[VBG].infinitive = term;
				else terms[VBG.conjugated] = VBG;
			}
		}
		JSONL = Object.assign(JSONL,terms);
	}
};

module.exports = lexicon;