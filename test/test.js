const enpos = require("../lib/index.js");
const wsj = require("./wsj.json");

var tested = 0;
var correct = 0;
var wrong = 0;

wsj.forEach((sample)=>{
	enpos(sample.tokens).tags.forEach((answer,index)=>{
		tested = tested + 1;
		var expected = sample.tags[index];
		if(answer === expected) correct = correct + 1;
		else wrong = wrong + 1;
	});
});

console.log((correct/tested)*100);