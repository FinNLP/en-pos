const conditions = require("./brill_conditions.js");
const rules = require("./brill_rules.js");
const lexicon = require('en-lexicon').lexicon;

/**
 * Applying Brill rules (or return the same tag for if no rules apply)
 * @param: {
 * 		tokens:[tokens...],
 * 		tags:[tags...],
 * 		blocked:true||false
 *  }
 * @returns: [tags..]
**/
module.exports = function(tags,tokens){

	function applyRule (rule, token, tag, index, tokens, tags, run) {
		if (rule.from !== tag || (rule.secondRun && run === 1)) return tag;
		var type = rule.type,tmp,tmp2;

		// Start word rule is case sensitive
		if (type === conditions.STARTWORD) {
			if (index === 0 && token === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}

		token = (token||"").toLowerCase();

		if (type === conditions.PREV2WORDS) {
			tmp = tokens[index - 1] || "";
			tmp2 = tokens[index - 2] || "";
			if (tmp === rule.c1 && tmp2 === rule.c2 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}

		else if (type === conditions.PREVTAG) {
			if (index && tags[index - 1] === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}

		else if (type === conditions.PREVWORDPREVTAG) {
			tmp = tokens[index - 1] || '';
			if (tags[index - 1] === rule.c2 && tmp.toLowerCase() === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.NEXTTAG) {
			if (tags[index + 1] === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.NEXTTAG2) {
			if (tags[index + 2] === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.PREVTAG2) {
			if (tags[index - 2] === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.PREV1OR2TAG) {
			if (tags[index - 1] === rule.c1 || tags[index - 2] === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.PREVWORD) {
			tmp = tokens[index - 1] || '';
			if (tmp.toLowerCase() === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.CURRENTWD) {
			if (token === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}

		else if (type === conditions.CURRENTWDRGX) {
			if (rule.c1.test(token) && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.WDPREVTAG) {
			if (token === rule.c2 && tags[index - 1] === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.WDPREVWD) {
			tmp = tokens[index - 1] || '';
			if (token === rule.c2 && tmp.toLowerCase() === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.NEXT1OR2OR3TAG) {
			if (tags[index + 1] === rule.c1 || tags[index + 2] === rule.c1 || tags[index + 3] === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.NEXT2WD) {
			tmp = tokens[index + 2] || '';
			if (tmp.toLowerCase() === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.WDNEXTWD) {
			tmp = tokens[index + 1] || '';
			if (token === rule.c1 && tmp.toLowerCase() === rule.c2 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.WDNEXTTAG) {
			if (token === rule.c1 && tags[index + 1] === rule.c2 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.PREV1OR2OR3TAG) {
			if (tags[index - 1] === rule.c1 || tags[index - 2] === rule.c1 || tags[index - 3] === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.SURROUNDTAG) {
			if (tags[index - 1] === rule.c1 && tags[index + 1] === rule.c2 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.SURROUNDTAGWD) {
			if (token === rule.c1 && tags[index - 1] === rule.c2 && tags[index + 1] === rule.c3 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.NEXTWD) {
			tmp = tokens[index + 1] || '';
			if (tmp.toLowerCase() === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.NEXT1OR2TAG) {
			if (tags[index + 1] === rule.c1 || tags[index + 2] === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.PREV2TAG) {
			if (tags[index - 2] === rule.c1 && tags[index - 1] === rule.c2 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.PREV2TAGNEXTTAG) {
			if (tags[index - 2] === rule.c1 && tags[index - 1] === rule.c2 && tags[index + 1] === rule.c3 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.NEXT2TAG) {
			if (tags[index + 1] === rule.c1 && tags[index + 2] === rule.c2) {
				tags[index] = rule.to;
				return;
			}
		}
		
		else if (type === conditions.NEXT1OR2WD) {
			tmp = tokens[index + 1] || '';
			tmp2 = tokens[index + 2] || '';
			if (tmp.toLowerCase() === rule.c1 || tmp2.toLowerCase() === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.PREV2WD) {
			tmp2 = tokens[index - 2] || '';
			if (tmp2.toLowerCase() === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.PREV1OR2WD) {
			tmp = tokens[index - 1] || '';
			tmp2 = tokens[index - 2] || '';
			if (tmp.toLowerCase() === rule.c1 || tmp2.toLowerCase() === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}
		
		else if (type === conditions.PREV1OR2TAG) {
			tmp = tags[index - 1] || '';
			tmp2 = tags[index - 2] || '';
			if (tmp === rule.c1 || tmp2 === rule.c1 && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}

		else if (type === conditions.END) {
			if ((!tags[index+1]) && ((!rule.verify)||((!lexicon[token])||~lexicon[token].split("|").indexOf(rule.to)))) return rule.to;
			else return;
		}

	}

	// Apply all rules on given token/tag combo
	function applyRules (token, index, tokens, tags, iteration) {
		var tag = tags[index];
		rules.every((rule)=>{
			var result = applyRule(rule, token, tag, index, tokens, tags, iteration);
			if((result) && tag!==result) tag = result;
			else return true;
		});
		return tag;
	}

	// Apply all rules twice on given arrays of tokens and tags
	function apply (tags, tokens) {

		// first run
		tags = tokens.map((token,index)=>{
			if (!tags[index].blocked) {
				var result = applyRules(token, index, tokens, tags.map(o=>o.pos), 1);
				tags[index].pos = result;
			}
			return tags[index];
		});
		// second run
		tags = tokens.map((token,index)=>{
			if (!tags[index].blocked) tags[index].pos = applyRules(token, index, tokens, tags.map(o=>o.pos), 2);
			return tags[index];
		});
		return tags;
	}

	return apply(tags,tokens);
};