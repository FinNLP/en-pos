/// <reference path="../../node_modules/@types/node/index.d.ts"/>
/// <reference path="../../node_modules/@types/mocha/index.d.ts"/>
const assert = require("assert");

import contractions from "../../src/tagging/contractions";

describe("Contractions",function(){
    it("'re",function(){
        assert.equal(contractions("'re"),"VBP");
    });
    it("'m",function(){
        assert.equal(contractions("'m"),"VBP");
    });
    it("'ve",function(){
        assert.equal(contractions("'ve"),"VBP");
    });
    it("'ll",function(){
        assert.equal(contractions("'ll"),"MD");
    });
    it("'d",function(){
        assert.equal(contractions("'d"),"MD");
    });
    it("'RE",function(){
        assert.equal(contractions("'RE"),"VBP");
    });
    it("'M",function(){
        assert.equal(contractions("'M"),"VBP");
    });
    it("'VE",function(){
        assert.equal(contractions("'VE"),"VBP");
    });
    it("'LL",function(){
        assert.equal(contractions("'LL"),"MD");
    });
    it("'D",function(){
        assert.equal(contractions("'D"),"MD");
    });
});