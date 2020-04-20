//IDEAS
//se podría sacar los id de los animes y guardarlos en un arreglo y así se ahorra el usa de una función y se consigue mejorar el tiempo de carga, y esa función pasaría a ser usada solamente cuando se agregue un nuevo anime, y se podrían hasta guardar en el local storage, pero de momento dejemolo en una lista

//variables

const api = new Api();
let misAnimesId = [];
let misAnimesObjetos = [];
let html = "";

//selectores
const boton = document.getElementById("cargar");
const listaAnime = document.getElementById("lista-anime");
//event listeners
eventListeners();

function eventListeners() {
	document.addEventListener("DOMContentLoaded", buscadorDeAnime);
	// boton.addEventListener("click", datosAnime);
}

//funciones
function buscadorDeAnime(e) {
	listaNombre.forEach(async function (anime) {
		//llamamos la funcion quenos devuelve el id del anime
		//funcion a crear
		const resultBusqueda = await api.conseguirId(anime);
		let animeId = resultBusqueda.results[0].mal_id;
		// misAnimesId.push(animeId);
		setTimeout(async () => {
			const objetoAnime = await api.infoAnime(animeId);
			// misAnimesObjetos.push(objetoAnime);
			html += `<li>${objetoAnime.title}</li>`;
			listaAnime.innerHTML = html;
		}, 2000);
	});
}

// function datosAnime() {
// 	let html = "";
// 	misAnimesObjetos.forEach((anime) => {
// 		html += `<li>${anime.title}</li>`;
// 	});
// 	listaAnime.innerHTML = html;
// }
