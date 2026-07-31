const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf-8');

  content = content.replace(
    /<span className="flex-1 opacity-60 text-\[12px\]">/g,
    '<span className="flex-1 opacity-60 text-[14px]">'
  );

  content = content.replace(
    /<span className="text-slate-500 font-medium text-\[12px\]">\{pk\.name\}<\/span>/g,
    '<span className="text-slate-500 font-medium text-[14px]">{pk.name}</span>'
  );

  fs.writeFileSync(file, content, 'utf-8');
  console.log("Updated", file);
}

fix('src/components/modals/ProfileSettingModal.tsx');
fix('src/components/modals/UserInfoEdit.tsx');
