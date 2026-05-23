"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 0) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const footerLinks = {
    shop: [
      { label: "All Categories", href: "/products" },
      { label: "New Arrivals", href: "/products?filter=new" },
      { label: "Best Sellers", href: "/products" },
      { label: "Deals & Coupons", href: "/products?filter=deals" },
      { label: "Track Order", href: "/order-success" },
    ],
    service: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Shipping Information", href: "#" },
      { label: "Return Policy", href: "#" },
      { label: "Order Cancellation", href: "#" },
    ],
    policies: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Return Policy", href: "#" },
      { label: "Sellers Policy", href: "#" },
      { label: "Damage Policy", href: "#" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
    sellers: [
      { label: "Become a Seller", href: "#" },
      { label: "Seller Dashboard", href: "#" },
      { label: "Sellers Policy", href: "#" },
      { label: "Join Our Community", href: "#" },
    ],
  };

  return (
    <footer className="w-full bg-[#020617] border-t border-slate-900 pt-16 pb-8 text-slate-400">
      
      {/* Visual trust pillars above footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-3xl bg-slate-950/40 border border-slate-900/60 backdrop-blur-md">
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-950/50 border border-indigo-900/40 flex items-center justify-center mb-3">
              <Truck className="w-5 h-5 text-indigo-400" />
            </div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Free Delivery
            </h4>
            <p className="text-[10px] text-slate-500 mt-1">
              On all orders above ₹499
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-950/50 border border-purple-900/40 flex items-center justify-center mb-3">
              <RotateCcw className="w-5 h-5 text-purple-400" />
            </div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Easy 7-Day Returns
            </h4>
            <p className="text-[10px] text-slate-500 mt-1">
              Hassle-free exchange policy
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-950/50 border border-blue-900/40 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Secure Payments
            </h4>
            <p className="text-[10px] text-slate-500 mt-1">
              100% encrypted checkout
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-10 h-10 rounded-2xl bg-teal-950/50 border border-teal-900/40 flex items-center justify-center mb-3">
              <Headphones className="w-5 h-5 text-teal-400" />
            </div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              24/7 Support
            </h4>
            <p className="text-[10px] text-slate-500 mt-1">
              Always here to assist you
            </p>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-900">
          
          {/* Logo & Description */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="SonixShop Logo"
                width={185}
                height={43}
                className="h-10 w-auto object-contain cursor-pointer"
              />
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Our one-stop destination for smart gadgets and accessories. 
              Redefining e-commerce with premium aesthetics, futuristic tech, and seamless UX inspired by Apple and Nothing.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-xl bg-slate-950 hover:bg-indigo-600 hover:text-white border border-slate-900 flex items-center justify-center text-slate-500 transition-all duration-200">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-xl bg-slate-950 hover:bg-indigo-600 hover:text-white border border-slate-900 flex items-center justify-center text-slate-500 transition-all duration-200">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-xl bg-slate-950 hover:bg-indigo-600 hover:text-white border border-slate-900 flex items-center justify-center text-slate-500 transition-all duration-200">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 002.11 2.11c1.858.507 9.388.507 9.388.507s7.53 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter / X" className="w-8 h-8 rounded-xl bg-slate-950 hover:bg-indigo-600 hover:text-white border border-slate-900 flex items-center justify-center text-slate-500 transition-all duration-200">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3.5">
              <h5 className="text-[11px] uppercase tracking-wider font-semibold text-slate-200">
                Shop
              </h5>
              <ul className="space-y-2 text-xs">
                {footerLinks.shop.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3.5">
              <h5 className="text-[11px] uppercase tracking-wider font-semibold text-slate-200">
                Support
              </h5>
              <ul className="space-y-2 text-xs">
                {footerLinks.service.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="hover:text-white transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3.5 col-span-2 sm:col-span-1">
              <h5 className="text-[11px] uppercase tracking-wider font-semibold text-slate-200">
                Policies
              </h5>
              <ul className="space-y-2 text-xs">
                {footerLinks.policies.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="hover:text-white transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-[11px] uppercase tracking-wider font-semibold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Join The Elite List</span>
            </h5>
            <p className="text-xs text-slate-500 leading-relaxed">
              Get updates on new product launches, future concepts, and high-tier flash deals.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-900 focus:border-indigo-600 rounded-2xl py-2.5 pl-4 pr-10 text-xs text-slate-200 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 top-2 w-7 h-7 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] text-emerald-400 font-medium"
              >
                ✓ Success! Welcome to the future of consumer tech.
              </motion.p>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4 text-[10px] text-slate-600">
          <p>© 2026 SonixShop. All rights reserved. Designed For Tomorrow.</p>

          <div className="flex items-center gap-2">
            <span className="mr-1">We accept</span>
            <div className="px-2 py-0.5 rounded border border-slate-900 bg-slate-950 font-bold tracking-tight text-slate-400">
              UPI
            </div>
            <div className="px-2 py-0.5 rounded border border-slate-900 bg-slate-950 font-bold tracking-tight text-slate-400">
              VISA
            </div>
            <div className="px-2 py-0.5 rounded border border-slate-900 bg-slate-950 font-bold tracking-tight text-slate-400">
              MASTERCARD
            </div>
            <div className="px-2 py-0.5 rounded border border-slate-900 bg-slate-950 font-bold tracking-tight text-slate-400">
              RUPAY
            </div>
          </div>
        </div>

      </div>

    </footer>
  );
};
// Add alias icon
const Truck = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="16" height="11" x="2" y="4" rx="2" />
    <path d="M16 11h4l3 3v5a1 1 0 0 1-1 1h-3" />
    <circle cx="7.5" cy="18.5" r="2.5" />
    <circle cx="16.5" cy="18.5" r="2.5" />
  </svg>
);
export default Footer;
