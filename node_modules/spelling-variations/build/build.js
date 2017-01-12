const path = require("path");
const fs = require("fs");
const rollup = require('rollup');
const srcPath = path.join(process.cwd(),"src","index.js");
const distDir = path.join(process.cwd(),"dist") + "/";
const uglifyjs = require("uglify-js");
const buble = require('rollup-plugin-buble');


console.log("Transforming...");

rollup.rollup({
	entry: srcPath,
	plugins:[
		buble(),
	]
})

.then((bundle) => {

	console.log("Generating UMD bundle...");
	
	const UMD = bundle.generate({
		format:"umd",
		moduleName:"spellingVariations"
	});
	console.log("Writing file: full version...");
	fs.writeFileSync(distDir+"spelling-variations.js",UMD.code);
	console.log("Minifying...");
	const minified = uglifyjs.minify(UMD.code,{fromString:true}).code;
	console.log("Writing file: compressed version...");
	fs.writeFileSync(distDir+"spelling-variations.min.js",minified);
	console.log("Done, hope your tests will work!");
})

.catch((err)=>{
	console.log(err);
	process.exit(1);
});
