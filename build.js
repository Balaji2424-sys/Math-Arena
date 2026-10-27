const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const output = path.join(root, 'dist');
const arenaConfig = require('./lib/arena-data.js');
fs.mkdirSync(output, { recursive: true });
for (const file of ['index.html', 'style.css', 'script.js']) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}
const localPreview = `window.MATHFEST_LOCAL_DATA = ${JSON.stringify(arenaConfig)};\n`;
if (!process.env.VERCEL) fs.writeFileSync(path.join(root, 'local-preview-data.js'), localPreview, 'utf8');
console.log('Static arena files copied to dist/. Server-side scenario data is excluded from the public output.');
