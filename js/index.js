//IDEAS
//ya que se sabe como guardar la info en txt , buscar una vez y agregar a los animes con los nombres correcto al txt y tambien con el resto de la información faltante así podemos crear una tabla y filtrar

//modulos
import * as animeApi from "/js/api.js";

//fate/zero 10087
//tokyo ghoul 27899

//variables

const api = new animeApi.Api();
let setAnimes = new Set();
let setNombres = [];
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
	// boton2.addEventListener("click", searchId);
	// document.addEventListener("DOMContentLoaded", prueba);
	// boton.addEventListener("click", searchPictures);
	boton.addEventListener("click", setImages);
}

//funciones

//leer los datos guardados en el txt de anime
async function readTxt() {
	const res = await fetch("public/anime.txt");
	let animes = await res.text();
	animes = JSON.parse(animes);

	return animes;
}

//en caso de que se necesite usar la api con un for
async function forSearchId(e) {
	e.preventDefault();
	const animesList = await readTxt();
	// }
	let time = 0;
	for (let i = 0; i < animesList.length; i++) {
		time += 300;
		setDelay(animesList[i], time);
	}

	function setDelay(anime, time) {
		//llamamos la funcion quenos devuelve el id del anime
		//funcion a crear
		setTimeout(async () => {
			// const resultBusqueda = await api.conseguirId(anime.title);
			const link = `https://api.jikan.moe/v3/search/anime?q=${anime.title}&limit=1`;
			let respuesta = await fetch(link);
			//pasando la respuesta a json
			let datosAnime = await respuesta.json();
			let animeId = datosAnime.results[0].mal_id;
			//comprobando que el id no este ya en la lista
			let filter = misAnimesId.some((anime) => anime === animeId);
			if (filter) {
				setAnimes.add(animeId);
			}
			setNombres.push(datosAnime.results[0].title);
			misAnimesId.push(animeId);
			misAnimesObjetos.push(datosAnime);
			console.log(misAnimesId.length);
		}, time);
	}
}

//para buscar un solo anime por id
async function searchId(anime) {
	//se llama a la funcion de la api y retorn un objeto
	const datosAnime = await api.conseguirId(anime.title);
	let animeId = datosAnime.results[0].mal_id;
	console.log(animeId);
}

function getLocalStorageId() {
	let local;
	// Revisamos los valoes de local storage
	if (localStorage.getItem("animes") === null) {
		local = [];
	} else {
		local = JSON.parse(localStorage.getItem("animes"));
	}
	return local;
}

async function setImages() {
	// console.log(misAnimesObjetos.length)
	let animes = await getLocalStorageId();
	animes.forEach(async (anime, index) => {
		try {
			let urlImage = anime.results[0].image_url;
			// console.log(imagenes);
			let padre = document.querySelector(`#anime${index}`);
			let img = document.createElement("img");
			img.setAttribute("src", `${urlImage}`);
			padre.appendChild(img);
		} catch (err) {
			console.log(err);
		}
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
