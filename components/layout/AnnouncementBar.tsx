"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Truck, Tag } from "lucide-react";

interface Announcement {
  id: number;
  text: string;
  icon: React.ReactNode;
}

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const announcements: Announcement[] = [
    {
      id: 1,
      text: "Free delivery on all premium orders above ₹499",
      icon: <Truck className="w-3.5 h-3.5 text-indigo-400" />,
    },
    {
      id: 2,
      text: "Summer Electronics Sale: Save up to 50% on audio & gaming",
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" />,
    },
    {
      id: 3,
      text: "Use code SONIX20 for a premium 20% off first order",
      icon: <Tag className="w-3.5 h-3.5 text-blue-400" />,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <div className="relative w-full h-8 overflow-hidden bg-slate-950 border-b border-slate-900 flex items-center justify-center text-[11px] font-medium tracking-wider text-slate-300">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2"
        >
          {announcements[currentIndex].icon}
          <span>{announcements[currentIndex].text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default AnnouncementBar;
