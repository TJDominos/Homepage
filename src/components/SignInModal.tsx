import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ChevronRight,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Mail,
} from "lucide-react";

interface SignInModalProps {
  isOpen: boolean;
  onClose: (verifiedId?: string) => void;
}

const DEFAULT_ICONS: Record<string, string> = {
  metamask:
    "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  binance:
    "https://upload.wikimedia.org/wikipedia/commons/e/e8/Binance_Logo.svg",
};

const InternetIdentityIcon = () => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[24rem] h-[24rem]"
  >
    <path
      d="M 20 50 C 20 20, 50 20, 50 50 C 50 80, 80 80, 80 50 C 80 20, 50 20, 50 50 C 50 80, 20 80, 20 50 Z"
      stroke="url(#gradient)"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="gradient"
        x1="10"
        y1="50"
        x2="90"
        y2="50"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F15A24" />
        <stop offset="0.33" stopColor="#FBB03B" />
        <stop offset="0.66" stopColor="#00AEEF" />
        <stop offset="1" stopColor="#ED1E79" />
      </linearGradient>
    </defs>
  </svg>
);

const PhantomIcon = () => (
  <svg
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[24rem] h-[24rem]"
  >
    <rect width="128" height="128" rx="20" fill="#AB9FF2" />
    <path
      d="M42 34C42 34 26 40 26 62C26 84 32 94 40 94C48 94 48 84 48 84C48 84 54 94 64 94C74 94 74 84 74 84C74 84 80 94 88 94C96 94 102 84 102 62C102 40 86 34 86 34C86 34 78 30 64 30C50 30 42 34 42 34Z"
      fill="white"
    />
    <circle cx="56" cy="54" r="6" fill="#AB9FF2" />
    <circle cx="72" cy="54" r="6" fill="#AB9FF2" />
  </svg>
);

const CoinbaseIcon = () => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[24rem] h-[24rem]"
  >
    <rect width="100" height="100" rx="20" fill="#0052FF" />
    <circle cx="50" cy="50" r="32" fill="white" />
    <rect x="36" y="36" width="28" height="28" rx="4" fill="#0052FF" />
  </svg>
);

const OkxIcon = () => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[24rem] h-[24rem]"
  >
    <rect width="100" height="100" rx="20" fill="black" />
    <rect x="18" y="24" width="24" height="24" rx="4" fill="white" />
    <rect x="18" y="52" width="24" height="24" rx="4" fill="white" />
    <rect x="58" y="24" width="24" height="24" rx="4" fill="white" />
    <rect x="58" y="52" width="24" height="24" rx="4" fill="white" />
    <rect x="38" y="38" width="24" height="24" rx="4" fill="white" />
  </svg>
);

const getWalletIcon = (w: any) => {
  if (w.id === "okx") return <OkxIcon />;
  if (w.id === "coinbase") return <CoinbaseIcon />;
  if (w.id === "phantom") return <PhantomIcon />;
  if (w.id === "metamask")
    return (
      <img
        src={DEFAULT_ICONS.metamask}
        className="w-[24rem] h-[24rem] object-contain"
        alt="MetaMask logo"
      />
    );
  if (w.id === "binance")
    return (
      <img
        src={DEFAULT_ICONS.binance}
        className="w-[24rem] h-[24rem] object-contain"
        alt="Binance logo"
      />
    );
  if (w.icon && typeof w.icon === "string")
    return (
      <img
        src={w.icon}
        className="w-[24rem] h-[24rem] object-contain"
        alt={`${w.name} logo`}
      />
    );
  return (
    <div className="w-full h-full bg-slate-200 text-slate-500 font-bold flex items-center justify-center text-[12rem]">
      {w.name.charAt(0)}
    </div>
  );
};

