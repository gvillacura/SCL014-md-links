const fs = require("fs");
const path = require("path");
const readDir = require("./browseDirectory");
const validate = require("./validateLinks");

let result;
const re = /\[(.+)\]\(([^ ]+?)( "(.+)")?\)/;
let linksArray = [];

//const re = /^(https?|http):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)?/gi;
//const re = /^(https?|http):\/\/\[(.+)\]\(([^ ]+?)( "(.+)")?\)/;
//const keys =/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

module.exports = (ruta, option) => {
  const filePath = path.resolve(ruta);
  const docExtension = path.extname(filePath);
  const isDir = fs.lstatSync(filePath).isDirectory();
  return new Promise((resolve, reject) => {
    if (isDir) {
      readDir(filePath)
        .then((data) => {
          resolve(data);
        })
        .catch(console.error);
    } else if (docExtension === ".md") {
      fs.readFile(ruta, "utf-8", (err, data) => {
        if (err) {
          reject(err.message);
        }
        const lines = data.split("\n");
        const linksMap = lines.map((line) => {
          result = line.match(re);
          if (result !== null) {
            const infoToShow = {
              texto: result[1],
              link: result[2],
              ruta: filePath,
            };
            if (typeof option !== "undefined" && option.validate) {
              return validate(infoToShow.link)
                .then((links) => {
                  if (links > 400) {
                    status = "fail";
                  } else {
                    status = "OK";
                  }
                  const statusToShow = {
                    statusNumber: links,
                    status: status,
                  };
                  const infoAndStatus = Object.assign(infoToShow, statusToShow);
                  linksArray.push(infoAndStatus);
                })
                .catch(console.error);
            } else {
              linksArray.push(infoToShow);
            }
          }
        });

        Promise.all(linksMap).then(() => {
          resolve(linksArray);
        });
      });
    } else {
      reject(console.log('La extensión del archivo debe ser ".md"'));
    }
  });
};
