const fs = require('fs');

let pt = fs.readFileSync('src/components/shared/AssetIcon.tsx', 'utf-8');

pt = pt.replace(
  /if \(type === "Gcoin"\) \{/,
  `if (type === "Bonus") {
    return (
      <img src="https://storage.randseed.org/Icons/bonus.svg" alt="Bonus" className={\`\${className} shrink-0\`} />
    );
  }
  if (type === "Gcoin") {`
);

fs.writeFileSync('src/components/shared/AssetIcon.tsx', pt);
