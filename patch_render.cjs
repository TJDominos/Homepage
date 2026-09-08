const fs = require('fs');
let code = fs.readFileSync('src/frontend/index.tsx', 'utf8');

code = code.replace(
  '    if (activeTab === "payout") {\n      return <PayoutPage userAccount={userAccount} />;\n    }',
  '    if (activeTab === "payout") {\n      return <PayoutPage userAccount={userAccount} />;\n    }\n    if (activeTab === "404") {\n      return <NotFoundPage />;\n    }'
);

fs.writeFileSync('src/frontend/index.tsx', code);
