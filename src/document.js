const fs = require("fs");

const funciones = {}

function read(){
    const data = fs.readFileSync("./public/anime.txt")
    const lista = JSON.parse(data);
    // console.log('lista')
    return lista;
    // console.log(object)
}

function write(newObject) {
    //agregamos el nuevo dato
    let objectList = read()
	objectList.push(newObject);
	const textObject = JSON.stringify(objectList);
	fs.writeFileSync("./public/prueba.txt", textObject);

}
funciones.read = read
funciones.write = write

module.exports = funciones
// write({"title":"bleach","watched":true,"images":"link","episodes":400,"genre":"action"})