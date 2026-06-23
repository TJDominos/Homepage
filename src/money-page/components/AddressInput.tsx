import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Save, Edit2, Trash2 } from "lucide-react";

interface SavedAddress {
  id: string;
  name: string;
  address: string;
}

interface AddressInputProps {
  value: string;
  onChange: (val: string) => void;
}

export function AddressInput({ value, onChange }: AddressInputProps) {
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([
    { id: "1", name: "My Wallet", address: "da1dcc7f6afa26c5def8e48ddaee33c" },
    { id: "2", name: "", address: "47534e32180371958eb63f4528ea3c" }
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addressName, setAddressName] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveClick = () => {
    setEditingId(null);
    setAddressName("");
    setShowNameModal(true);
  };

  const handleEditClick = (e: React.MouseEvent, item: SavedAddress) => {
    e.stopPropagation();
    setEditingId(item.id);
    setAddressName(item.name);
    setShowNameModal(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedAddresses(prev => prev.filter(a => a.id !== id));
  };

  const handleSaveConfirm = () => {
    if (editingId) {
      setSavedAddresses(prev => prev.map(a => a.id === editingId ? { ...a, name: addressName } : a));
    } else {
      setSavedAddresses(prev => [{ id: Date.now().toString(), name: addressName, address: value }, ...prev]);
    }
    setShowNameModal(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative flex items-center">
        <input 
          type="text" 
          placeholder="Enter Address"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          className={`w-full min-w-0 border rounded-full pl-4 pr-16 h-8 outline-none text-[14px] text-black placeholder-black/40 transition-all font-medium ${showDropdown || value ? 'border-black bg-transparent' : 'border-transparent bg-black/5 focus:border-black focus:bg-transparent hover:bg-black/10'}`}
        />
        <div className="absolute right-3 flex items-center gap-2 text-black/50">
          {value && !savedAddresses.find(a => a.address === value) && (
            <button onClick={handleSaveClick} className="hover:text-black transition-colors"><Save size={16} /></button>
          )}
          <button onClick={() => setShowDropdown(!showDropdown)} className="hover:text-black transition-colors"><ChevronDown size={20} /></button>
        </div>
      </div>

      {showDropdown && savedAddresses.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-black/5 py-2 z-50 max-h-[200px] overflow-y-auto">
          {savedAddresses.map((item) => (
            <div 
              key={item.id}
              className="flex items-center justify-between px-4 py-2 hover:bg-black/5 cursor-pointer group"
              onClick={() => {
                onChange(item.address);
                setShowDropdown(false);
              }}
            >
              <div className="flex flex-col min-w-0 pr-4">
                {item.name && <span className="text-[12px] text-[#6A3FE6] font-medium mb-0.5">{item.name}</span>}
                <span className="text-[14px] text-black font-medium truncate">{item.address}</span>
              </div>
              <div className="flex items-center gap-3 text-black/40 shrink-0">
                <button onClick={(e) => handleEditClick(e, item)} className="hover:text-black transition-colors"><Edit2 size={16} /></button>
                <button onClick={(e) => handleDeleteClick(e, item.id)} className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showNameModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowNameModal(false)}></div>
          <div className="relative w-full max-w-[320px] bg-[#EAEAEA] rounded-3xl p-6 flex flex-col pointer-events-auto shadow-xl">
            <h3 className="text-[18px] font-bold text-black text-center mb-6">Address Name</h3>
            <div className="relative mb-6">
              <input 
                type="text" 
                value={addressName}
                onChange={(e) => setAddressName(e.target.value.substring(0, 20))}
                className="w-full bg-black/5 border border-black/10 rounded-full pl-4 pr-12 py-3 outline-none text-[15px] font-medium text-black transition-colors focus:bg-white focus:border-black/20"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-black/30 font-medium">
                {addressName.length}/20
              </div>
            </div>
            <button 
              onClick={handleSaveConfirm}
              className="w-full bg-black/10 hover:bg-black/15 text-black/50 hover:text-black font-bold py-3 rounded-full transition-all text-[15px]"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
