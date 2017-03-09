/// <reference path="../../node_modules/@types/node/index.d.ts"/>
/// <reference path="../../node_modules/@types/mocha/index.d.ts"/>
const assert = require("assert");

import prefixes from "../../src/tagging/prefixes";

describe("prefixes",function(){
    it("corigid",function(){
        assert.equal(prefixes("corigid"),"JJ");
    });
    it("reinstall",function(){
        assert.equal(prefixes("reinstall"),"VB");
    });
    it("megaclick",function(){
        assert.equal(prefixes("megaclick"),"NN");
    });
});