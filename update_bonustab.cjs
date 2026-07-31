const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

content = content.replace(
  /const \[expandedWidget, setExpandedWidget\] = useState<string \| null>\(null\);/,
  `const [expandedWidget, setExpandedWidget] = useState<string | null>(expandWidget || null);
  
  useEffect(() => {
    if (expandWidget) {
      setExpandedWidget(expandWidget);
    }
  }, [expandWidget]);`
);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
