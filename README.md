# CLI-Readme

> 🚀 Auto-generated documentation

![status](https://img.shields.io/badge/status-active-brightgreen)
![docs](https://img.shields.io/badge/docs-generated-blue)

---

# AI-Powered README Generator ✨

Streamlining project documentation with intelligent, context-aware README generation.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/Status-In%20Development-blue?style=flat-square)](https://github.com/PrabalKumar2311/automated-readme-generator)

## Overview

This project provides an automated solution for generating comprehensive `README.md` files. It leverages advanced code analysis, Git repository insights, and AI capabilities to produce clean, structured, and informative documentation tailored to specific project contexts. The goal is to reduce manual documentation effort and ensure consistency across diverse projects, from simple scripts to complex multi-language systems.

## Architecture ⚙️

The system is designed with a clear separation of concerns, comprising several modules that handle distinct aspects of the README generation process:

-   **CLI Interface (`bin/index.js`):** Serves as the command-line entry point, managing user input, help displays, and orchestrating the main generation flow.
-   **Core Generation Logic (`lib/generateReadme.js`):** The central orchestrator, responsible for detecting project types, invoking code parsing, fetching Git data, constructing AI prompts, and interacting with the `GoogleGenerativeAI` service.
-   **Code Analysis Engine (`lib/codeParser.js`):** Utilizes language-specific parsers to extract meaningful insights from source code files, including variables, function calls, classes, and methods across multiple programming languages.
-   **Git Utility (`lib/gitUtils.js`):** Interfaces with local Git repositories to gather project metadata, such as repository URL, author information, and contributor statistics.
-   **Prompt Builder (`lib/promptBuilder.js`):** Dynamically constructs the prompt sent to the AI model by integrating project information, code insights, Git data, and user-defined instructions.
-   **UI Helpers (`lib/uiHelpers.js`):** Provides an enhanced command-line user experience with formatted output, welcome screens, and stylistic elements using `chalk` and `figlet`.

## Core Modules

-   **`lib/generateReadme.js`**:
    The primary module orchestrating the entire README generation process. It detects project characteristics, gathers all necessary data (code insights, Git info), builds the AI prompt, and manages the interaction with the `GoogleGenerativeAI` to produce the final README content. It also handles writing the output to the `README.md` file.

-   **`lib/codeParser.js`**:
    A robust code analysis engine capable of parsing multiple programming languages including JavaScript, Java, Python, HTML, CSS, Ruby, PHP, Go, and C#. It extracts structural and functional insights such as variable declarations, function/method calls, and class definitions, which are crucial for generating an accurate project overview.

-   **`lib/promptBuilder.js`**:
    Responsible for constructing the comprehensive prompt sent to the AI model. This module intelligently combines extracted Git information (repository, user, contributors), detailed code insights, detected project files, and any custom user input to guide the AI in generating highly relevant and structured README content.

-   **`lib/gitUtils.js`**:
    Facilitates integration with the local Git repository. It is used to extract critical repository details, identify the GitHub username from email addresses, and compute contributor counts based on commit history, enriching the README with project attribution.

-   **`bin/index.js`**:
    The command-line interface entry point. It parses command-line arguments, displays help messages, and initiates the README generation workflow by invoking the core logic.

-   **`runParserTests.js`**:
    A dedicated test script for verifying the functionality of `lib/codeParser.js`. It reads sample code files, processes them using `parseCode()`, and logs the extracted insights to ensure the parsing engine works as expected across different languages.

## Build & Run

To set up and run the AI-Powered README Generator, follow these steps:

1.  **Prerequisites**: Ensure you have Node.js (v14 or higher) installed on your system.
2.  **Clone the Repository**:
    ```bash
    git clone https://github.com/PrabalKumar2311/automated-readme-generator.git
    cd automated-readme-generator
    ```
    *(Note: Replace `automated-readme-generator` with the actual repository name if different)*

3.  **Install Dependencies**:
    ```bash
    npm install
    ```

4.  **Set up Google Generative AI API Key**:
    Create a `.env` file in the project root and add your Google Generative AI API key:
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

5.  **Run the Generator**:
    Execute the tool from the command line, optionally providing a custom prompt:
    ```bash
    node bin/index.js "Generate a README for a Node.js CLI tool that automates documentation."
    ```
    Or simply:
    ```bash
    node bin/index.js
    ```
    The tool will then analyze your project and generate a `README.md` in the current directory.

## Performance Notes

-   **AI Latency**: The generation process involves making API calls to `GoogleGenerativeAI`. Network latency and model processing time will be the primary factors influencing the overall execution speed.
-   **Code Parsing**: For projects with a very large number of files or extremely large individual files, the synchronous file system operations (`fs.readdirSync`, `fs.readFileSync`) and parsing logic in `lib/codeParser.js` might introduce noticeable delays. Optimizations for asynchronous processing or selective parsing could be considered for future enhancements.
-   **Git Operations**: `execSync` is used in `lib/gitUtils.js` for executing Git commands. While generally efficient for typical repository sizes, it's a blocking call that could impact performance in exceptionally large or complex Git histories.
-   **File Scanning (`globby`)**: `globby` is used for efficient file pattern matching, which helps in quickly identifying relevant files for analysis, minimizing I/O overhead for file discovery.