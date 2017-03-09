/// <reference path="../../node_modules/@types/node/index.d.ts"/>
/// <reference path="../../node_modules/@types/mocha/index.d.ts"/>
const assert = require("assert");


import complex_words from "../../src/tagging/complex_words";

describe("Complex complex_words",function(){
    it("nine-thirty",function(){
        assert.equal(complex_words("nine-thirty"),"CD");
    });
    it("11-15s",function(){
        assert.equal(complex_words("11-15s"),"CD");
    });
    it("Alex-Mitchell",function(){
        assert.equal(complex_words("Alex-Mitchell"),"NNP");
    });
    it("computer-sees",function(){
        assert.equal(complex_words("computer-sees"),"NNS");
    });
    it("rock-duck",function(){
        assert.equal(complex_words("rock-duck"),"NN");
    });
    it("egg-walking",function(){
        assert.equal(complex_words("egg-walking"),"NN");
    });
    it("man-frozen",function(){
        assert.equal(complex_words("man-frozen"),"JJ");
    });
});