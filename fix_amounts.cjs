const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf8');

// 1. Remove clear amount from setTimeouts
code = code.replace(
`    setTimeout(() => {
      setTopUpStatus("success");
      setTopUpAmount("");
    }, 1500);`,
`    setTimeout(() => {
      setTopUpStatus("success");
    }, 1500);`
);

code = code.replace(
`    setTimeout(() => {
      setGcoinStatus("success");
      setGcoinAmount("");
    }, 1500);`,
`    setTimeout(() => {
      setGcoinStatus("success");
    }, 1500);`
);

code = code.replace(
`    setTimeout(() => {
      setSwapStatus("success");
      setSwapAmount("");
    }, 1500);`,
`    setTimeout(() => {
      setSwapStatus("success");
    }, 1500);`
);

// 2. Add clear amount to the OK button onClick handlers
code = code.replace(
  `onClick={() => setTopUpStatus("idle")}`,
  `onClick={() => { setTopUpStatus("idle"); setTopUpAmount(""); }}`
);

code = code.replace(
  `onClick={() => setSwapStatus("idle")}`,
  `onClick={() => { setSwapStatus("idle"); setSwapAmount(""); }}`
);

code = code.replace(
  `onClick={() => setGcoinStatus("idle")}`,
  `onClick={() => { setGcoinStatus("idle"); setGcoinAmount(""); }}`
);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', code);
console.log("Amounts fixed!");
