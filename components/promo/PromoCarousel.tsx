"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Tag, Flame, ShieldCheck, Gamepad2, Headphones } from "lucide-react";

interface SlideData {
  id: number;
  tag: string;
  tagIcon: React.ReactNode;
  tagColor: string;
  title: string;
  titleAccent: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  glowColor: string;
  image: string;
}

export const PromoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const slides: SlideData[] = [
    {
      id: 1,
      tag: "Flash Sale",
      tagIcon: <Flame className="w-3.5 h-3.5" />,
      tagColor: "bg-red-950/60 text-red-400 border-red-900/30",
      title: "Up To 70% Off",
      titleAccent: "Smart Gadgets & Accessories",
      description: "Take advantage of rare drops. Premium transparent accessories, custom mechanical keycaps, and power components marked down for a limited time.",
      ctaText: "Shop Deals",
      ctaLink: "/products?filter=deals",
      bgGradient: "from-[#020617] via-[#090b1c] to-[#020617]",
      glowColor: "rgba(99, 102, 241, 0.15)",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      tag: "New Collection",
      tagIcon: <Sparkles className="w-3.5 h-3.5" />,
      tagColor: "bg-indigo-950/60 text-indigo-400 border-indigo-900/30",
      title: "Future Ready",
      titleAccent: "Next-Gen Tech Essentials",
      description: "Discover the newest arrivals inspired by raw aesthetics. Pro high-fidelity audio, smart temperature wearables, and dual charging pedestals designed for Tomorrow.",
      ctaText: "Explore Collection",
      ctaLink: "/products?filter=new",
      bgGradient: "from-[#020617] via-[#0f0b24] to-[#020617]",
      glowColor: "rgba(168, 85, 247, 0.15)",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      tag: "Gaming Zone",
      tagIcon: <Gamepad2 className="w-3.5 h-3.5" />,
      tagColor: "bg-purple-950/60 text-purple-400 border-purple-900/30",
      title: "Level Up Your Setup",
      titleAccent: "Pro Gaming & RGB Gear",
      description: "Engineered for pure tactile responsiveness. Outfitted with high-speed keycaps, low-latency connection switches, and customized glowing desk accessories.",
      ctaText: "Shop Gaming",
      ctaLink: "/products?category=gaming",
      bgGradient: "from-[#020617] via-[#1a0c21] to-[#020617]",
      glowColor: "rgba(192, 132, 252, 0.15)",
      image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      tag: "Audio Essentials",
      tagIcon: <Headphones className="w-3.5 h-3.5" />,
      tagColor: "bg-blue-950/60 text-blue-400 border-blue-900/30",
      title: "Premium Sound",
      titleAccent: "Hi-Fi Acoustic Experience",
      description: "Immerse in total sound isolation. Premium over-ear headphones, noise-cancelling wireless earbuds, and spatial portable speakers offering absolute frequency details.",
      ctaText: "Explore Audio",
      ctaLink: "/products?category=audio",
      bgGradient: "from-[#020617] via-[#080f24] to-[#020617]",
      glowColor: "rgba(59, 130, 246, 0.15)",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 5,
      tag: "Workspace Collection",
      tagIcon: <ShieldCheck className="w-3.5 h-3.5" />,
      tagColor: "bg-emerald-950/60 text-emerald-400 border-emerald-900/30",
      title: "Build Your Perfect",
      titleAccent: "Futuristic Desk Setup",
      description: "Form meets ultimate daily function. Magnetic phone pedestals, durable silicone cable bounds, and clean multi-port charging hubs organizing your creative desktop.",
      ctaText: "Shop Workspace",
      ctaLink: "/products?category=accessories",
      bgGradient: "from-[#020617] via-[#081f18] to-[#020617]",
      glowColor: "rgba(16, 185, 129, 0.15)",
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 6,
      tag: "Budget Finds",
      tagIcon: <Tag className="w-3.5 h-3.5" />,
      tagColor: "bg-amber-950/60 text-amber-400 border-amber-900/30",
      title: "Amazing Tech",
      titleAccent: "High Quality Under ₹499",
      description: "Access premium gadgets without high premiums. Browse our curated selection of high-value chargers, fast nylon cords, key finders, and portable audio.",
      ctaText: "Shop Budget Deals",
      ctaLink: "/products?filter=deals",
      bgGradient: "from-[#020617] via-[#1a140b] to-[#020617]",
      glowColor: "rgba(245, 158, 11, 0.15)",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop",
    },
  ];

  // Start/Stop Autoplay based on engagement and animation state
  useEffect(() => {
    if (!isHovered && !isDragging && !isAnimating) {
      autoplayRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [currentIndex, isHovered, isDragging, isAnimating]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Drag/Swipe handler
  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const currentSlide = slides[currentIndex];

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full shrink-0 relative group/carousel overflow-hidden sm:overflow-visible"
    >
      <div 
        className="w-full relative rounded-[2rem] border border-slate-900 bg-slate-950 overflow-hidden h-[280px] sm:h-[350px] lg:h-[450px] transition-colors duration-500 shadow-2xl shadow-indigo-500/[0.02]"
        style={{
          boxShadow: `0 0 50px -12px ${currentSlide.glowColor}`,
        }}
      >
        
        {/* Ambient Glowing Orb */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[120px] pointer-events-none transition-all duration-700 z-0"
          style={{ backgroundColor: currentSlide.glowColor }}
        />

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            onAnimationComplete={(definition) => {
              // Ensure we only reset animation lock when the parent slide reaches its centered state.
              // This filters out child motion elements bubbling up.
              if (definition === "center") {
                setIsAnimating(false);
              }
            }}
            transition={{
              x: { ease: [0.16, 1, 0.3, 1], duration: 0.6 },
              opacity: { ease: "linear", duration: 0.3 }
            }}
            drag={isAnimating ? false : "x"}
            dragElastic={0.2}
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full flex items-center cursor-grab active:cursor-grabbing select-none z-10 touch-pan-y"
          >
            {/* Background Gradient container */}
            <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.bgGradient} opacity-95 z-0`} />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 w-full h-full px-6 sm:px-12 lg:px-16 items-center relative z-10">
              
              {/* Copywriter content column */}
              <div className="md:col-span-7 text-center md:text-left space-y-4 md:space-y-6 pt-2 md:pt-0">
                
                {/* Floating Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${currentSlide.tagColor}`}
                >
                  {currentSlide.tagIcon}
                  <span>{currentSlide.tag}</span>
                </motion.div>

                {/* Main Titles */}
                <div className="space-y-1 sm:space-y-2">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
                  >
                    {currentSlide.title}
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-base sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent leading-snug"
                  >
                    {currentSlide.titleAccent}
                  </motion.p>
                </div>

                {/* Subtitle Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-[10px] sm:text-xs text-slate-400 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium line-clamp-2 sm:line-clamp-none"
                >
                  {currentSlide.description}
                </motion.p>

                {/* CTA Action button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="pt-2"
                >
                  <Link
                    href={currentSlide.ctaLink}
                    className="inline-flex px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-xl shadow-indigo-600/10 cursor-pointer select-none"
                  >
                    {currentSlide.ctaText}
                  </Link>
                </motion.div>

              </div>

              {/* Product Visual Showcase column */}
              <div className="hidden md:flex md:col-span-5 relative items-center justify-center h-[70%] md:h-[80%] z-10">
                
                {/* Visual Glass floating pedestal */}
                <div className="absolute w-[220px] h-[220px] lg:w-[320px] lg:h-[320px] rounded-full border border-slate-900/60 pointer-events-none z-0" />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="relative w-[200px] h-[200px] lg:w-[280px] lg:h-[280px] rounded-[2rem] overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl z-10"
                >
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.titleAccent}
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover opacity-90 transition-transform duration-700 pointer-events-none"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                </motion.div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous Button (Glass Arrow) */}
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/5 bg-[#020617]/50 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center backdrop-blur transition-all active:scale-95 z-25 opacity-100 lg:opacity-0 group-hover/carousel:opacity-100 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button (Glass Arrow) */}
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/5 bg-[#020617]/50 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center backdrop-blur transition-all active:scale-95 z-25 opacity-100 lg:opacity-0 group-hover/carousel:opacity-100 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Pagination indicators bottom center */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-25 select-none">
          {slides.map((slide, idx) => {
            const active = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => {
                  if (isAnimating || idx === currentIndex) return;
                  setIsAnimating(true);
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                disabled={isAnimating}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  active ? "w-6 bg-gradient-to-r from-blue-500 to-purple-500" : "w-2 bg-slate-800 hover:bg-slate-700"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
};
