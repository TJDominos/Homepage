const fs = require('fs');

let content = fs.readFileSync('src/components/modals/ProfileSettingModal.tsx', 'utf-8');

// Target 1: <div className="text-[12px] text-black/65 tracking-tight mt-0.5">
content = content.replace(
  '<div className="text-[12px] text-black/65 tracking-tight mt-0.5">',
  '<div className="text-[12px] text-black/65 tracking-tight mt-0.5" style={{ marginBottom: \'-2px\', marginRight: \'0px\' }}>'
);

// Target 2: Randseed Privacy Policy link
content = content.replace(
  /className="text-\[12px\] mb-1 text-\[\#7E57C2\] underline underline-offset-2 hover:opacity-80 block tracking-tight text-center transition-opacity"/g,
  'className="text-[12px] text-[#7E57C2] underline underline-offset-2 hover:opacity-80 block tracking-tight text-center transition-opacity" style={{ marginBottom: \'4px\' }}'
);

fs.writeFileSync('src/components/modals/ProfileSettingModal.tsx', content);
