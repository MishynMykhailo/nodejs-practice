const fs = require("fs/promises");
const path = require("path");
console.log(__dirname);
console.log(__filename);
// fs.readFile
// fs.writeFile
// const dataPath = path.join(__dirname, "db", "films.json");
// const dataPath = path.join(__dirname, "films.json");
const dataPath = path.join(__dirname, "db", "films.json");
//   const dataPath = path.join(__dirname, "..", "db", "films.json");

async function readFile(dataPath) {
  try {
    const res = await fs.readFile(dataPath, "utf-8");
    console.log(res);
  } catch (error) {
    console.log(error.message);
  }
}
readFile(dataPath);
