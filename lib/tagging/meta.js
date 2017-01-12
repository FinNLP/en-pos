module.exports = function(meta){
	if(!meta) return;
	if(meta.yearlyRange) return "CD";
	if(meta.time) return "CD";
	if(meta.ration) return "CD";
	if(meta.timeIndicator) return "NN";
	if(meta.order) return "JJ";
	if(meta.hyphenedOrder) return "CD";
	if(meta.number) return "CD";
	if(meta.abbrev) return "NNP";
	if(meta.properNoun) return "NNP";
	if(meta.acronym) return "NNP";
	if(meta.meta) return "NNP";
};