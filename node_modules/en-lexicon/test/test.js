const lexicon = require("../lexicon/index.js");
const assert = require("assert");

describe('Basic tests', function () {
	it('Lexicon is an object', function () {
		assert.equal(typeof lexicon,"object");
	});
	it('Lexicon JSON is an object', function () {
		assert.equal(typeof lexicon.lexicon,"object");
	});
	it('Extend is a function', function () {
		assert.equal(typeof lexicon.extend,"function");
	});
	it('word count', function () {
		const count = Object.keys(lexicon.lexicon).length;
		this.test.title = `There is ${count} words in the lexicon`;
		assert.equal(count>=100000,true);
	});
});

describe('Test lexicon object', function () {
	it('Get word object', function () {
		assert.equal(typeof lexicon.lexicon.show,"object");
	});
	it('Get word POS', function () {
		assert.equal(lexicon.lexicon.clicking.pos,"VBG");
	});
	it('Get word sentiment', function () {
		assert.equal(lexicon.lexicon.love.sentiment,3);
	});
	it('Get a word\'s sentiment that has been added after conjugation', function () {
		assert.equal(lexicon.lexicon.abashing.sentiment,-1);
	});
	it('Get a word\'s infinitive that has been added after conjugation', function () {
		assert.equal(lexicon.lexicon.animating.infinitive,"animate");
	});
	it('Test Emojis sentiment', function () {
		assert.equal(lexicon.lexicon["💑"].sentiment,1);
	});
});

describe('Extending', function () {
	const obj = {
		// this will be normalized to an object
		"EXTENDINGSAMPLE1":"NNP",
		// the sentiment will be kept
		"EXTENDINGSAMPLE2":{
			pos:"NNP",
			sentiment:5
		},
		// the sentiment will be calculated
		"EXTENDINGSAMPLE3":{
			pos:"NNP",
			keywords:["love","kiss","affection","amazing"]
		},
		// verb will be conjugated
		"resmoke":{
			pos:"VBP",
			sentiment:100
		}
	};
	// call extend function
	lexicon.extend(obj);
	// run tests (and cross fingers)
	it('Testing sample 1', function () {
		assert.equal(lexicon.lexicon.EXTENDINGSAMPLE1.pos,"NNP");
	});
	it('Testing sample 2', function () {
		assert.equal(lexicon.lexicon.EXTENDINGSAMPLE2.sentiment,5);
		assert.equal(lexicon.lexicon.EXTENDINGSAMPLE2.pos,"NNP");
	});
	it('Testing sample 3', function () {
		assert.equal(lexicon.lexicon.EXTENDINGSAMPLE3.sentiment!==0,true);
		assert.equal(lexicon.lexicon.EXTENDINGSAMPLE3.pos,"NNP");
	});
	it('Testing sample 4', function () {
		assert.equal(lexicon.lexicon.resmoking.sentiment,100);
		assert.equal(lexicon.lexicon.resmokes.pos,"VBZ");
	});
});