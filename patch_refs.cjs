const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf8');

// 1. Add new refs
code = code.replace(
  `const dropdownRef = useRef<HTMLDivElement>(null);`,
  `const dropdownRef = useRef<HTMLDivElement>(null);
  const swapDropdownRef = useRef<HTMLDivElement>(null);
  const gcoinDropdownRef = useRef<HTMLDivElement>(null);`
);

// 2. Update handleClickOutside
code = code.replace(
  `  useEffect(() => {
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);`,
  `  useEffect(() => {
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);`
);

// 3. Add ref to swap widget dropdown
code = code.replace(
  `<div
                        className="flex flex-col gap-1 relative shrink-0 w-[40%] min-w-[90px]"
                      >
                        <label className="text-[13px] font-normal text-black text-left pl-2">Assets</label>
                        <button
                          disabled={swapStatus === "processing"}`,
  `<div
                        className="flex flex-col gap-1 relative shrink-0 w-[40%] min-w-[90px]"
                        ref={swapDropdownRef}
                      >
                        <label className="text-[13px] font-normal text-black text-left pl-2">Assets</label>
                        <button
                          disabled={swapStatus === "processing"}`
);

// 4. Add ref to gcoin widget dropdown
code = code.replace(
  `<div
                        className="flex flex-col gap-1 relative shrink-0 w-[40%] min-w-[90px]"
                      >
                        <label className="text-[13px] font-normal text-black text-left pl-2">Assets</label>
                        <button
                          disabled={gcoinStatus === "processing"}`,
  `<div
                        className="flex flex-col gap-1 relative shrink-0 w-[40%] min-w-[90px]"
                        ref={gcoinDropdownRef}
                      >
                        <label className="text-[13px] font-normal text-black text-left pl-2">Assets</label>
                        <button
                          disabled={gcoinStatus === "processing"}`
);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', code);
console.log("Refs patched!");
