const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf-8');

  // Fix passkey message
  content = content.replace(
    'Add up to 3 passkeys. Email required for account recovery',
    'Add up to 3 passkeys.'
  );

  // Fix Email section in ProfileSettingModal
  const emailBlock = `                    <div className="relative">
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
                      </div>`;
  const emailBlockNew = `                    <div className="relative">
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
                            className="absolute right-2 top-[18px] -translate-y-1/2 px-3 py-1 bg-[#5F40A1] text-white hover:bg-[#5F40A1]/90 rounded-lg text-[11px] font-medium transition-colors"
                          >
                            Verify
                          </button>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Email verification is recommended for account recovery.
                      </div>`;
                      
  const emailBlock2 = `                    <div className="relative">
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
                    </div>`;
  const emailBlockNew2 = `                    <div className="relative">
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
                          className="absolute right-2 top-[18px] -translate-y-1/2 px-3 py-1 bg-[#5F40A1] text-white hover:bg-[#5F40A1]/90 rounded-lg text-[11px] font-medium transition-colors"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Email verification is recommended for account recovery.
                    </div>`;

  if (content.includes(emailBlock)) {
    content = content.replace(emailBlock, emailBlockNew);
    console.log("Replaced block 1 in " + file);
  } else if (content.includes(emailBlock2)) {
    content = content.replace(emailBlock2, emailBlockNew2);
    console.log("Replaced block 2 in " + file);
  } else {
    console.log("Email block not found in " + file);
  }

  fs.writeFileSync(file, content, 'utf-8');
}

fix('src/components/modals/ProfileSettingModal.tsx');
fix('src/components/modals/UserInfoEdit.tsx');
