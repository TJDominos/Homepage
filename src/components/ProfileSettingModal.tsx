import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, User, ChevronDown, X } from "lucide-react";
import { getSysAvatar } from "../utils/avatar";

interface ProfileSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
  userAccount?: string | null;
}

type Step = "PROFILE" | "VERIFY";

export function ProfileSettingModal({
  isOpen,
  onClose,
  onSubmit,
  userAccount,
}: ProfileSettingModalProps) {
  const [step, setStep] = useState<Step>("PROFILE");
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("United Kingdom");
  const [notifications, setNotifications] = useState(false);

  const [verifyCode, setVerifyCode] = useState("");
  const [verifyStatus, setVerifyStatus] = useState<
    "idle" | "error" | "success"
  >("idle");
  const [countdown, setCountdown] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [showConfirmExit, setShowConfirmExit] = useState(false);

  const handleCloseAttempt = () => {
    setShowConfirmExit(true);
  };

  const confirmExit = () => {
    setShowConfirmExit(false);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;

      // Load saved profile data
      setVerifyCode("");
      setVerifyStatus("idle");
      try {
        const saved = localStorage.getItem("user_profile_data");
        if (saved) {
          const parsed = JSON.parse(saved);
          setName(parsed.username || "");
          setSelectedAvatar(
            parsed.avatarUrl ||
              (parsed.avatarCode !== "custom"
                ? getSysAvatar(parsed.avatarCode || "")
                : "") ||
              "",
          );
          setEmail(parsed.email || "");
          setSubscribe(
            parsed.subscribe !== undefined ? parsed.subscribe : true,
          );
          setBio(parsed.bio || "");
          setLocation(parsed.location || "United Kingdom");
          setNotifications(
            parsed.notifications !== undefined ? parsed.notifications : false,
          );
        } else {
          setName("");
          setSelectedAvatar("");
          setEmail("");
          setSubscribe(true);
          setBio("");
          setLocation("United Kingdom");
          setNotifications(false);
        }
      } catch (err) {
        console.error("Failed to load user profile:", err);
      }
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
      setTimeout(() => {
        setStep("PROFILE");
      }, 300);
    }
  }, [isOpen]);

  const saveProfileData = () => {
    try {
      const isCustom =
        selectedAvatar.startsWith("data:") ||
        selectedAvatar.startsWith("http") ||
        selectedAvatar.startsWith("/");
      const profileData = {
        username: name || "User",
        avatarCode: isCustom ? "custom" : selectedAvatar,
        avatarUrl: isCustom ? selectedAvatar : getSysAvatar(selectedAvatar),
        email: email,
        subscribe: subscribe,
        bio: bio || "Good Luck!",
        location: location || "United Kingdom",
        notifications: notifications,
        isVerified: true,
        hasStake: true,
        lastActive: "Active now",
        joinedDate: "Joined June 2026",
      };
      localStorage.setItem("user_profile_data", JSON.stringify(profileData));
      if (onSubmit) {
        onSubmit(profileData);
      }
    } catch (err) {
      console.error("Failed to save user profile:", err);
    }
  };

  const handleProfileSave = () => {
    saveProfileData();
    if (email) {
      setStep("VERIFY");
    } else {
      onClose(); // Skip verify if no email
    }
  };

  const handleSendCode = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // handled via verifyStatus state

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto bg-black/30 backdrop-blur-md px-4">
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-[#dce0ef] w-[92%] sm:w-[380px] rounded-[20px] shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh] border border-[#d0d4e3]"
          >
            {step === "PROFILE" ? (
              <div className="flex flex-col h-full overflow-y-auto hidden-scrollbar">
                <div className="flex flex-row items-center justify-start px-4 pt-4 pb-4 sticky top-0 bg-[#dce0ef] z-10">
                  <button
                    onClick={handleCloseAttempt}
                    className="hover:opacity-80 transition-opacity flex items-center font-medium pr-4"
                  >
                    <ChevronLeft
                      strokeWidth={2.5}
                      size={20}
                      className="mr-1 text-black"
                    />
                    <span className="text-[14px] font-medium text-black">
                      Profile Setting
                    </span>
                  </button>
                </div>

                <div className="px-4 pb-4">
                  <div className="bg-[#e4e5f0] border border-white/40 rounded-2xl p-3 shadow-sm font-sans flex flex-col gap-2.5">
                    {/* Avatar Selection */}
                    <div>
                      <div className="text-[13px] text-black mb-1 font-medium tracking-tight">
                        Avatar
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
                          Upload
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
                        <input
                          type="text"
                          value={userAccount}
                          readOnly
                          className="w-full bg-[#e8e9ef] text-slate-400 text-[13px] rounded-xl px-4 py-2 outline-none font-mono"
                        />
                      ) : (
                        <div className="flex items-center gap-2 w-full bg-[#e8e9ef] text-slate-400 text-[13px] rounded-xl px-4 py-2 outline-none transition-all">
                          <span className="flex-1 opacity-60">
                            Not connected
                          </span>
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
                          {bio.trim() === ""
                            ? 0
                            : bio.trim().split(/\s+/).length}
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
                          <option value="UK">UK</option>
                          <option value="Other">Other</option>
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
                        onClick={handleProfileSave}
                        className="w-[120px] h-[40px] mx-auto flex items-center justify-center bg-[#333] text-white text-[14px] font-medium rounded-xl hover:bg-black transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-4 pt-4 pb-4">
                  <button
                    onClick={() => setStep("PROFILE")}
                    className="hover:opacity-80 transition-opacity flex items-center font-medium text-black"
                  >
                    <ChevronLeft strokeWidth={2.5} size={24} className="mr-1" />
                    <span className="text-[14px] font-medium">Verify</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="text-[#8468d6] hover:text-[#6a48a5] transition-colors text-[14px] pr-4 font-medium"
                  >
                    Skip
                  </button>
                </div>

                <div className="px-4 pb-4 flex-1">
                  <h2 className="text-[13px] font-bold text-black mb-3">
                    Send verification code to Email
                  </h2>

                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#e8e9ef] text-[#5F40A1] placeholder-[#a6abbd] text-[13px] rounded-xl pl-4 pr-24 py-2.5 outline-none transition-all font-medium"
                      />
                      <button
                        onClick={handleSendCode}
                        disabled={countdown > 0}
                        className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-black text-white hover:bg-black/90 disabled:opacity-100 disabled:bg-[#e4e5f0] disabled:text-[#a6abbd] rounded-xl text-[12px] font-medium transition-colors"
                      >
                        {countdown > 0 ? `${countdown}s` : "Send Code"}
                      </button>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={verifyCode}
                        onChange={(e) => {
                          setVerifyCode(e.target.value);
                          setVerifyStatus("idle");
                        }}
                        placeholder="Enter the code"
                        className="w-full bg-[#e8e9ef] text-[#5F40A1] placeholder-[#a6abbd] text-[13px] rounded-xl px-4 py-2.5 outline-none transition-all font-medium"
                      />
                      <div className="h-[20px]">
                        {verifyStatus === "error" &&
                          verifyCode === "112344" && (
                            <p className="text-red-500 text-[11px] mt-1 ml-3">
                              Wrong verification code
                            </p>
                          )}
                        {verifyCode === "112345" && (
                          <p className="text-red-500 text-[11px] mt-1 ml-3">
                            Limit xx times, please try again after xx minutes
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          if (verifyCode === "112344") {
                            setVerifyStatus("error");
                          } else if (verifyCode === "112345") {
                            // Automatically shows limit msg based on value
                          } else {
                            saveProfileData();
                            setShowToast(true);
                            setTimeout(() => {
                              setShowToast(false);
                              onClose();
                            }, 1500);
                          }
                        }}
                        className={`w-[120px] h-[36px] flex mx-auto items-center justify-center rounded-[20px] text-[13px] font-medium transition-colors ${verifyCode ? "bg-black text-white hover:bg-black/90" : "bg-[#e2e4e8] text-slate-400 cursor-not-allowed"}`}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

                {/* Toast */}
                <AnimatePresence>
                  {showToast && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: "-50%" }}
                      animate={{ opacity: 1, scale: 1, y: "-50%" }}
                      exit={{ opacity: 0, scale: 0.9, y: "-50%" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 text-white text-[14px] font-semibold px-6 py-3 rounded-2xl whitespace-nowrap shadow-[0_12px_48px_rgba(0,0,0,0.3)] pointer-events-none z-[1000] border border-white/10"
                    >
                      Verification Completed
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Confirm Exit Overlay */}
          <AnimatePresence>
            {showConfirmExit && (
              <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/30 backdrop-blur-md pointer-events-auto px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#e4e5f0] w-[90%] max-w-[320px] rounded-2xl p-6 shadow-2xl relative"
                >
                  <button
                    onClick={() => setShowConfirmExit(false)}
                    className="absolute right-4 top-4 text-slate-500 hover:text-black transition-colors"
                  >
                    <X size={18} strokeWidth={2} />
                  </button>
                  <div className="text-center font-sans pt-4">
                    <h3 className="text-[14px] font-medium text-black tracking-tight mb-4">
                      Exit the page
                    </h3>
                    <p className="text-[14px] leading-[1.4] text-slate-600 mb-4">
                      If you exit the page, the filled in content will be lost,
                      and the sign up process will be aborted.
                    </p>
                    <div className="flex items-center gap-4 justify-center mt-6">
                      <button
                        onClick={() => setShowConfirmExit(false)}
                        className="w-[80px] h-[28px] flex items-center justify-center rounded-lg border border-black text-black font-medium text-[14px] hover:bg-black/5 transition-colors"
                      >
                        No
                      </button>
                      <button
                        onClick={confirmExit}
                        className="w-[80px] h-[28px] flex items-center justify-center rounded-lg bg-[#333] text-white font-medium text-[14px] border border-[#333] hover:bg-black transition-colors"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
