"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { products, Product } from "@/data/products";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { useApp } from "@/context/AppContext";
import {
  SlidersHorizontal,
  X,
  Grid,
  List,
  ChevronDown,
  Star,
  RefreshCw,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Separation of concerns: SearchParams parsing inside Suspense boundary
function ProductsListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { wishlist } = useApp();

  // Search parameters from URL
  const categoryQuery = searchParams.get("category") || "";
  const searchQueryURL = searchParams.get("search") || "";
  const filterQuery = searchParams.get("filter") || ""; // 'new', 'deals', 'wishlist'

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(categoryQuery);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(30000); // 0 to 30000 max price
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQueryURL);

  // Sync category state with URL parameter changes
  useEffect(() => {
    setSelectedCategory(categoryQuery);
  }, [categoryQuery]);

  // Sync search query parameter
  useEffect(() => {
    setLocalSearch(searchQueryURL);
  }, [searchQueryURL]);

  // Handle color click toggle
  const handleColorSelect = (hex: string) => {
    if (selectedColor === hex) {
      setSelectedColor(null);
    } else {
      setSelectedColor(hex);
    }
  };

  // Handle brand checklist toggle
  const handleBrandToggle = (brandSlug: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandSlug)
        ? prev.filter((slug) => slug !== brandSlug)
        : [...prev, brandSlug]
    );
  };

  // Clear all filters action
  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedBrands([]);
    setPriceRange(30000);
    setSelectedRating(null);
    setOnlyInStock(false);
    setSelectedDiscount(null);
    setSelectedColor(null);
    setLocalSearch("");
    router.replace("/products");
  };

  // Get unique colors from all products for swatches filter
  const allUniqueColors = useMemo(() => {
    const colorsMap: Record<string, string> = {};
    products.forEach((p) => {
      if (p.colors) {
        p.colors.forEach((c) => {
          colorsMap[c.hex] = c.name;
        });
      }
    });
    return Object.entries(colorsMap).map(([hex, name]) => ({ hex, name }));
  }, []);

  // Filtered Products computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // 1. Search Query Filter
        if (localSearch) {
          const matchSearch =
            product.name.toLowerCase().includes(localSearch.toLowerCase()) ||
            product.description.toLowerCase().includes(localSearch.toLowerCase()) ||
            product.brand.toLowerCase().includes(localSearch.toLowerCase()) ||
            product.category.toLowerCase().includes(localSearch.toLowerCase());
          if (!matchSearch) return false;
        }

        // 2. Category Filter
        if (selectedCategory && product.category !== selectedCategory) {
          return false;
        }

        // 3. Brands Filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
          return false;
        }

        // 4. Price range Slider (price <= priceRange)
        if (product.price > priceRange) {
          return false;
        }

        // 5. Rating Filter (rating >= selectedRating)
        if (selectedRating && product.rating < selectedRating) {
          return false;
        }

        // 6. Availability (Stock > 0)
        if (onlyInStock && product.stock <= 0) {
          return false;
        }

        // 7. Discount Filter
        if (selectedDiscount) {
          if (product.discount < selectedDiscount) {
            return false;
          }
        }

        // 8. Colors Filter
        if (selectedColor) {
          const hasColor = product.colors && product.colors.some((c) => c.hex === selectedColor);
          if (!hasColor) return false;
        }

        // 9. Extra Special filter queries (New Arrivals, Deals, Wishlist)
        if (filterQuery === "new" && !product.isNew) {
          return false;
        }
        if (filterQuery === "deals" && product.discount === 0) {
          return false;
        }
        if (filterQuery === "wishlist" && !wishlist.includes(product.slug)) {
          return false;
        }

        return true;
      })
      // 10. Sort Operation
      .sort((a, b) => {
        if (sortOption === "price-asc") {
          return a.price - b.price;
        } else if (sortOption === "price-desc") {
          return b.price - a.price;
        } else if (sortOption === "rating") {
          return b.rating - a.rating;
        }
        // Default: Popularity / Reviews count descending
        return b.reviewsCount - a.reviewsCount;
      });
  }, [
    localSearch,
    selectedCategory,
    selectedBrands,
    priceRange,
    selectedRating,
    onlyInStock,
    selectedDiscount,
    selectedColor,
    filterQuery,
    wishlist,
    sortOption,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 flex flex-col">
      
      {/* Title & Banner */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {filterQuery === "wishlist"
            ? "My Wishlist Vault"
            : filterQuery === "deals"
            ? "Best Deals & Discounts"
            : filterQuery === "new"
            ? "New Arrivals & Drops"
            : selectedCategory
            ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Collection`
            : "All Premium Gadgets"}
        </h1>
        <p className="text-xs text-slate-500 mt-2">
          {filteredProducts.length} high-fidelity products loaded. Optimized for performance and sleek browsing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">
        
        {/* SIDEBAR FILTERS - Desktop Only */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 shrink-0 sticky top-28">
          
          <div className="p-6 rounded-3xl bg-slate-950/40 border border-slate-900 backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-900 pb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Filters</span>
              </h3>
              <button
                onClick={handleClearFilters}
                className="text-[10px] font-semibold text-slate-500 hover:text-indigo-400 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Clear All</span>
              </button>
            </div>

            {/* Categories filter */}
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                Categories
              </h4>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`text-left text-xs py-1 transition-colors ${
                    selectedCategory === ""
                      ? "text-indigo-400 font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`text-left text-xs py-1 transition-colors ${
                      selectedCategory === cat.slug
                        ? "text-indigo-400 font-semibold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider filter */}
            <div className="space-y-3.5 border-t border-slate-900/60 pt-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                  Price Limit
                </h4>
                <span className="text-[10px] font-bold text-slate-200">
                  Under ₹{priceRange.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="99"
                max="30000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
              />
              <div className="flex items-center justify-between text-[8px] text-slate-600 font-bold">
                <span>₹99</span>
                <span>₹15,000</span>
                <span>₹30,000</span>
              </div>
            </div>

            {/* Brands Checkbox filter */}
            <div className="space-y-2 border-t border-slate-900/60 pt-4">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                Brands
              </h4>
              <div className="flex flex-col gap-2">
                {brands.map((br) => {
                  const checked = selectedBrands.includes(br.slug);
                  return (
                    <label
                      key={br.id}
                      className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleBrandToggle(br.slug)}
                        className="rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-0 w-3.5 h-3.5 focus:outline-none cursor-pointer"
                      />
                      <span>{br.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Ratings Radio filter */}
            <div className="space-y-2 border-t border-slate-900/60 pt-4">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                Minimum Rating
              </h4>
              <div className="flex flex-col gap-1.5">
                {[4.5, 4.0, 3.5].map((rate) => {
                  const active = selectedRating === rate;
                  return (
                    <button
                      key={rate}
                      onClick={() => setSelectedRating(active ? null : rate)}
                      className={`text-left text-xs flex items-center gap-1.5 transition-colors ${
                        active ? "text-indigo-400 font-bold" : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${active ? "fill-indigo-400 text-indigo-400" : "fill-none text-slate-500"}`} />
                      <span>{rate.toFixed(1)} & above</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Discounts ranges filter */}
            <div className="space-y-2 border-t border-slate-900/60 pt-4">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                Discount Deals
              </h4>
              <div className="flex flex-col gap-1.5">
                {[10, 30, 50].map((pct) => {
                  const active = selectedDiscount === pct;
                  return (
                    <button
                      key={pct}
                      onClick={() => setSelectedDiscount(active ? null : pct)}
                      className={`text-left text-xs py-1 transition-colors ${
                        active ? "text-indigo-400 font-bold" : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {pct}% & above Off
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors Swatches filter */}
            <div className="space-y-3 border-t border-slate-900/60 pt-4">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                Color Palette
              </h4>
              <div className="flex flex-wrap gap-2">
                {allUniqueColors.slice(0, 12).map((col) => {
                  const isWhite = col.hex.toLowerCase() === "#ffffff" || col.hex.toLowerCase() === "#f8fafc" || col.hex.toLowerCase() === "#fafafa";
                  const active = selectedColor === col.hex;
                  return (
                    <button
                      key={col.hex}
                      onClick={() => handleColorSelect(col.hex)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                        active
                          ? "scale-110 border-indigo-500 shadow-md shadow-indigo-500/20"
                          : "border-slate-800 hover:border-slate-700"
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {active && (
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            isWhite ? "bg-black" : "bg-white"
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="border-t border-slate-900/60 pt-4">
              <label className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-0 w-3.5 h-3.5 focus:outline-none cursor-pointer"
                />
                <span>Exclude Out of Stock</span>
              </label>
            </div>

          </div>

        </aside>

        {/* PRODUCTS DYNAMIC GRID AREA */}
        <main className="col-span-1 lg:col-span-9 space-y-6">
          
          {/* TOOLBAR ROW */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-slate-950/40 border border-slate-900 backdrop-blur-md gap-4">
            
            <div className="flex items-center gap-2">
              <SlidersHorizontal
                onClick={() => setMobileFiltersOpen(true)}
                className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer lg:hidden"
              />
              <span className="text-xs text-slate-400">
                Showing <strong className="text-slate-200">{filteredProducts.length}</strong> products
              </span>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              
              {/* Sort Dropdown Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                  Sort By:
                </span>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="appearance-none bg-slate-950/80 border border-slate-900 rounded-xl pl-3 pr-8 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-600 cursor-pointer"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Grid / List Layout toggle */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-900 shrink-0">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-300"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-300"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* DYNAMIC PRODUCTS CONTAINER */}
          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {filteredProducts.map((prod) => (
                <div key={prod.id}>
                  {viewMode === "grid" ? (
                    <ProductCard product={prod} />
                  ) : (
                    /* Elegant Horizontal List Row Card */
                    <Link href={`/products/${prod.slug}`}>
                      <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-3xl bg-slate-950/40 border border-slate-900 hover:border-slate-800 hover:shadow-xl transition-all duration-300 group">
                        <div className="relative w-32 aspect-square rounded-2xl overflow-hidden bg-slate-950 shrink-0">
                          <Image
                            src={prod.images[0]}
                            alt={prod.name}
                            fill
                            sizes="120px"
                            className="object-cover transition-transform group-hover:scale-105 duration-500"
                          />
                        </div>
                        <div className="flex-1 space-y-2 text-center sm:text-left min-w-0">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                            {prod.brand.replace("-", " ")}
                          </span>
                          <h3 className="text-sm font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                            {prod.name}
                          </h3>
                          <p className="text-xs text-slate-400 line-clamp-2 max-w-xl">
                            {prod.description}
                          </p>
                          <div className="flex items-center justify-center sm:justify-start gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span className="text-[10px] font-semibold text-slate-300">
                              {prod.rating.toFixed(1)}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              ({prod.reviewsCount} reviews)
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center sm:items-end justify-between sm:h-full gap-4 shrink-0 sm:border-l sm:border-slate-900 sm:pl-6 sm:py-2">
                          <div className="text-center sm:text-right">
                            {prod.originalPrice > prod.price && (
                              <span className="text-[10px] text-slate-500 line-through block">
                                ₹{prod.originalPrice}
                              </span>
                            )}
                            <span className="text-base font-extrabold text-slate-100 block">
                              ₹{prod.price}
                            </span>
                          </div>
                          <span className="px-4 py-1.5 rounded-full text-[10px] font-semibold text-indigo-400 border border-indigo-950 bg-indigo-950/30 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors">
                            View Details
                          </span>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Blank state */
            <div className="p-16 rounded-3xl bg-slate-950/20 border border-slate-900 text-center flex flex-col items-center justify-center space-y-4">
              <Search className="w-10 h-10 text-slate-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-300">No premium items matched</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  We could not find anything matching the filters selected. Try clearing the parameters.
                </p>
              </div>
              <button
                onClick={handleClearFilters}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-colors"
              >
                Clear Selected Filters
              </button>
            </div>
          )}

        </main>

      </div>

      {/* MOBILE FILTER SIDEBOARD DRAWER */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-black lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 right-0 z-50 w-80 max-w-full bg-[#050913] border-l border-slate-800 p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Filters
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleClearFilters}
                    className="text-[10px] font-semibold text-slate-500 hover:text-indigo-400 transition-colors"
                  >
                    Clear All
                  </button>
                  <button onClick={() => setMobileFiltersOpen(false)} className="text-slate-400 p-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile Category Filters */}
              <div className="space-y-3 mb-6">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${
                      selectedCategory === ""
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-950 border border-slate-900 text-slate-400"
                    }`}
                  >
                    All Category
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`px-3 py-1 rounded-full text-xs transition-colors ${
                        selectedCategory === cat.slug
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-950 border border-slate-900 text-slate-400"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price Slider */}
              <div className="space-y-3 mb-6 border-t border-slate-900 pt-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                    Max Price
                  </h4>
                  <span className="text-[10px] font-bold text-slate-200">
                    ₹{priceRange.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="99"
                  max="30000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
                />
              </div>

              {/* Mobile Brands Checkbox */}
              <div className="space-y-3 mb-6 border-t border-slate-900 pt-4">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                  Brands
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {brands.map((br) => {
                    const checked = selectedBrands.includes(br.slug);
                    return (
                      <label
                        key={br.id}
                        className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleBrandToggle(br.slug)}
                          className="rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-0 w-3.5 h-3.5 focus:outline-none"
                        />
                        <span>{br.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Action Apply Button */}
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl mt-6 transition-colors shadow-lg shadow-indigo-600/10"
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-[#F8FAFC]">
      <AnnouncementBar />
      <Header />
      
      {/* Wrap ProductsListContent with Suspense boundary to catch useSearchParams calls safely during static generation */}
      <Suspense fallback={
        <div className="flex-1 flex flex-col items-center justify-center p-16 space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-600 border-r-2" />
          <p className="text-xs text-slate-500">Loading catalog...</p>
        </div>
      }>
        <ProductsListContent />
      </Suspense>

      <Footer />
    </div>
  );
}
