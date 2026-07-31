const fs = require('fs');
let content = fs.readFileSync('src/frontend/MoneyPage.tsx', 'utf-8');

const regex = /<AnimatePresence>[\s\S]*?<\/AnimatePresence>/;
content = content.replace(regex, '<BalanceModal isOpen={activeModal === "balance"} onClose={closeModal} isDesktop={isDesktop} prices={prices} />');

if (!content.includes('import { BalanceModal }')) {
  content = content.replace(
    'import { BonusTab } from "./money/tabs/BonusTab";',
    'import { BonusTab } from "./money/tabs/BonusTab";\nimport { BalanceModal } from "./money/components/BalanceModal";'
  );
}

fs.writeFileSync('src/frontend/MoneyPage.tsx', content);
