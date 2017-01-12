# English Lexicon
Extensible English language lexicon for POS tagging and sentiment scoring with Emojis and around 105K words. 


## Installation

```
npm install en-lexicon --save
```


## Usage

```javascript
const lexicon = require("en-lexicon");

console.log(lexicon.lexicon.faraway);
// result:
{
	"pos": "JJ",
	"sentiment": 0
}

console.log(lexicon.lexicon["facilitating"]);
// result:
{
	"pos": "VBG",
	"sentiment": 0,
	"infinitive": "facilitate"
}

console.log(lexicon.lexicon.abashing);
// result:
{
	"pos": "VBG",
	"sentiment": -1,
	"infinitive": "abash"
}
```

## Extending

One of the main reason that I had to write my own lexicon module is that I needed it to be extensible. So rest assured that this lexicon is as extensible as it can get and it will apply the same conjugate rules to whatever you pass to it.

To extend the lexion with medical terms for example:

```javascript

const lexicon = require("en-lexicon");

var myOwnTerms = {
	lactate:{
		pos:"VB",
	},
	eukaryote:{
		pos:"NN"
	},
	erythrolysing:{
		pos:"VBG",
		sentiment:3
	}
}

lexicon.extend(myOwnTerms);
```

Now that you've extended the lexicon with your own terms, you won't only get the terms you entered. The lexicon will (try) to be smart and apply some inflections on those terms.

For example:

```javascript
const lexicon = require("en-lexicon");

// the term you entered
console.log(lexicon.lexicon.lactate.pos);
// "VB"
console.log(lexicon.lexicon.lactated.pos);
// "VBD"
console.log(lexicon.lexicon.lactating.pos);
// "VBG"

// same will apply on "erythrolysing"
console.log(lexicon.lexicon.erythrolyse.pos);
// "VBP"
console.log(lexicon.lexicon.erythrolysed.pos);
// "VBD"

// the conjugated terms should also have
// the sentiment you passed for the original term
console.log(lexicon.lexicon.erythrolysed.sentiment);
// 3
```

If you're not sure about the sentiment, then pass an array of synonyms and the lexicon will calculate it for you

```javascript

const lexicon = require("en-lexicon");
lexicon.extend({
	carcinoma:{
		pos:"NN",
		synonyms:["cancer","disease","malignancy","tumor"]
	}
});

console.log(lexicon.lexicon.carcinoma.sentiment);
// -2

```


## License

License: The MIT License (MIT) - Copyright (c) 2017 Alex Corvi