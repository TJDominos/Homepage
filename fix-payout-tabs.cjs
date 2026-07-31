const fs = require('fs');

// Fix in src/frontend/index.tsx
let indexTsx = fs.readFileSync('src/frontend/index.tsx', 'utf-8');
indexTsx = indexTsx.replace('{ id: "payout", label: "Payout" },', '{ id: "payout", label: "Rewards" },');
fs.writeFileSync('src/frontend/index.tsx', indexTsx, 'utf-8');

// Fix in src/components/layout/TabSwitch/index.tsx
let tabSwitchTsx = fs.readFileSync('src/components/layout/TabSwitch/index.tsx', 'utf-8');
tabSwitchTsx = tabSwitchTsx.replace('<div className="label">Payout</div>', '<div className="label">Rewards</div>');
fs.writeFileSync('src/components/layout/TabSwitch/index.tsx', tabSwitchTsx, 'utf-8');

// Fix in src/components/layout/BottomNav.tsx
let bottomNavTsx = fs.readFileSync('src/components/layout/BottomNav.tsx', 'utf-8');
bottomNavTsx = bottomNavTsx.replace(/label:\s*"Payout"/g, 'label: "Rewards"');
fs.writeFileSync('src/components/layout/BottomNav.tsx', bottomNavTsx, 'utf-8');

console.log('Fixed tab labels');
