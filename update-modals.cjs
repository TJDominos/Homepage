const fs = require('fs');

const passkeysBlock = `
                    {/* Passkeys */}
                    <div>
                      <div className="flex items-center justify-between mb-1 pt-1">
                        <span className="text-[13px] font-medium text-black tracking-tight">Passkeys</span>
                        <button
                          type="button"
                          className="px-3 py-1 border border-black rounded-[20px] text-[12px] font-medium text-black hover:bg-black/5 active:bg-black/10 transition-all bg-transparent"
                        >
                          Add Passkey
                        </button>
                      </div>
                      {userAccount && userAccount.startsWith("passkey-") ? (
                        <div className="flex items-center justify-between bg-[#e8e9ef] text-slate-600 text-[13px] rounded-xl px-4 py-2 mb-1.5">
                          <span>Passkey 1</span>
                        </div>
                      ) : null}
                      <div className={userAccount && userAccount.startsWith("passkey-") ? "text-[11px] text-slate-500" : "text-[12px] text-slate-500 border border-black/10 rounded-xl p-3 bg-transparent"}>
                        Add up to 3 passkeys. Email required for account recovery
                      </div>
                    </div>
`;

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const searchStr = "                    </div>\n\n                    {/* Bio */}";
  
  if (!content.includes(searchStr)) {
     const searchStr2 = "                  </div>\n                  {/* Bio */}";
     if (content.includes(searchStr2)) {
       const replacement = "                  </div>\n" + passkeysBlock.replace(/                    /g, '                  ') + "\n                  {/* Bio */}";
       content = content.replace(searchStr2, replacement);
       fs.writeFileSync(filePath, content, 'utf-8');
       console.log("Updated " + filePath);
       return;
     } else {
       console.log("Could not find insertion point in " + filePath);
       return;
     }
  }

  const replacement = "                    </div>\n" + passkeysBlock + "\n                    {/* Bio */}";
  
  content = content.replace(searchStr, replacement);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log("Updated " + filePath);
}

updateFile('src/components/modals/ProfileSettingModal.tsx');
updateFile('src/components/modals/UserInfoEdit.tsx');

