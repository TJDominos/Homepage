const fs = require('fs');
let code = fs.readFileSync('src/frontend/index.tsx', 'utf8');

code = code.replace(
  '    if (activeTab === "404") {\n      return <NotFoundPage />;\n    }',
  ''
);

fs.writeFileSync('src/frontend/index.tsx', code);
