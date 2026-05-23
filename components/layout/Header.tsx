"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  Globe,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const {
    cart,
    wishlist,
    selectedCountry,
    setSelectedCountry,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search suggestions / dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setCountryDropdownOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const filteredSuggestions = searchQuery
    ? products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFocused(false);
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const countries = ["India", "USA", "UK", "Canada", "Singapore"];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#020617]/75 backdrop-blur-md border-b border-slate-900 shadow-lg shadow-indigo-500/5 py-3.5"
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-slate-300 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo.png"
                alt="SonixShop Logo"
                width={280}
                height={66}
                className="w-[160px] h-[37px] md:w-[210px] md:h-[50px] lg:w-[280px] lg:h-[66px] object-contain cursor-pointer transition-all duration-300"
                priority
              />
            </Link>
          </div>

          {/* Search bar - Desktop */}
          <div ref={searchRef} className="hidden md:block flex-1 max-w-md relative mx-4">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search future tech, audio, smart watches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500/80 rounded-full py-2 pl-4 pr-10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-indigo-400 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Live Search Suggestions Dropdown */}
            <AnimatePresence>
              {searchFocused && (searchQuery.trim().length > 0 || filteredSuggestions.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#0b0f19] border border-slate-800 rounded-2xl shadow-xl overflow-hidden z-50 backdrop-blur-lg"
                >
                  {filteredSuggestions.length > 0 ? (
                    <div className="p-2">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold px-3 py-1">
                        Suggested Products
                      </p>
                      {filteredSuggestions.map((prod) => (
                        <button
                          key={prod.id}
                          onClick={() => {
                            setSearchFocused(false);
                            router.push(`/products/${prod.slug}`);
                          }}
                          className="w-full text-left flex items-center gap-3 p-2 hover:bg-slate-900 rounded-xl transition-colors"
                        >
                          <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-slate-950">
                            <Image
                              src={prod.images[0]}
                              alt={prod.name}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-medium text-slate-200 truncate">
                              {prod.name}
                            </h4>
                            <p className="text-[10px] text-indigo-400 font-semibold">
                              ₹{prod.price}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                        </button>
                      ))}
                      <div className="border-t border-slate-900 mt-1 p-2">
                        <button
                          onClick={() => {
                            setSearchFocused(false);
                            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                          }}
                          className="w-full text-center text-xs text-indigo-400 hover:text-indigo-300 font-medium py-1 transition-colors"
                        >
                          View all search results
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-500">
                      No matching high-end products found
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Navigation controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Country Selector */}
            <div ref={countryRef} className="relative hidden lg:block">
              <button
                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedCountry}</span>
                <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${countryDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {countryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-32 bg-[#0b0f19] border border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    {countries.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setSelectedCountry(c);
                          setCountryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs transition-colors hover:bg-slate-900 ${
                          selectedCountry === c ? "text-indigo-400 font-semibold bg-slate-900/40" : "text-slate-300"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Account Selector */}
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                  <User className="w-3.5 h-3.5 text-slate-300" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-[10px] text-slate-500 leading-none">Welcome</p>
                  <p className="font-medium mt-0.5">Account</p>
                </div>
                <ChevronDown className={`w-3 h-3 text-slate-500 hidden sm:block transition-transform ${accountDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {accountDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-[#0b0f19] border border-slate-800 rounded-2xl shadow-xl z-50 p-2"
                  >

                    <div className="py-1">
                      <Link
                        href="/products"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="block w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-900 rounded-lg transition-colors"
                      >
                        Shop All Products
                      </Link>
                      <Link
                        href="/cart"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="block w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-900 rounded-lg transition-colors"
                      >
                        My Shopping Cart
                      </Link>
                    </div>
                    <div className="border-t border-slate-900 pt-1">
                      <button
                        onClick={() => setAccountDropdownOpen(false)}
                        className="w-full text-left px-3 py-1.5 text-xs text-red-400 hover:bg-red-950/20 rounded-lg transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Link */}
            <Link
              href="/products?filter=wishlist"
              className="relative p-1 text-slate-400 hover:text-rose-500 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? "fill-rose-500 text-rose-500" : ""}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#020617]">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              href="/cart"
              className="relative p-1 text-slate-400 hover:text-indigo-400 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#020617]">
                  {totalCartItems}
                </span>
              )}
            </Link>

          </div>

        </div>

        {/* Categories Bar - Desktop Only */}
        <div className="hidden lg:flex items-center justify-between border-t border-slate-900 mt-4 pt-3 text-xs">
          <nav className="flex items-center gap-6">
            <Link
              href="/products"
              className={`hover:text-white transition-colors py-1 ${
                pathname === "/products" ? "text-indigo-400 font-semibold" : "text-slate-400"
              }`}
            >
              All Categories
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className={`hover:text-white transition-colors py-1 ${
                  pathname.includes(cat.slug) ? "text-indigo-400 font-semibold" : "text-slate-400"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/products?filter=new" className="hover:text-white transition-colors">
              New Arrivals
            </Link>
            <span className="text-slate-800">|</span>
            <Link href="/products?filter=deals" className="hover:text-white transition-colors text-indigo-400 font-medium">
              Best Deals
            </Link>
          </div>
        </div>

      </div>

      {/* Slide-out Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black lg:hidden"
            />

            {/* Content Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 z-50 w-72 max-w-full bg-[#050913] border-r border-slate-800 p-6 flex flex-col justify-between shadow-2xl lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <Image
                    src="/logo.png"
                    alt="SonixShop Logo"
                    width={200}
                    height={48}
                    className="w-[200px] h-[48px] object-contain cursor-pointer"
                  />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Search */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                  }}
                  className="mb-6"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    <button type="submit" className="absolute right-2.5 top-2 text-slate-500">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider mb-3">
                  Categories
                </p>
                <div className="flex flex-col gap-2.5 text-sm">
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-slate-300 hover:text-white transition-colors py-1 flex items-center justify-between"
                  >
                    <span>All Products</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  </Link>

                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-slate-300 hover:text-white transition-colors py-1 flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                    </Link>
                  ))}
                </div>

                <div className="border-t border-slate-900 my-6 pt-6">
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/products?filter=new"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-slate-300 hover:text-white text-sm"
                    >
                      New Arrivals
                    </Link>
                    <Link
                      href="/products?filter=deals"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold"
                    >
                      Best Deals Under ₹499
                    </Link>
                  </div>
                </div>
              </div>

              {/* Drawer Footer info */}
              <div className="border-t border-slate-900 pt-6">
                <p className="text-[10px] text-slate-600">
                  © 2026 SonixShop. All rights reserved. Designed For Tomorrow.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Header;
