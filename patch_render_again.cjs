const fs = require('fs');
let code = fs.readFileSync('src/frontend/index.tsx', 'utf8');

// Remove the top-level 404 override
code = code.replace(
  '  if (activeTab === "404") {\n    return <NotFoundPage />;\n  }\n\n  return (\n    <div',
  '  return (\n    <div'
);

// Add 404 into renderActiveTabContent
code = code.replace(
  '    // Play tab',
  '    if (activeTab === "404") {\n      return <NotFoundPage />;\n    }\n\n    // Play tab'
);

fs.writeFileSync('src/frontend/index.tsx', code);