type Step = "SELECT_WALLET" | "CONNECTING" | "PENDING" | "SUCCESS";

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [wallets, setWallets] = useState<
    {
      id: string;
      name: string;
      installed: boolean;
      icon?: string;
      url?: string;
    }[]
  >([]);
  const [step, setStep] = useState<Step>("SELECT_WALLET");
  const [selectedWallet, setSelectedWallet] = useState<{
    name: string;
    icon?: string | React.ReactNode;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setStep("SELECT_WALLET"), 300);
      return;
    }

    const safeCheck = (check: () => any) => {
      try {
        return !!check();
      } catch (e) {
        return false;
      }
    };

    const detected = [
      {
        id: "metamask",
        name: "MetaMask",
        installed: safeCheck(() => (window as any).ethereum?.isMetaMask),
        url: "https://metamask.io/download/",
      },
      {
        id: "okx",
        name: "OKX Wallet",
        installed: safeCheck(() => (window as any).okxwallet),
        url: "https://www.okx.com/web3/build/projects/wallets",
      },
      {
        id: "coinbase",
        name: "Coinbase Wallet",
        installed: safeCheck(
          () =>
            (window as any).coinbaseWalletExtension ||
            (window as any).ethereum?.isCoinbaseWallet,
        ),
        url: "https://www.coinbase.com/wallet",
      },
      {
        id: "binance",
        name: "Binance Wallet",
        installed: safeCheck(() => (window as any).BinanceChain),
        url: "https://www.bnbchain.org/en/binance-wallet",
      },
      {
        id: "phantom",
        name: "Phantom",
        installed: safeCheck(() => (window as any).phantom?.solana),
        url: "https://phantom.app/",
      },
    ];

    const handleInjectedProvider = (e: any) => {
      const providerDetail = e.detail;
      if (providerDetail && providerDetail.info) {
        setWallets((prev) => {
          if (!prev.find((w) => w.name === providerDetail.info.name)) {
            return [
              ...prev,
              {
                id: providerDetail.info.uuid,
                name: providerDetail.info.name,
                installed: true,
                icon: providerDetail.info.icon,
              },
            ];
          }
          return prev;
        });
      }
    };

    window.addEventListener("eip6963:announceProvider", handleInjectedProvider);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    setWallets((prev) => {
      const all = [...prev];
      detected.forEach((d) => {
        if (
          !all.find(
            (w) =>
              w.name.toLowerCase() === d.name.toLowerCase() ||
              (w.name.toLowerCase().includes("metamask") &&
                d.name.toLowerCase().includes("metamask")),
          )
        ) {
          all.push(d);
        }
      });
      return all;
    });

    return () =>
      window.removeEventListener(
        "eip6963:announceProvider",
        handleInjectedProvider,
      );
  }, [isOpen]);

  const handleWalletSelect = async (wallet: any) => {
    setSelectedWallet({ name: wallet.name, icon: getWalletIcon(wallet) });
    setStep("CONNECTING");

    if (wallet.id === "metamask" && typeof (window as any).ethereum !== "undefined") {
      try {
        const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
        if (accounts && accounts.length > 0) {
          setStep("SUCCESS");
          setTimeout(() => {
            onClose(accounts[0]);
          }, 1500);
          return;
        }
      } catch (error) {
        console.error("MetaMask connection error:", error);
        // It may fail in iframes or if user rejects, fallback to original mock
      }
    }

    setTimeout(() => {
      setStep("PENDING");
      setTimeout(() => {
        setStep("SUCCESS");
        setTimeout(() => {
          const generatedId = `0x${wallet.id}-${Math.random().toString(36).substring(2, 10)}`;
          onClose(generatedId);
        }, 1500);
      }, 3000);
    }, 2000);
  };

  const handleEmailSelect = () => {
    setSelectedWallet({ name: "Email" });
    setStep("CONNECTING");
    setTimeout(() => {
      setStep("SUCCESS");
      setTimeout(() => {
        const generatedId = `email-${Math.random().toString(36).substring(2, 10)}`;
        onClose(generatedId);
      }, 1500);
    }, 1500);
  };

  const handleInternetIdentitySelect = () => {
    setSelectedWallet({
      name: "Internet Identity",
      icon: <InternetIdentityIcon />,
    });
    setStep("CONNECTING");
    setTimeout(() => {
      setStep("SUCCESS");
      setTimeout(() => {
        const generatedId = `ii-${Math.random().toString(36).substring(2, 10)}`;
        onClose(generatedId);
      }, 1500);
    }, 1500);
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
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const getOrderedWallets = () => {
    const installed = wallets.filter((w) => w.installed);
    const uninstalled = [...wallets.filter((w) => !w.installed)].sort(
      (a, b) => {
        if (a.id === "phantom") return -1;
        if (b.id === "phantom") return 1;
        return 0;
      },
    );
    return [...installed, ...uninstalled];
  };

  const orderedWallets = getOrderedWallets();

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center pointer-events-auto bg-black/60 backdrop-blur-sm px-[16rem] pb-[32rem] sm:pb-0"
          onClick={() => onClose()}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 100, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-[#e9ebef] w-full sm:max-w-[400rem] rounded-[20rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[75vh] sm:max-h-[85vh] border border-[#e2e4e8]"
          >
            <div className="flex items-center justify-between px-[20rem] pt-[20rem] pb-[4rem] border-b border-transparent">
              <h3 className="font-bold text-slate-800 tracking-wide text-[18rem]">
                {step === "SELECT_WALLET" ? "Connect Wallet" : "Sign In Status"}
              </h3>
              <button
                onClick={() => onClose()}
                className="p-[8rem] -mr-[8rem] text-slate-400 hover:text-slate-800 hover:bg-black/5 rounded-[9999rem] transition-colors"
                disabled={step === "PENDING" || step === "CONNECTING"}
              >
                <X className="w-[20rem] h-[20rem]" />
              </button>
            </div>

            <div className="p-[16rem] sm:p-[20rem] flex-1 min-h-0 overflow-y-auto w-full pt-[4rem] pb-[40rem] custom-scrollbar">
              {step === "SELECT_WALLET" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <p className="text-[14rem] text-[#7a8699] mb-[16rem] px-[8rem]">
                    Select an installed wallet to sign in, or use your email.
                  </p>
                  <div className="flex flex-col gap-[8rem]">
                    <button
                      onClick={handleEmailSelect}
                      className="w-full flex flex-row items-center justify-between p-[12rem] px-[16rem] rounded-[20rem] border transition-all bg-[#f4f5f7] border-transparent hover:border-[#126b6f] hover:shadow-sm cursor-pointer hover:bg-white"
                    >
                      <div className="flex flex-row items-center gap-[12rem]">
                        <div className="w-[32rem] h-[32rem] flex items-center justify-center rounded-[10rem] overflow-hidden shrink-0 text-slate-600 bg-white shadow-sm border border-black/5">
                          <Mail
                            className="w-[18rem] h-[18rem]"
                            strokeWidth={2}
                          />
                        </div>
                        <span className="font-semibold text-slate-800 text-[14rem]">
                          Sign in with email
                        </span>
                      </div>
                      <ChevronRight className="w-[16rem] h-[16rem] text-slate-400 opacity-60" />
                    </button>

                    <div className="flex flex-col items-center gap-[8rem]">
                      <button
                        onClick={handleInternetIdentitySelect}
                        className="w-full flex flex-row items-center justify-between p-[12rem] px-[16rem] rounded-[20rem] border transition-all bg-[#f4f5f7] border-transparent hover:border-[#126b6f] hover:shadow-sm cursor-pointer hover:bg-white"
                      >
                        <div className="flex flex-row items-center gap-[12rem]">
                          <div className="w-[32rem] h-[32rem] flex items-center justify-center rounded-[10rem] overflow-hidden shrink-0 bg-white shadow-sm border border-black/5 p-[4rem]">
                            <InternetIdentityIcon />
                          </div>
                          <span className="font-semibold text-slate-800 text-[14rem]">
                            Internet Identity
                          </span>
                        </div>
                        <ChevronRight className="w-[16rem] h-[16rem] text-slate-400 opacity-60" />
                      </button>

                      <div className="flex flex-col items-center mb-[4rem]">
                        <span className="text-[13rem] text-slate-700">
                          Coming from our old site
                        </span>
                        <button className="text-[14rem] text-slate-800 underline underline-offset-2 hover:text-[#126b6f] transition-colors">
                          Retrieve account
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-center gap-[8rem] px-[8rem] py-[2rem] opacity-40">
                      <div className="flex-1 h-[1rem] bg-slate-400"></div>
                      <span className="text-[10rem] font-bold uppercase tracking-widest text-slate-500">
                        OR
                      </span>
                      <div className="flex-1 h-[1rem] bg-slate-400"></div>
                    </div>

                    {orderedWallets.length === 0 ? (
                      <div className="p-[12rem] text-center rounded-[12rem] bg-white border border-black/5 text-slate-500 text-[14rem]">
                        No compatible wallets detected.
                      </div>
                    ) : (
                      orderedWallets.map((w) => (
                        <button
                          key={w.id}
                          onClick={() =>
                            w.installed
                              ? handleWalletSelect(w)
                              : w.url && window.open(w.url, "_blank")
                          }
                          className={`w-full flex items-center justify-between p-[12rem] px-[16rem] rounded-[20rem] border transition-all ${w.installed ? "bg-[#f4f5f7] hover:bg-white border-transparent hover:border-[#126b6f] hover:shadow-sm cursor-pointer" : "bg-[#e9ebef] border-transparent hover:bg-[#f0f2f5] cursor-pointer opacity-70"}`}
                        >
                          <div className="flex flex-row items-center gap-[12rem]">
                            <div className="w-[32rem] h-[32rem] flex items-center justify-center rounded-[10rem] overflow-hidden shrink-0 bg-white shadow-sm border border-black/5">
                              {getWalletIcon(w)}
                            </div>
                            <span
                              className={`font-semibold text-[14rem] flex-1 text-left ${w.installed ? "text-slate-800" : "text-slate-500"}`}
                            >
                              {w.name}
                            </span>
                          </div>
                          {w.installed ? (
                            <div className="flex flex-row items-center justify-center gap-[6rem]">
                              <span className="text-[10rem] uppercase font-bold text-[#126b6f] bg-[#126b6f]/10 px-[8rem] py-[4rem] rounded-[9999rem]">
                                Installed
                              </span>
                              <ChevronRight className="w-[16rem] h-[16rem] text-slate-400 opacity-60" />
                            </div>
                          ) : (
                            <div className="flex flex-row items-center justify-center gap-[4rem]">
                              <span className="text-[11rem] uppercase font-bold text-[#8a9bb3]">
                                Get
                              </span>
                              <ExternalLink className="w-[16rem] h-[16rem] text-[#8a9bb3] opacity-80" />
                            </div>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

              {step === "CONNECTING" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-[40rem] text-center gap-[20rem]"
                >
                  <div className="relative">
                    {selectedWallet?.name === "Email" ? (
                      <div className="w-[64rem] h-[64rem] rounded-[16rem] bg-white shadow-md flex flex-row items-center justify-center border border-black/5 text-slate-700 z-10 relative">
                        <Mail className="w-[32rem] h-[32rem]" />
                      </div>
                    ) : selectedWallet?.icon ? (
                      <div className="w-[64rem] h-[64rem] flex items-center justify-center z-10 relative bg-white p-[12rem] rounded-[16rem] shadow-md border border-black/5 [&>svg]:w-full [&>svg]:h-full [&>img]:w-full [&>img]:h-full [&>img]:object-contain">
                        {selectedWallet.icon}
                      </div>
                    ) : null}
                    <div className="absolute inset-0 bg-[#126b6f] blur-[16rem] opacity-20 rounded-[9999rem] animate-pulse"></div>
                  </div>
                  <div className="flex flex-col items-center gap-[8rem]">
                    <h4 className="font-bold text-[18rem] text-slate-800">
                      {selectedWallet?.name === "Email"
                        ? "Connecting to Email..."
                        : "Approve connection"}
                    </h4>
                    <p className="text-[14rem] text-slate-500 max-w-[200rem] mx-auto text-center">
                      {selectedWallet?.name === "Email"
                        ? "Please wait"
                        : `Please open your ${selectedWallet?.name} extension to sign the message.`}
                    </p>
                  </div>
                </motion.div>
              )}

              {step === "PENDING" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-[40rem] text-center gap-[20rem]"
                >
                  <Loader2 className="w-[64rem] h-[64rem] text-[#126b6f] animate-spin" />
                  <div className="flex flex-col items-center gap-[8rem]">
                    <h4 className="font-bold text-[18rem] text-slate-800">
                      Sign in Pending
                    </h4>
                    <p className="text-[14rem] text-slate-500 text-center">
                      Waiting for confirmation.
                    </p>
                  </div>
                </motion.div>
              )}

              {step === "SUCCESS" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-[40rem] text-center gap-[20rem]"
                >
                  <CheckCircle2 className="w-[64rem] h-[64rem] text-emerald-500" />
                  <div className="flex flex-col items-center gap-[8rem]">
                    <h4 className="font-bold text-[18rem] text-emerald-600">
                      Sign in Successful!
                    </h4>
                    <p className="text-[14rem] text-slate-500 text-center">
                      You are now connected.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
