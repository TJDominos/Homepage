const fs = require('fs');
const path = require('path');

function walkSync(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walkSync(p, callback);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts') || p.endsWith('.scss') || p.endsWith('.css')) {
      callback(p);
    }
  }
}

walkSync('src/components', (file) => {
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;
  
  // They were in src/components/ and now they are in src/components/subdir/
  // So a path like "../api" becomes "../../api"
  
  content = content.replace(/(["'])\.\.\/api\//g, '$1../../api/');
  content = content.replace(/(["'])\.\.\/utils\//g, '$1../../utils/');
  content = content.replace(/(["'])\.\.\/hooks\//g, '$1../../hooks/');
  content = content.replace(/(["'])\.\.\/imports\//g, '$1../../imports/');
  content = content.replace(/(["'])\.\.\/frontend\//g, '$1../../frontend/');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
});
