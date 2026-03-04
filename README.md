# Semantic Knowledge Repository (SKR)

A Gemini CLI skill that manages a structured knowledge base in `~/.agents/knowledges/` to ensure that investigation results, technical findings, and architectural patterns are saved and reusable across different sessions.

## Overview

This skill allows the agent to automatically extract, structure, and save significant information discovered during tasks (such as bug root causes, new codebase patterns, or research results) into a persistent JSON format. It also provides the ability to search this knowledge base in future sessions.

## Installation

Assuming you have [Gemini CLI](https://github.com/google/gemini-cli) installed, you can clone this repository and link it to your skills directory, or use it directly if supported by your setup.

```bash
git clone https://github.com/nqounet/semantic-knowledge-repository.git
# Move or link the `skills/semantic-knowledge-repository` folder to your `~/.agents/skills/` directory.
```

## Structure

The knowledge is saved as JSON files in `~/.agents/knowledges/`. The structure includes:

- **facts**: Objective data and proper nouns.
- **inferences**: Logical conclusions or implicit assumptions.
- **keywords**: Tags and synonyms for searchability.
- **confidence_score**: A score from 1-100 based on reliability.
- **summary**: A concise overview.

(See `skills/semantic-knowledge-repository/references/schema.md` for the full schema.)

## Workflows

### 1. Data Extraction & Structuring
When significant information is discovered, it is extracted into the JSON schema defined above.

### 2. Auto-Save
Knowledge is automatically saved when complex bugs are resolved, architectural patterns are found, or significant research is concluded.

### 3. Saving Knowledge
The skill uses the included script to persist data:
```bash
node skills/semantic-knowledge-repository/scripts/save_knowledge.cjs <filename> '<json_content>'
```

### 4. Searching Knowledge
When starting a new task, the repository can be searched for previous findings:
```bash
node skills/semantic-knowledge-repository/scripts/search_knowledge.cjs <query>
```

## License

MIT License
