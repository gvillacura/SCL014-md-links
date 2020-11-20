module.exports = (linksArray) => {
  return new Promise((resolve, reject) => {
    numberLinks = linksArray.length;
    uniqueLinks = orderArray(linksArray);
    brokenLinks = countBrokenLinks(linksArray);
    const statsLinks = {
      Total: numberLinks,
      Unique: uniqueLinks,
      Broken: brokenLinks,
    };
    resolve(statsLinks);
  });
};

const orderArray = (linkStatus) => {
  const orderLinks = linkStatus.sort();
  let repeat = 0;
  let uniqueLinks = 0;
  for (let i = 0; i < orderLinks.length; i++) {
    repeat = 0;
    for (let j = 0; j < orderLinks.length; j++) {
      if (orderLinks[i].link !== orderLinks[j].link) {
        continue;
      } else {
        repeat += 1;
      }
    }
    if (repeat === 1) {
      uniqueLinks += 1;
    }
  }

  return uniqueLinks;
};

const countBrokenLinks = (linkStatus) => {
  const orderLinks = linkStatus.sort();
  let brokenLinks = 0;
  for (let i = 0; i < orderLinks.length; i++) {
    if (orderLinks[i].status === "fail") {
      brokenLinks += 1;
    }
  }
  return brokenLinks;
};
