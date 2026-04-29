const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const ora = require("ora");
const prompts = require("prompts");
const globby = require("globby");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const codeParser = require("./codeParser");
const gitUtils = require("./gitUtils");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const MODEL = "gemini-2.5-flash";

/* ------------------ PROJECT DETECTION ------------------ */

function detectProject(files) {
  if (files.some(f => f.endsWith(".cpp"))) return "system";
  if (files.some(f => f.endsWith(".py"))) return "backend";
  if (files.some(f => f.endsWith(".jsx") || f.endsWith(".tsx"))) return "frontend";
  if (files.some(f => f.includes("package.json"))) return "node";
  return "general";
}

function getStructure(type) {
  const map = {
    system: [
      "Overview",
      "Architecture",
      "Core Modules",
      "Build & Run",
      "Performance Notes"
    ],
    frontend: [
      "Overview",
      "UI Preview",
      "Features",
      "Tech Stack",
      "Setup",
      "Usage"
    ],
    backend: [
      "Overview",
      "Architecture",
      "API Design",
      "Database",
      "Setup",
      "Usage"
    ],
    node: [
      "Overview",
      "Features",
      "CLI Usage",
      "Options",
      "Installation"
    ],
    general: [
      "Overview",
      "Features",
      "Setup",
      "Usage"
    ]
  };

  return map[type] || map.general;
}

/* ------------------ PROMPT BUILDER ------------------ */

function buildPrompt({
  projectType,
  sections,
  gitInfo,
  contributors,
  insights,
  userInput
}) {
  return `
You are a senior engineer writing a CLEAN, MODERN README.md.

STYLE RULES:
- Clean formatting
- Minimal emojis (only in headers)
- Professional tone
- No unnecessary fluff
- DO NOT generate generic templates

PROJECT TYPE:
${projectType}

SECTIONS (STRICT — FOLLOW THIS ORDER):
${sections.map(s => `- ${s}`).join("\n")}

PROJECT INFO:
${JSON.stringify(gitInfo, null, 2)}

CONTRIBUTORS:
${contributors.join(", ") || "None"}

CODE INSIGHTS:
${insights.join("\n\n")}

USER CONTEXT:
${userInput || "None"}

OUTPUT RULES:
- Start with project title
- Add a short tagline
- Add simple badges (tech + status)
- Use proper markdown spacing
- Keep it concise but strong

Return ONLY markdown.
`;
}

/* ------------------ MAIN ------------------ */

async function generateReadme(userInput = "") {
  if (!process.env.GEMINI_API_KEY) {
    const res = await prompts({
      type: "text",
      name: "key",
      message: "🔑 Enter Gemini API Key:"
    });

    if (!res.key) process.exit(1);

    fs.writeFileSync(
      path.join(__dirname, "..", ".env"),
      `GEMINI_API_KEY=${res.key}`
    );

    dotenv.config();
  }

  const spinner = ora("🔍 Analyzing project...").start();

  try {
    const cwd = process.cwd();

    const [gitInfo, contributors, files] = await Promise.all([
      gitUtils.getGitInfo(),
      gitUtils.getContributorCounts(),
      globby([
        "**/*.{js,ts,jsx,tsx,py,cpp,h,java,go,rs}",
        "!node_modules"
      ])
    ]);

    const projectType = detectProject(files);
    const sections = getStructure(projectType);

    const insights = [];

    for (const file of files.slice(0, 25)) {
      const parsed = codeParser.parseCode(file);
      if (parsed?.length) {
        insights.push(`📄 ${file}\n${parsed.join("\n")}`);
      }
    }

    spinner.text = "🧠 Generating README...";

    const prompt = buildPrompt({
      projectType,
      sections,
      gitInfo,
      contributors,
      insights,
      userInput
    });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL });

    const result = await model.generateContent(prompt);
    let output = result.response.text();

    /* ---------- LIGHT VISUAL ENHANCEMENT ---------- */

    const header = `# ${path.basename(cwd)}

> 🚀 Auto-generated documentation

![status](https://img.shields.io/badge/status-active-brightgreen)
![docs](https://img.shields.io/badge/docs-generated-blue)

---

`;

    output = header + output;

    fs.writeFileSync(path.join(cwd, "README.md"), output);

    spinner.succeed("✅ README generated successfully!");
  } catch (err) {
    spinner.fail("❌ Failed to generate README");
    console.error(err.message);
  }
}

module.exports = generateReadme;