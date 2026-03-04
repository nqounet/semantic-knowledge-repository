---
name: semantic-knowledge-repository
description: Structures investigation results into a persistent knowledge base (facts, inferences, keywords). Use when a task yields significant findings, code analysis, or research results that should be saved for future reuse, or when searching for previously stored knowledge.
---

# Semantic Knowledge Repository (SKR)

This skill manages a structured knowledge base in `~/.agents/knowledges/` to ensure that investigation results are reusable across sessions.

## Workflows

### 1. Data Extraction & Structuring

When significant information is discovered (via `grep_search`, `web_fetch`, `codebase_investigator`, etc.), extract it into the following JSON format:

- **facts**: Objective data and proper nouns. No hallucinations.
- **inferences**: Logical conclusions or implicit assumptions (separate from facts).
- **keywords**: Tags and synonyms for searchability.
- **confidence_score**: 1-100 score based on reliability.
- **summary**: A concise overview.

See [references/schema.md](references/schema.md) for the full schema.

### 2. Auto-Save

**Automatically save** knowledge to SKR (without asking the user) when any of these conditions are met:
- A complex bug root cause is identified.
- A new architectural pattern is discovered in the codebase.
- Significant research results are obtained from the web.
- A sequence of difficult steps to achieve a goal is finalized.

**Procedure:**
1. Extract data into the JSON schema (see Workflow 1).
2. Run `scripts/save_knowledge.cjs` immediately to persist.
3. Notify the user **after** saving:
   "Saved to Semantic Knowledge Repository: `[filename].json`"

### 3. Saving Knowledge

Use `scripts/save_knowledge.cjs` to persist the data.

```bash
node scripts/save_knowledge.cjs <filename> '<json_content>'
```

### 4. Searching Knowledge

When starting a new task or if you suspect relevant information was previously gathered, search the repository first.

```bash
node scripts/search_knowledge.cjs <query>
```

If relevant files are found, read them using `read_file` from `~/.agents/knowledges/` to incorporate that context into the current task.

## Guidelines

- **Accuracy over Speed**: Ensure `facts` are verified. If unsure, lower the `confidence_score`.
- **Searchability**: Use broad and specific `keywords` (e.g., both "React" and "Component Lifecycle").
- **Concise Summaries**: The `summary` should be readable at a glance in search results.
- **File Naming**: Use kebab-case for filenames (e.g., `oauth2-flow-implementation.json`).
