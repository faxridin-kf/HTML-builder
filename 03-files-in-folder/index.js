const fs = require("fs");
const path = require("path");

const originDir = path.join(__dirname, "files");
const copyedDir = path.join(__dirname, "files-copy");

fs.rm(copyedDir, { recursive: true, force: true }, (err) => {
  if (err) return console.log(err);

  fs.mkdir(copyedDir, (err) => {
    if (err) return console.log(err);

    console.log("Чел ты крутяк");
    copyFiles(originDir, copyedDir);
  });
});

function copyFiles(dir, dist) {
  fs.readdir(dir, { withFileTypes: true }, (err, items) => {
    if (err) return console.log('оппс', err);

    fs.mkdir(dist, { recursive: true }, function (err) {
      if (err) return console.log(err);
    });
    items.forEach((item) => {
      if (item.isDirectory()) {
        const nextDir = path.join(dir, item.name);
        const nextDist = path.join(dist, item.name);
        copyFiles(nextDir, nextDist);
      } else {
        fs.copyFile(
          path.join(dir, item.name),
          path.join(dist, item.name),
          (err) => {
            if (err) return console.log(err);
          }
        );
      }
    });
  });
}
