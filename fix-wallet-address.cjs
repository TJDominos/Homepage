const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf-8');

  const oldCond = `                      {userAccount &&
                      !userAccount.startsWith("email-") &&
                      !userAccount.startsWith("ii-") ? (`;

  const newCond = `                      {userAccount &&
                      !userAccount.startsWith("email-") &&
                      !userAccount.startsWith("passkey-") &&
                      !userAccount.startsWith("ii-") ? (`;
                      
  const oldCond2 = `                    {userAccount &&
                    !userAccount.startsWith("email-") &&
                    !userAccount.startsWith("ii-") ? (`;

  const newCond2 = `                    {userAccount &&
                    !userAccount.startsWith("email-") &&
                    !userAccount.startsWith("passkey-") &&
                    !userAccount.startsWith("ii-") ? (`;

  if (content.includes(oldCond)) {
    content = content.replace(oldCond, newCond);
    fs.writeFileSync(file, content, 'utf-8');
    console.log("Fixed " + file);
  } else if (content.includes(oldCond2)) {
    content = content.replace(oldCond2, newCond2);
    fs.writeFileSync(file, content, 'utf-8');
    console.log("Fixed " + file);
  } else {
    console.log("Could not find condition in " + file);
  }
}

fixFile('src/components/modals/ProfileSettingModal.tsx');
fixFile('src/components/modals/UserInfoEdit.tsx');
