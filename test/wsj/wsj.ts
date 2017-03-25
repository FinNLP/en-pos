/// <reference path="../../node_modules/@types/node/index.d.ts"/>

import {Tag} from "../../src/index";

const wsj = require("./wsj.json");
var tested = 0;
var correct = 0;
var wrong = 0;
var diagnosis:any[] = [];

console.log(" 	");
console.log("	---------------------------");
console.log("	Starting Penn Treebank test");

wsj.forEach((sample:any,index:number)=>{
	if(index%1000 === 0) console.log("	",index);
	if(index === wsj.length - 1) console.log("	",index);
	new Tag(sample.tokens).initial().smooth().tags.forEach((answer,index,tags)=>{
		tested = tested + 1;
		var expected = sample.tags[index];
		if(answer === expected) correct = correct + 1;
		else if(answer === "\"" && expected === "POS") correct = correct + 1; 	// this is because this POS tagger is intended to work with a special lexer
																				// called "lexed" which doesn't pass the "'" POS tokens as merely "'"
																				// it transforms and passes them as "'s"
		else {
			wrong = wrong + 1;
			diagnosis.push({
				sentence:sample.tokens.join(" "),
				word:sample.tokens[index],
				expected:expected,
				answer:answer,
				prevTags:tags.slice(0,index).join("//"),
				nextTags:tags.slice(index+1,100).join("//")
			});
		}
	});
});

const percent = Math.round((correct/tested)*100*1000)/1000;

console.log(`	Result: ${percent}%`);
console.log(`	Tested: ${tested}`);
console.log(`	Correct: ${correct}`);
console.log(`	Wrong: ${wrong}`);

if(percent < 96.3) {
	console.log("Lower than before!!");
	process.exit(1);
}

require("fs").writeFileSync("./diagnosis",JSON.stringify(diagnosis,null,2));