const { copyFile, readdir, mkdir, rm } = require("fs/promises");
const { resolve } = require("path");

const copyDirectory = async (src, dest) => {
  await rm(dest, { force: true, recursive: true });
  await mkdir(dest);
  const allFiles = await readdir(src);
  for (const file of allFiles) {
    copyFile(resolve(src, file), resolve(dest, file));
  }
};

copyDirectory(
  resolve(__dirname, "Файли"),
  resolve(__dirname, "копированный файл")
);
