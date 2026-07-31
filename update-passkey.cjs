const fs = require('fs');

function updatePasskey(file) {
  let content = fs.readFileSync(file, 'utf-8');

  // Ensure Key icon is imported
  if (!content.includes('Key,')) {
    content = content.replace('X, Wallet', 'X, Wallet, Key');
  }

  // Add passkey state right after notifications
  if (!content.includes('const [passkeys, setPasskeys] = useState')) {
    const stateRegex = /const \[notifications, setNotifications\] = useState\(false\);/;
    const stateStr = `const [notifications, setNotifications] = useState(false);
  const [passkeys, setPasskeys] = useState<{id: string, name: string}[]>(
    userAccount?.startsWith("passkey-") ? [{id: "1", name: "My Windows PC"}] : []
  );
  
  const handleAddPasskey = () => {
    if (passkeys.length < 3) {
      setPasskeys([...passkeys, { id: Math.random().toString(), name: \`Passkey \${passkeys.length + 1}\` }]);
    }
  };`;
    content = content.replace(stateRegex, stateStr);
  }

  // Find the Passkey UI block
  const passkeyBlockOld1 = `                    {/* Passkeys */}
                    <div>
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
                        )}
                    </div>`;
                    
  const passkeyBlockOld2 = `                  {/* Passkeys */}
                  <div>
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
                      )}
                  </div>`;
                  
  const passkeyBlockNew = `
                      <div className="flex items-center justify-between mb-1 pt-1">
                        <span className="text-[13px] font-medium text-black tracking-tight">Passkeys</span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {passkeys.map((pk, index) => (
                          <div key={pk.id} className="flex items-center justify-between w-full bg-[#e8e9ef] text-[13px] rounded-xl px-4 py-2 outline-none transition-all">
                            <div className="flex items-center gap-2">
                              <Key className="w-[14px] h-[14px] text-slate-400" />
                              <span className="text-slate-500 font-medium">{pk.name}</span>
                            </div>
                            {index === passkeys.length - 1 && passkeys.length < 3 && (
                              <button
                                type="button"
                                onClick={handleAddPasskey}
                                className="text-[#7E57C2] font-medium text-[13px] hover:underline shrink-0 ml-2"
                              >
                                Add
                              </button>
                            )}
                          </div>
                        ))}
                        {passkeys.length === 0 && (
                          <div className="flex items-center justify-between w-full bg-[#e8e9ef] text-slate-400 text-[13px] rounded-xl px-4 py-2 outline-none transition-all border border-transparent">
                            <span className="flex-1 opacity-60">
                              No Passkey added.
                            </span>
                            <button
                              type="button"
                              onClick={handleAddPasskey}
                              className="text-[#7E57C2] font-medium text-[13px] hover:underline shrink-0 ml-2"
                            >
                              Add
                            </button>
                          </div>
                        )}
                        <div className="text-[12px] text-slate-500 border border-black/10 rounded-xl p-3 bg-transparent">
                          Add up to 3 passkeys. Email required for account recovery
                        </div>
                      </div>`;
                      
  if (content.includes(passkeyBlockOld1)) {
    content = content.replace(passkeyBlockOld1, `                    {/* Passkeys */}\n                    <div>${passkeyBlockNew.replace(/\n/g, '\n  ')}\n                    </div>`);
    fs.writeFileSync(file, content, 'utf-8');
    console.log("Updated " + file);
  } else if (content.includes(passkeyBlockOld2)) {
    content = content.replace(passkeyBlockOld2, `                  {/* Passkeys */}\n                  <div>${passkeyBlockNew.replace(/\n/g, '\n')}\n                  </div>`);
    fs.writeFileSync(file, content, 'utf-8');
    console.log("Updated " + file);
  } else {
    console.log("Block not found in " + file);
  }
}

updatePasskey('src/components/modals/ProfileSettingModal.tsx');
updatePasskey('src/components/modals/UserInfoEdit.tsx');
