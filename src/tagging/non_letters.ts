export interface NonLetterDetector{
	regex:RegExp,
	pos:string
}

const rules:Array<NonLetterDetector> = [
	{
		regex:/^(\.{2,})|(…)$/,
		pos:":"
	},
	{
		regex:/^[?!.]+$/,
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
		regex:/^[%\+\/@]$/,
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
		regex:/^\d+(rd|st|th)$/,
		pos:"CD",
	},
	{
		regex:/^(\d+)((\/|\\)\d+)((\/|\\)\d+)?$/,
		pos:"CD"
	},
	{
		regex:/^((\d{1,3})+(,\d{3})*(\.\d+)?)$/,
		pos:"CD"
	}
];

export default function(token:string):string{
	// fast check, so we only loop on suspected cases
	if(/^[a-z]+$/i.test(token)) return "";

	for (let i = 0; i < rules.length; i++) {
		if(rules[i].regex.test(token)) return rules[i].pos;
	}
	
	return "";
};