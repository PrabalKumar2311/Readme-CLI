// lib/uiHelpers.js

const chalk = require("chalk");
const figlet = require("figlet");
const { promisify } = require("util");

const figletAsync = promisify(figlet.text);

// 🎨 Color system (clean + modern)
const primary = chalk.hex("#7C3AED"); // violet
const boldPrimary = primary.bold;
const success = chalk.greenBright.bold;
const error = chalk.redBright.bold;
const info = chalk.cyanBright;
const accent = chalk.hex("#22D3EE"); // neon cyan
const highlight = chalk.yellowBright;

// 📄 README / Document ASCII (replaces wizard)
const docAscii = chalk.hex("#7C3AED")(`
        ┌─────────────────────┐
        │  README.md          │
        │  ───────────────    │
        │  # Project Title    │
        │  ## Description     │
        │  ## Features        │
        │  ## Usage           │
        │                     │
        └─────────────────────┘
`);

// 🚀 Welcome screen
async function showWelcomeScreen() {
  const asciiArt = await figletAsync("README CLI", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
  });

  console.clear();

  // Title
  console.log(primary(asciiArt));

  // Icon
  console.log(docAscii);

  // Divider
  console.log(primary("━".repeat(80)));

  // Heading
  console.log(
    `${highlight("🚀 Welcome to")} ${boldPrimary("README CLI")} ${highlight(
      "Setup"
    )}`
  );

  // Description
  console.log(
    info(
      "\nGenerate clean, professional README files in seconds using AI.\n"
    )
  );

  // Setup steps
  console.log(`${accent("⚡ Quick Setup:")}\n`);

  console.log(
    ` 1️⃣ Get your API key from: ${chalk.underline(
      "https://makersuite.google.com/app/apikey"
    )}\n`
  );

  console.log(
    ` 2️⃣ Paste it below — we'll validate and store it securely in a ${chalk.cyan(
      ".env"
    )} file.\n`
  );

  console.log(
    ` 3️⃣ Run ${boldPrimary("readme")} inside any project to generate your README instantly.\n`
  );

  console.log(primary("━".repeat(80)));
}

// exports
module.exports = {
  showWelcomeScreen,
  colors: { primary, boldPrimary, success, error, info, accent, highlight },
  docAscii,
};