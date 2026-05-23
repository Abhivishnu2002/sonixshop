"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
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

// ─── Types ───────────────────────────────────────────────────────────────────
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
  accentColor: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const AUTOPLAY_INTERVAL = 5000;
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Animation Variants ───────────────────────────────────────────────────────
// ONE parent block animation instead of 6 separate child animations.
// Reduces Framer Motion's JS animation loops from 6 → 1 per transition.
const contentVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 28 : -28 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.42, ease: EASE_OUT },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -18 : 18,
    transition: { duration: 0.22, ease: "easeIn" },
  }),
};

// ─── Slide Data ───────────────────────────────────────────────────────────────
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
    accentColor: "from-amber-400 via-yellow-400 to-orange-400",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
// memo() prevents re-renders when the parent (Home) re-renders every second
// from the countdown timer — the carousel takes no props so memo is a free win.
export const PromoCarousel = memo(function PromoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Stable ref so clearAutoplay doesn't recreate on every render
  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

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

  useEffect(() => {
    clearAutoplay();
    if (!isHovered && !isDragging && !isAnimating) {
      autoplayRef.current = setInterval(goToNext, AUTOPLAY_INTERVAL);
    }
    return clearAutoplay;
  }, [currentIndex, isHovered, isDragging, isAnimating, goToNext, clearAutoplay]);

  const handleDragEnd = useCallback(
    (_event: unknown, info: PanInfo) => {
      setIsDragging(false);
      if (info.offset.x < -50) goToNext();
      else if (info.offset.x > 50) goToPrev();
    },
    [goToNext, goToPrev]
  );

  const slide = slides[currentIndex];

  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl">

        {/* ── Background images ─────────────────────────────────────
            All 6 images are ALWAYS in the DOM — never unmounted.
            CSS opacity crossfade between them (compositor-thread only).
            Ken Burns is a CSS transition on the wrapper div (no JS).
            This eliminates every single image-loading flash on slide change.
        ──────────────────────────────────────────────────────────── */}
        <div className="absolute inset-0" aria-hidden="true">
          {slides.map((s, i) => {
            const isActive = i === currentIndex;
            return (
              <div
                key={s.id}
                className="absolute inset-0"
                style={{
                  // CSS opacity crossfade — compositor thread, zero JS
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 650ms ease-in-out",
                  zIndex: isActive ? 1 : 0,
                }}
              >
                {/* Ken Burns wrapper: CSS transform transition — compositor thread.
                    Inactive → scale(1.07) instantly (hidden, no animation shown).
                    Active   → transition to scale(1.01) over 7s (slow zoom).
                    No JS RAF loop, no Framer Motion overhead for this effect. */}
                <div
                  className="absolute inset-0"
                  style={{
                    transform: isActive ? "scale(1.01)" : "scale(1.07)",
                    transition: isActive ? "transform 7000ms ease-out" : "none",
                    willChange: isActive ? "transform" : "auto",
                  }}
                >
                  <Image
                    src={s.bannerImage}
                    alt={s.subheadline}
                    fill
                    className="object-cover object-center"
                    // Preload first 2 slides immediately; browser fetches rest
                    // in background since they're in the DOM from mount.
                    priority={i < 2}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px"
                    quality={75}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Static dark gradient overlay — no dynamic className binding */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20 z-10 pointer-events-none" />
        {/* Bottom scrim for dot legibility */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none" />

        {/* ── Draggable + Content layer ─────────────────────────────
            Single AnimatePresence for the WHOLE content block.
            1 Framer Motion RAF loop instead of 6 (tag + h2 + p + p + div).
            No mode="wait" → exit and enter run simultaneously.
            Perceived transition feels ~2× faster.
        ──────────────────────────────────────────────────────────── */}
        <motion.div
          drag={isAnimating ? false : "x"}
          dragElastic={0.12}
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing select-none touch-pan-y"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onAnimationComplete={(def) => {
                if (def === "center") setIsAnimating(false);
              }}
              className="absolute inset-0 flex items-center will-change-transform"
            >
              <div className="w-full px-6 sm:px-10 lg:px-16 max-w-[640px] lg:max-w-[580px]">

                {/* Tag badge */}
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm mb-4 ${slide.tagColor}`}
                >
                  {slide.tagIcon}
                  <span>{slide.tag}</span>
                </div>

                {/* Main headline */}
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.05] tracking-tight mb-1 sm:mb-2">
                  {slide.headline}
                </h2>

                {/* Gradient sub-headline */}
                <p
                  className={`text-base sm:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r ${slide.accentColor} bg-clip-text text-transparent leading-snug mb-3 sm:mb-4`}
                >
                  {slide.subheadline}
                </p>

                {/* Description — hidden on mobile to reduce layout cost */}
                <p className="hidden sm:block text-xs sm:text-sm text-white/70 leading-relaxed mb-5 sm:mb-6 max-w-sm font-medium">
                  {slide.description}
                </p>

                {/* CTAs */}
                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    href={slide.ctaLink}
                    className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r ${slide.accentColor} shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 active:scale-95 cursor-pointer`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {slide.ctaText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  {slide.ctaSecondaryText && (
                    <Link
                      href={slide.ctaSecondaryLink ?? "#"}
                      className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-white/80 border border-white/20 backdrop-blur-sm hover:bg-white/10 hover:text-white transition-colors duration-300 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {slide.ctaSecondaryText}
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Prev button */}
        <button
          onClick={goToPrev}
          disabled={isAnimating}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-white/20 active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Next button */}
        <button
          onClick={goToNext}
          disabled={isAnimating}
          aria-label="Next slide"
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-white/20 active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Slide counter */}
        <div className="absolute top-4 right-4 z-30 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm">
          <span className="text-[10px] font-bold text-white tabular-nums">{currentIndex + 1}</span>
          <span className="text-[10px] text-white/40">/</span>
          <span className="text-[10px] text-white/50 tabular-nums">{slides.length}</span>
        </div>

        {/* Dot pagination */}
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
                  active ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            );
          })}
        </div>

        {/* Progress bar — always rendered to avoid layout shift on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-30 bg-white/10 overflow-hidden">
          {!isHovered && !isDragging && (
            <motion.div
              key={currentIndex}
              className="h-full bg-white/50"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
            />
          )}
        </div>
      </div>
    </div>
  );
});
