const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf-8');

  // Replace "No Passkey added." with "Add up to 3 passkeys."
  content = content.replace(
    'No Passkey added.',
    'Add up to 3 passkeys.'
  );

  // Remove the bottom text
  const bottomText1 = `                          <div className="text-[11px] text-slate-500 mt-1">
                            Add up to 3 passkeys.
                          </div>`;
  const bottomText2 = `                        <div className="text-[11px] text-slate-500 mt-1">
                          Add up to 3 passkeys.
                        </div>`;

  if (content.includes(bottomText1)) {
    content = content.replace(bottomText1, '');
  } else if (content.includes(bottomText2)) {
    content = content.replace(bottomText2, '');
  }

  fs.writeFileSync(file, content, 'utf-8');
}

fix('src/components/modals/ProfileSettingModal.tsx');
fix('src/components/modals/UserInfoEdit.tsx');
