import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, User, Power, ChevronDown, X, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../money-page/MoneyPage.css";

// Reusing same options as RegistrationModal
const avatarOptions = [
  "/images/headshots/01.svg",
  "/images/headshots/02.svg",
  "/images/headshots/03.svg",
  "/images/headshots/04.svg",
  "/images/headshots/05.svg",
];

const getSysAvatar = (name: string) => {
  return `/images/headshots/${name}`;
};

interface UserInfoEditProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  userAccount: string | null;
  profile?: any;
}

export function UserInfoEdit({
  isOpen,
  onClose,
  onSubmit,
  userAccount,
  profile,
}: UserInfoEditProps) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.username || "");
      setEmail(profile.email || "");
      setSelectedAvatar(profile.avatarUrl || "");
      setBio(profile.bio || "");
      setLocation(profile.location || "");
      setSubscribe(profile.subscribe !== undefined ? profile.subscribe : true);
      setNotifications(
        profile.notifications !== undefined ? profile.notifications : false,
      );
    }
  }, [profile]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  const handleSave = () => {
    // Notify parent
    onSubmit({
      username: name,
      email,
      avatarUrl: selectedAvatar,
      bio,
      location,
      subscribe,
      notifications,
    });
    onClose();
  };

  const handleSignOut = () => {
    window.location.href = "/";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto bg-black/30 backdrop-blur-md px-4">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-[#dce0ef] w-[92%] sm:w-[380px] rounded-[20px] shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh] border border-[#d0d4e3]"
          >
            <div className="flex flex-col h-full overflow-y-auto hidden-scrollbar">
              {/* Header */}
              <div className="flex flex-row items-center justify-start px-4 pt-4 pb-4 sticky top-0 bg-[#dce0ef] z-10">
                <button
                  onClick={onClose}
                  className="hover:opacity-80 transition-opacity flex items-center font-medium pr-4"
                >
                  <ChevronLeft
                    strokeWidth={2.5}
                    size={20}
                    className="mr-1 text-black"
                  />
                  <span className="text-[14px] font-medium text-black">
                    Profile
                  </span>
                </button>
              </div>

              <div className="px-4 pb-4">
                <div className="bg-[#e4e5f0] border border-white/40 rounded-2xl p-3 shadow-sm  flex flex-col gap-2.5">
                  {/* Avatar Selection */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-[13px] text-black font-medium tracking-tight">
                        Avatar
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="text-red-500 flex items-center text-[12px] font-medium tracking-tight hover:opacity-80 transition-opacity"
                      >
                        SIGN OUT <Power size={14} className="ml-1" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-[48px] h-[48px] rounded-full border-[1.5px] border-black flex items-center justify-center overflow-hidden bg-white shrink-0">
                        {selectedAvatar ? (
                          <img
                            src={
                              selectedAvatar.startsWith("data:") ||
                              selectedAvatar.startsWith("http") ||
                              selectedAvatar.startsWith("/")
                                ? selectedAvatar
                                : getSysAvatar(selectedAvatar)
                            }
                            alt="selected"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <User className="w-6 h-6 text-black/10" />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.createElement("input");
                          input.type = "file";
                          input.accept = "image/*";
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement)
                              .files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (typeof reader.result === "string") {
                                  setSelectedAvatar(reader.result);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          };
                          input.click();
                        }}
                        className="px-3 py-1 border border-black rounded-[20px] text-[12px] font-medium text-black hover:bg-black/5 active:bg-black/10 transition-all bg-transparent"
                      >
                        Replace
                      </button>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <div className="text-[13px] font-medium mb-1 pt-1 text-black tracking-tight">
                      <span className="text-red-500 mr-1">*</span>Name
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                          setName(e.target.value.substring(0, 30))
                        }
                        placeholder="Please enter your name"
                        className="w-full bg-[#d7d9e5] text-[#7E57C2] placeholder-slate-400 text-[13px] rounded-xl px-4 py-2 outline-none transition-all pr-4"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-slate-400 pointer-events-none tracking-tight">
                        {name.length}/30
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <div className="text-[13px] font-medium mb-1 text-black tracking-tight">
                      <span className="text-red-500 mr-1">*</span>Email
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        if (!userAccount?.startsWith("email-")) {
                          setEmail(e.target.value);
                        }
                      }}
                      readOnly={!!userAccount?.startsWith("email-")}
                      placeholder="Please enter"
                      className={`w-full text-[13px] rounded-xl px-4 py-2 outline-none transition-all ${
                        userAccount?.startsWith("email-")
                          ? "bg-[#e8e9ef] text-slate-400"
                          : "bg-[#d7d9e5] text-[#7E57C2] placeholder-slate-400"
                      }`}
                    />
                  </div>

                  {/* Wallet address */}
                  <div>
                    <div className="text-[13px] font-medium mb-1 pt-1 text-black tracking-tight flex justify-between">
                      <span>Wallet address</span>
                    </div>
                    {userAccount &&
                    !userAccount.startsWith("email-") &&
                    !userAccount.startsWith("ii-") ? (
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-[10px] font-bold bg-[#d0d4e3] text-[#7E57C2] px-1.5 rounded">
                          {userAccount.startsWith("0x") ? "ETH" : "SOL"}
                        </div>
                        <input
                          type="text"
                          value={
                            userAccount.length > 11
                              ? `${userAccount.slice(0, 6)}...${userAccount.slice(-5)}`
                              : userAccount
                          }
                          readOnly
                          className="w-full bg-[#e8e9ef] text-slate-400 text-[13px] rounded-xl pl-12 pr-4 py-2 outline-none "
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 w-full bg-[#e8e9ef] text-slate-400 text-[13px] rounded-xl px-4 py-2 outline-none transition-all">
                        <span className="flex-1 opacity-60">Not connected</span>
                        <button
                          type="button"
                          className="text-[#7E57C2] font-medium text-[13px] hover:underline"
                          onClick={() => (window.location.href = "/")}
                        >
                          Connect
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <div className="text-[13px] font-medium mb-1 text-black tracking-tight">
                      Bio
                    </div>
                    <div className="relative">
                      <textarea
                        value={bio}
                        onChange={(e) => {
                          const val = e.target.value;
                          const wordCount =
                            val.trim() === ""
                              ? 0
                              : val.trim().split(/\s+/).length;
                          if (wordCount <= 50 || val.length < bio.length) {
                            setBio(val);
                          }
                        }}
                        placeholder="Please enter"
                        className="w-full bg-[#d7d9e5] text-[#7E57C2] placeholder-slate-400 text-[13px] rounded-xl px-4 py-2 min-h-[44px] max-h-[60px] outline-none transition-all resize-none"
                      />
                      <span className="absolute right-4 bottom-2 text-[13px] text-slate-400 pointer-events-none tracking-tight">
                        {bio.trim() === "" ? 0 : bio.trim().split(/\s+/).length}
                        /50
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <div className="text-[13px] font-medium mb-1 text-black tracking-tight">
                      <span className="text-red-500 mr-1">*</span>Location
                    </div>
                    <div className="relative">
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full appearance-none bg-[#d7d9e5] text-[#7E57C2] font-medium text-[13px] rounded-xl px-4 py-2 outline-none transition-all pr-4"
                      >
                        <option value="Japan">Japan</option>
                        <option value="USA">USA</option>
                        <option value="UK">United Kingdom</option>
                        <option value="China">China</option>
                        <option value="Others">Others</option>
                      </select>
                      <ChevronDown
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-black pointer-events-none"
                        size={16}
                      />
                    </div>
                  </div>

                  {/* Notifications & Subscribe */}
                  <div className="flex items-start justify-between pt-1">
                    <div className="flex flex-col">
                      <div className="text-[13px] font-medium text-black tracking-tight">
                        Enable notifications
                      </div>
                      <div className="text-[11px] text-black/65 tracking-tight mt-0.5">
                        Subscribe for special offers and promotions.
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newVal = !notifications;
                        setNotifications(newVal);
                        setSubscribe(newVal);
                      }}
                      className={`w-[40px] h-[22px] rounded-full transition-colors relative flex items-center shrink-0 mt-0.5 ${notifications ? "bg-[#7E57C2]" : "bg-[#d0d4e3]"}`}
                    >
                      <div
                        className={`absolute left-[2px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform ${notifications ? "translate-x-[18px]" : "translate-x-0"}`}
                      ></div>
                    </button>
                  </div>

                  {/* Footer / Links */}
                  <div className="space-y-3 pt-2">
                    <a
                      href="#"
                      className="text-[14px] text-[#7E57C2] underline underline-offset-2 hover:opacity-80 block tracking-tight text-center transition-opacity"
                    >
                      Randseed Privacy Policy
                    </a>
                    <button
                      onClick={handleSave}
                      className="w-[120px] h-[40px] mx-auto flex items-center justify-center bg-[#333] text-white text-[14px] font-medium rounded-xl hover:bg-black transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
