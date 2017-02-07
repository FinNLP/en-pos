export default function (token:string):string {
	return token.split(/\W/).map((x)=>x.charAt(0).toUpperCase()+x.substr(1).toLowerCase()).join("-");
};