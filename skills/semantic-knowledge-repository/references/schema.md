# Knowledge JSON Schema

All knowledge files stored in `~/.agents/knowledges/` must follow this structure.

```json
{
  "facts": ["string"],
  "inferences": ["string"],
  "keywords": ["string"],
  "confidence_score": "integer (1-100)",
  "summary": "string",
  "metadata": {
    "source": "string (URL, file path, or task description)",
    "created_at": "ISO8601 string"
  }
}
```

## Field Definitions

- **facts**: Objective facts, data, and proper nouns. Hallucinations must be strictly excluded.
- **inferences**: Logical inferences or implicit assumptions derived from facts. Must be clearly distinguished from facts.
- **keywords**: Array of related concepts, synonyms, or abstracted tags to improve searchability.
- **confidence_score**: Integer representing the objectivity and reliability of the information (1-100).
- **summary**: A concise overview of the information.
- **metadata**: Contextual information about how and when this knowledge was captured.
