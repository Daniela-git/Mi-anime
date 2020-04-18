//variables
const boton = document.getElementById('cargar')


//event listeners
eventListeners()

let eventListener = () =>{
    boton.addEventListener()
    console.log('clik')

}

fetch('https://api.jikan.moe/v3/search/anime?q=Cowboy Bebop&limit=1')
        .then(function(res) {
            return res.json();
        })
        .then(function(anime) {
            let info = anime.results[0]
            console.log(info.mal_id)
            // document.getElementById('resultado').innerHTML = anime;
        })

    console.log('----------------------')
    fetch('https://api.jikan.moe/v3/anime/1')
        .then(function(res) {
            return res.json();
        })
        .then(function(anime) {
            // let info = anime.results[0]
            console.log(anime)
            // document.getElementById('resultado').innerHTML = anime;
        })