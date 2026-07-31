const fs = require('fs');

function replacePasskeyBlock(file) {
  let content = fs.readFileSync(file, 'utf-8');

  const oldBlock1 = `                    {/* Passkeys */}
                    <div>
                      <div className="flex items-center justify-between mb-1 pt-1">
                        <span className="text-[13px] font-medium text-black tracking-tight">Passkeys</span>
                        <button
                          type="button"
                          className="text-[#7E57C2] font-medium text-[13px] hover:underline"
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
                    </div>`;

  const oldBlock2 = `                  {/* Passkeys */}
                  <div>
                    <div className="flex items-center justify-between mb-1 pt-1">
                      <span className="text-[13px] font-medium text-black tracking-tight">Passkeys</span>
                      <button
                        type="button"
                        className="text-[#7E57C2] font-medium text-[13px] hover:underline"
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
                  </div>`;

  const newBlock = `
                      <div className="flex items-center justify-between mb-1 pt-1">
                        <span className="text-[13px] font-medium text-black tracking-tight">Passkeys</span>
                      </div>
                      {userAccount && userAccount.startsWith("passkey-") ? (
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between bg-[#e8e9ef] text-slate-600 text-[13px] rounded-xl px-4 py-2">
                            <span>Passkey 1</span>
                          </div>
                          <div className="flex items-center justify-between w-full bg-[#e8e9ef] text-slate-400 text-[13px] rounded-xl px-4 py-2 outline-none transition-all">
                            <span className="flex-1 opacity-60">
                              Add up to 3 passkeys. Email required for account recovery
                            </span>
                            <button
                              type="button"
                              className="text-[#7E57C2] font-medium text-[13px] hover:underline shrink-0 ml-2"
                            >
                              Add Passkey
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full bg-[#e8e9ef] text-slate-400 text-[13px] rounded-xl px-4 py-2 outline-none transition-all">
                          <span className="flex-1 opacity-60">
                            Add up to 3 passkeys. Email required for account recovery
                          </span>
                          <button
                            type="button"
                            className="text-[#7E57C2] font-medium text-[13px] hover:underline shrink-0 ml-2"
                          >
                            Add Passkey
                          </button>
                        </div>
                      )}`;

  if (content.includes(oldBlock1)) {
    content = content.replace(oldBlock1, `                    {/* Passkeys */}\n                    <div>${newBlock.replace(/\n/g, '\n  ')}\n                    </div>`);
    fs.writeFileSync(file, content, 'utf-8');
    console.log("Fixed " + file);
  } else if (content.includes(oldBlock2)) {
    content = content.replace(oldBlock2, `                  {/* Passkeys */}\n                  <div>${newBlock.replace(/\n/g, '\n')}\n                  </div>`);
    fs.writeFileSync(file, content, 'utf-8');
    console.log("Fixed " + file);
  } else {
    console.log("Could not find block in " + file);
  }
}

replacePasskeyBlock('src/components/modals/ProfileSettingModal.tsx');
replacePasskeyBlock('src/components/modals/UserInfoEdit.tsx');
