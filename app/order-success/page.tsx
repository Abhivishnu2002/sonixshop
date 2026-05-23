"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";
import {
  CheckCircle2,
  Box,
  Truck,
  MapPin,
  Calendar,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function OrderSuccessPage() {
  const router = useRouter();

  // States for session order info
  const [orderId, setOrderId] = useState("SNX-592819");
  const [orderTotal, setOrderTotal] = useState("1,099");
  const [addressDetails, setAddressDetails] = useState({
    fullName: "Rohit Sharma",
    street: "123, 2nd Floor, Green Park Extension",
    city: "New Delhi",
    phone: "+91 98765 43210",
  });

  // Load order details on mount & fire confetti
  useEffect(() => {
    // 1. Pull order details from session storage
    const savedId = sessionStorage.getItem("last_order_id");
    const savedTotal = sessionStorage.getItem("last_order_total");
    const savedAddress = sessionStorage.getItem("last_order_address");

    if (savedId) setOrderId(savedId);
    if (savedTotal) setOrderTotal(savedTotal);
    if (savedAddress) {
      try {
        setAddressDetails(JSON.parse(savedAddress));
      } catch (e) {
        console.error(e);
      }
    }

    // 2. Fire premium confetti burst
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 1000 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);
      // Confetti burst from left & right sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Recommended products showcase
  const recommendations = useMemo(() => {
    return products.filter((p) => p.isFeatured || p.rating >= 4.7).slice(2, 6);
  }, []);

  // Quick fallback support
  function useMemo<T>(factory: () => T, deps: React.DependencyList): T {
    return React.useMemo(factory, deps);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-[#F8FAFC]">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        
        {/* Success header animation block */}
        <div className="text-center space-y-4 max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto"
          >
            <CheckCircle2 className="w-8 h-8 fill-emerald-500/10 text-emerald-400" />
          </motion.div>
          
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Order Confirmed!
            </h1>
            <p className="text-xs text-slate-500">
              Thank you for choosing SonixShop. Your future tech is being boxed.
            </p>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-900 font-mono text-xs text-slate-400 flex items-center justify-center gap-2">
            <span>Order Reference:</span>
            <strong className="text-indigo-400 font-bold tracking-wider">{orderId}</strong>
          </div>
        </div>

        {/* LOGISTICAL TIMELINE WORKFLOW */}
        <div className="p-6 rounded-3xl bg-slate-950/40 border border-slate-900 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 border-b border-slate-900 pb-3">
            Shipping & Tracking Timeline
          </h3>

          <div className="relative pl-6 space-y-8">
            
            {/* Thread line */}
            <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-slate-900" />

            {/* Stage 1 */}
            <div className="relative flex gap-4">
              <div className="absolute -left-[20.5px] w-3 h-3 rounded-full bg-indigo-500 border border-[#020617] ring-4 ring-indigo-500/15" />
              <Box className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <h4 className="font-bold text-slate-200">Order Placed</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Secure payment verified. Handing over to packaging.</p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="relative flex gap-4">
              <div className="absolute -left-[20.5px] w-3 h-3 rounded-full bg-slate-800 border border-[#020617]" />
              <Truck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div className="text-xs">
                <h4 className="font-semibold text-slate-400">Shipped out & In-Transit</h4>
                <p className="text-[10px] text-slate-600 mt-0.5">Estimated courier dispatch in 24 hours.</p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="relative flex gap-4">
              <div className="absolute -left-[20.5px] w-3 h-3 rounded-full bg-slate-800 border border-[#020617]" />
              <Calendar className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div className="text-xs">
                <h4 className="font-semibold text-slate-400">Delivered Target</h4>
                <p className="text-[10px] text-slate-600 mt-0.5">Expected arrival in 3–5 working days.</p>
              </div>
            </div>

          </div>
        </div>

        {/* LOGISTICAL SUMMARY SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
          
          {/* Shipping Address details */}
          <div className="p-6 rounded-3xl bg-[#0b0f19] border border-slate-900/60 space-y-2">
            <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>Logistical Target</span>
            </h4>
            <p className="font-semibold text-slate-200">{addressDetails.fullName}</p>
            <p className="text-slate-400">
              {addressDetails.street}, {addressDetails.city}
            </p>
            <p className="text-slate-500 font-medium">Contact: {addressDetails.phone}</p>
          </div>

          {/* Pricing Billing Invoice Summary */}
          <div className="p-6 rounded-3xl bg-[#0b0f19] border border-slate-900/60 space-y-3 justify-between flex flex-col">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                Payment Invoice
              </h4>
              <p className="text-xl font-mono font-extrabold text-white">
                ₹{orderTotal}
              </p>
            </div>
            <div className="text-[10px] text-slate-500 leading-normal">
              A comprehensive digital tax invoice receipt has been dispatched to your account.
            </div>
          </div>

        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white bg-slate-950/40 hover:bg-slate-900 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping catalog</span>
          </Link>

          <button
            onClick={() => alert(`Tracking System: Order ${orderId} has been successfully registered with logistics. Tracking metrics will go live in 24 hours.`)}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-full shadow-lg shadow-indigo-600/10 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Track Order log</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* RECOMMENDATION BLOCK */}
        <section className="border-t border-slate-900 pt-12 space-y-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4.5 h-4.5 text-indigo-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Popular Gadget Recommendations
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {recommendations.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
