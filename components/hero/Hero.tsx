"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#020617] pt-8 pb-16 md:pt-16 md:pb-24 border-b border-slate-900/60">
      
      {/* Cybernetic glowing background rings */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-indigo-600/10 blur-[80px] md:blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-purple-600/10 blur-[80px] md:blur-[120px] pointer-events-none animate-pulse-slow" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Copywriter content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/40 border border-indigo-900/30 text-indigo-400 font-semibold tracking-wider text-[10px] uppercase"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Tech. Better Every Day.</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              Cool Gadgets.
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Designed For Tomorrow.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Discover smart, innovative, and useful products that make life easier and more exciting. Redesigned with a futuristic glassmorphic aesthetic.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <Link
                href="/products"
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/products?filter=deals"
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white bg-slate-950/40 hover:bg-slate-900 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Explore Deals</span>
              </Link>
            </motion.div>

            {/* Micro stats banner */}
            <motion.div
              variants={itemVariants}
              className="pt-8 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 border-t border-slate-900/60 mt-8"
            >
              <div>
                <p className="text-xl font-bold text-white">50+</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                  Future Devices
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">99.8%</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                  Active Rating
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-indigo-400">₹0</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                  Delivery Fees
                </p>
              </div>
            </motion.div>

          </motion.div>

          {/* Futuristic gadget showcase panel */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient halo background circle */}
            <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] rounded-full border border-indigo-500/10 pointer-events-none" />
            <div className="absolute w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] rounded-full border border-purple-500/5 pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
              className="relative w-full max-w-[320px] sm:max-w-[420px] aspect-square rounded-[40px] bg-slate-950/40 border border-slate-900 shadow-2xl p-8 flex items-center justify-center backdrop-blur-md glow-card"
            >
              {/* Inner floating image container */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="relative w-[80%] h-[80%] rounded-[30px] overflow-hidden bg-slate-950 border border-slate-800 shadow-xl flex items-center justify-center"
              >
                <Image
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop"
                  alt="Futuristic Wearable Render"
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                
                {/* Visual Glass overlays on the gadget */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 border border-white/5 p-3 rounded-2xl backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-none font-bold">
                        AeroFit Wearable
                      </p>
                      <p className="text-xs font-bold text-white mt-1">
                        Sonix Chrono-OS v2
                      </p>
                    </div>
                    <span className="px-2 py-0.5 text-[8px] font-bold text-indigo-400 bg-indigo-950 border border-indigo-900/30 rounded">
                      ₹599
                    </span>
                  </div>
                </div>

              </motion.div>

              {/* Float micro tag widgets */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute top-8 -right-6 px-3 py-1.5 bg-[#0b0f19]/90 border border-slate-800 rounded-xl flex items-center gap-1.5 shadow-lg shadow-black/40 backdrop-blur-sm"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[9px] text-slate-300 font-bold uppercase tracking-wider">
                  In Stock
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
                className="absolute bottom-16 -left-6 px-3 py-1.5 bg-[#0b0f19]/90 border border-slate-800 rounded-xl flex items-center gap-1.5 shadow-lg shadow-black/40 backdrop-blur-sm"
              >
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[9px] text-slate-300 font-medium">
                  UWB Active Mesh
                </span>
              </motion.div>

            </motion.div>

          </div>

        </div>
      </div>

    </section>
  );
};
export default Hero;
