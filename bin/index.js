#!/usr/bin/env node
// Version 1
const generateReadme = require("../lib/generateReadme");
const chalk = require("chalk");

// Get command-line arguments after "make-readme"
const userInput = process.argv.slice(2).join(" ").trim();

const showHelp = () => {
  console.log(chalk.bold.cyanBright("\n🧙‍♂️  ReadMe-Wiz CLI - Help Menu\n"));

  console.log(chalk.bold("Usage:"));
  console.log(
    `  ${chalk.green(
      "make-readme"
    )}                   Generate README.md for the current project`
  );
  console.log(
    `  ${chalk.green(
      "make-readme --new"
    )}             Generate a fresh README from scratch`
  );
  console.log(
    `  ${chalk.green(
      'make-readme --new "prompt"'
    )}    Generatea a fresh README using a custom prompt`
  );
  console.log(
    `  ${chalk.green(
      'make-readme "prompt"'
    )}          Modify existing README with your custom prompt`
  );
  console.log(
    `  ${chalk.green("make-readme help")}              Show this help menu`
  );

  console.log(chalk.bold("\nExamples:"));
  console.log(`  ${chalk.gray("$")} ${chalk.blue("make-readme")}`);
  console.log(`  ${chalk.gray("$")} ${chalk.blue("make-readme --new")}`);
  console.log(
    `  ${chalk.gray("$")} ${chalk.blue(
      'make-readme --new "add an FAQ section"'
    )}`
  );
  console.log(
    `  ${chalk.gray("$")} ${chalk.blue(
      'make-readme "Add installation instructions for Docker"'
    )}`
  );
  console.log(`  ${chalk.gray("$")} ${chalk.blue("make-readme help")}`);

  console.log(chalk.bold("\nMore:"));
  console.log(
    `  ${chalk.magenta(
      "🔗 Repo:"
    )} https://github.com/PIYUSH1SAINI/ReadMe-wiz\n`
  );
};

if (userInput === "help" || userInput === "--help" || userInput === "-h") {
  showHelp();
} else {
  generateReadme(userInput);
}
