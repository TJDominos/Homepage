const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

if (!content.includes('expandedWidget')) {
  content = content.replace(/const \[claimCode, setClaimCode\] = useState\(""\);/, 
    'const [claimCode, setClaimCode] = useState("");\n  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);');
}

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
