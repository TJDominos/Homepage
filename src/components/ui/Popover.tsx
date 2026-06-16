import React, { useState, useRef, useEffect } from 'react';

export function Popover({ children, content, placement = 'bottom' }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {children}
      </div>
      {isOpen && (
        <div className={`absolute z-50 mt-2 ${placement === 'right' ? 'top-0 left-full ml-4' : 'top-full left-0'}`}>
          {content}
        </div>
      )}
    </div>
  );
}
