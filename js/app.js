//IDEAS
//se podría sacar los id de los animes y guardarlos en un arreglo y así se ahorra el usa de una función y se consigue mejorar el tiempo de carga, y esa función pasaría a ser usada solamente cuando se agregue un nuevo anime, y se podrían hasta guardar en el local storage, pero de momento dejemolo en una lista

//variables
const api = new Api();

const boton = document.getElementById("cargar");
let misAnimes = [
	"91 DAYS",
	"ACCHI KOCCHI",
	"AKAGAMI NO SHIRAYUKI-HIME",
	"AMAGI BRILLANT PARK",
	"AMNESIA",
	"ANGEL BEATS",
	"ANOTHER",
	"naruto",
];
let misAnimesId = []
let misAnimesObjetos = [];

//event listeners
eventListeners();

function newFunction() {
	return [];
}

function eventListeners() {
	document.addEventListener("DOMContentLoaded", buscadorDeAnime);
	boton.addEventListener("click", datosAnime);
}

//funciones

function buscadorDeAnime(e) {
	misAnimes.forEach((anime) => {
        //llamamos la funcion quenos devuelve el id del anime
        api.conseguirId(anime)
            .then((anime) => {
            const animeId = anime.results[0].mal_id;
            misAnimesId.push(animeId);

            //llamamos la funcion para obtener el resto de la informacion
            api.infoAnime(animeId)
                .then(function (anime) {
                    misAnimesObjetos.push(anime);
                    // console.log(anime)
			    });
		});
    });
    
}

function datosAnime() {
    api.episodios(misAnimesId[6])
    .then(listaEpisodios=>{
        console.log(listaEpisodios)
    })


}
