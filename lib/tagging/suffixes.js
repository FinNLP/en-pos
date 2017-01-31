const lexicon = require('en-lexicon').lexicon;

const rules = [
	{
		regexp:/^.{1,}(rate|late|nate|ize|ise|ify)$/i,
		pos:"VB"
	},
	{
		regexp:/^.{1,}(rates|lates|nates|izes|ises|ifies)$/i,
		pos:"VBZ"
	},
	{
		regexp:/^.{1,}(rating|lating|nating|izing|ising|ifing)$/i,
		pos:"VBG"
	},
	{
		regexp:/^.{1,}(rated|lated|nated|ized|ised|ifed)$/i,
		pos:"VBD|VBN"
	},
	{
		regexp:/^.{1,}(acy|dom|nace|ence|ist|ity|ment|ness|ship|sion|tion|ism)$/i,
		pos:"NN"
	},
	{
		regexp:/^.{1,}(able|based|ible|ical|esque|ous|etic|atic|ness|ship|sion|tion|egic|ophic|ish|ive|gic|tic|mic|phile|less|ful|edelic|adelic|aholic|oholic|ilar|ular|like|some|escent|chy|thy|shy|sty|tty|bby|ssy|zzy|mmy|ppy|tary|nary|ial|ally|vid|rid|rth)$/i,
		pos:"JJ"
	},
	{
		regexp:/^.{1,}(ville|berg|stein|ford)$/i,
		pos:"NNP"
	},
	{
		regexp:/^.{1,}(ly|wise|ward|wards)$/i,
		pos:"RB"
	},
	{
		regexp:/^.{1,}(iest|dest)$/i,
		pos:"JJS"
	}
];

/**
 * 
 * Detect a given token against the regular expressions show above
 * 
 * @param  {String} 			token 		Token to test
 * @return {String|Undefined}				either the relevant POS tag or undefined
 * 
**/
module.exports = function(token){
	var pos = (rules.find((rule)=>rule.regexp.test(token))||{}).pos;
	if(pos) {
		lexicon[token] = pos;
		return pos.split("|")[0];
	}
};