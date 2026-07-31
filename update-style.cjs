const fs = require('fs');

function update(file) {
  let content = fs.readFileSync(file, 'utf-8');

  // 1. Update Email message
  const emailOld = `<div className="text-[11px] text-slate-500 mt-1">
                        Email verification is recommended for account recovery.
                      </div>`;
  const emailOld2 = `<div className="text-[11px] text-slate-500 mt-1">
                      Email verification is recommended for account recovery.
                    </div>`;
  
  const emailNew = `<div className="text-[11px] text-red-500 mt-1">
                        Verification is required for account recovery.
                      </div>`;
  const emailNew2 = `<div className="text-[11px] text-red-500 mt-1">
                      Verification is required for account recovery.
                    </div>`;

  if (content.includes(emailOld)) {
    content = content.replace(emailOld, emailNew);
  } else if (content.includes(emailOld2)) {
    content = content.replace(emailOld2, emailNew2);
  }

  // 2. Update Passkeys message
  const passkeyOld = `<div className="text-[12px] text-slate-500 border border-black/10 rounded-xl p-3 bg-transparent">
                            Add up to 3 passkeys.
                          </div>`;
  const passkeyOld2 = `<div className="text-[12px] text-slate-500 border border-black/10 rounded-xl p-3 bg-transparent">
                          Add up to 3 passkeys.
                        </div>`;
  
  const passkeyNew = `<div className="text-[11px] text-slate-500 mt-1">
                            Add up to 3 passkeys.
                          </div>`;
  const passkeyNew2 = `<div className="text-[11px] text-slate-500 mt-1">
                          Add up to 3 passkeys.
                        </div>`;

  if (content.includes(passkeyOld)) {
    content = content.replace(passkeyOld, passkeyNew);
  } else if (content.includes(passkeyOld2)) {
    content = content.replace(passkeyOld2, passkeyNew2);
  }

  fs.writeFileSync(file, content, 'utf-8');
  console.log("Updated", file);
}

update('src/components/modals/ProfileSettingModal.tsx');
update('src/components/modals/UserInfoEdit.tsx');
