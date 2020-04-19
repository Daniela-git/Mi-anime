//IDEAS
//se podría sacar los id de los animes y guardarlos en un arreglo y así se ahorra el usa de una función y se consigue mejorar el tiempo de carga, y esa función pasaría a ser usada solamente cuando se agregue un nuevo anime, y se podrían hasta guardar en el local storage, pero de momento dejemolo en una lista

//variables

const api = new Api();
let misAnimesId = [];
let misAnimesObjetos = [];

//selectores
const boton = document.getElementById("cargar");
const listaAnime = document.getElementById('lista-anime')
//event listeners
eventListeners();


function eventListeners() {
	document.addEventListener("DOMContentLoaded", buscadorDeAnime);
	boton.addEventListener("click", datosAnime);
}

//funciones

function buscadorDeAnime(e) {
	listaNombre.forEach((anime) => {
		//llamamos la funcion quenos devuelve el id del anime

		api.conseguirId(anime)
			.then((anime) => {
				const animeId = anime.results[0].mal_id;
				misAnimesId.push(animeId);

				//llamamos la funcion para obtener el resto de la informacion
				setTimeout(()=>{
					console.log('esperanding')
					api.infoAnime(animeId)
						.then(function (anime) {
							misAnimesObjetos.push(anime);
						})
						.catch((error) => {
							console.log("error desde infoAnime");
						});

				}),30000
			})
			.catch((error) => console.log("error conseguir id"));
	});
	console.log(misAnimesId);
}

function datosAnime() {
	let html = ''
	misAnimesObjetos.forEach(anime=>{
		html += `<li>${anime.title}</li>`
	})
	listaAnime.innerHTML= html


}
