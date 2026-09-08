const fs = require('fs');
let code = fs.readFileSync('src/frontend/index.tsx', 'utf8');

code = code.replace(
  'import { NotFoundPage } from "./NotFoundPage";',
  'import { NotFoundPage } from "./NotFoundPage";\nimport { InboxPage } from "./InboxPage";'
);

code = code.replace(
  '    if (activeTab === "inbox") {\n      return (\n        <div className="text-center py-3 flex-1">\n          <h2 className="text-sm font-bold text-black mb-4">Inbox Page</h2>\n          <p className="text-black/65">Coming soon...</p>\n        </div>\n      );\n    }',
  '    if (activeTab === "inbox") {\n      return <InboxPage />;\n    }'
);

fs.writeFileSync('src/frontend/index.tsx', code);
