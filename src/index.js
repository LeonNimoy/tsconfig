const inquirer = require("inquirer");
const { writeFileSync } = require("fs");

const reactTsconfig = JSON.stringify(
  require("./config/tsconfig.react.json"),
  null,
  2
);
const nodeTsconfig = JSON.stringify(
  require("./config/tsconfig.node.json"),
  null,
  2
);

inquirer
  .prompt([
    {
      type: "list",
      message: "Pick the framework you are using:",
      name: "framework",
      choices: ["node", "react"],
    },
  ])
  .then(({ framework }) => {
    let tsconfigToWrite = "";

    if (framework === "react") {
      tsconfigToWrite = reactTsconfig;
    } else {
      tsconfigToWrite = nodeTsconfig;
    }

    const cwd = process.cwd();

    writeFileSync(`${cwd}/tsconfig.json`, tsconfigToWrite);
    console.log("tsconfig.json successfully created");
  });
