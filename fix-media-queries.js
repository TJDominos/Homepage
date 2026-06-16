import fs from "fs";
import path from "path";

const filesToRestore = [
  "src/index.css",
  "src/components/MoneyPage.css"
];

for (const file of filesToRestore) {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, "utf-8");
    content = content.replace(/(@media\s*\([^)]+?[0-9]+)rem\)/g, "$1px)");
    fs.writeFileSync(fullPath, content, "utf-8");
    console.log(`Restored media queries in ${file}`);
  }
}
