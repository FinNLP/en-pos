/// <reference path="../../node_modules/@types/node/index.d.ts"/>
/// <reference path="../../node_modules/@types/mocha/index.d.ts"/>
const assert = require("assert");


import given_names from "../../src/tagging/given_names";

describe("given_names",function(){
    describe("sensitive case",function(){
        it("Alvina",function(){
            assert.equal(!!given_names("Alvina",true),true);
        });
        it("alvina",function(){
            assert.equal(!!given_names("alvina",true),false);
        });
    });
    describe("insensitive case",function(){
        it("alvina",function(){
            assert.equal(!!given_names("alvina",false),true);
        });
        it("alvina (with no second param)",function(){
            assert.equal(!!given_names("alvina"),true);
        });
    });
});