const findLinks = require("./mdLinks");
const statsLinks = require("./statsLinks");

const path = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];

if (
  typeof path !== "undefined" &&
  typeof option1 !== "undefined" &&
  typeof option1 !== "undefined"
) {
  if (
    (option1 === "--validate" && typeof option2 === "undefined") ||
    (typeof option1 === "undefined" && option2 === "--validate")
  ) {
    findLinks(path, { validate: true })
      .then((links) => {
        console.log(links);
      })
      .catch(console.error);
  } else if (
    (typeof option1 === "undefined" && option2 === "--stats") ||
    (option1 === "--stats" && typeof option2 === "undefined")
  ) {
    findLinks(path, { validate: true })
      .then((links) => {
        statsLinks(links)
          .then((statsLinks) => {
            console.log(
              "Total =",
              statsLinks.Total,
              "Unique =",
              statsLinks.Unique
            );
          })
          .catch(console.error);
      })
      .catch(console.error);
  } else if (
    (option1 === "--validate" && option2 === "--stats") ||
    (option1 === "--stats" && option2 === "--validate")
  ) {
    findLinks(path, { validate: true })
      .then((links) => {
        statsLinks(links)
          .then((statsLinks) => {
            console.log(
              "Total =",
              statsLinks.Total,
              "Unique =",
              statsLinks.Unique,
              "Broken =",
              statsLinks.Broken
            );
          })
          .catch(console.error);
      })
      .catch(console.error);
  } else {
    findLinks(path)
      .then((links, data) => {
        console.log(links, data);
      })
      .catch(console.error);
  }
}
