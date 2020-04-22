//IDEAS
//se podría sacar los id de los animes y guardarlos en un arreglo y así se ahorra el usa de una función y se consigue mejorar el tiempo de carga, y esa función pasaría a ser usada solamente cuando se agregue un nuevo anime, y se podrían hasta guardar en el local storage, pero de momento dejemolo en una lista

//variables
const Api = require('./api.js')

const api = new Api();
let misAnimesId = [];
let misAnimesObjetos = [];
let html = "";

//selectores
const boton = document.querySelector(".boton");
const listaAnime = document.getElementById("lista-anime");
//event listeners
eventListeners();

function eventListeners() {
	document.addEventListener("DOMContentLoaded", buscadorDeAnime);
	// document.addEventListener("DOMContentLoaded", prueba);
	boton.addEventListener("click", datosAnime);
}

//funciones
function buscadorDeAnime(e) {
	listaNombre.forEach(async function (anime) {
		//llamamos la funcion quenos devuelve el id del anime
		//funcion a crear

		setTimeout(async () => {
			const resultBusqueda = await api.conseguirId(anime);
			let animeId = resultBusqueda.results[0].mal_id;

			// misAnimesId.push(animeId);
			const objetoAnime = await api.infoAnime(animeId);
			misAnimesObjetos.push(objetoAnime);
			html += `<div class='elemento-anime' id='anime${misAnimesObjetos.length-1}'><li>${objetoAnime.title}</li></div>`;
			listaAnime.innerHTML = html;
		}, 500);
	});
}

async function datosAnime() {
	// console.log(misAnimesObjetos.length)
	misAnimesObjetos.forEach(async (anime, index) => {
		setTimeout(async () => {
			try{
				let results = await api.listaImagenes(anime.mal_id);
				let imagenes = results.pictures;
				// console.log(imagenes);
				let padre = document.querySelector(`#anime${index}`);
				let img = document.createElement("img");
				img.setAttribute("src", `${imagenes[0].small}`);
				padre.appendChild(img);

			}catch(err){
				console.log(err)
			}
		}, 4000);
		// console.log(li)
	});
}

// async function prueba() {
// 	console.time("time");
// 	setTimeout(async () => {
// 		const resultBusqueda = await api.conseguirId(listaAnime[12]);
		
// 		const animeId = resultBusqueda.results[0].mal_id
		
// 		const objetoAnime = await api.infoAnime(animeId);
// 		// misAnimesObjetos.push(objetoAnime);
// 		html += `<div class='elemento-anime ${objetoAnime.title}'><li>${objetoAnime.title}</li></div>`;
// 		listaAnime.innerHTML = html;
// 		console.timeEnd("time");
// 	}, 2000);
// }
