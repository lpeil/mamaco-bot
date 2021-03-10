
const fs = require('fs');
const path = require('path');
const util = require('util');

async function getFileData(file) {
  const readFile = util.promisify(fs.readFile);
  const fileBuffer = await readFile(path.join(__dirname, `../data/${file}.json`), 'utf8');
  return JSON.parse(fileBuffer)
}

async function saveFileData(file, name) {
  fs.writeFile(
    path.join(__dirname, `../data/${name}.json`),
    JSON.stringify(file),
    err => {if (err) console.error(err)}
  )
}

module.exports = {
  get: getFileData,
  save: saveFileData
}