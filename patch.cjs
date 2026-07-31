const fs = require('fs');
let content = fs.readFileSync('src/frontend/MoneyPage.tsx', 'utf-8');
content = content.replace(
  '  const [activeMenu, setActiveMenu] = useState<\n    "rewards" | "bonus" | "deposit" | "withdraw" | "record"\n  >("rewards");',
  '  const [activeMenu, setActiveMenu] = useState<\n    "rewards" | "bonus" | "deposit" | "withdraw" | "record"\n  >("rewards");\n  const [isRefreshingGcoin, setIsRefreshingGcoin] = useState(false);\n  const [isRefreshingWlt, setIsRefreshingWlt] = useState(false);'
);
fs.writeFileSync('src/frontend/MoneyPage.tsx', content);
