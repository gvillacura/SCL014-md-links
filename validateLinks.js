const fetch = require("node-fetch");
let status;

module.exports = (link) => {
  return new Promise((resolve, reject) => {
    fetch(link)
      .then((res) => {
        status = res.status;
        resolve(status);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};
