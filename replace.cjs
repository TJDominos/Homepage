const fs = require('fs');

let content = fs.readFileSync('src/components/MoneyPage.tsx', 'utf8');

const startRewards = content.indexOf('{activeMenu === "rewards" && (');
const endBonus = content.indexOf('        {activeMenu !== "rewards" &&', startRewards);

if (startRewards !== -1 && endBonus !== -1) {
    const newContent = content.substring(0, startRewards) + 
      `{activeMenu === "rewards" && (
          <RewardsTab
            isDesktop={isDesktop}
            userAccount={userAccount}
            onSignInClick={onSignInClick}
          />
        )}

        {activeMenu === "record" && (
          <RecordTab
            isDesktop={isDesktop}
            userAccount={userAccount}
          />
        )}

        {activeMenu === "bonus" && (
          <BonusTab isDesktop={isDesktop} />
        )}

` + content.substring(endBonus);
    
    fs.writeFileSync('src/components/MoneyPage.tsx', newContent);
    console.log("Replacement successful.");
} else {
    console.log("Indices not found.");
}
