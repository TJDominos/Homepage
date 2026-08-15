const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/RewardsTab.tsx', 'utf8');

const idx = code.lastIndexOf('</>}');
if (idx !== -1) {
    code = code.substring(0, idx) + '</>\n  );\n}\n';
    fs.writeFileSync('src/frontend/money/tabs/RewardsTab.tsx', code);
    console.log("Replaced exactly!");
} else {
    console.log("Not found exactly");
}
