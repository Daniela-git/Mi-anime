class ApiAnime {
	constructor(link) {
		this.link = link;
	}

	async conseguirId(link) {
		const respuesta = await fetch(link);

		//pasando la respuesta a json
		const datosAnime = await respuesta.json();
		return datosAnime;
    }
    
    async infoAnime(link) {
        const respuesta = await fetch(link);
        const datosAnime = await respuesta.json();
		return datosAnime;

}
