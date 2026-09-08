import React, { useState } from "react";
import { Bell, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  type: "success" | "warning" | "error" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "error",
    title: "Conversion Failed",
    message: "Your bonus to on-chain token conversion failed due to on-chain settlement. The swapped bonus has been returned to your balance.",
    time: "2 mins ago",
    read: false,
  },
  {
    id: "2",
    type: "success",
    title: "Deposit Successful",
    message: "Your deposit of 50.00 USDC has been credited to your account.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "3",
    type: "info",
    title: "Welcome to Randseed!",
    message: "Claim your free bonuses to play for fun and win crypto prizes.",
    time: "3 days ago",
    read: true,
  }
];

export const InboxPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "error": return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "success": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F3F4F6] min-h-full pb-8 overflow-y-auto">
      <div className="bg-white sticky top-0 z-10 border-b border-black/5 px-4 py-4 flex items-center justify-between">
        <h1 className="text-[20px] font-bold text-black flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Inbox
        </h1>
        {notifications.some(n => !n.read) && (
          <button 
            onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))}
            className="text-[13px] font-semibold text-[#6A3FE6] hover:text-[#5B36C4] transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="p-4 max-w-[600px] w-full mx-auto flex flex-col gap-3">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => markAsRead(notif.id)}
              className={`bg-white rounded-xl p-4 shadow-sm border ${notif.read ? 'border-black/5' : 'border-[#6A3FE6]/30'} flex gap-4 cursor-pointer relative overflow-hidden transition-all hover:shadow-md`}
            >
              {!notif.read && (
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#6A3FE6]"></div>
              )}
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-semibold text-[15px] ${notif.read ? 'text-black/80' : 'text-black'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-[12px] text-black/40 whitespace-nowrap ml-2">
                    {notif.time}
                  </span>
                </div>
                <p className="text-[14px] text-black/60 leading-snug">
                  {notif.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Bell className="w-12 h-12 text-black/20 mb-4" />
            <p className="text-black/40 font-medium">No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};
