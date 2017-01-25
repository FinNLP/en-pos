# en-pos
A better English POS tagger written in JavaScript

### Installation and usage

Install via NPM:

```
npm i --save en-pos
```

**How to use**

```javascript

const enpos = require("en-pos");
var tags = enpos(["this","is","my","sentence"]).tags;
console.log(tags);
// ["DT","VBZ","PRP$","NN"]
```

> This project does **not** include a lexer, so you have to pass an array of tokens into it. I highly recommend [my own lexer](https://github.com/alexcorvi/lexed) which is **~99%** compliant with the Penn Treebank test.

### How good is it?

As of 25 Jan 2017, this library scored **95.543%** at the [Penn Treebank](http://www.cis.upenn.edu/~treebank/) test (less than a point away from being a [state of the art tagger](https://www.aclweb.org/aclwiki/index.php?title=POS_Tagging_(State_of_the_art))).

As for JavaScript, I think it's safe to say that this is the most accurate JavaScript POS tagger, since the only implementation I know of is [pos-js](https://github.com/neopunisher/pos-js) which when I tested on the same treebank, it scored **87.8%**, though it was faster than my implementation.

There are however, more accurate libraries, like [NLP4J](https://emorynlp.github.io/nlp4j/) (97% accuracy) or [standford's POS tagger](http://nlp.stanford.edu/software/tagger.shtml) (also 97% accuracy) but those are marginally slower than this library.

So I like to think that what I'm trying to build here is something in between inaccurate yet very fast libraries and an accurate yet marginally slower libraries.


## Credits
* This project is an optimization and (almost complete) re-writing of [Compendium](https://github.com/Ulflander/compendium-js)'s POS tagger.
* **Compendium**'s tagger itself was based on **[fasttag](https://github.com/mark-watson/fasttag_v2)**.
* **Fasttag** was based on [Eric Brill's POS tagger](https://en.wikipedia.org/wiki/Brill_tagger).