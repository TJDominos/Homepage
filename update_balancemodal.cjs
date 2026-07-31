const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/components/BalanceModal.tsx', 'utf-8');

content = content.replace(
  'interface BalanceModalProps {',
  'interface BalanceModalProps {\n  onConvertGcoin?: () => void;'
);

content = content.replace(
  /export const BalanceModal = \(\{ isOpen, onClose, isDesktop, prices \}: BalanceModalProps\) => \{/,
  'export const BalanceModal = ({ isOpen, onClose, isDesktop, prices, onConvertGcoin }: BalanceModalProps) => {'
);

content = content.replace(
  /<button className="text-\[10px\] sm:text-\[11px\] bg-\[#EAEAEA\] hover:bg-\[#D9D9D9\] text-black\/80 px-2 py-0.5 rounded-full transition-colors font-medium ml-1">/g,
  '<button onClick={() => onConvertGcoin?.()} className="text-[10px] sm:text-[11px] bg-[#EAEAEA] hover:bg-[#D9D9D9] text-black/80 px-2 py-0.5 rounded-full transition-colors font-medium ml-1 cursor-pointer">'
);

fs.writeFileSync('src/frontend/money/components/BalanceModal.tsx', content);
