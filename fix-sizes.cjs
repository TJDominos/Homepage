const fs = require('fs');

function fixSizes(file) {
  let content = fs.readFileSync(file, 'utf-8');

  // 1. Avatar Upload button: text-[12px] -> text-[14px]
  content = content.replace(
    'className="px-3 py-1 border border-black rounded-[20px] text-[12px] font-medium text-black hover:bg-black/5 active:bg-black/10 transition-all bg-transparent"',
    'className="px-3 py-1 border border-black rounded-[20px] text-[14px] font-medium text-black hover:bg-black/5 active:bg-black/10 transition-all bg-transparent"'
  );

  // 2. Email Verify button: text-[11px] -> text-[14px]
  // Note: the className has absolute right-2 top-[18px] etc. Let's do a regex for the Email Verify button
  content = content.replace(
    /className="absolute right-2 top-\[18px\] -translate-y-1\/2 px-3 py-1 bg-\[#5F40A1\] text-white hover:bg-\[#5F40A1\]\/90 rounded-lg text-\[11px\] font-medium transition-colors"/g,
    'className="absolute right-2 top-[18px] -translate-y-1/2 px-3 py-1 bg-[#5F40A1] text-white hover:bg-[#5F40A1]/90 rounded-lg text-[14px] font-medium transition-colors"'
  );
  content = content.replace(
    /className="absolute right-2 top-1\/2 -translate-y-1\/2 px-3 py-1 bg-\[#5F40A1\] text-white hover:bg-\[#5F40A1\]\/90 rounded-lg text-\[11px\] font-medium transition-colors"/g,
    'className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#5F40A1] text-white hover:bg-[#5F40A1]/90 rounded-lg text-[14px] font-medium transition-colors"'
  );

  // 3. Wallet Connect button: text-[13px] -> text-[14px]
  content = content.replace(
    /className="text-\[#7E57C2\] font-medium text-\[13px\] hover:underline"([\s\n]+onClick=\{\(\) => \(window.location.href = "\/"\)\}[\s\n]+>[\s\n]+Connect)/g,
    'className="text-[#7E57C2] font-medium text-[14px] hover:underline"$1'
  );

  // 4. Wallet "Not connected" text: add text-[12px]
  content = content.replace(
    /<span className="flex-1 opacity-60">([\s\n]+)Not connected([\s\n]+)<\/span>/g,
    '<span className="flex-1 opacity-60 text-[12px]">$1Not connected$2</span>'
  );

  // 5. Passkeys Add button: text-[13px] -> text-[14px]
  content = content.replace(
    /className="text-\[#7E57C2\] font-medium text-\[13px\] hover:underline shrink-0 ml-2"([\s\n]+>[\s\n]+Add[\s\n]+<\/button>)/g,
    'className="text-[#7E57C2] font-medium text-[14px] hover:underline shrink-0 ml-2"$1'
  );

  // 6. Passkeys "Add up to 3 passkeys" text (when 0 passkeys): text-[13px] on parent -> add text-[12px] on span
  content = content.replace(
    /<span className="flex-1 opacity-60">([\s\n]+)Add up to 3 passkeys([\s\n]+)<\/span>/g,
    '<span className="flex-1 opacity-60 text-[12px]">$1Add up to 3 passkeys$2</span>'
  );
  // And the passkey name pk.name? Maybe user just meant the "Add up to 3 passkeys" empty state.
  // Wait, let's also change pk.name to text-[12px] just in case it's what CSS 4 targeted if they had a passkey
  content = content.replace(
    /<span className="text-slate-500 font-medium">\{pk.name\}<\/span>/g,
    '<span className="text-slate-500 font-medium text-[12px]">{pk.name}</span>'
  );

  // 7. Bio textarea: text-[13px] -> text-[14px]
  content = content.replace(
    /className="w-full bg-\[#d7d9e5\] text-\[#7E57C2\] placeholder-slate-400 text-\[13px\] rounded-xl px-4 py-2 min-h-\[44px\] max-h-\[60px\] outline-none transition-all resize-none"/g,
    'className="w-full bg-[#d7d9e5] text-[#7E57C2] placeholder-slate-400 text-[14px] rounded-xl px-4 py-2 min-h-[44px] max-h-[60px] outline-none transition-all resize-none"'
  );

  fs.writeFileSync(file, content, 'utf-8');
  console.log("Updated", file);
}

fixSizes('src/components/modals/ProfileSettingModal.tsx');
fixSizes('src/components/modals/UserInfoEdit.tsx');
