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
  ChevronRight,
  MapPin,
  Truck,
  CreditCard,
  Eye,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  ChevronRightCircle,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, discountCode, discountPercentage, clearCart } = useApp();

  // Redirect if cart is empty
  React.useEffect(() => {
    if (cart.length === 0) {
      // Allow if we just finished checkout, otherwise redirect
      router.replace("/cart");
    }
  }, [cart, router]);

  // Step state
  const [activeStep, setActiveStep] = useState(1); // 1: Address, 2: Shipping, 3: Payment, 4: Review

  // Form states
  const [addressForm, setAddressForm] = useState({
    fullName: "Rohit Sharma",
    phone: "+91 98765 43210",
    street: "123, 2nd Floor, Green Park Extension",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110016",
    country: "India",
  });

  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "apple" | "cod">("upi");

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercentage) / 100);
  
  const rawShipping = subtotal >= 499 || subtotal === 0 ? 0 : 99;
  const shippingCharge = discountCode === "FREESHIP" ? 0 : (shippingMethod === "express" ? 99 : rawShipping);
  
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingCharge);

  // Address validation
  const validateAddress = () => {
    const errors: Record<string, string> = {};
    if (!addressForm.fullName.trim()) errors.fullName = "Full name is required";
    if (!addressForm.phone.trim()) errors.phone = "Phone number is required";
    if (!addressForm.street.trim()) errors.street = "Street address is required";
    if (!addressForm.city.trim()) errors.city = "City is required";
    if (!addressForm.pincode.trim()) errors.pincode = "Pincode is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (activeStep === 1) {
      if (validateAddress()) {
        setActiveStep(2);
      }
    } else if (activeStep === 2) {
      setActiveStep(3);
    } else if (activeStep === 3) {
      setActiveStep(4);
    }
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => Math.max(1, prev - 1));
  };

  const handlePlaceOrder = () => {
    // Generate order ID
    const randomOrderId = "SNX-" + Math.floor(100000 + Math.random() * 900000);
    // Persist details in session storage for success page
    sessionStorage.setItem("last_order_id", randomOrderId);
    sessionStorage.setItem("last_order_total", String(totalAmount));
    sessionStorage.setItem("last_order_shipping", String(shippingCharge));
    sessionStorage.setItem("last_order_address", JSON.stringify(addressForm));

    // Clear shopping cart state
    clearCart();

    // Route to Success page
    router.replace("/order-success");
  };

  const steps = [
    { number: 1, label: "Address", icon: <MapPin className="w-3.5 h-3.5" /> },
    { number: 2, label: "Shipping", icon: <Truck className="w-3.5 h-3.5" /> },
    { number: 3, label: "Payment", icon: <CreditCard className="w-3.5 h-3.5" /> },
    { number: 4, label: "Review", icon: <Eye className="w-3.5 h-3.5" /> },
  ];

  if (cart.length === 0) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-[#F8FAFC]">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-700" />
          <Link href="/cart" className="hover:text-white transition-colors">Cart</Link>
          <ChevronRight className="w-3 h-3 text-slate-700" />
          <span className="text-indigo-400">Checkout Stepper</span>
        </div>

        {/* STEPPER PROGRESS INDICATOR */}
        <div className="w-full max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            
            {/* Background line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-900 z-0" />
            
            {/* Active highlight line */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-indigo-600 transition-all duration-300 z-0"
              style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((st) => {
              const completed = st.number < activeStep;
              const active = st.number === activeStep;

              return (
                <div key={st.number} className="relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => st.number < activeStep && setActiveStep(st.number)}
                    disabled={st.number >= activeStep}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                      completed
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : active
                        ? "bg-slate-950 border-indigo-500 text-indigo-400 ring-2 ring-indigo-500/20 scale-105"
                        : "bg-slate-950 border-slate-900 text-slate-500"
                    }`}
                  >
                    {completed ? <CheckCircle2 className="w-4 h-4" /> : st.icon}
                  </button>
                  <span className={`text-[9px] uppercase tracking-wider mt-1.5 font-bold ${
                    active ? "text-indigo-400" : completed ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {st.label}
                  </span>
                </div>
              );
            })}

          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: MULTI-STEP WIZARD UI */}
          <div className="lg:col-span-8 rounded-3xl bg-slate-950/40 border border-slate-900 p-6 md:p-8 backdrop-blur-md">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                
                {/* ==================== STEP 1: ADDRESS ==================== */}
                {activeStep === 1 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-900 pb-3">
                      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                        1. Delivery Shipping Address
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-1">Specify where your gadgets will land.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                          Full Receiver Name
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.fullName}
                          onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-900 focus:border-indigo-600 rounded-2xl py-2.5 px-4 text-xs text-slate-200 focus:outline-none"
                        />
                        {formErrors.fullName && (
                          <p className="text-[9px] text-red-400 mt-0.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{formErrors.fullName}</span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                          Contact Phone Number
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-900 focus:border-indigo-600 rounded-2xl py-2.5 px-4 text-xs text-slate-200 focus:outline-none"
                        />
                        {formErrors.phone && (
                          <p className="text-[9px] text-red-400 mt-0.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{formErrors.phone}</span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                          Street Address
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.street}
                          onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-900 focus:border-indigo-600 rounded-2xl py-2.5 px-4 text-xs text-slate-200 focus:outline-none"
                        />
                        {formErrors.street && (
                          <p className="text-[9px] text-red-400 mt-0.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{formErrors.street}</span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-900 focus:border-indigo-600 rounded-2xl py-2.5 px-4 text-xs text-slate-200 focus:outline-none"
                        />
                        {formErrors.city && (
                          <p className="text-[9px] text-red-400 mt-0.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{formErrors.city}</span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                          Zip / Postal Pincode
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.pincode}
                          onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-900 focus:border-indigo-600 rounded-2xl py-2.5 px-4 text-xs text-slate-200 focus:outline-none"
                        />
                        {formErrors.pincode && (
                          <p className="text-[9px] text-red-400 mt-0.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{formErrors.pincode}</span>
                          </p>
                        )}
                      </div>

                    </div>
                  </div>
                )}

                {/* ==================== STEP 2: SHIPPING ==================== */}
                {activeStep === 2 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-900 pb-3">
                      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                        2. Select Shipping Method
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-1">Determine the shipping speed and details.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Standard Option */}
                      <button
                        onClick={() => setShippingMethod("standard")}
                        className={`p-5 rounded-3xl border text-left flex flex-col justify-between aspect-[1.75/1] transition-all select-none ${
                          shippingMethod === "standard"
                            ? "bg-indigo-950/20 border-indigo-600 ring-1 ring-indigo-600/20"
                            : "bg-slate-950/40 border-slate-900 hover:border-slate-800"
                        }`}
                      >
                        <div className="flex justify-between w-full">
                          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                            Standard Courier
                          </span>
                          <span className="text-[10px] font-bold text-emerald-400">
                            {rawShipping === 0 ? "FREE" : `₹${rawShipping}`}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-400">3–5 working days</p>
                          <p className="text-[9px] text-slate-500 mt-1">Reliable, economic ground shipping</p>
                        </div>
                      </button>

                      {/* Express Option */}
                      <button
                        onClick={() => setShippingMethod("express")}
                        className={`p-5 rounded-3xl border text-left flex flex-col justify-between aspect-[1.75/1] transition-all select-none ${
                          shippingMethod === "express"
                            ? "bg-indigo-950/20 border-indigo-600 ring-1 ring-indigo-600/20"
                            : "bg-slate-950/40 border-slate-900 hover:border-slate-800"
                        }`}
                      >
                        <div className="flex justify-between w-full">
                          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                            Express Air Delivery
                          </span>
                          <span className="text-[10px] font-bold text-indigo-400">
                            ₹99
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-400">1–2 working days</p>
                          <p className="text-[9px] text-slate-500 mt-1">Blazing-fast priority air delivery</p>
                        </div>
                      </button>

                    </div>
                  </div>
                )}

                {/* ==================== STEP 3: PAYMENT ==================== */}
                {activeStep === 3 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-900 pb-3">
                      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                        3. Secure Checkout Payment
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-1">Choose your mock payment portal.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      
                      {[
                        { id: "upi", label: "Instant UPI Scan", desc: "Pay with GPay, PhonePe, Paytm" },
                        { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay" },
                        { id: "apple", label: "Apple Pay Sync", desc: "Fast contactless integration" },
                        { id: "cod", label: "Cash On Delivery (COD)", desc: "Pay cash at doorsteps" },
                      ].map((pay) => {
                        const active = paymentMethod === pay.id;
                        return (
                          <button
                            key={pay.id}
                            onClick={() => setPaymentMethod(pay.id as typeof paymentMethod)}
                            className={`p-4 rounded-3xl border text-left flex flex-col justify-between aspect-[1.75/1] transition-all select-none ${
                              active
                                ? "bg-indigo-950/20 border-indigo-600 ring-1 ring-indigo-600/20"
                                : "bg-slate-950/40 border-slate-900 hover:border-slate-800"
                            }`}
                          >
                            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                              {pay.label}
                            </span>
                            <span className="text-[9px] text-slate-500">
                              {pay.desc}
                            </span>
                          </button>
                        );
                      })}

                    </div>
                  </div>
                )}

                {/* ==================== STEP 4: REVIEW ==================== */}
                {activeStep === 4 && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-900 pb-3">
                      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                        4. Review and Submit Order
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-1">Confirm structural and logistical details.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed">
                      
                      <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-2">
                        <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                          Delivery Target
                        </h4>
                        <p className="font-semibold text-slate-200">{addressForm.fullName}</p>
                        <p className="text-slate-400">
                          {addressForm.street}, {addressForm.city}, {addressForm.state} - {addressForm.pincode}
                        </p>
                        <p className="text-slate-500 font-medium">Contact: {addressForm.phone}</p>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-3 justify-between flex flex-col">
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                            Logistical Speed
                          </h4>
                          <p className="font-semibold text-slate-200 capitalize">
                            {shippingMethod} Speed Courier
                          </p>
                        </div>
                        
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                            Secure Ledger Payment
                          </h4>
                          <p className="font-semibold text-slate-200 capitalize">
                            {paymentMethod === "cod"
                              ? "Cash On Delivery"
                              : paymentMethod === "apple"
                              ? "Apple Pay Contactless"
                              : paymentMethod.toUpperCase()}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* BOTTOM BUTTON FOOTERS */}
                <div className="flex items-center justify-between border-t border-slate-900 pt-6 mt-6">
                  {activeStep > 1 ? (
                    <button
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white border border-slate-900 hover:border-slate-800 flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {activeStep < 4 ? (
                    <button
                      onClick={handleNextStep}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-full shadow shadow-indigo-600/10 flex items-center gap-1.5 transition-colors ml-auto"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={handlePlaceOrder}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs rounded-full shadow-xl shadow-indigo-600/20 flex items-center gap-1.5 transition-all ml-auto"
                    >
                      <span>Place My Premium Order</span>
                      <ChevronRightCircle className="w-4 h-4 fill-white text-indigo-600" />
                    </button>
                  )}
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY MINI-CARD */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Sticky summary wrapper */}
            <div className="p-6 rounded-3xl bg-slate-950/40 border border-slate-900 space-y-4 sticky top-28">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 border-b border-slate-900 pb-3">
                Items Summary
              </h3>

              {/* Minimal items list */}
              <div className="max-h-40 overflow-y-auto space-y-3.5 pr-2">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.color.hex}`} className="flex items-center gap-3 text-xs">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-300 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[9px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <span>Qty: {item.quantity}</span>
                        <span>•</span>
                        <span
                          className="w-2 h-2 rounded-full border border-slate-800 inline-block"
                          style={{ backgroundColor: item.color.hex }}
                        />
                        <span>{item.color.name}</span>
                      </p>
                    </div>
                    <span className="font-mono font-bold text-slate-200">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculation list */}
              <div className="border-t border-slate-900 pt-4 space-y-3.5 text-xs">
                
                <div className="flex justify-between text-slate-400">
                  <span>Cart Subtotal</span>
                  <span className="font-mono text-slate-200">₹{subtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount Applied</span>
                    <span className="font-mono">-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Shipping Cost</span>
                  <span className="font-mono text-slate-200">
                    {shippingCharge === 0 ? (
                      <strong className="text-emerald-400">FREE</strong>
                    ) : (
                      `₹${shippingCharge}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between border-t border-slate-900 pt-4 text-sm">
                  <span className="font-bold text-slate-200">Total Invoice</span>
                  <span className="font-mono font-extrabold text-white text-base">
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>

              </div>

              {/* Locks validation */}
              <div className="flex items-center gap-2 text-[10px] text-slate-600 justify-center pt-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Secure 256-Bit SSL Encryption Active</span>
              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
