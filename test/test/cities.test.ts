/// <reference path="../../node_modules/@types/node/index.d.ts"/>
/// <reference path="../../node_modules/@types/mocha/index.d.ts"/>
const assert = require("assert");
import cities from "../../src/tagging/cities";
describe("Cities",function(){
    describe("Cities sensitive case",function(){
        it("Shelby",function(){
            assert.equal(!!cities("Shelby",true),true);
        });
        it("shelby",function(){
            assert.equal(!!cities("shelby",true),false);
        });
    });
    describe("Cities insensitive case",function(){
        it("shelby",function(){
            assert.equal(!!cities("shelby",false),true);
        });
        it("shelby (with no second param)",function(){
            assert.equal(!!cities("shelby"),true);
        });
    });
});