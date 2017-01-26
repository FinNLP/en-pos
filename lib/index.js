const tagging = require("./tagging/index.js");
const smoothing = require("./smoothing/index.js");
module.exports = function(tokens,meta,noSmoothing){
	var result = tagging(tokens,meta);
	if(!noSmoothing) result = smoothing(result,tokens);
	return result.reduce((obj,tag,index,arr)=>{
		obj.confidenceTotal = obj.confidenceTotal + tag.confidence;
		obj.confidence = Math.round((obj.confidenceTotal / arr.length)*100);
		obj.tags.push(tag.pos);
		return obj;
	},{
		confidenceTotal:0,
		tags:[]
	});
};