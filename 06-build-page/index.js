const fs = require("fs");
const path = require("path");

// создаем папку project-dist
const pathDest = path.join(__dirname, "project-dist");
//источник стилей
const pathStyleSrc = path.join(__dirname, "styles");

const assetsSrc = path.join(__dirname, "assets");
const assetsDest = path.join(__dirname, "project-dist", "assets");

(async () => {
  await fs.promises.mkdir(pathDest, { recursive: true });

  const outputHtml = fs.createWriteStream(path.join(pathDest, "index.html"));

  const template = await fs.promises.readFile(
    path.join(__dirname, "template.html"),
    "utf8"
  );
  let templateContent = template.toString();

  let tagNames = [];
  tagNames = templateContent.match(/\{\{[a-z.]+\}\}/g);
  arrTagNames = Array.from(tagNames).map((item) => item.slice(2, -2));
  console.log(arrTagNames);
  for (const tag of arrTagNames) {
    const promiseFileData = await fs.promises.readFile(
      path.join(__dirname, "components", `${tag}.html`),
      "utf-8"
    );
    const fileData = promiseFileData.toString();
    const regexp = new RegExp(`\{\{${tag}\}\}`);
    templateContent = templateContent.replace(regexp, fileData);
  }
  outputHtml.write(templateContent);

  const files = await fs.promises.readdir(path.join(pathStyleSrc));
  const styleOutput = fs.createWriteStream(
    path.join(__dirname, "project-dist", "style.css")
  );

  for (const file of files) {
    const stats = await fs.promises.stat(path.join(pathStyleSrc, file));
    if (stats.isFile() && path.extname(file) === ".css") {
      const promiseFileData = await fs.promises.readFile(
        path.join(pathStyleSrc, file),
        "utf-8"
      );
      const fileData = promiseFileData.toString();
      styleOutput.write(fileData);
    }
  }

  async function copyFolder(src, dest) {
    await fs.promises.mkdir(dest, { recursive: true });
    const files = await fs.promises.readdir(src);

    const filesDest = await fs.promises.readdir(dest);
    for (const file of filesDest) {
      const stats = await fs.promises.stat(path.join(src, file));
      if (stats.isDirectory()) {
        await fs.promises.rmdir(dest);
      } else {
        await fs.promises.unlink(path.join(dest, file));
      }
    }
    for (const file of files) {
      const stats = await fs.promises.stat(path.join(src, file));
      if (stats.isDirectory()) {
        copyFolder(path.join(src, file), path.join(dest, file));
      } else {
        await fs.promises.copyFile(path.join(src, file), path.join(dest, file));
      }
    }
  }

  try {
    await copyFolder(assetsSrc, assetsDest);
  } catch (err) {}
})();
