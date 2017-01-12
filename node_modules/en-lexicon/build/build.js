const fs = require("fs");
const result = {};
const lexiconDictionary = fs.readFileSync("./build/source.txt","utf8");
const emoji = require("emojilib").lib;
const inflectors = require("en-inflectors");
const afinn165 = require("afinn-165");
const spellingVariations = require("spelling-variations");
const conjugate = require("../lexicon/conjugate.js");
const getSentimentScore = require("../lexicon/get_sentiment.js");


/**
 *
 * STEP A:
 * 	Using the source.txt file
 * 	which is an almost complete lexicon with sentiment scores
 * 	and POS tags
 * 
**/

console.log(" ");
console.log("	--------------------------------------------");
console.log("	✔  Building lexicon from initial source file");
lexiconDictionary.split('\n').forEach((line,index)=>{
	var blocked = false;
	var item = line.split(' ');
	var last = item.length - 1;
	var POStag = last > 0 ? item[1].trim() : '';
	if ((POStag.length>1) && POStag.endsWith('-')) {
		blocked = true;
		POStag = POStag.substr(0, POStag.length-1);
	}
	
	var sentiment = 0;
	var condition = null;

	// Set sentiment scores
	// Sentiment score with PoS tag condition
	if (item[last].match(/^[A-Z]{2,}\/[0-9\-]+$/g)) {
		condition = item[last].split('/')[0];
		sentiment = item[last].split('/')[1];
	}
	
	// Simple score
	else if (item[last].match(/^[0-9\-]+$/g) || item[last].match(/^\-{0,1}[0-4]\.[0-9]$/g)) {
		sentiment = item[last].indexOf('.') > 0 ? parseFloat(item[last]) : parseInt(item[last], 10);
	}

	var obj = {};
	obj.pos = POStag === '-' ? 'NN' : POStag;
	obj.sentiment = sentiment;
	if(blocked) obj.blocked = blocked;
	if(condition) obj.condition = condition;
	result[item[0]] = obj;
});




/**
 *
 * STEP B:
 * 	Adding more sentiment scores from the afinn165 list
 * 
**/

console.log("	✔  Adding afinn165 sentiment scores");
for(var word in afinn165) {
	if(afinn165.hasOwnProperty(word)) {
		if(~word.indexOf(" ")) continue;
		word = inflectors.singularize(word);
		word = inflectors.present(word);
		// Note for words that already has a score
		// the average is calculated and rounded
		if(result[word]) result[word].sentiment = Math.round(((result[word].sentiment||afinn165[word]) + afinn165[word]) / 2);
	}
}



/**
 *
 * STEP C:
 * 	Adding all verbs conjugations
 * 	Note: this will only add those verbs that
 * 	are provided by the en-inflection library
 * 	as infinitives, however, I should
 * 	investigate the results of looping through
 * 	the lexicon itself and adding conjugations
 * 	from there.
 * 	I might even add the singulars of NNS & NNPS
 *  and the plurals of NN && NNP
 *  
**/

console.log("	✔  Adding verb conjugations");
inflectors.infinitives.forEach((infinitive)=>{

	var sentiment = 0;

	if(result.hasOwnProperty(infinitive)) sentiment = result[infinitive].sentiment;
	else {
		result[infinitive] = {
			pos:"VB",
			sentiment:0,
		};
	}

	// eats, drinks, laughs
	var VBZ = conjugate(result,infinitive,"VBZ",sentiment);
	if(typeof VBZ === "string") result[VBZ].infinitive = infinitive;
	else result[VBZ.conjugated] = VBZ;

	// eaten, gone, laughed
	var VBN = conjugate(result,infinitive,"VBN",sentiment);
	if(typeof VBN === "string") result[VBN].infinitive = infinitive;
	else result[VBN.conjugated] = VBN;
	
	// ate, went, laughed
	var VBD = conjugate(result,infinitive,"VBD",sentiment);
	if(typeof VBD === "string") result[VBD].infinitive = infinitive;
	else result[VBD.conjugated] = VBD;
	
	// eating, going, laughing
	var VBG = conjugate(result,infinitive,"VBG",sentiment);
	if(typeof VBG === "string") result[VBG].infinitive = infinitive;
	else result[VBG.conjugated] = VBG;
});


/**
 *
 * STEP D:
 * 	Adding Emojis from the emojilib
 * 	and setting their sentiment scores
 * 	based on their keywords
 *  
**/

console.log("	✔  Adding Emojis");
for(var item in emoji) {
	if(emoji.hasOwnProperty(item) && emoji[item].char) {
		result[emoji[item].char] = {
			pos:"EM",
			sentiment:getSentimentScore(emoji[item].keywords,result),
			keywords:emoji[item].keywords,
		};
	}
}



/**
 *
 * STEP E:
 * 	Adding UK-US and all spelling variations
 * 	for words. using the spelling-variations
 * 	library.
 *  
**/

console.log("	✔  Adding spelling variations");
for(var entry in result) {
	if(result.hasOwnProperty(entry)) {
		new spellingVariations(entry).variations().forEach((variation)=>{
			if(!result[variation]) result[variation] = result[entry];
		});
	}
}




/**
 *
 * STEP F:
 * 	Writing the file as "lexicon.json"
 *  
**/

console.log("	✔  The lexicon now has a total of "+Object.keys(result).length+" words.");
console.log("	✔  Writing file");
fs.writeFileSync("./lexicon.json",JSON.stringify(result,null,2));