const fs = require('fs');

// MoneyPage.tsx
let mp = fs.readFileSync('src/frontend/MoneyPage.tsx', 'utf-8');
mp = mp.replace(
  /const \[targetBonusWidget, setTargetBonusWidget\] = useState<string \| null>\(null\);/,
  'const [targetBonusWidget, setTargetBonusWidget] = useState<{id: string, ts: number} | null>(null);'
);
mp = mp.replace(
  /setTargetBonusWidget\("gcoin"\);/,
  'setTargetBonusWidget({ id: "gcoin", ts: Date.now() });'
);
fs.writeFileSync('src/frontend/MoneyPage.tsx', mp);

// BonusTab.tsx
let bt = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');
bt = bt.replace(
  /expandWidget\?: string \| null;/,
  'expandWidget?: {id: string, ts: number} | null;'
);
bt = bt.replace(
  /const \[expandedWidget, setExpandedWidget\] = useState<string \| null>\(expandWidget \|\| null\);/,
  'const [expandedWidget, setExpandedWidget] = useState<string | null>(expandWidget?.id || null);'
);
bt = bt.replace(
  /if \(expandWidget\) \{\n\s*setExpandedWidget\(expandWidget\);\n\s*\}/,
  'if (expandWidget?.id) {\n      setExpandedWidget(expandWidget.id);\n    }'
);
fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', bt);
