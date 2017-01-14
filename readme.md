# en-pos
A more accurate implementation of Brill POS tagger.

### How good is it?
As of 14 Jan 2017, this library scored **95.518%** at the [Penn Treebank](http://www.cis.upenn.edu/~treebank/) test (less than a point away from being a [state of the art tagger](https://www.aclweb.org/aclwiki/index.php?title=POS_Tagging_(State_of_the_art))).

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


### Road Map

**TODO:**

* Add more documentation
* Improve the post and pre taggers

This project is still in early development but seems to be very promising.



## Credits
* This project is an optimized and (almost completely) re-writing of [Compendium](https://github.com/Ulflander/compendium-js)'s POS tagger which I wasn't able to use as a standalone unless I download the whole **Compendium** library.
* **Compendium**'s tagger itself was based on **[fasttag](https://github.com/mark-watson/fasttag_v2)**.
* **Fasttag** was based on [Eric Brill's POS tagger](https://en.wikipedia.org/wiki/Brill_tagger).

## License

The MIT License (MIT)

Copyright (c) 2017 Alex Corvi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.