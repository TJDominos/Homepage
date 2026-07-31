const fs = require('fs');

const file = 'src/components/modals/WalletConnectModal.tsx';
let content = fs.readFileSync(file, 'utf-8');

const targetStr = `    if (
      wallet.id === "metamask" &&
      typeof (window as any).ethereum !== "undefined"
    ) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts && accounts.length > 0) {
          setStep("SUCCESS");
          setTimeout(() => {
            onClose(accounts[0]);
          }, 1500);
          return;
        }
      } catch (error: any) {
        console.warn("MetaMask connection error, falling back to mock:", error);
        // Fall through to mock connection
      }
    }

    setTimeout(() => {
      setStep("PENDING");
      setTimeout(() => {
        setStep("SUCCESS");
        setTimeout(() => {
          const generatedId = \`0x\${wallet.id}-\${Math.random().toString(36).substring(2, 10)}\`;
          onClose(generatedId);
        }, 1500);
      }, 3000);
    }, 2000);`;

const replaceStr = `    if (wallet.id === "metamask") {
      if (typeof (window as any).ethereum !== "undefined") {
        try {
          const accounts = await (window as any).ethereum.request({
            method: "eth_requestAccounts",
          });
          if (accounts && accounts.length > 0) {
            setStep("SUCCESS");
            setTimeout(() => {
              onClose(accounts[0]);
            }, 1500);
            return;
          }
        } catch (error: any) {
          console.error("MetaMask connection error:", error);
          setErrorMessage(error?.message || "Failed to connect to MetaMask");
          setStep("ERROR");
          return;
        }
      } else {
        setErrorMessage("MetaMask is not installed. Please install it to continue.");
        setStep("ERROR");
        return;
      }
    }

    setTimeout(() => {
      setStep("PENDING");
      setTimeout(() => {
        setStep("SUCCESS");
        setTimeout(() => {
          const generatedId = \`0x\${wallet.id}-\${Math.random().toString(36).substring(2, 10)}\`;
          onClose(generatedId);
        }, 1500);
      }, 3000);
    }, 2000);`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replaceStr);
  fs.writeFileSync(file, content, 'utf-8');
  console.log("Updated", file);
} else {
  console.log("Could not find target string.");
}
