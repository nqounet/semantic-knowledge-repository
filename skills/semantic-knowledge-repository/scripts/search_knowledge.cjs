#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const KNOWLEDGE_DIR = path.join(os.homedir(), '.agents', 'knowledges');

function searchKnowledge(query) {
  if (!fs.existsSync(KNOWLEDGE_DIR)) {
    console.log('No knowledge repository found.');
    return;
  }

  const files = fs.readdirSync(KNOWLEDGE_DIR).filter(f => f.endsWith('.json'));
  const results = [];

  for (const file of files) {
    const filePath = path.join(KNOWLEDGE_DIR, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    const searchText = [
      content.summary,
      ...(content.keywords || []),
      ...(content.facts || []),
      file
    ].join(' ').toLowerCase();

    if (searchText.includes(query.toLowerCase())) {
      results.push({
        file: file,
        summary: content.summary,
        confidence: content.confidence_score
      });
    }
  }

  if (results.length === 0) {
    console.log(`No results found for "${query}".`);
  } else {
    console.log(`Found ${results.length} result(s):`);
    results.forEach(r => {
      console.log(`- [${r.file}] (Confidence: ${r.confidence}): ${r.summary}`);
    });
  }
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node search_knowledge.cjs <query>');
  process.exit(1);
}

searchKnowledge(args.join(' '));
