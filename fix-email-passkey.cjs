const fs = require('fs');

function fixProfileSettingModal() {
  const file = 'src/components/modals/ProfileSettingModal.tsx';
  let content = fs.readFileSync(file, 'utf-8');

  // Fix Email block
  const emailOld = `                    {/* Email */}
                    <div>
                      <div className="text-[13px] font-medium mb-1 text-black tracking-tight">
                        <span className="text-red-500 mr-1">*</span>Email
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          if (!userAccount?.startsWith("email-")) {
                            setEmail(e.target.value);
                          }
                        }}
                        readOnly={!!userAccount?.startsWith("email-")}
                        placeholder="Please enter"
                        className={\`w-full text-[13px] rounded-xl px-4 py-2 outline-none transition-all \${
                          userAccount?.startsWith("email-")
                            ? "bg-[#e8e9ef] text-slate-400"
                            : "bg-[#d7d9e5] text-[#7E57C2] placeholder-slate-400"
                        }\`}
                      />
                    </div>`;
                    
  const emailNew = `                    {/* Email */}
                    <div>
                      <div className="text-[13px] font-medium mb-1 text-black tracking-tight">
                        <span className="text-red-500 mr-1">*</span>Email
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            if (!userAccount?.startsWith("email-")) {
                              setEmail(e.target.value);
                            }
                          }}
                          readOnly={!!userAccount?.startsWith("email-")}
                          placeholder="Please enter"
                          className={\`w-full text-[13px] rounded-xl px-4 py-2 outline-none transition-all \${
                            userAccount?.startsWith("email-")
                              ? "bg-[#e8e9ef] text-slate-400"
                              : "bg-[#d7d9e5] text-[#7E57C2] placeholder-slate-400"
                          }\`}
                        />
                        {!userAccount?.startsWith("email-") && email.trim() !== "" && (
                          <button
                            type="button"
                            onClick={() => setStep("VERIFY")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#5F40A1] text-white hover:bg-[#5F40A1]/90 rounded-lg text-[11px] font-medium transition-colors"
                          >
                            Verify
                          </button>
                        )}
                      </div>
                    </div>`;
  content = content.replace(emailOld, emailNew);
  
  // Fix Add Passkey button
  const passkeyBtnOld = `                        <button
                          type="button"
                          className="px-3 py-1 border border-black rounded-[20px] text-[12px] font-medium text-black hover:bg-black/5 active:bg-black/10 transition-all bg-transparent"
                        >
                          Add Passkey
                        </button>`;
  const passkeyBtnNew = `                        <button
                          type="button"
                          className="text-[#7E57C2] font-medium text-[13px] hover:underline"
                        >
                          Add Passkey
                        </button>`;
  content = content.replace(passkeyBtnOld, passkeyBtnNew);

  fs.writeFileSync(file, content, 'utf-8');
  console.log('Fixed', file);
}

function fixUserInfoEdit() {
  const file = 'src/components/modals/UserInfoEdit.tsx';
  let content = fs.readFileSync(file, 'utf-8');

  // Fix Email block
  const emailOld = `                  {/* Email */}
                  <div>
                    <div className="text-[13px] font-medium mb-1 text-black tracking-tight">
                      <span className="text-red-500 mr-1">*</span>Email
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        if (!userAccount?.startsWith("email-")) {
                          setEmail(e.target.value);
                        }
                      }}
                      readOnly={!!userAccount?.startsWith("email-")}
                      placeholder="Please enter"
                      className={\`w-full text-[13px] rounded-xl px-4 py-2 outline-none transition-all \${
                        userAccount?.startsWith("email-")
                          ? "bg-[#e8e9ef] text-slate-400"
                          : "bg-[#d7d9e5] text-[#7E57C2] placeholder-slate-400"
                      }\`}
                    />
                  </div>`;
                    
  const emailNew = `                  {/* Email */}
                  <div>
                    <div className="text-[13px] font-medium mb-1 text-black tracking-tight">
                      <span className="text-red-500 mr-1">*</span>Email
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          if (!userAccount?.startsWith("email-")) {
                            setEmail(e.target.value);
                          }
                        }}
                        readOnly={!!userAccount?.startsWith("email-")}
                        placeholder="Please enter"
                        className={\`w-full text-[13px] rounded-xl px-4 py-2 outline-none transition-all \${
                          userAccount?.startsWith("email-")
                            ? "bg-[#e8e9ef] text-slate-400"
                            : "bg-[#d7d9e5] text-[#7E57C2] placeholder-slate-400"
                        }\`}
                      />
                      {!userAccount?.startsWith("email-") && email.trim() !== "" && (
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#5F40A1] text-white hover:bg-[#5F40A1]/90 rounded-lg text-[11px] font-medium transition-colors"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </div>`;
  content = content.replace(emailOld, emailNew);

  // Fix Add Passkey button
  const passkeyBtnOld = `                      <button
                        type="button"
                        className="px-3 py-1 border border-black rounded-[20px] text-[12px] font-medium text-black hover:bg-black/5 active:bg-black/10 transition-all bg-transparent"
                      >
                        Add Passkey
                      </button>`;
  const passkeyBtnNew = `                      <button
                        type="button"
                        className="text-[#7E57C2] font-medium text-[13px] hover:underline"
                      >
                        Add Passkey
                      </button>`;
  content = content.replace(passkeyBtnOld, passkeyBtnNew);

  fs.writeFileSync(file, content, 'utf-8');
  console.log('Fixed', file);
}

fixProfileSettingModal();
fixUserInfoEdit();
