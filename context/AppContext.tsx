"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  color: { name: string; hex: string };
  quantity: number;
}

interface AppContextType {
  cart: CartItem[];
  wishlist: string[];
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  discountCode: string;
  discountPercentage: number;
  applyDiscountCode: (code: string) => boolean;
  addToCart: (product: Product, quantity: number, color: { name: string; hex: string }) => void;
  removeFromCart: (productId: string, colorHex: string) => void;
  updateCartQuantity: (productId: string, colorHex: string, newQuantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productSlug: string) => void;
  isInWishlist: (productSlug: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("India");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("sonix_cart");
      const savedWishlist = localStorage.getItem("sonix_wishlist");
      const savedCountry = localStorage.getItem("sonix_country");

      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Error loading cart", e);
        }
      }
      if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist));
        } catch (e) {
          console.error("Error loading wishlist", e);
        }
      }
      if (savedCountry) {
        setSelectedCountry(savedCountry);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window !== "undefined" && cart.length > 0) {
      localStorage.setItem("sonix_cart", JSON.stringify(cart));
    } else if (typeof window !== "undefined" && cart.length === 0) {
      localStorage.removeItem("sonix_cart");
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== "undefined" && wishlist.length > 0) {
      localStorage.setItem("sonix_wishlist", JSON.stringify(wishlist));
    } else if (typeof window !== "undefined" && wishlist.length === 0) {
      localStorage.removeItem("sonix_wishlist");
    }
  }, [wishlist]);

  const handleSetSelectedCountry = (country: string) => {
    setSelectedCountry(country);
    if (typeof window !== "undefined") {
      localStorage.setItem("sonix_country", country);
    }
  };

  const applyDiscountCode = (code: string): boolean => {
    const normalizedCode = code.trim().toUpperCase();
    if (normalizedCode === "SONIX20") {
      setDiscountCode("SONIX20");
      setDiscountPercentage(20);
      return true;
    } else if (normalizedCode === "FREESHIP") {
      setDiscountCode("FREESHIP");
      setDiscountPercentage(0);
      return true;
    }
    return false;
  };

  const addToCart = (product: Product, quantity: number, color: { name: string; hex: string }) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.color.hex === color.hex
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        const newQuantity = newCart[existingItemIndex].quantity + quantity;
        newCart[existingItemIndex].quantity = Math.min(newQuantity, product.stock);
        return newCart;
      } else {
        return [...prevCart, { product, color, quantity: Math.min(quantity, product.stock) }];
      }
    });
  };

  const removeFromCart = (productId: string, colorHex: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === productId && item.color.hex === colorHex))
    );
  };

  const updateCartQuantity = (productId: string, colorHex: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, colorHex);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && item.color.hex === colorHex) {
          const finalQuantity = Math.min(newQuantity, item.product.stock);
          return { ...item, quantity: finalQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountCode("");
    setDiscountPercentage(0);
    if (typeof window !== "undefined") {
      localStorage.removeItem("sonix_cart");
    }
  };

  const toggleWishlist = (productSlug: string) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productSlug)) {
        return prevWishlist.filter((slug) => slug !== productSlug);
      } else {
        return [...prevWishlist, productSlug];
      }
    });
  };

  const isInWishlist = (productSlug: string): boolean => {
    return wishlist.includes(productSlug);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        selectedCountry,
        setSelectedCountry: handleSetSelectedCountry,
        searchQuery,
        setSearchQuery,
        discountCode,
        discountPercentage,
        applyDiscountCode,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
