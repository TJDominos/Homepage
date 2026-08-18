const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf8');

const target = `  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCurrencyDropdown(false);
        setShowSwapCurrencyDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);`;

const replacement = `  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCurrencyDropdown(false);
      }
      if (swapDropdownRef.current && !swapDropdownRef.current.contains(event.target as Node)) {
        setShowSwapCurrencyDropdown(false);
      }
      if (gcoinDropdownRef.current && !gcoinDropdownRef.current.contains(event.target as Node)) {
        setShowGcoinCurrencyDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', code);
  console.log("handleClickOutside patched successfully!");
} else {
  console.log("TARGET NOT FOUND");
}
