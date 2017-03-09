/// <reference path="../../node_modules/@types/node/index.d.ts"/>
/// <reference path="../../node_modules/@types/mocha/index.d.ts"/>
const assert = require("assert");


import suffixes from "../../src/tagging/suffixes";

describe("suffixes",function(){
    it("lengthiest",function(){
        assert.equal(suffixes("lengthiest"),"JJS");
    });
    it("brate",function(){
        assert.equal(suffixes("brate"),"VB");
    });
    it("slangifies",function(){
        assert.equal(suffixes("slangifies"),"VBZ");
    });
    it("gullible",function(){
        assert.equal(suffixes("gullible"),"JJ");
    });
    it("clearly",function(){
        assert.equal(suffixes("clearly"),"RB");
    });
    it("blastic",function(){
        assert.equal(suffixes("blastic"),"JJ");
    });
    it("flattenship",function(){
        assert.equal(suffixes("flattenship"),"NN");
    });
});