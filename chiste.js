const fs = require('fs');
const path = require('path');

(async function() {

async function generarChiste() {
    console.log("llegó al generarChiste");
    fs.promises.readFile();
        try {
            const filePath = path.join(__dirname, 'chistes.txt');
            const data = await fs.promises.readFile(filePath, 'utf-8');
            
            var chistes = data.split("-");
            console.log(chistes[1]);
            console.log(data);
            
            return chistes[Math.floor(Math.random() * chistes.length)];

        } catch (error) {
          console.log("Read file error: " + error);
            return "error";  
        }
}   

module.exports.getChiste = function() {
    return generarChiste();
}

}());