const spellingVariations = function (word) {
	this.data = analyse(word);
};

// @return {Number} how common this variation in the UK's texts (1-0)
spellingVariations.prototype.scoreUK = function() {return this.data.scoreUK;};
// @return {Number} how common this variation in the US's texts (1-0)
spellingVariations.prototype.scoreUS = function() {return this.data.scoreUS;};
// @return {Boolean} the word has variations
spellingVariations.prototype.hasVariations = function() {return this.data.hasVariations;};
// @return {Array} US variations of the word
spellingVariations.prototype.USVariations = function() {return this.data.USVariations;};
// @return {Array} UK variations of the word
spellingVariations.prototype.UKVariations = function() {return this.data.UKVariations;};
// @return {String} UK's preferred variation
spellingVariations.prototype.UKPrefered = function() {return this.data.UKPrefered;};
// @return {String} US's preferred variation
spellingVariations.prototype.USPrefered = function() {return this.data.USPrefered;};
// @return {Array} All of the word's variations
spellingVariations.prototype.variations = function() {return this.data.variations;};
// @return {String} UK and US common variation
spellingVariations.prototype.commonVariation = function() {return this.data.commonVariation;};
// @return {String} converts the word spelling to it's UK variant
spellingVariations.prototype.toUK = function() {return this.data.UKPrefered || this.data.word;};
// @return {String} converts the word spelling to it's US variant
spellingVariations.prototype.toUS = function() {return this.data.USPrefered || this.data.word;};
// @return {Object} all the info above
spellingVariations.prototype.analyse = function() {return this.data;};
// a us variation :)
spellingVariations.prototype.analyze = function() {return this.data;};

export default spellingVariations;


/**
 * 
 * This little guy here is actually the one who does all the heavy
 * lifting of finding the variations and the class and such..
 * 
**/

import list from "./list.js";

function analyse(word) {

	word = (word || "").toLowerCase();

	const result = {
		word,
		scoreUK:-1,
		scoreUS:-1,
		hasVariations:false,
		Wordi:-1,
		UKPrefered:"",
		USPrefered:"",
		commonVariation:"",
		UKVariations:[],
		USVariations:[],
		variations:[],
		analyse:analyse,
		analyze:analyse
	};

	// get indexes
	const UK1i = list.UK1.indexOf(word);
	const UK2i = list.UK2.indexOf(word);
	const UK3i = list.UK3.indexOf(word);
	const UK4i = list.UK4.indexOf(word);
	const US1i = list.US1.indexOf(word);
	const US2i = list.US2.indexOf(word);
	const US3i = list.US3.indexOf(word);
	const US4i = list.US4.indexOf(word);
	const UKUSi = list.UKUS.indexOf(word);


	// find the nearest UK and US index
	const UKi = !!~UK1i ? UK1i : !!~UK2i ? UK2i : !!~UK3i ? UK3i : !!~UK4i ? UK4i : !!~UKUSi ? UKUSi : false;
	const USi = !!~US1i ? US1i : !!~US2i ? US2i : !!~US3i ? US3i : !!~US4i ? US4i : !!~UKUSi ? UKUSi : false;

	// found or not
	result.scoreUK = !!~UK1i ? 1 : !!~UKUSi ? 0.87 : !!~UK2i ? 0.3 : !!~UK3i ? 0.2 : !!~UK4i ? 0.1 : USi? 0 : -1;
	result.scoreUS = !!~US1i ? 1 : !!~UKUSi ? 0.87 : !!~US2i ? 0.3 : !!~US3i ? 0.2 : !!~US4i ? 0.1 : UKi? 0 : -1;

	if(!(UKi||USi)) return result;

	// word index .. used to found the variations
	result.Wordi = UKi || USi;

	// preferred variations
	result.UKPrefered = list.UK1[result.Wordi];
	result.USPrefered = list.US1[result.Wordi];

	// get all variations
	result.UKVariations = removeDuplicates(filterOut([
		result.UKPrefered,
		list.UK2[result.Wordi],
		list.UK3[result.Wordi],
		list.UK4[result.Wordi]
	],word));

	result.USVariations = removeDuplicates(filterOut([
		result.USPrefered,
		list.US2[result.Wordi],
		list.US3[result.Wordi],
		list.US4[result.Wordi]
	],word));

	result.commonVariation = list.UKUS[UKUSi] || "";
	result.variations = removeDuplicates(filterOut([...result.UKVariations,...result.USVariations,result.commonVariation],word));
	result.hasVariations = !!result.variations.length;
	return result;
}

function filterOut(arr,word){
	return arr.filter((x)=>x&&x!==word);
}

function removeDuplicates(arr){
	return arr.reduce((newArr,item)=>{
		if(newArr.indexOf(item) === -1) newArr.push(item);
		return newArr;
	},[]);
}