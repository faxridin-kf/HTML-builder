const { createWriteStream } = require("fs");
const { createInterface } = require("readline");
const { join } = require("path");

const File = "2.txt";

const ws = createWriteStream(join(__dirname, File)).on("error", (err) =>
  console.log(err)
);
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
}).on("err", (err) => console.log(err));

rl.question("Введите текст ('exit' для закрите):\n", (str) => {
  ws.write(str);
});
rl.on("line", (str) => {
  if (str === "exit") rl.close();
  ws.write(`${str}\n`);
});
rl.on("close", () => console.log("Пока"));
