/// <reference path="../../node_modules/@types/node/index.d.ts"/>
/// <reference path="../../node_modules/@types/mocha/index.d.ts"/>
const assert = require("assert");


import repetitive from "../../src/tagging/repetitive";

describe("repetitive",function(){
    it("rigiiiid",function(){
        assert.equal(repetitive("rigiiiid"),"JJ");
    });
    it("instaaaaall",function(){
        assert.equal(repetitive("instaaaaall"),"VB");
    });
    it("slooowwww",function(){
        assert.equal(repetitive("slooowwww"),"JJ");
    });
});