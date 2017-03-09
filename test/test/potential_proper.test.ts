/// <reference path="../../node_modules/@types/node/index.d.ts"/>
/// <reference path="../../node_modules/@types/mocha/index.d.ts"/>
const assert = require("assert");

import potential_proper from "../../src/tagging/potential_proper";

describe("potential_proper",function(){
    it("O'Donnel",function(){
        assert.equal(potential_proper("O'Donnel"),"NNP");
    });
    it("Giriy",function(){
        assert.equal(potential_proper("Giriy"),"NNP");
    });
    it("Giries",function(){
        assert.equal(potential_proper("Giries"),"NNPS");
    });
});