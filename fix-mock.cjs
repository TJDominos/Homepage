const fs = require('fs');
let content = fs.readFileSync('src/api/payoutMock.ts', 'utf-8');

// Remove Lucky Nicky
content = content.replace(
  /,\s*{\s*gameId: "luckynicky"[\s\S]*?paidOutByCurrency:\s*\[[\s\S]*?\]\s*,\s*}/g,
  ''
);

// Remove Quick Quid
content = content.replace(
  /,\s*{\s*gameId: "quickquid"[\s\S]*?paidOutByCurrency:\s*\[[\s\S]*?\]\s*,\s*}/g,
  ''
);

// Also remove them from MY_STATS
content = content.replace(
  /\s*{\s*gameId: "luckynicky"[^}]*},?/g,
  ''
);

content = content.replace(
  /\s*{\s*gameId: "quickquid"[^}]*},?/g,
  ''
);

fs.writeFileSync('src/api/payoutMock.ts', content, 'utf-8');
