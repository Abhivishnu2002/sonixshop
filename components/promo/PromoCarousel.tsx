"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, PanInfo, type Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Tag,
  Flame,
  ShieldCheck,
  Gamepad2,
  Headphones,
  ArrowRight,
} from "lucide-react";

interface SlideData {
  id: number;
  tag: string;
  tagIcon: React.ReactNode;
  tagColor: string;
  headline: string;
  subheadline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  bannerImage: string;
  overlayGradient: string;
  accentColor: string;
}

const AUTOPLAY_INTERVAL = 5000;

// Cubic bezier easing typed as a tuple so TS satisfies Framer Motion's Easing type
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Slide variants (typed as Variants to avoid 'number[]' inference) ───────
const bgVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", scale: 1.08 }),
  center: {
    x: "0%",
    scale: 1.05,
    transition: {
      x: { ease: EASE_OUT, duration: 0.75 },
      scale: { duration: 6, ease: "linear" },
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    scale: 1.08,
    transition: { x: { ease: EASE_OUT, duration: 0.75 } },
  }),
};

const contentVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

const tagVariants: Variants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.45, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const headlineVariants: Variants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0, transition: { delay: 0.18, duration: 0.55, ease: EASE_OUT } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

const subVariants: Variants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0, transition: { delay: 0.26, duration: 0.55, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const descVariants: Variants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0, transition: { delay: 0.34, duration: 0.5, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const ctaVariants: Variants = {
  enter: { opacity: 0, scale: 0.93 },
  center: { opacity: 1, scale: 1, transition: { delay: 0.42, duration: 0.5, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const slides: SlideData[] = [
  {
    id: 1,
    tag: "Flash Sale",
    tagIcon: <Flame className="w-3.5 h-3.5" />,
    tagColor: "bg-red-950/70 text-red-400 border-red-800/50",
    headline: "Up To 70% Off",
    subheadline: "Smart Gadgets & Accessories",
    description:
      "Rare drops. Premium earbuds, smartwatches, and speakers — marked down for 24 hours only.",
    ctaText: "Shop Deals Now",
    ctaLink: "/products?filter=deals",
    ctaSecondaryText: "View All Offers",
    ctaSecondaryLink: "/products",
    bannerImage: "/banners/banner_flash_sale.png",
    overlayGradient:
      "from-black/80 via-black/50 to-black/20 lg:from-black/85 lg:via-black/60 lg:to-transparent",
    accentColor: "from-red-500 via-orange-500 to-amber-500",
  },
  {
    id: 2,
    tag: "New Collection",
    tagIcon: <Sparkles className="w-3.5 h-3.5" />,
    tagColor: "bg-indigo-950/70 text-indigo-400 border-indigo-800/50",
    headline: "Future Ready",
    subheadline: "Next-Gen Tech Essentials",
    description:
      "Foldable phones, transparent wearables, and minimalist earbuds built for tomorrow's lifestyle.",
    ctaText: "Explore Collection",
    ctaLink: "/products?filter=new",
    ctaSecondaryText: "New Arrivals",
    ctaSecondaryLink: "/products?filter=new",
    bannerImage: "/banners/banner_new_collection.png",
    overlayGradient:
      "from-black/80 via-black/50 to-black/20 lg:from-black/85 lg:via-black/60 lg:to-transparent",
    accentColor: "from-indigo-400 via-blue-400 to-cyan-400",
  },
  {
    id: 3,
    tag: "Premium Audio",
    tagIcon: <Headphones className="w-3.5 h-3.5" />,
    tagColor: "bg-purple-950/70 text-purple-400 border-purple-800/50",
    headline: "Immersive Sound",
    subheadline: "Hi-Fi Acoustic Experience",
    description:
      "Total sound isolation. Over-ear headphones, noise-cancelling earbuds, and portable spatial speakers.",
    ctaText: "Explore Audio",
    ctaLink: "/products?category=audio",
    ctaSecondaryText: "Best Sellers",
    ctaSecondaryLink: "/products?category=audio",
    bannerImage: "/banners/banner_audio.png",
    overlayGradient:
      "from-black/80 via-black/50 to-black/20 lg:from-black/85 lg:via-black/60 lg:to-transparent",
    accentColor: "from-purple-400 via-violet-400 to-fuchsia-400",
  },
  {
    id: 4,
    tag: "Gaming Zone",
    tagIcon: <Gamepad2 className="w-3.5 h-3.5" />,
    tagColor: "bg-rose-950/70 text-rose-400 border-rose-800/50",
    headline: "Level Up Your Setup",
    subheadline: "Pro Gaming & RGB Gear",
    description:
      "Mechanical keyboards, low-latency mice, and gaming headsets engineered for peak performance.",
    ctaText: "Shop Gaming",
    ctaLink: "/products?category=gaming",
    ctaSecondaryText: "Featured Gear",
    ctaSecondaryLink: "/products?category=gaming",
    bannerImage: "/banners/banner_gaming.png",
    overlayGradient:
      "from-black/80 via-black/50 to-black/20 lg:from-black/85 lg:via-black/60 lg:to-transparent",
    accentColor: "from-rose-400 via-red-400 to-orange-400",
  },
  {
    id: 5,
    tag: "Workspace",
    tagIcon: <ShieldCheck className="w-3.5 h-3.5" />,
    tagColor: "bg-emerald-950/70 text-emerald-400 border-emerald-800/50",
    headline: "Build Your Dream",
    subheadline: "Futuristic Desk Setup",
    description:
      "Wireless charging pads, multi-port hubs, cable management, and premium monitors for your ideal workspace.",
    ctaText: "Shop Workspace",
    ctaLink: "/products?category=accessories",
    ctaSecondaryText: "View Setups",
    ctaSecondaryLink: "/products?category=accessories",
    bannerImage: "/banners/banner_workspace.png",
    overlayGradient:
      "from-black/80 via-black/50 to-black/20 lg:from-black/85 lg:via-black/60 lg:to-transparent",
    accentColor: "from-emerald-400 via-teal-400 to-cyan-400",
  },
  {
    id: 6,
    tag: "Budget Finds",
    tagIcon: <Tag className="w-3.5 h-3.5" />,
    tagColor: "bg-amber-950/70 text-amber-400 border-amber-800/50",
    headline: "Amazing Tech",
    subheadline: "High Quality Under ₹499",
    description:
      "Premium-grade cables, chargers, earbuds, key finders, and stands without the premium price tag.",
    ctaText: "Shop Budget Deals",
    ctaLink: "/products?filter=deals",
    ctaSecondaryText: "Under ₹499",
    ctaSecondaryLink: "/products?filter=deals",
    bannerImage: "/banners/banner_budget.png",
    overlayGradient:
      "from-black/80 via-black/50 to-black/20 lg:from-black/85 lg:via-black/60 lg:to-transparent",
    accentColor: "from-amber-400 via-yellow-400 to-orange-400",
  },
];

export const PromoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const clearAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [isAnimating]);

  const goToSlide = useCallback(
    (idx: number) => {
      if (isAnimating || idx === currentIndex) return;
      setIsAnimating(true);
      setDirection(idx > currentIndex ? 1 : -1);
      setCurrentIndex(idx);
    },
    [isAnimating, currentIndex]
  );

  // Autoplay
  useEffect(() => {
    clearAutoplay();
    if (!isHovered && !isDragging && !isAnimating) {
      autoplayRef.current = setInterval(goToNext, AUTOPLAY_INTERVAL);
    }
    return clearAutoplay;
  }, [currentIndex, isHovered, isDragging, isAnimating, goToNext]);

  const handleDragEnd = (event: unknown, info: PanInfo) => {
    setIsDragging(false);
    if (info.offset.x < -50) goToNext();
    else if (info.offset.x > 50) goToPrev();
  };

  const slide = slides[currentIndex];


  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Main container ─────────────────────────────────── */}
      <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl">

        {/* ── Background layer (Ken Burns image) ─────────── */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={`bg-${currentIndex}`}
              custom={direction}
              variants={bgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={slide.bannerImage}
                alt={slide.subheadline}
                fill
                className="object-cover object-center"
                priority={currentIndex === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px"
                quality={90}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Dark overlay ────────────────────────────────── */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${slide.overlayGradient} transition-opacity duration-700 z-10`}
        />
        {/* Bottom fade for dot indicators */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none" />

        {/* ── Draggable content layer ─────────────────────── */}
        <motion.div
          drag={isAnimating ? false : "x"}
          dragElastic={0.15}
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing select-none touch-pan-y"
        >
          {/* ── Animated content ───────────────────────────── */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={`content-${currentIndex}`}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onAnimationComplete={(def) => {
                if (def === "center") setIsAnimating(false);
              }}
              className="absolute inset-0 flex items-center"
            >
              {/* ── Text block ─────────────────────────────── */}
              <div className="w-full px-6 sm:px-10 lg:px-16 max-w-[640px] lg:max-w-[580px]">

                {/* Tag badge */}
                <motion.div
                  key={`tag-${currentIndex}`}
                  custom={direction}
                  variants={tagVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm mb-4 ${slide.tagColor}`}
                >
                  {slide.tagIcon}
                  <span>{slide.tag}</span>
                </motion.div>

                {/* Main headline */}
                <motion.h2
                  key={`h2-${currentIndex}`}
                  custom={direction}
                  variants={headlineVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.05] tracking-tight mb-1 sm:mb-2"
                >
                  {slide.headline}
                </motion.h2>

                {/* Gradient sub-headline */}
                <motion.p
                  key={`sub-${currentIndex}`}
                  custom={direction}
                  variants={subVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`text-base sm:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r ${slide.accentColor} bg-clip-text text-transparent leading-snug mb-3 sm:mb-4`}
                >
                  {slide.subheadline}
                </motion.p>

                {/* Description — hidden on small mobile */}
                <motion.p
                  key={`desc-${currentIndex}`}
                  custom={direction}
                  variants={descVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="hidden sm:block text-xs sm:text-sm text-white/70 leading-relaxed mb-5 sm:mb-6 max-w-sm font-medium"
                >
                  {slide.description}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  key={`cta-${currentIndex}`}
                  custom={direction}
                  variants={ctaVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex items-center gap-3 flex-wrap"
                >
                  <Link
                    href={slide.ctaLink}
                    className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r ${slide.accentColor} shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {slide.ctaText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  {slide.ctaSecondaryText && (
                    <Link
                      href={slide.ctaSecondaryLink ?? "#"}
                      className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-white/80 border border-white/20 backdrop-blur-sm hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {slide.ctaSecondaryText}
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Prev button ─────────────────────────────────── */}
        <button
          onClick={goToPrev}
          disabled={isAnimating}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-white/20 active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* ── Next button ─────────────────────────────────── */}
        <button
          onClick={goToNext}
          disabled={isAnimating}
          aria-label="Next slide"
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-white/20 active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* ── Slide counter (top-right) ────────────────────── */}
        <div className="absolute top-4 right-4 z-30 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm">
          <span className="text-[10px] font-bold text-white tabular-nums">{currentIndex + 1}</span>
          <span className="text-[10px] text-white/40">/</span>
          <span className="text-[10px] text-white/50 tabular-nums">{slides.length}</span>
        </div>

        {/* ── Dot pagination ───────────────────────────────── */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((s, idx) => {
            const active = idx === currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => goToSlide(idx)}
                disabled={isAnimating}
                aria-label={`Go to slide ${idx + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  active
                    ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            );
          })}
        </div>

        {/* ── Progress bar ─────────────────────────────────── */}
        {!isHovered && !isDragging && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] z-30 bg-white/10 overflow-hidden">
            <motion.div
              key={currentIndex}
              className="h-full bg-white/50"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
