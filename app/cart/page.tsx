"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/context/AppContext";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  ChevronRight,
  Tag,
  CheckCircle2,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    discountCode,
    discountPercentage,
    applyDiscountCode,
  } = useApp();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState(false);
  const [couponSuccess, setCouponSuccess] = useState(false);

  // Computations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Free delivery above ₹499 logic
  const shippingThreshold = 499;
  const rawShipping = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 99;
  const remainingForFreeShipping = Math.max(0, shippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / shippingThreshold) * 100);

  // Discount percentage
  const discountAmount = Math.round((subtotal * discountPercentage) / 100);

  // Final shipping override if FREESHIP applied or threshold met
  const shippingCharge = discountCode === "FREESHIP" ? 0 : rawShipping;

  const totalAmount = Math.max(0, subtotal - discountAmount + shippingCharge);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(false);
    setCouponSuccess(false);

    if (couponInput.trim().length === 0) return;

    const success = applyDiscountCode(couponInput);
    if (success) {
      setCouponSuccess(true);
      setCouponInput("");
    } else {
      setCouponError(true);
    }
  };

  const handleCheckoutClick = () => {
    if (cart.length > 0) {
      router.push("/checkout");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-[#F8FAFC]">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-700" />
          <span className="text-indigo-400">Shopping Cart</span>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: LIST OF CART ITEMS */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Shipping progress indicator */}
              <div className="p-5 rounded-3xl bg-[#0b0f19] border border-slate-900/60 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">
                    {subtotal >= shippingThreshold
                      ? "Congratulations! You qualified for FREE Delivery."
                      : `Add ₹${remainingForFreeShipping} more to qualify for FREE Delivery`}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-400">
                    ₹{subtotal} / ₹{shippingThreshold}
                  </span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-900">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List container */}
              <div className="space-y-4">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.color.hex}`}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0, padding: 0, margin: 0 }}
                      className="p-5 rounded-3xl bg-slate-950/40 border border-slate-900 flex flex-col sm:flex-row items-center gap-4 hover:border-slate-800 transition-colors"
                    >
                      {/* Product Thumbnail image */}
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-950 shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info and Color swatches */}
                      <div className="flex-1 space-y-1.5 text-center sm:text-left min-w-0">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                          {item.product.brand.replace("-", " ")}
                        </span>
                        <h4 className="text-xs font-bold text-slate-200 truncate hover:text-indigo-400 transition-colors">
                          <Link href={`/products/${item.product.slug}`}>{item.product.name}</Link>
                        </h4>
                        
                        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[10px] text-slate-400">
                          <span>Selected color:</span>
                          <span
                            className="inline-block w-2.5 h-2.5 rounded-full border border-slate-700"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <span className="font-semibold text-slate-300">{item.color.name}</span>
                        </div>
                      </div>

                      {/* Edit Quantity adjustments */}
                      <div className="inline-flex items-center bg-slate-950 p-1 rounded-xl border border-slate-900 shrink-0">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.color.hex, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-mono text-xs font-semibold text-slate-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.color.hex, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Pricing block */}
                      <div className="text-center sm:text-right shrink-0 min-w-[90px]">
                        <p className="text-xs font-bold text-slate-100">
                          ₹{item.product.price * item.quantity}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          ₹{item.product.price} each
                        </p>
                      </div>

                      {/* Delete item button */}
                      <button
                        onClick={() => removeFromCart(item.product.id, item.color.hex)}
                        className="p-2 text-slate-500 hover:text-red-500 rounded-xl hover:bg-red-950/20 border border-slate-900/50 transition-all shrink-0"
                        title="Remove from Cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Continue Shopping button */}
              <div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>Continue Shopping Catalog</span>
                </Link>
              </div>

            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY CARD & COUPON */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Promo code field */}
              <div className="p-6 rounded-3xl bg-[#0b0f19] border border-slate-900/60 space-y-4">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Apply Promotional Coupon</span>
                </h4>
                
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (SONIX20)..."
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-900 rounded-2xl py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-600 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-2xl transition-colors shadow shadow-indigo-600/10"
                  >
                    Apply
                  </button>
                </form>

                {couponSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Coupon Applied Successfully!</span>
                  </motion.div>
                )}

                {couponError && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-red-400 font-medium"
                  >
                    ✗ Invalid promo coupon code. Try SONIX20
                  </motion.p>
                )}

                {discountCode && (
                  <div className="p-2 rounded-xl bg-indigo-950/20 border border-indigo-900/20 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-indigo-400 uppercase">
                      Code Active: {discountCode}
                    </span>
                    <span className="font-bold text-slate-200">
                      -{discountPercentage}% Off Invoice
                    </span>
                  </div>
                )}
              </div>

              {/* Order Calculations Invoice Card */}
              <div className="p-6 rounded-3xl bg-slate-950/40 border border-slate-900 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 border-b border-slate-900 pb-3">
                  Invoice Order Summary
                </h3>

                <div className="space-y-3 text-xs">
                  
                  <div className="flex justify-between text-slate-400">
                    <span>Invoice Subtotal</span>
                    <span className="font-mono text-slate-200">₹{subtotal.toLocaleString()}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount</span>
                      <span className="font-mono">-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-400">
                    <span>Shipping Charges</span>
                    <span className="font-mono text-slate-200">
                      {shippingCharge === 0 ? (
                        <strong className="text-emerald-400">FREE</strong>
                      ) : (
                        `₹${shippingCharge}`
                      )}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-900 flex items-start gap-2 text-[10px] text-slate-500 leading-relaxed">
                    <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <p>Standard delivery takes 3-5 days. You can upgrade to Express Courier speed on the next step.</p>
                  </div>

                  <div className="flex justify-between border-t border-slate-900 pt-4 text-sm">
                    <span className="font-bold text-slate-200">Grand Total</span>
                    <span className="font-mono font-extrabold text-white text-base">
                      ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>

                </div>

                {/* Checkout button action */}
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs rounded-full shadow-xl shadow-indigo-600/10 transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <span>Proceed to Safe Checkout</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>

            </div>

          </div>
        ) : (
          /* Empty Cart State */
          <div className="p-16 rounded-[40px] bg-slate-950/20 border border-slate-900 text-center flex flex-col items-center justify-center space-y-5 max-w-lg mx-auto shadow-2xl">
            <div className="w-14 h-14 rounded-3xl bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-500">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-200">Your Cart is Empty</h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Add premium electronic gadgets, custom-designed power accessories, or high-fidelity audio equipment from our catalog.
              </p>
            </div>
            <Link
              href="/products"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-colors"
            >
              Browse Shop Catalog
            </Link>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
