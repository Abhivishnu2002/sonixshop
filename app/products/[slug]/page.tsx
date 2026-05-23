"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { products, Product } from "@/data/products";
import { useApp } from "@/context/AppContext";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Zap,
  Check,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Truck,
  Plus,
  Minus,
  Maximize2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  const slug = params.slug as string;

  // Find the product matching the slug
  const product = useMemo(() => {
    return products.find((p) => p.slug === slug);
  }, [slug]);

  // States
  const [activeImage, setActiveImage] = useState("");
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews" | "faq">("description");
  const [shareCopied, setShareCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [addingToCartState, setAddingToCartState] = useState(false);

  // Set default values when product loads
  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#020617] text-[#F8FAFC]">
        <AnnouncementBar />
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <h2 className="text-xl font-bold">Product not found</h2>
          <p className="text-xs text-slate-500">The product you are looking for does not exist in our premium store.</p>
          <button
            onClick={() => router.push("/products")}
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-full"
          >
            Back to Shop Catalog
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const isFavorited = isInWishlist(product.slug);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => {
      setShareCopied(false);
    }, 2000);
  };

  const handleAddToCartClick = () => {
    if (!selectedColor) return;
    setAddingToCartState(true);
    addToCart(product, quantity, selectedColor);
    setTimeout(() => {
      setAddingToCartState(false);
    }, 8000); // 8 seconds of active visual delight or spinner
  };

  const handleBuyNowClick = () => {
    if (!selectedColor) return;
    addToCart(product, quantity, selectedColor);
    router.push("/checkout");
  };

  // Find related products in same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Mock FAQS
  const faqs = [
    {
      q: "What is the warranty coverage for this product?",
      a: "This premium device is covered by a 2-Year comprehensive replacement warranty. It covers all manufacturing defects, battery dropouts, and internal sound hardware issues.",
    },
    {
      q: "Is it compatible with all mobile operating systems?",
      a: "Yes! Sonix premium components are designed for Tomorrow and pair seamlessly with Apple iOS, Android OS, Windows, macOS, and any Bluetooth-supporting home console.",
    },
    {
      q: "How fast is the shipping?",
      a: "Standard shipping is FREE across India/USA (3-5 working days). Express delivery option (1-2 working days) can be activated at the checkout page.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-[#F8FAFC]">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-16">
        
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-700" />
          <Link href="/products" className="hover:text-white transition-colors">Catalog</Link>
          <ChevronRight className="w-3 h-3 text-slate-700" />
          <Link href={`/products?category=${product.category}`} className="hover:text-white transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-700" />
          <span className="text-indigo-400 truncate max-w-[120px]">{product.name}</span>
        </div>

        {/* Dynamic Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: IMAGE COMPONENT & GALLERY */}
          <div className="lg:col-span-6 space-y-4 flex flex-col md:flex-row-reverse gap-4">
            
            {/* Main large viewer */}
            <div className="relative aspect-square w-full rounded-[32px] overflow-hidden bg-slate-950 border border-slate-900 group">
              <Image
                src={activeImage || product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-108"
                priority
              />

              {/* Hover Fullscreen button */}
              <button
                onClick={() => setModalOpen(true)}
                className="absolute bottom-4 right-4 w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-indigo-600 text-slate-300 hover:text-white border border-white/5 flex items-center justify-center backdrop-blur transition-all active:scale-95"
                title="Fullscreen Preview"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {product.discount > 0 && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-[9px] font-bold tracking-widest text-white bg-indigo-600 rounded-full">
                    {product.discount}% OFF DEAL
                  </span>
                </div>
              )}
            </div>

            {/* Vertical/Horizontal thumbnails panel */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible shrink-0 pb-2 md:pb-0">
              {product.images.map((img, i) => {
                const isActive = img === activeImage;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-950 border shrink-0 transition-all ${
                      isActive
                        ? "border-indigo-500 scale-102 ring-1 ring-indigo-500/20"
                        : "border-slate-900 hover:border-slate-800"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} View ${i + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>

          </div>

          {/* RIGHT: BUY BOX & DATA PANEL */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title block */}
            <div className="space-y-2 border-b border-slate-900 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                {product.brand.replace("-", " ")}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                {product.name}
              </h1>

              {/* Ratings and Reviews */}
              <div className="flex items-center gap-4 pt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="text-xs font-bold text-slate-300">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-500">
                    ({product.reviewsCount} reviews)
                  </span>
                </div>
                <span className="text-slate-800">|</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  product.stock > 0
                    ? product.stock < 10
                      ? "bg-amber-950 text-amber-400"
                      : "bg-emerald-950 text-emerald-400"
                    : "bg-red-950 text-red-400"
                }`}>
                  {product.stock > 0
                    ? product.stock < 10
                      ? `ONLY ${product.stock} ITEMS LEFT`
                      : "In Stock"
                    : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-white">
                  ₹{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-slate-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="text-xs font-bold text-indigo-400">
                      Save ₹{product.originalPrice - product.price} ({product.discount}%)
                    </span>
                  </>
                )}
              </div>
              <p className="text-[10px] text-slate-500 leading-none">Inclusive of all local taxes</p>
            </div>

            {/* Short specs bullet points */}
            <div className="py-4 border-y border-slate-900 space-y-2">
              <p className="text-xs text-slate-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Interactive Color selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                  Select Accent Color: <strong className="text-slate-300 ml-1">{selectedColor?.name}</strong>
                </p>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => {
                    const active = selectedColor?.hex === color.hex;
                    const isWhite = color.hex.toLowerCase() === "#ffffff" || color.hex.toLowerCase() === "#f8fafc" || color.hex.toLowerCase() === "#fafafa";
                    return (
                      <button
                        key={color.hex}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          active
                            ? "border-indigo-500 scale-105 shadow-lg shadow-indigo-500/10"
                            : "border-slate-800 hover:border-slate-700"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {active && (
                          <Check className={`w-3.5 h-3.5 ${isWhite ? "text-black" : "text-white"}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector, Buy CTAs & Wishlist toggle */}
            <div className="space-y-4 pt-2">
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                Quantity Selector
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                
                {/* Quantity adjustments counter */}
                <div className="inline-flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-900 shrink-0">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="w-7 h-7 rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-colors disabled:opacity-30 disabled:hover:text-slate-500"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-mono text-xs font-semibold text-slate-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => Math.min(product.stock, prev + 1))}
                    disabled={quantity >= product.stock}
                    className="w-7 h-7 rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-colors disabled:opacity-30 disabled:hover:text-slate-500"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCartClick}
                  disabled={product.stock <= 0 || addingToCartState}
                  className={`flex-1 min-w-[140px] py-3 rounded-full text-xs font-bold transition-all duration-300 shadow-xl flex items-center justify-center gap-2 ${
                    addingToCartState
                      ? "bg-emerald-600 text-white shadow-emerald-500/10 cursor-default"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/10"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{addingToCartState ? "Product Added ✓" : "Add to Cart"}</span>
                </button>

                {/* Buy Now CTA */}
                <button
                  onClick={handleBuyNowClick}
                  disabled={product.stock <= 0}
                  className="flex-1 min-w-[140px] py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs rounded-full shadow-xl shadow-indigo-600/10 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Buy Now</span>
                </button>

              </div>

              {/* Utility actions: Favorite & Share */}
              <div className="flex items-center gap-6 pt-4 border-t border-slate-900/60 mt-4 text-xs text-slate-500">
                
                <button
                  onClick={() => toggleWishlist(product.slug)}
                  className={`flex items-center gap-2 hover:text-rose-500 transition-colors ${
                    isFavorited ? "text-rose-500 font-semibold" : ""
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? "fill-rose-500 text-rose-500" : ""}`} />
                  <span>{isFavorited ? "Saved in Wishlist" : "Save to Wishlist"}</span>
                </button>

                <div className="relative">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 hover:text-indigo-400 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Technology</span>
                  </button>

                  <AnimatePresence>
                    {shareCopied && (
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-slate-950 border border-slate-800 text-[9px] uppercase font-bold text-indigo-400 rounded-xl whitespace-nowrap z-30 shadow shadow-indigo-500/10"
                      >
                        Link copied ✓
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* INTERACTIVE DETAIL TABS ACCORDION */}
        <section className="border-t border-slate-900 pt-16">
          
          {/* Tab controls */}
          <div className="flex border-b border-slate-900 pb-2 overflow-x-auto gap-8 text-xs font-bold uppercase tracking-wider scrollbar-none mb-10">
            {[
              { id: "description", label: "Description" },
              { id: "specs", label: "Specifications" },
              { id: "reviews", label: `Reviews (${product.reviewsCount})` },
              { id: "faq", label: "FAQ / Guides" },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`pb-2.5 relative transition-colors ${
                    active ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <span>{tab.label}</span>
                  {active && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
              >
                
                {/* 1. DESCRIPTION TAB */}
                {activeTab === "description" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                        Acoustic & Structural Narrative
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Every single parameter of this model is optimized for absolute fidelity and a high-end luxury feel. 
                        We avoid cheap plastics and card weights, ensuring robust weight, metallic anodization, and reliable silicones.
                      </p>
                      <ul className="space-y-3 pt-2">
                        {product.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 rounded-3xl bg-slate-950/40 border border-slate-900 grid grid-cols-3 gap-6 text-center">
                      <div className="space-y-2">
                        <Truck className="w-6 h-6 text-indigo-400 mx-auto" />
                        <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-200">Express Post</h5>
                        <p className="text-[9px] text-slate-500">Free courier options</p>
                      </div>
                      <div className="space-y-2">
                        <RotateCcw className="w-6 h-6 text-purple-400 mx-auto" />
                        <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-200">Easy Returns</h5>
                        <p className="text-[9px] text-slate-500">7-Day swift checks</p>
                      </div>
                      <div className="space-y-2">
                        <ShieldCheck className="w-6 h-6 text-blue-400 mx-auto" />
                        <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-200">Full Cover</h5>
                        <p className="text-[9px] text-slate-500">2-Year support cover</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. SPECIFICATIONS TAB */}
                {activeTab === "specs" && (
                  <div className="max-w-3xl mx-auto rounded-3xl bg-[#0b0f19] border border-slate-900/60 overflow-hidden">
                    <table className="w-full text-xs">
                      <tbody>
                        {Object.entries(product.specs).map(([key, val], i) => (
                          <tr
                            key={key}
                            className={`border-b border-slate-900/40 ${
                              i % 2 === 0 ? "bg-slate-950/20" : "bg-transparent"
                            }`}
                          >
                            <td className="px-6 py-4 font-bold text-slate-400 uppercase tracking-wider w-1/3">
                              {key}
                            </td>
                            <td className="px-6 py-4 text-slate-200">
                              {val}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 3. REVIEWS TAB */}
                {activeTab === "reviews" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Rating statistics */}
                    <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0b0f19] border border-slate-900/60 text-center space-y-4">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                        Aggregate Score
                      </p>
                      <h4 className="text-5xl font-black text-white font-mono">
                        {product.rating.toFixed(1)}
                      </h4>
                      <div className="flex items-center justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              s <= Math.round(product.rating)
                                ? "fill-amber-500 text-amber-500"
                                : "text-slate-800"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Calculated from {product.reviewsCount} certified customer purchase reviews.
                      </p>
                    </div>

                    {/* Review entries */}
                    <div className="lg:col-span-8 space-y-4">
                      {[
                        {
                          name: "Rahul Verma",
                          rating: 5,
                          date: "May 20, 2026",
                          comment: "Stunning product. The sound separation is very clean. Feels heavy, sturdy, and highly high-end. I loved the glass packaging.",
                        },
                        {
                          name: "Aisha Patel",
                          rating: 4,
                          date: "May 12, 2026",
                          comment: "Highly responsive touch gesture buttons and comfortable silicones. Worth the price.",
                        },
                      ].map((rev, index) => (
                        <div
                          key={index}
                          className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="text-xs font-bold text-slate-200">{rev.name}</h5>
                              <p className="text-[9px] text-slate-500 mt-0.5">{rev.date}</p>
                            </div>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  className={`w-3 h-3 ${
                                    s <= rev.rating ? "fill-amber-500 text-amber-500" : "text-slate-800"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{rev.comment}</p>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* 4. FAQ TAB */}
                {activeTab === "faq" && (
                  <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-2xl bg-[#0b0f19] border border-slate-900/60 space-y-2"
                      >
                        <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          <span>{faq.q}</span>
                        </h4>
                        <p className="text-xs text-slate-400 pl-3.5 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

        </section>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-slate-900 pt-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                  Matches you may like
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  Related Products Collection
                </h2>
              </div>
              <Link
                href={`/products?category=${product.category}`}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
              >
                View category folder →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />

      {/* FULLSCREEN IMAGE MODAL OVERLAY */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#020617]/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-2xl aspect-square rounded-[32px] overflow-hidden border border-slate-800 bg-slate-950"
            >
              <Image
                src={activeImage || product.images[0]}
                alt={product.name}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
