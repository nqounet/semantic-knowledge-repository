#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const KNOWLEDGE_DIR = path.join(os.homedir(), '.agents', 'knowledges');

function saveKnowledge(filename, content) {
  if (!fs.existsSync(KNOWLEDGE_DIR)) {
    fs.mkdirSync(KNOWLEDGE_DIR, { recursive: true });
  }

  let filePath = path.join(KNOWLEDGE_DIR, filename);
  if (!filePath.endsWith('.json')) {
    filePath += '.json';
  }

  // Ensure unique filename if exists
  let counter = 1;
  let finalPath = filePath;
  while (fs.existsSync(finalPath)) {
    const ext = path.extname(filePath);
    const base = path.basename(filePath, ext);
    finalPath = path.join(KNOWLEDGE_DIR, `${base}-${counter}${ext}`);
    counter++;
  }

  try {
    const data = typeof content === 'string' ? JSON.parse(content) : content;
    fs.writeFileSync(finalPath, JSON.stringify(data, null, 2));
    console.log(`Success: Knowledge saved to ${finalPath}`);
  } catch (error) {
    console.error(`Error: Failed to save knowledge. ${error.message}`);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node save_knowledge.cjs <filename> <json_content>');
  process.exit(1);
}

const [filename, ...contentParts] = args;
saveKnowledge(filename, contentParts.join(' '));
