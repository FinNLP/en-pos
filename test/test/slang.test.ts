/// <reference path="../../node_modules/@types/node/index.d.ts"/>
/// <reference path="../../node_modules/@types/mocha/index.d.ts"/>
const assert = require("assert");


import slang from "../../src/tagging/slang";

describe("slang",function(){
    it("yo",function(){
        assert.equal(slang("yo"),"PRP$");
    });
    it("gr8",function(){
        assert.equal(slang("gr8"),"JJ");
    });
    it("smh",function(){
        assert.equal(slang("smh"),"UH");
    });
});