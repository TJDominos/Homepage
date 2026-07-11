import fs from 'fs';
let content = fs.readFileSync('src/index.tsx', 'utf8');

content = content.replace(
  /<svg\s+className="w-full h-full"\s+viewBox="0 0 27 27"\s+fill="none"\s*>\s*<path d=\{svgPaths\.p1bf39e00\} fill="currentColor" \/>\s*<\/svg>/,
  \`<svg className="w-full h-full" viewBox="0 0 27 27" fill="none">
    <circle cx="13.5" cy="13.5" fill={activeTab === "money" ? "currentColor" : "none"} r="13.5" />
    {activeTab !== "money" && (
      <circle cx="13.5" cy="13.5" stroke="currentColor" strokeWidth="1" fill="none" r="13" />
    )}
    <path d={svgPaths.p1bf39e00} fill={activeTab === "money" ? "#fff" : "currentColor"} />
  </svg>\`
);

fs.writeFileSync('src/index.tsx', content);
