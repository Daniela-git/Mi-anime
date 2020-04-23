//dependencies
const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");

//modulos
const documents = require("./src/document.js");

//variables
const app = express() //servidor

//varibles del servidor
app.set('appName', 'Daniela app');
app.set('port', 3000);
app.set('view engine','pug')
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', async (req,res) =>{
    const objeto = documents.read()
    // console.log(objeto)
    let animeList = []
    objeto.forEach(anime => {
        animeList.push(anime.title)
    });
    // res.sendFile(path.join(__dirname+'/index.html')); // en esta parte se le pasan los datos en data con el nombre people a la vista
    res.render('index', {list: animeList})
})


// app.post('/ejemplo',(req,res)=>{
//     // let animeObject = {"id":"",
// })

//para que lea los archivos de javascript
app.get('/js/index.js', async (req,res) =>{
    res.sendFile(path.join(__dirname+'/js/index.js')); 
})
app.get('/js/api.js', async (req,res) =>{
    res.sendFile(path.join(__dirname+'/js/api.js')); 
})
app.get('/js/ui.js', async (req,res) =>{
    res.sendFile(path.join(__dirname+'/js/ui.js')); 
})
app.get('/css/style.css', async (req,res) =>{
    res.sendFile(path.join(__dirname+'/css/style.css')); 
})
app.get('/public/anime.txt', async (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/anime.txt')); 
})


//Para que el servidor empiece a escuchar en el puerto 3000
app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log('Server on port',app.get('port'))
});

console.log("i'm working")