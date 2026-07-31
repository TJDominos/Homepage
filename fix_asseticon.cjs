const fs = require('fs');
let content = fs.readFileSync('src/components/shared/AssetIcon.tsx', 'utf-8');

const oldGcoin = `  if (type === "Gcoin") {
    return (
      <div className={\`\${className} rounded-full bg-[#FFD700] border border-black/10 shrink-0 flex items-center justify-center text-white text-[10px] sm:text-[12px] font-bold\`}>
        G
      </div>
    );
  }`;

const newGcoin = `  if (type === "Gcoin") {
    return (
      <div className={\`\${className} rounded-full bg-[#FFD700] border border-black/10 shrink-0\`}></div>
    );
  }`;

content = content.replace(oldGcoin, newGcoin);
fs.writeFileSync('src/components/shared/AssetIcon.tsx', content);
