const rules = [
	{
		regex:/^[?!.…]+$/,
		pos:"."
	},
	{
		regex:/^(\:|\;|\-|\--)$/,
		pos:":"
	},
	{
		regex:/^[\,\ʻ\、\︐\︑\﹐\﹑\，\､\،]$/,
		pos:","
	},
	{
		regex:/^[%\+\-\/@]$/,
		pos:"SYM"
	},
	{
		regex:/^[\(\[\{\<\‹\【\｛\｟\〈\《\（]+$/,
		pos:"("
	},
	{
		regex:/^[[\)\]\}\>\›\】\｝\｠\〉\》\）]+$/,
		pos:")"
	},
	{
		regex:/^[\"\'\`\”\“\«\»\„\「\」\‘\’\〝\〞]+$/,
		pos:"\""
	},
	{
		regex:/^((\d{1,3})+(,\d{3})*(\.\d+)?)$/,
		pos:"CD"
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
	if(/^[a-z]+$/i.test(token)) return;
	return (rules.find((rule)=>rule.regex.test(token))||{}).pos;
};