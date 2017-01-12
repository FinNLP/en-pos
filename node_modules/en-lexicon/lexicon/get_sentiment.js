/**
 * Given an array of keywords and a lexicon
 * object this function will give you the
 * average sentiment of the passed keywords
 * 
 * @param  {Array} keywords 		An array of keywords
 * @param  {Object} src      		A lexicon object (similar to lexicon.json)
 * @return {Number}          		The average sentiment for the given keywords.
 * 
**/

function getSentimentScore(keywords,src){
	return Math.floor(keywords
	.filter((keyword)=>src[keyword])
	.map((keyword)=>src[keyword].sentiment)
	.reduce((num,item,index,arr)=>index !== arr.length-1?num+item:(num+item)/arr.length,0));
}

module.exports = getSentimentScore;