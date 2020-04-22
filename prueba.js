const fs = require("fs");

async function read(){
    const data = await fs.readFileSync("./prueba.txt")
    const object = JSON.parse(data);
    console.log('readed')
    return object;
    // console.log(object)
}

async function write(newObject) {
    //agregamos el nuevo dato
    let objectList = await read()
	objectList.push(newObject);
	const textObject = JSON.stringify(objectList);
	fs.writeFile("./prueba.txt", textObject, (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log("El archivo fue creado");
		}
	});
}

write({"title":"bleach","watched":true,"images":"link","episodes":400,"genre":"action"})