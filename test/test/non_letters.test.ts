/// <reference path="../../node_modules/@types/node/index.d.ts"/>
/// <reference path="../../node_modules/@types/mocha/index.d.ts"/>
const assert = require("assert");

import non_letters from "../../src/tagging/non_letters";

describe("non_letters",function(){
    it("...",function(){
        assert.equal(non_letters("..."),":");
    });
    it("…",function(){
        assert.equal(non_letters("…"),":");
    });
    it("?",function(){
        assert.equal(non_letters("?"),".");
    });
    it("!",function(){
        assert.equal(non_letters("!"),".");
    });
    it(".",function(){
        assert.equal(non_letters("."),".");
    });
    it(":",function(){
        assert.equal(non_letters(":"),":");
    });
    it(";",function(){
        assert.equal(non_letters(";"),":");
    });
    it("-",function(){
        assert.equal(non_letters("-"),":");
    });
    it("--",function(){
        assert.equal(non_letters("--"),":");
    });
    it(",",function(){
        assert.equal(non_letters(","),",");
    });
    it("，",function(){
        assert.equal(non_letters("，"),",");
    });
    it("%",function(){
        assert.equal(non_letters("%"),"SYM");
    });
    it("+",function(){
        assert.equal(non_letters("+"),"SYM");
    });
    it("@",function(){
        assert.equal(non_letters("@"),"SYM");
    });
    it("(",function(){
        assert.equal(non_letters("("),"(");
    });
    it("【",function(){
        assert.equal(non_letters("【"),"(");
    });
    it("】",function(){
        assert.equal(non_letters("】"),")");
    });
    it("33.33",function(){
        assert.equal(non_letters("33.33"),"CD");
    });
    it("333,350,215.125",function(){
        assert.equal(non_letters("333,350,215.125"),"CD");
    });
});