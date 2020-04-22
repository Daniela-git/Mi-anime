class Api {
	async conseguirId(anime) {
		const link = `https://api.jikan.moe/v3/search/anime?q=${anime}&limit=1`;

		//esperando la respuesta
		let respuesta = await fetch(link);

		//pasando la respuesta a json
		let datosAnime = await respuesta.json();

		return datosAnime;
	}
	async infoAnime(animeId) {
		const link = `https://api.jikan.moe/v3/anime/${animeId}`;
		let respuesta = await fetch(link);

		//pasando la respuesta a json
		let datosAnime = await respuesta.json();
		return datosAnime;
	}
	async listaImagenes(animeId) {
		const link = `https://api.jikan.moe/v3/anime/${animeId}/pictures`;
		let respuesta = await fetch(link);
		//pasando la respuesta a json
		let datosAnime = await respuesta.json();
		return datosAnime;
	}
}

module.exports = Api