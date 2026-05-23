"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { PromoCarousel } from "@/components/promo/PromoCarousel";
import { Hero } from "@/components/hero/Hero";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { IconResolver } from "@/components/common/IconResolver";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { deals } from "@/data/deals";
import {
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  Flame,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Tick the countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to 24h
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  // Get featured products
  const featuredList = products.filter((p) => p.isFeatured).slice(0, 8);

  // Get deals products
  const dealProducts = deals.map((deal) => {
    const matchedProduct = products.find((p) => p.slug === deal.productId);
    return matchedProduct ? { ...matchedProduct, price: deal.dealPrice, badge: deal.badge } : null;
  }).filter(Boolean);

  // Get new arrivals products
  const newArrivalList = products.filter((p) => p.isNew || p.id === "prod-2" || p.id === "prod-10" || p.id === "prod-14" || p.id === "prod-25" || p.id === "prod-29").slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-[#F8FAFC]">
      <AnnouncementBar />
      <Header />
      <PromoCarousel />
      <Hero />

      {/* Trust Features / Badges Row */}
      <section className="py-8 bg-slate-950/20 border-b border-slate-900/60 hidden">
        {/* Visual trust pillars are already embedded beautifully in our Footer.tsx section to save layout duplication and give Apple-like cleanliness */}
      </section>

      {/* Shop By Category */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-semibold tracking-wider uppercase mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Explore Gear</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Shop By Category
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <Link key={cat.id} href={`/products?category=${cat.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="relative aspect-[4/3] rounded-3xl bg-slate-950/40 border border-slate-900 overflow-hidden hover:border-slate-800/80 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group"
              >
                {/* Background image & dark gradient overlay */}
                <div className="absolute inset-0 bg-slate-950">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 300px"
                    className="object-cover opacity-30 transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 shadow group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <IconResolver name={cat.icon} className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider group-hover:text-indigo-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[9px] text-slate-500 mt-1 line-clamp-1">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-slate-950/30 border-y border-slate-900/60 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-semibold tracking-wider uppercase mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>Selected Collections</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                Featured Products
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors group"
            >
              <span>Explore All Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Deals Showcase */}
      <section className="py-20 w-full bg-gradient-to-b from-[#020617] via-[#0b0e1b] to-[#020617] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Countdown info */}
            <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/50 border border-red-900/40 rounded-full text-[10px] uppercase font-bold text-red-400 tracking-wider">
                <Flame className="w-3.5 h-3.5 fill-red-400 animate-pulse" />
                <span>Flash Deals Today</span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Limited Time
                <span className="block mt-1 bg-gradient-to-r from-red-400 via-orange-400 to-indigo-400 bg-clip-text text-transparent">
                  Ultra Tech Offers
                </span>
              </h2>

              <p className="text-xs text-slate-400 max-w-sm mx-auto lg:mx-0 leading-relaxed">
                Take advantage of rare drops. Premium items marked down for 24 hours. Free delivery on orders above ₹499.
              </p>

              {/* Countdown UI */}
              <div className="flex items-center justify-center lg:justify-start gap-3.5 pt-4">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xl font-bold text-white shadow-lg">
                    {formatNumber(timeLeft.hours)}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 mt-1.5 font-bold">
                    Hrs
                  </span>
                </div>
                <span className="text-xl font-bold text-slate-700 animate-pulse">:</span>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xl font-bold text-white shadow-lg">
                    {formatNumber(timeLeft.minutes)}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 mt-1.5 font-bold">
                    Mins
                  </span>
                </div>
                <span className="text-xl font-bold text-slate-700 animate-pulse">:</span>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xl font-bold text-indigo-400 shadow-lg glow-card">
                    {formatNumber(timeLeft.seconds)}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 mt-1.5 font-bold">
                    Secs
                  </span>
                </div>
              </div>
            </div>

            {/* Deal cards grid */}
            <div className="lg:col-span-8 grid grid-cols-2 gap-4 sm:gap-6">
              {dealProducts.slice(0, 2).map((prod) => prod && (
                <div key={prod.id} className="relative">
                  <ProductCard product={prod} />
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <span className="px-2 py-0.5 text-[8px] font-bold text-white bg-red-600 rounded uppercase tracking-widest">
                      {prod.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* New Arrivals Shelf */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Future Concepts</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              New Arrivals Showcase
            </h2>
          </div>
          <Link
            href="/products?filter=new"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors group"
          >
            <span>Explore All New Drops</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Horizontal scrollable box */}
        <div className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 scrollbar-none snap-x snap-mandatory">
          {newArrivalList.map((product) => (
            <div key={product.id} className="w-[260px] shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 w-full bg-slate-950/20 border-t border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#0d1222] to-slate-950 border border-slate-900 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-12">
            
            {/* Glowing orb */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex-1 space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                Brand Core & Vision
              </h3>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Technology that simplifies life.
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                At **SonixShop**, we design and curate gadgets that seamlessly fit into your daily lifestyle. 
                Inspired by the transparent, raw minimalism of Nothing, the robust engineering of Sonos, and the ultimate integration of Apple products, our catalog guarantees premium standards only.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="text-xs font-semibold text-slate-200">Ethical Sourcing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span className="text-xs font-semibold text-slate-200">Futureproof Quality</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-xs font-semibold text-slate-200">2-Year Cover Warranty</span>
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-square rounded-[30px] overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group">
              <Image
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
                alt="Premium Audio Gear"
                fill
                sizes="(max-width: 640px) 100vw, 350px"
                className="object-cover opacity-80 transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
