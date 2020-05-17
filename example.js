const color = require("./color");

const args = process.argv.slice(2);

if(args.length > 1 ){
	switch(args[0]){
		case 'color':
			color
				.getDominant(args[1], args[2] || 1 )
				.then( response => console.log(`The color is `, response) );
		break;
		case 'palette':
			color
				.getPalette(args[1], args[2] || 1 )
				.then( response => console.log(`The palette is `, response) );
		break;
		default:
			console.log('You entered a wrong option');

	}
}else{
	console.log('You need to include a search term ');
}

