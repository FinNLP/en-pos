/// <reference path="../../node_modules/@types/node/index.d.ts"/>
/// <reference path="../../node_modules/@types/mocha/index.d.ts"/>
const assert = require("assert");

import lexicon from "../../src/tagging/lexicon";

describe("lexicon",function(){
    it("been",function(){
        assert.equal(lexicon("been"),"VBN");
    });
    it("gone",function(){
        assert.equal(lexicon("gone"),"VBN");
    });
    it("team",function(){
        assert.equal(lexicon("team"),"NN");
    });
    it("rigid",function(){
        assert.equal(lexicon("rigid"),"JJ");
    });
});