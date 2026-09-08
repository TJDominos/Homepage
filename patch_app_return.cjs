const fs = require('fs');
let code = fs.readFileSync('src/frontend/index.tsx', 'utf8');

code = code.replace(
  '  };\n\n  return (\n    <div',
  '  };\n\n  if (activeTab === "404") {\n    return <NotFoundPage />;\n  }\n\n  return (\n    <div'
);

fs.writeFileSync('src/frontend/index.tsx', code);
