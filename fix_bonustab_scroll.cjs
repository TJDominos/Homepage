const fs = require('fs');

let bt = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// Add id="widget-gcoin"
bt = bt.replace(
  /\{\/\* Convert Gcoin Widget \*\/\}\s*<div \s*className=\{`bg-\[\#f0f2f5\]/,
  '{/* Convert Gcoin Widget */}\n        <div id="widget-gcoin"\n          className={`bg-[#f0f2f5]'
);

// Add scroll logic
bt = bt.replace(
  /if \(expandWidget\?\.id\) \{\s*setExpandedWidget\(expandWidget\.id\);\s*\}/,
  `if (expandWidget?.id) {
      setExpandedWidget(expandWidget.id);
      setTimeout(() => {
        const el = document.getElementById(\`widget-\${expandWidget.id}\`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }`
);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', bt);
