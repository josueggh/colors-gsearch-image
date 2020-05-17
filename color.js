const fs = require('fs');
const request = require('request');
const scraper = require('images-scraper');
const mergeImg = require('merge-img');
const colorThief = require('colorthief');

const google = new scraper({ puppeteer: { headless: true }});
const collectionPath = `${__dirname}/collection`;

async function downloadImage(url){
	
	return new Promise( (resolve, reject)=>{
		request.head( url, function(error, res, body){
			if(error){
				reject(error)
			}
			let extension = res.headers['content-type'] === 'image/jpeg' ? 'jpg' : 'png';
			let file_name = `${collectionPath}/${new Date().getTime()}.${extension}`;
			request(url).pipe(fs.createWriteStream(file_name)).on('close', () =>{
				resolve(file_name);
			})
		})
	});
}


function searchAndAnalize(term, limit, onlycolor = true){
	return new Promise( async (resolve, reject)=>{
		const results = await google.scrape(term, limit);
	
		let images = await Promise.all( results.map( async result =>{
			return await downloadImage(result.url);
		}));

		let img = await mergeImg(images);
		const output = `${collectionPath}/result_${new Date().getTime()}.png`;
		
		img.write(`${output}`, async ()=>{
			if( onlycolor ){
				resolve( await colorThief.getColor(output) );
			}else{
				let palette = await colorThief.getPalette(output, 5); 
				resolve(palette);
			}

			
		});
	});
}

function getDominant(term, limit){
	return searchAndAnalize(term, limit, true);
}

function getPalette(term, limit){
	return searchAndAnalize(term, limit, false);
}

exports.getDominant = getDominant;
exports.getPalette = getPalette;
