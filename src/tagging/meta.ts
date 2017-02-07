import {MetaObject as MetaObject} from "../index";

export default function(meta:MetaObject):string{
	if(!meta) return "";
	else if(meta.pos) return meta.pos;
	else if(meta.tag) return meta.tag;
	else if(meta.yearlyRange) return "CD";
	else if(meta.time) return "CD";
	else if(meta.ratio) return "CD";
	else if(meta.timeIndicator) return "NN";
	else if(meta.order) return "JJ";
	else if(meta.hyphenedOrder) return "CD";
	else if(meta.number) return "CD";
	else if(meta.abbrev) return "NNP";
	else if(meta.properNoun) return "NNP";
	else if(meta.acronym) return "NNP";
	else if(meta.meta) return "NNP";
	else return "";
};