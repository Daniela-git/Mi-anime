//IDEAS
//se podría sacar los id de los animes y guardarlos en un arreglo y así se ahorra el usa de una función y se consigue mejorar el tiempo de carga, y esa función pasaría a ser usada solamente cuando se agregue un nuevo anime, y se podrían hasta guardar en el local storage, pero de momento dejemolo en una lista

//variables
const boton = document.getElementById("cargar");
let misAnimes = [
	"91 DAYS",
	"ACCHI KOCCHI",
	"AKAGAMI NO SHIRAYUKI-HIME",
	"AMAGI BRILLANT PARK",
	"AMNESIA",
	"ANGEL BEATS",
	"ANOTHER",
	"ANOHANA",
];

let misAnimesId = [];

//event listeners
eventListeners();

function newFunction() {
	return [];
}

function eventListeners() {
	document.addEventListener("DOMContentLoaded", buscadorDeAnime);
	// boton.addEventListener("click", datosAnime);
}

//funciones

function buscadorDeAnime(e) {
	misAnimes.forEach((anime) => {
		const link = `https://api.jikan.moe/v3/search/anime?q=${anime}&limit=1`;
		conseguirId(link).then((anime) => {
            const animeId = anime.results[0].mal_id;
            const link = `https://api.jikan.moe/v3/anime/${animeId}`;
			infoAnime(link).then(function (anime) {
				console.log(anime);
			});
		});
	});
}
async function conseguirId(link) {
	//esperando la respuesta
	let respuesta = await fetch(link);

	//pasando la respuesta a json
	let datosAnime = await respuesta.json();
	return datosAnime;
	//usando los datos de la api
}
async function infoAnime(link) {
	let respuesta = await fetch(link);

	//pasando la respuesta a json
	let datosAnime = await respuesta.json();
	return datosAnime;
}
// console.log("----------------------");
