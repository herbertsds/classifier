/**
 * 
 * Gerencia e exporta o serviço de manipulação de arquivos
 * 
 */

const fs = require('fs');
const readline = require('readline');

// Lê um txt
const readTxt = (path) => {
    
  const fileStream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  return rl

}

// Escreve em um arquivo JSON de forma assíncrona
const writeJson = async (toSave, path) => {
  const data = JSON.stringify(toSave);

  fs.writeFile(path, data, (err) => {
      if (err) {
          throw err;
      }
      console.log(`Salvo em: ${path}`);
  });
}

// Escreve em um arquivo JSON de forma síncrona
const writeJsonSync = async (toSave, path) => {
  const data = JSON.stringify(toSave);

  fs.writeFileSync(path, data)
  console.log(`Salvo em: ${path}`);
    
}

module.exports = {
  readTxt,
  writeJson,
  writeJsonSync
}