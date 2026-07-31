const fs = require('fs');

let content = fs.readFileSync('src/frontend/index.tsx', 'utf-8');
const originalContent = content;

// Replace "./components" with "../components"
content = content.replace(/(["'])\.\/components\//g, '$1../components/');

// Replace "./api" with "../api"
content = content.replace(/(["'])\.\/api\//g, '$1../api/');

// Replace "./utils" with "../utils"
content = content.replace(/(["'])\.\/utils\//g, '$1../utils/');

// Replace "./imports" with "../imports"
content = content.replace(/(["'])\.\/imports\//g, '$1../imports/');

// Replace "./ErrorBoundary" with "../ErrorBoundary"
content = content.replace(/(["'])\.\/ErrorBoundary(["'])/g, '$1../ErrorBoundary$2');

// Replace "./frontend/Page" with "./Page"
content = content.replace(/(["'])\.\/frontend\//g, '$1./');

if (content !== originalContent) {
  fs.writeFileSync('src/frontend/index.tsx', content, 'utf-8');
  console.log('Updated src/frontend/index.tsx');
}
