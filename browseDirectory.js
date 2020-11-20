const fs = require("fs");

module.exports = (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};
