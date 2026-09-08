const fs = require('fs');
let code = fs.readFileSync('src/frontend/index.tsx', 'utf8');

code = code.replace(
  '  const activeTab = (validTabs.includes(path) ? path : "play") as\n    | "money"\n    | "play"\n    | "inbox"\n    | "payout"\n    | "rank";',
  '  const activeTab = (path === "" ? "play" : validTabs.includes(path) ? path : "404") as\n    | "money"\n    | "play"\n    | "inbox"\n    | "payout"\n    | "rank"\n    | "404";'
);

fs.writeFileSync('src/frontend/index.tsx', code);
