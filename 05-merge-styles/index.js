const fs = require("fs/promises");
const { join } = require("path");

const Output = join(__dirname, "project-dist", "bundle.css");
const Input = join(__dirname, "styles");

const getStylesFiles = async () => {
  return await (
    await fs.readdir(Input)
  ).filter((file) => file.endsWith(".css"));
};

const writeToBundle = async (files) => {
  console.log("связка");
  await fs.unlink(Output).catch((err) => {});
  for (const file of files) {
    const style = await fs.readFile(join(Input, file));
    await fs.appendFile(join(Output), `${style}\n`, { flag: "a" });
    console.log(">> ", file);
  }
  console.log("Готово");
};

getStylesFiles()
  .then((files) => writeToBundle(files))
  .catch((err) => console.log("Ошибка!!!", err));
