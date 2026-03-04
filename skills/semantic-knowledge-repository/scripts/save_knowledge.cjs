#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

function getKnowledgeDir() {
  return path.join(os.homedir(), '.agents', 'knowledges');
}

function saveKnowledge(filename, content) {
  const dir = getKnowledgeDir();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let filePath = path.join(dir, filename);
  if (!filePath.endsWith('.json')) {
    filePath += '.json';
  }

  // Ensure unique filename if exists
  let counter = 1;
  let finalPath = filePath;
  while (fs.existsSync(finalPath)) {
    const ext = path.extname(filePath);
    const base = path.basename(filePath, ext);
    finalPath = path.join(dir, `${base}-${counter}${ext}`);
    counter++;
  }

  try {
    const data = typeof content === 'string' ? JSON.parse(content) : content;
    fs.writeFileSync(finalPath, JSON.stringify(data, null, 2));
    console.log(`Success: Knowledge saved to ${finalPath}`);
    return finalPath;
  } catch (error) {
    throw new Error(`Failed to save knowledge. ${error.message}`, { cause: error });
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Usage: node save_knowledge.cjs <filename> <json_content>');
    process.exit(1);
  }

  const [filename, ...contentParts] = args;
  try {
    saveKnowledge(filename, contentParts.join(' '));
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { saveKnowledge, getKnowledgeDir };
