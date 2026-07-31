const fs = require('fs');

const file = 'src/components/modals/WalletConnectModal.tsx';
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(
  '                {step === "SELECT_WALLET" ? "Connect Wallet" : "Sign In Status"}',
  '                {step === "SELECT_WALLET" ? "Sign in / Sign up" : "Sign In Status"}'
);

fs.writeFileSync(file, content, 'utf-8');
console.log("Updated title");
