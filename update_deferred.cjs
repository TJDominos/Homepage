const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf8');

code = code.replace(
  `                  Locked\n                </button>`,
  `                  Deferred\n                </button>`
);

code = code.replace(
  `<span className="whitespace-nowrap">Locked: 0.00 {asset}</span>`,
  `<span className="whitespace-nowrap">Deferred: 0.00 {asset}</span>`
);

code = code.replace(
  `*Locked tokens can be withdrawn subject to 30-day lockup +`,
  `*Deferred tokens can be withdrawn subject to 30-day lockup +`
);

code = code.replace(
  `Why withdrawal is locked?`,
  `Why withdrawal is Deferred?`
);

code = code.replace(
  `Bonus-to-token conversion is a conditional reward. Locked tokens are withheld in an on-chain escrow account and will be automatically distributed to the withdrawal address on schedule.`,
  `Bonus-to-token conversion is a conditional reward. These locked tokens are deferred and withheld in an on-chain escrow account and will be automatically distributed to the withdrawal address on schedule.`
);

fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', code);
console.log("Updated Locked to Deferred.");
