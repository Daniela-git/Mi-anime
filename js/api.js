class Api{
    async conseguirId(anime) {
        
        const link = `https://api.jikan.moe/v3/search/anime?q=${anime}&limit=1`;
        //esperando la respuesta
        let respuesta = await fetch(link);
    
        //pasando la respuesta a json
        let datosAnime = await respuesta.json();
        console.log('id')
        return datosAnime;
        //usando los datos de la api
    }
    async infoAnime(animeId) {
        const link = `https://api.jikan.moe/v3/anime/${animeId}`;
        let respuesta = await fetch(link);
        
        //pasando la respuesta a json
        let datosAnime = await respuesta.json();
        console.log('info')
        return datosAnime;
    }
    async listaEpisodios(animeId){
        const link = `https://api.jikan.moe/v3/anime/${animeId}/episodes`;
        let respuesta = await fetch(link);
        //pasando la respuesta a json
        let datosAnime = await respuesta.json();
        return datosAnime;
    }


}
