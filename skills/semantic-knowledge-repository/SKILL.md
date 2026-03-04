---
name: semantic-knowledge-repository
description: Structures investigation results into a persistent knowledge base (facts, inferences, keywords). Use when a task yields significant findings, code analysis, or research results that should be saved for future reuse, or when searching for previously stored knowledge.
---

# Semantic Knowledge Repository (SKR)

You are equipped with the Semantic Knowledge Repository (SKR) skill. Your objective is to proactively manage and query a structured knowledge base located at `~/.agents/knowledges/` to ensure investigation results, architectural decisions, and bug resolutions are reusable across sessions.

## Core Directives

1.  **Proactive Saving**: You MUST automatically extract and save knowledge without asking the user when you identify:
    *   A complex bug root cause.
    *   A newly discovered architectural pattern or convention in the codebase.
    *   Significant, non-trivial research results from the web or documentation.
    *   A sequence of difficult steps required to achieve a specific goal.
2.  **Proactive Searching**: When starting a new task, especially one involving unfamiliar codebase areas or complex requirements, you SHOULD search the repository first to see if relevant knowledge already exists.

## Usage Instructions

### 1. Saving Knowledge

When you decide to save knowledge, you must format it into a specific JSON structure.

**Required JSON Structure:**
*   `facts` (Array of Strings): Objective data, paths, and proper nouns. No hallucinations.
*   `inferences` (Array of Strings): Logical conclusions or implicit assumptions (separate from facts).
*   `keywords` (Array of Strings): Tags and synonyms for searchability (use broad and specific terms).
*   `confidence_score` (Integer): 1-100 score based on how reliable the information is.
*   `summary` (String): A concise overview, easily readable at a glance.

*(See `references/schema.md` for the full schema details if needed)*

**Execution:**
Execute the following command using `run_shell_command`. Use kebab-case for the `<filename>` (e.g., `oauth2-flow.json`).

```bash
node <path_to_skill_directory>/scripts/save_knowledge.cjs <filename> '<json_content>'
```
*Note: Replace `<path_to_skill_directory>` with the actual absolute path to where this skill is located.*

**Post-Action:**
Notify the user **after** successfully saving the file: "Saved to Semantic Knowledge Repository: `[filename].json`"

### 2. Searching Knowledge

To find previously stored knowledge, execute the search script. Provide a clear, concise query (e.g., a specific framework name, bug type, or architectural concept).

**Execution:**
```bash
node <path_to_skill_directory>/scripts/search_knowledge.cjs <query>
```

**Post-Action:**
If the search returns relevant filenames, use the `read_file` tool to read those specific JSON files from `~/.agents/knowledges/` to incorporate their context into your current task.

## Best Practices

*   **Accuracy over Speed**: Ensure `facts` are empirically verified. If you are unsure about an inference, lower the `confidence_score`.
*   **Escape Quotes**: When passing `<json_content>` to the bash command, ensure single quotes within the JSON are properly escaped or use an appropriate shell quoting strategy to prevent syntax errors.
