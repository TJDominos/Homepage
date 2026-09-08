const fs = require('fs');
let code = fs.readFileSync('src/frontend/index.tsx', 'utf8');

code = code.replace(
  '      {!isDesktop && (\n        <TabSwitch activePage={activeTab} setActivePage={setActiveTab as any} />\n      )}',
  '      {!isDesktop && activeTab !== "404" && (\n        <TabSwitch activePage={activeTab} setActivePage={setActiveTab as any} />\n      )}'
);

fs.writeFileSync('src/frontend/index.tsx', code);
