#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

function getKnowledgeDir() {
  return path.join(os.homedir(), '.agents', 'knowledges');
}

function searchKnowledge(query) {
  const dir = getKnowledgeDir();
  if (!fs.existsSync(dir)) {
    console.log('No knowledge repository found.');
    return [];
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const results = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      const searchText = [
        content.summary || '',
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
    } catch {
      // Ignore files that aren't valid JSON
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
  
  return results;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node search_knowledge.cjs <query>');
    process.exit(1);
  }

  searchKnowledge(args.join(' '));
}

module.exports = { searchKnowledge, getKnowledgeDir };
