"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { useApp } from "@/context/AppContext";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, addToCart } = useApp();
  const [adding, setAdding] = useState(false);

  const favorited = isInWishlist(product.slug);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    // Add default color or first color in list
    const defaultColor = product.colors && product.colors.length > 0
      ? product.colors[0]
      : { name: "Default", hex: "#000" };

    addToCart(product, 1, defaultColor);

    setTimeout(() => {
      setAdding(false);
    }, 1000);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.slug);
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col h-full bg-slate-950/40 rounded-3xl border border-slate-900 overflow-hidden hover:border-slate-800/80 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300 group"
      >
        
        {/* Top Badges & Favorite button */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
          {product.discount > 0 ? (
            <span className="px-2.5 py-1 text-[9px] font-bold text-white bg-indigo-600 rounded-full tracking-wider select-none">
              {product.discount}% OFF
            </span>
          ) : product.isNew ? (
            <span className="px-2.5 py-1 text-[9px] font-bold text-white bg-teal-600 rounded-full tracking-wider select-none">
              NEW
            </span>
          ) : (
            <div />
          )}

          <button
            onClick={handleFavoriteClick}
            className="pointer-events-auto w-8 h-8 rounded-full bg-[#020617]/70 border border-slate-900 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors backdrop-blur-md"
            aria-label="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${favorited ? "fill-rose-500 text-rose-500" : ""}`} />
          </button>
        </div>

        {/* Product image with zoom effect */}
        <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-108"
            priority={product.isFeatured}
          />
          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Product Details */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
              {product.brand.replace("-", " ")}
            </span>
            <h3 className="text-xs font-semibold text-slate-200 line-clamp-1 group-hover:text-indigo-400 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="text-[10px] font-semibold text-slate-300">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[10px] text-slate-500">
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-900/50 mt-4">
            <div className="flex flex-col">
              {product.originalPrice > product.price && (
                <span className="text-[10px] text-slate-500 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              <span className="text-sm font-bold text-slate-100">
                ₹{product.price}
              </span>
            </div>

            <button
              onClick={handleQuickAdd}
              disabled={adding}
              className={`w-8 h-8 rounded-xl flex items-center justify-center border border-slate-800 transition-all duration-300 ${
                adding
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "bg-slate-950 hover:bg-indigo-600 hover:border-indigo-600 text-slate-400 hover:text-white"
              }`}
              title="Quick Add to Cart"
            >
              {adding ? (
                <svg
                  className="animate-spin h-3.5 w-3.5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <ShoppingCart className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

        </div>

      </motion.div>
    </Link>
  );
};
export default ProductCard;
