//IDEAS
//ya que se sabe como guardar la info en txt , buscar una vez y agregar a los animes con los nombres correcto al txt y tambien con el resto de la información faltante así podemos crear una tabla y filtrar

//variables

const api = new Api();
let misAnimesId = [];
let misAnimesObjetos = [];
let html = "";

//selectores
const boton = document.querySelector("#boton");
const listaAnime = document.getElementById("lista-anime");
const boton2 = document.querySelector("#boton2");
//event listeners
eventListeners();

function eventListeners() {
	boton2.addEventListener("click", searchId);
	// document.addEventListener("DOMContentLoaded", prueba);
	boton.addEventListener("click", searchPictures);
}

//funciones

async function readTxt() {
	const res = await fetch("public/anime.txt");
	let animes = await res.text();
	animes = JSON.parse(animes);

	return animes;
}

async function searchId(e) {
	e.preventDefault();
	const animesList = await readTxt();
	// }

	for (let i = 0; i < animesList.length; i++) {
		setDelay(animesList[i]);
		
	}

	function setDelay(anime){
		//llamamos la funcion quenos devuelve el id del anime
		//funcion a crear
		setTimeout(async () => {
			// const resultBusqueda = await api.conseguirId(anime.title);
			const link = `https://api.jikan.moe/v3/search/anime?q=${anime.title}&limit=1`;
			let respuesta = await fetch(link);
			//pasando la respuesta a json
			let datosAnime = await respuesta.json();
			let animeId = datosAnime.results[0].mal_id;
			misAnimesId.push(animeId);
			console.log(misAnimesId.length);
		}, 4000);

	};
}

function searchPictures(e) {
	e.preventDefault();

	for (let i = 0; i < misAnimesId.length; i++) {
		setDelay(misAnimesId[i]);
		
	}
	function setDelay(animeId) {
		setTimeout(async function () {
			const link = `https://api.jikan.moe/v3/anime/${animeId}/pictures`;
			let respuesta = await fetch(link);
			//pasando la respuesta a json
			let datosAnime = await respuesta.json();
			// const objetoAnime = await api.infoAnime(animeId);
			misAnimesObjetos.push(datosAnime);
		}, 8000);
	}
}

async function datosAnime() {
	// console.log(misAnimesObjetos.length)
	misAnimesObjetos.forEach(async (anime, index) => {
		setTimeout(async () => {
			try {
				let results = await api.listaImagenes(anime.mal_id);
				let imagenes = results.pictures;
				// console.log(imagenes);
				let padre = document.querySelector(`#anime${index}`);
				let img = document.createElement("img");
				img.setAttribute("src", `${imagenes[0].small}`);
				padre.appendChild(img);
			} catch (err) {
				console.log(err);
			}
		}, 4000);
		// console.log(li)
	});
}

async function sendData() {
	let anime = await api.infoAnime(1);
	let pack = fetch("/ejemplo", {
		//{"nombres":listaNombres, "visto":listaVisto, "orden":listaNumero, "object":anime}
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(pack),
	})
		.then((res) => res.json())
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
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
