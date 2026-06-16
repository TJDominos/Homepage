import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, User, ChevronDown, X } from "lucide-react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

type Step = "PROFILE" | "VERIFY";

export function RegistrationModal({ isOpen, onClose, onSubmit }: RegistrationModalProps) {
  const [step, setStep] = useState<Step>("PROFILE");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("Japan");
  const [notifications, setNotifications] = useState(false);
  
  const [verifyCode, setVerifyCode] = useState("");
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
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
      setTimeout(() => {
        setStep("PROFILE");
      }, 300);
    }
  }, [isOpen]);

  const handleProfileSave = () => {
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

  const verifyStatus = verifyCode === '' ? 'idle' : verifyCode === '112344' ? 'error' : 'success';

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto bg-black/60 backdrop-blur-sm px-[16rem]"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-[#dce0ef] w-full sm:max-w-[420rem] rounded-[20rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] border border-[#d0d4e3]"
          >
            {step === "PROFILE" ? (
              <div className="flex flex-col h-full overflow-y-auto hidden-scrollbar">
                <div className="flex flex-row items-center justify-start px-[20rem] pt-[16rem] pb-[12rem] sticky top-0 bg-[#dce0ef] z-10">
                  <button onClick={handleCloseAttempt} className="hover:opacity-80 transition-opacity flex items-center font-medium pr-[16rem]">
                    <ChevronLeft strokeWidth={2.5} size={24} className="mr-[8rem] text-black" />
                    <span className="text-[20rem] font-medium text-black">Profile</span>
                  </button>
                </div>
                
                <div className="px-[20rem] pb-[20rem]">
                  <div className="bg-[#e4e5f0] border border-white/40 rounded-[16rem] p-[16rem] shadow-sm font-sans flex flex-col gap-[12rem]">
                    
                    {/* Avatar */}
                    <div>
                      <div className="text-[14rem] text-black mb-[8rem] font-medium tracking-tight">Avatar</div>
                      <div className="flex items-center gap-[16rem]">
                        <div className="w-[56rem] h-[56rem] rounded-full border-[2px] border-black bg-[#d5d7e8] flex items-center justify-center text-white overflow-hidden shadow-sm">
                          <User size={28} className="opacity-90" />
                        </div>
                        <button className="px-[16rem] py-[6rem] text-[14rem] font-medium border border-black rounded-[99rem] hover:bg-black/5 transition-colors text-black tracking-tight">
                          Upload
                        </button>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <div className="text-[14rem] font-medium mb-[8rem] text-black tracking-tight"><span className="text-red-500 mr-1">*</span>Name</div>
                      <div className="relative">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value.substring(0, 30))}
                          placeholder="Please enter your name"
                          className="w-full bg-[#d7d9e5] text-black placeholder-slate-400 text-[14rem] rounded-[12rem] px-[16rem] py-[10rem] outline-none transition-all pr-[50rem]"
                        />
                        <span className="absolute right-[16rem] top-1/2 -translate-y-1/2 text-[12rem] text-slate-400 pointer-events-none tracking-tight">
                          {name.length}/30
                        </span>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <div className="text-[14rem] font-medium mb-[8rem] text-black tracking-tight"><span className="text-red-500 mr-1">*</span>Email</div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Please enter"
                        className="w-full bg-[#d7d9e5] text-black placeholder-slate-400 text-[14rem] rounded-[12rem] px-[16rem] py-[10rem] outline-none transition-all"
                      />
                    </div>

                    {/* Subscribe */}
                    <label className="flex items-start gap-[12rem] cursor-pointer group mt-0">
                      <div className={`w-[20rem] h-[20rem] rounded-[6rem] flex items-center justify-center shrink-0 transition-colors mt-[2rem] ${subscribe ? 'bg-[#7E57C2]' : 'border-[2px] border-black/30'}`}>
                        {subscribe && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                      </div>
                      <span className="text-[14rem] text-black tracking-tight leading-snug">Subscribe for special offers and promotions.</span>
                      <input type="checkbox" className="hidden" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} />
                    </label>

                    {/* Bio */}
                    <div>
                      <div className="text-[14rem] font-medium mb-[8rem] text-black tracking-tight">Bio</div>
                      <div className="relative">
                        <textarea
                          value={bio}
                          onChange={(e) => setBio(e.target.value.substring(0, 50))}
                          placeholder="Please enter"
                          className="w-full bg-[#d7d9e5] text-black placeholder-slate-400 text-[14rem] rounded-[12rem] px-[16rem] py-[10rem] min-h-[60rem] outline-none transition-all resize-none"
                        />
                        <span className="absolute right-[16rem] bottom-[10rem] text-[12rem] text-slate-400 pointer-events-none tracking-tight">
                          {bio.length}/50
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <div className="text-[14rem] font-medium mb-[8rem] text-black tracking-tight"><span className="text-red-500 mr-1">*</span>Location</div>
                      <div className="relative">
                        <select 
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full appearance-none bg-[#d7d9e5] text-[#7E57C2] font-medium text-[14rem] rounded-[12rem] px-[16rem] py-[10rem] outline-none transition-all pr-[40rem]"
                        >
                          <option value="Japan">Japan</option>
                          <option value="USA">USA</option>
                          <option value="UK">UK</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-[16rem] top-1/2 -translate-y-1/2 text-black pointer-events-none" size={18} />
                      </div>
                    </div>

                    {/* Notifications */}
                    <div className="flex items-center justify-between pt-[4rem]">
                      <div className="text-[14rem] font-medium text-black tracking-tight">Enable notifications</div>
                      <button 
                        onClick={() => setNotifications(!notifications)}
                        className={`w-[44rem] h-[24rem] rounded-full transition-colors relative flex items-center ${notifications ? 'bg-[#7E57C2]' : 'bg-[#d0d4e3]'}`}
                      >
                        <div className={`absolute left-[3rem] w-[18rem] h-[18rem] bg-white rounded-full shadow-sm transition-transform ${notifications ? 'translate-x-[20rem]' : 'translate-x-0'} flex items-center justify-center`}>
                          {!notifications && <div className="w-[6rem] h-[2rem] bg-slate-300 rounded-full"></div>}
                        </div>
                      </button>
                    </div>

                    {/* Footer / Links */}
                    <div className="space-y-[16rem] pt-[12rem]">
                      <a href="#" className="text-[12rem] text-[#7E57C2] hover:underline block tracking-tight text-center">Randseed Privacy Policy</a>
                      <button 
                        onClick={handleProfileSave}
                        className="w-[120rem] h-[40rem] mx-auto flex items-center justify-center bg-[#333] text-white text-[16rem] font-medium rounded-[99rem] hover:bg-black transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-[20rem] pt-[20rem] pb-[32rem]">
                  <button onClick={() => setStep("PROFILE")} className="hover:opacity-80 transition-opacity flex items-center font-medium text-black">
                    <ChevronLeft strokeWidth={2.5} size={24} className="mr-[4rem]" />
                    <span className="text-[20rem] font-medium">Verify</span>
                  </button>
                  <button onClick={onClose} className="text-[#8468d6] hover:text-[#6a48a5] transition-colors text-[16rem] pr-[8rem] font-medium">
                    Skip
                  </button>
                </div>

                <div className="px-[32rem] pb-[60rem] flex-1">
                  <h2 className="text-[24rem] font-bold text-black mb-[48rem]">Send verification code to Email</h2>

                  <div className="space-y-[24rem]">
                    <div className="relative">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#d7d9e5] text-[#8468d6] placeholder-slate-400 text-[15rem] rounded-[99rem] pl-[20rem] pr-[120rem] py-[16rem] outline-none transition-all font-medium"
                      />
                      <button 
                        onClick={handleSendCode}
                        disabled={countdown > 0}
                        className="absolute right-[6rem] top-[6rem] bottom-[6rem] px-[20rem] bg-black text-white hover:bg-black/80 disabled:opacity-50 disabled:bg-[#d0d4e3] disabled:text-slate-500 rounded-[99rem] text-[14rem] font-medium transition-colors"
                      >
                        {countdown > 0 ? `${countdown}s` : "Send Code"}
                      </button>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={verifyCode}
                        onChange={(e) => setVerifyCode(e.target.value)}
                        placeholder="Enter the code"
                        className="w-full bg-[#d7d9e5] text-[#8468d6] placeholder-slate-400 text-[15rem] rounded-[99rem] px-[20rem] py-[16rem] outline-none transition-all font-medium"
                      />
                      {verifyStatus === 'error' && verifyCode === '112344' && (
                        <p className="text-red-500 text-[14rem] mt-[12rem] ml-[12rem]">Wrong verification code</p>
                      )}
                      {verifyCode === '112345' && (
                        <p className="text-red-500 text-[14rem] mt-[12rem] ml-[12rem]">Limit xx times, please try again after xx minutes</p>
                      )}
                    </div>

                    <div className="pt-[48rem]">
                      <button 
                        onClick={() => {
                          if (verifyCode === '112344') {
                            setVerifyCode('112344');
                          } else if (verifyCode === '112345') {
                            setVerifyCode('112345');
                          } else {
                            setShowToast(true);
                            setTimeout(() => {
                              setShowToast(false);
                              onClose();
                            }, 1500);
                          }
                        }}
                        className={`w-[160rem] mx-auto block py-[16rem] rounded-[99rem] text-[16rem] font-medium transition-colors ${verifyCode ? 'bg-black text-white hover:bg-black/90' : 'bg-[#e2e4e8] text-slate-400 cursor-not-allowed'}`}
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
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute bottom-[40rem] left-1/2 -translate-x-1/2 bg-black/70 text-white text-[14rem] px-[24rem] py-[12rem] rounded-[8rem] whitespace-nowrap shadow-lg pointer-events-none"
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
              <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto px-[24rem]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#e4e5f0] w-full max-w-[320rem] rounded-[24rem] p-[24rem] shadow-2xl relative"
                >
                  <button 
                    onClick={() => setShowConfirmExit(false)}
                    className="absolute right-[16rem] top-[16rem] text-slate-500 hover:text-black transition-colors"
                  >
                    <X size={24} strokeWidth={2} />
                  </button>
                  <div className="text-center font-sans pt-[8rem]">
                    <h3 className="text-[20rem] font-medium text-black tracking-tight mb-[16rem]">Exit the page</h3>
                    <p className="text-[15rem] leading-[1.4] text-slate-600 mb-[32rem]">If you exit the page, the filled in content will be lost</p>
                    <div className="flex items-center gap-[12rem]">
                      <button 
                        onClick={() => setShowConfirmExit(false)}
                        className="flex-1 py-[12rem] rounded-[99rem] border border-black text-black font-medium text-[16rem] hover:bg-black/5 transition-colors"
                      >
                        No
                      </button>
                      <button 
                        onClick={confirmExit}
                        className="flex-1 py-[12rem] rounded-[99rem] bg-[#333] text-white font-medium text-[16rem] border border-[#333] hover:bg-black transition-colors"
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
