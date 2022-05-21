const fs = require("fs/promises");
const { join } = require("path");

const Folder = join(__dirname, "secret-folder");

fs.readdir(Folder, { withFileTypes: true })
  .then((dir) => {
    dir.forEach((obj) => {
      if (!obj.isDirectory()) {
        fs.stat(join(Folder, obj.name))
          .then((file) => {
            const [name, ext] = [...obj.name.split(".")];
            const size = (file.size / 1024).toFixed(3);
            console.log(`${name} - ${ext} - ${size}kb`);
          })
          .catch((err) => console.log(err));
      }
    });
  })
  .catch((err) => console.log(err));
