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

// disable smoothing:
// 10 times faster but slightly less accurate (see below)
var tags = enpos(["this","is","my","sentence"],null,true).tags;

```

> This project does **not** include a lexer, so you have to pass an array of tokens into it. I highly recommend [my own lexer](https://github.com/alexcorvi/lexed) which is **~99%** compliant with the Penn Treebank test.

### Accuracy and performance

#### TL:DR;

- When smoothing is enabled: **96.28%** accuracy (processing 132K tokens in 38 seconds)
- When smoothing is disabled: **94.38%** accuracy (processing 132K tokens in 3 seconds)

As of 25 Jan 2017, this library scored **96.28%** at the [Penn Treebank](http://www.cis.upenn.edu/~treebank/) test (0.3% away from being a [state of the art tagger](https://www.aclweb.org/aclwiki/index.php?title=POS_Tagging_(State_of_the_art))).

Being written in JavaScript, I think it's safe to say that this is the most accurate JavaScript POS tagger, since the only JS library I know of is [pos-js](https://github.com/neopunisher/pos-js) which when I tested on the same treebank scored **87.8%**, though it was faster than my implementation when smoothing is enabled.

However, if performance is what's you're after rather than accuracy, then you have the option to disable smoothing in this library and this will marginally increase performance making this library even faster than pos-js but with far better accuracy (**94.38%**).

## Credits
* This project is an optimization and (almost complete) re-writing of [Compendium](https://github.com/Ulflander/compendium-js)'s POS tagger.
* **Compendium**'s tagger itself was based on **[fasttag](https://github.com/mark-watson/fasttag_v2)**.
* **Fasttag** is based on [Eric Brill's POS tagger](https://en.wikipedia.org/wiki/Brill_tagger).