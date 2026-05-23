export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string; // e.g. 'audio', 'wearables', 'smart-gadgets', 'power-chargers', 'gaming', 'lighting', 'accessories', 'home-tech'
  brand: string; // e.g. 'sonix-elite', 'nothing-tech', 'apple', 'bose', 'sonos', 'razer-labs', 'sony', 'samsung'
  price: number; // current price in INR (₹)
  originalPrice: number; // original price in INR (₹)
  discount: number; // discount percentage
  rating: number;
  reviewsCount: number;
  stock: number;
  images: string[];
  colors: { name: string; hex: string }[];
  highlights: string[];
  specs: Record<string, string>;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  // 1. AUDIO (8 products)
  {
    id: "prod-1",
    slug: "tws-wireless-earbuds-pro",
    name: "TWS Wireless Earbuds Pro",
    description: "Experience absolute acoustic purity. Outfitted with hybrid active noise cancellation, smart adaptive audio mode, and custom-tuned 11mm dynamic drivers.",
    category: "audio",
    brand: "sonix-elite",
    price: 299,
    originalPrice: 599,
    discount: 50,
    rating: 4.8,
    reviewsCount: 1282,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588449668365-d15e397f6787?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Matte Black", hex: "#1e1e1e" },
      { name: "Glossy White", hex: "#ffffff" },
      { name: "Titanium Gray", hex: "#8e8e93" }
    ],
    highlights: [
      "Hybrid Active Noise Cancellation (up to 40dB reduction)",
      "High-Res Wireless Audio with LDAC support",
      "Dynamic Head Tracking for spatial sound stages",
      "Dual mic system with AI beamforming noise suppression for calls",
      "IPX4 water and sweat resistance rating"
    ],
    specs: {
      "Driver Size": "11mm Custom Dynamic",
      "Frequency Range": "20Hz - 40kHz",
      "Connectivity": "Bluetooth 5.3",
      "Battery Life": "Up to 8 hours (32 hours with charging case)",
      "Charging Port": "USB Type-C & Wireless Qi",
      "Codec Support": "SBC, AAC, LDAC"
    },
    isFeatured: true,
    isNew: false
  },
  {
    id: "prod-2",
    slug: "wireless-over-ear-headphones",
    name: "Wireless Over-Ear ANC Headphones",
    description: "Premium sound meets maximum comfort. Featuring custom pressure-relieving cushions, 40-hour continuous playback, and industry-leading smart noise cancellation.",
    category: "audio",
    brand: "bose",
    price: 799,
    originalPrice: 1599,
    discount: 50,
    rating: 4.9,
    reviewsCount: 954,
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Carbon Black", hex: "#111111" },
      { name: "Silver Luxe", hex: "#d1d5db" }
    ],
    highlights: [
      "Custom acoustic architect with high-fidelity sound",
      "12-stage active noise-cancelling processor",
      "Plush acoustic memory foam ear cups for all-day comfort",
      "Multipoint pairing to switch seamlessly between phone and laptop",
      "Foldable travel design with premium leather carry case"
    ],
    specs: {
      "Driver Size": "40mm Custom Dome",
      "Frequency Response": "10Hz - 25kHz",
      "Weight": "250g",
      "Battery Duration": "Up to 40 hours (ANC on)",
      "Fast Charge": "10 min charge gives 5 hours playback",
      "Voice Assistant": "Alexa, Google Assistant, Siri integrated"
    },
    isFeatured: true,
    isNew: true
  },
  {
    id: "prod-3",
    slug: "minimalist-wireless-neckband",
    name: "Minimalist Wireless Neckband",
    description: "Comfortable, lightweight, and engineered for active lifestyles. Magnets clip the buds around your neck when not in use.",
    category: "audio",
    brand: "sonix-elite",
    price: 349,
    originalPrice: 499,
    discount: 30,
    rating: 4.2,
    reviewsCount: 210,
    stock: 120,
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Dynamic Blue", hex: "#2563eb" },
      { name: "Stealth Gray", hex: "#374151" }
    ],
    highlights: [
      "Ultra-lightweight skin-friendly silicone collar",
      "Magnetic instant-snap earbuds for easy management",
      "Super-bass boost sound profile optimized for workouts",
      "IPX5 certified sweat and splash guard protection",
      "Dynamic in-line microphone and volume click controllers"
    ],
    specs: {
      "Bluetooth Profile": "v5.2",
      "Playtime": "Up to 20 hours at 60% volume",
      "Drivers": "10mm Neodymium",
      "Charging time": "1.5 Hours full charge",
      "Standby time": "200 Hours"
    }
  },
  {
    id: "prod-4",
    slug: "airbuds-pro-style-earbuds",
    name: "Airbuds Pro Style Earbuds",
    description: "Sleek, iconic design meets premium acoustics. Crystal clear highs and deep, punching bass in an incredibly compact format.",
    category: "audio",
    brand: "apple",
    price: 399,
    originalPrice: 799,
    discount: 50,
    rating: 4.6,
    reviewsCount: 153,
    stock: 80,
    images: [
      "https://images.unsplash.com/photo-1588449668365-d15e397f6787?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Pure White", hex: "#ffffff" }],
    highlights: [
      "Perfect ergonomic fit optimized for active movement",
      "Auto-connection and smart optical ear detection",
      "Environmental Noise Cancelling (ENC) for clear calling",
      "Touch gesture pads to trigger tracks or trigger smart assistants",
      "Sleek glowing charging case shell"
    ],
    specs: {
      "Weight": "4.2g per earbud",
      "Battery Case": "Holds 3 additional full charges",
      "Wireless Tech": "Low-Latency Gaming Mode support",
      "Sensor type": "Capacitive touch"
    }
  },
  {
    id: "prod-5",
    slug: "comfort-over-ear-headphones",
    name: "Comfort Over-Ear Studio Headphones",
    description: "Wired studio-grade accuracy for monitoring and absolute music consumption. Zero compression, pure analog bliss.",
    category: "audio",
    brand: "sony",
    price: 899,
    originalPrice: 1299,
    discount: 30,
    rating: 4.5,
    reviewsCount: 87,
    stock: 34,
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Pro Matte Black", hex: "#0f172a" },
      { name: "Forest Sage", hex: "#166534" }
    ],
    highlights: [
      "Neutral studio tuning frequency curve",
      "Closed-back acoustic seal for supreme passive sound isolation",
      "Detachable oxygen-free copper spring cable included",
      "Brushed steel headband adjustment sliders"
    ],
    specs: {
      "Impedance": "32 Ohms",
      "Sensitivity": "102 dB/mW",
      "Max Input Power": "1000mW",
      "Plug Type": "3.5mm Gold-plated (with 6.3mm adapter)"
    }
  },
  {
    id: "prod-6",
    slug: "wired-earphones-with-mic",
    name: "Hi-Res Wired Earphones with Mic",
    description: "Classic high-resolution wired connection. Heavy copper wiring, tangle-resistant flat cord, and robust structural housing.",
    category: "audio",
    brand: "sony",
    price: 149,
    originalPrice: 299,
    discount: 50,
    rating: 4.1,
    reviewsCount: 320,
    stock: 250,
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Piano Black", hex: "#000000" },
      { name: "Arctic White", hex: "#ffffff" }
    ],
    highlights: [
      "Dynamic sound stage with emphasis on vocal clarity",
      "Inline high-sensitivity condenser mic",
      "Comfort-fit multi-size medical grade silicone tips included"
    ],
    specs: {
      "Cable Length": "1.2 meters",
      "Connector": "3.5mm Audio Jack",
      "Type": "In-Ear Acoustic"
    }
  },
  {
    id: "prod-7",
    slug: "wireless-speaker-mini",
    name: "Wireless Portable Speaker Mini",
    description: "A pocket-sized audio powerhouse. Deep 360-degree acoustics, customizable RGB halo ring that pulses to the rhythm, and fully dust/waterproof.",
    category: "audio",
    brand: "sonos",
    price: 399,
    originalPrice: 799,
    discount: 50,
    rating: 4.3,
    reviewsCount: 112,
    stock: 67,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Midnight Charcoal", hex: "#1e293b" },
      { name: "Crimson Red", hex: "#991b1b" }
    ],
    highlights: [
      "Passive low-frequency bass radiator for heavy thumping acoustics",
      "Smart RGB ambient sound ring with 5 music visual modes",
      "IP67 waterproof and fully sandproof casing",
      "True Wireless Stereo pairing: link two speakers for true stereo sound"
    ],
    specs: {
      "Output Power": "8 Watts RMS",
      "Battery Life": "Up to 12 Hours",
      "Waterproof Rating": "IP67",
      "Weight": "350g"
    }
  },
  {
    id: "prod-8",
    slug: "bone-conduction-wireless-headphones",
    name: "Bone Conduction Wireless Headphones",
    description: "Stay fully connected to your surroundings. Bone conduction technology bypasses the eardrum, delivering high fidelity audio directly through the cheekbones.",
    category: "audio",
    brand: "sonix-elite",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    rating: 4.4,
    reviewsCount: 51,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Slate Grey", hex: "#6b7280" },
      { name: "Crimson Spark", hex: "#ef4444" }
    ],
    highlights: [
      "Open-ear design guarantees supreme situational safety",
      "Ultra-flexible titanium structure frame",
      "Dynamic pitch adjustment for premium rich acoustics",
      "IPX6 sweatproof and dustproof sealing"
    ],
    specs: {
      "Technology": "7th Gen Bone Conduction",
      "Playtime": "Up to 8 hours continuous",
      "Weight": "29 grams",
      "Charging System": "Magnetic induction charger"
    }
  },

  // 2. WEARABLES / SMART WATCHES (8 products)
  {
    id: "prod-9",
    slug: "smart-watch-fit-tracker",
    name: "AeroFit Smart Watch & Tracker",
    description: "A continuous health hub right on your wrist. Featuring high-precision heart monitoring, blood oxygen levels, and multi-sport GPS mapping.",
    category: "wearables",
    brand: "sonix-elite",
    price: 599,
    originalPrice: 1199,
    discount: 50,
    rating: 4.4,
    reviewsCount: 421,
    stock: 90,
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Obsidian Black", hex: "#000000" },
      { name: "Glacier Silver", hex: "#e2e8f0" },
      { name: "Warm Gold", hex: "#fef08a" }
    ],
    highlights: [
      "Vibrant 1.78\" Always-On AMOLED screen with high brightness",
      "Real-time photoplethysmogram (PPG) sensor for health metrics",
      "Up to 10 days of continuous standby power on a single charge",
      "5 ATM waterproof capability, perfect for swimming track records",
      "Built-in microphone for instant Bluetooth notifications and calls"
    ],
    specs: {
      "Screen Size": "1.78 inch AMOLED",
      "Resolution": "390 x 450 Pixels",
      "Sensors": "Heart rate, SpO2, Accelerometer, Gyroscope",
      "Battery Life": "Up to 7 days active, 15 days standby",
      "Chassis Material": "Aerospace-grade Aluminum Case"
    },
    isFeatured: true,
    isNew: false
  },
  {
    id: "prod-10",
    slug: "smart-watch-ultra-titanium",
    name: "Smart Watch Ultra Titanium",
    description: "Engineered for extreme performance and rugged terrain. High-strength titanium frame, precise multi-band dual-frequency GPS, and long-range emergency siren.",
    category: "wearables",
    brand: "samsung",
    price: 899,
    originalPrice: 1799,
    discount: 50,
    rating: 4.8,
    reviewsCount: 76,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517502884422-41eaaced0168?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Titanium Orange", hex: "#f97316" },
      { name: "Oceanic Navy", hex: "#1e3a8a" }
    ],
    highlights: [
      "Extremely robust aerospace-grade Titanium housing",
      "Shatter-proof front sapphire crystal shield",
      "Up to 60 hours battery backup in active saver mode",
      "Dual-frequency precision GPS with offline topography mapping",
      "Action button customizable for rapid control triggers"
    ],
    specs: {
      "Display": "2.0-inch LTPO AMOLED (2000 nits Peak)",
      "Frame Size": "49mm Rugged Case",
      "Waterproof": "IP6X Dustproof, WR100 Water level",
      "Weight": "61.3g",
      "Specialty": "Depth Gauge and Water Temp Sensor"
    },
    isFeatured: false,
    isNew: true
  },
  {
    id: "prod-11",
    slug: "minimalist-fitness-smart-band",
    name: "Minimalist Fitness Smart Band",
    description: "A featherlight wellness tracker. Tracks sleep cycles, steps, calories burned, and notifications, packed in an elegant slim screen.",
    category: "wearables",
    brand: "nothing-tech",
    price: 249,
    originalPrice: 499,
    discount: 50,
    rating: 4.3,
    reviewsCount: 614,
    stock: 140,
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Clear Glass", hex: "#f8fafc" },
      { name: "Opaque Dark", hex: "#0f172a" }
    ],
    highlights: [
      "Ultra-thin 1.1-inch curved display",
      "Autodetection for 15+ athletic categories",
      "Intelligent sleep stage analyzing algorithms",
      "Stress tracking & breathing guides"
    ],
    specs: {
      "Weight": "18.5g",
      "Charge time": "1 Hour fast-charge",
      "Standby": "Up to 14 days"
    }
  },
  {
    id: "prod-12",
    slug: "chrono-smart-watch-classic",
    name: "Chrono Classic Smart Watch",
    description: "The classic luxury chronometer look meets cutting-edge tech. Stainless steel circular dial with customized interactive widgets.",
    category: "wearables",
    brand: "samsung",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.7,
    reviewsCount: 98,
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Polished Silver", hex: "#e2e8f0" },
      { name: "Black Onyx", hex: "#111827" }
    ],
    highlights: [
      "Circular rotating physical navigation bezel bezel",
      "Sleek stainless steel watch casing shell",
      "Advanced body composition analyzer (BIA) sensor"
    ],
    specs: {
      "OS": "Wear OS powered by Samsung",
      "Dial Diameter": "46mm Classy Circle",
      "RAM/Storage": "2GB RAM + 16GB Flash"
    }
  },
  {
    id: "prod-13",
    slug: "kids-smart-tracker-gps",
    name: "SafeTrack Kids Watch with GPS",
    description: "Ensures peace of mind. Full real-time cellular tracking, two-way vocal calling, and instant panic SOS trigger buttons.",
    category: "wearables",
    brand: "sonix-elite",
    price: 349,
    originalPrice: 699,
    discount: 50,
    rating: 4.0,
    reviewsCount: 54,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Bubblegum Pink", hex: "#f472b6" },
      { name: "Sky Blue", hex: "#38bdf8" }
    ],
    highlights: [
      "Secure SOS panic mapping alerts instantly sent to parent app",
      "Real-time geographic fencing and security tracking logs",
      "Child-safe soft organic medical-grade silicone strap"
    ],
    specs: {
      "Cellular": "4G LTE micro-SIM card slot",
      "Camera": "2MP Video call sensor",
      "App Support": "iOS & Android Parent Dashboard"
    }
  },
  {
    id: "prod-14",
    slug: "smart-ring-health-tracker",
    name: "Sonix Smart Ring Pro",
    description: "The ultimate in discreet wellness tracking. Aerospace titanium construction, ultra-precise temperature scanning, and comprehensive sleep stats.",
    category: "wearables",
    brand: "sonix-elite",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    rating: 4.9,
    reviewsCount: 42,
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Stealth Titanium Black", hex: "#1e293b" },
      { name: "Polished Gold Ring", hex: "#ca8a04" },
      { name: "Platinum Silver", hex: "#cbd5e1" }
    ],
    highlights: [
      "Extremely comfortable, zero-screen screenless distraction",
      "High-precision sleep cycle & night body temp charts",
      "Up to 6 days charge on a proprietary magnetic charging hub",
      "Ultra lightweight (only 4 grams)"
    ],
    specs: {
      "Width": "8mm Width, 2.5mm Thickness",
      "Material": "Medical grade Titanium Inner shell",
      "Waterproofing": "IP68 & 100 meters dive proof"
    },
    isFeatured: true,
    isNew: true
  },
  {
    id: "prod-15",
    slug: "sport-gps-running-watch",
    name: "Apex Sport GPS Running Watch",
    description: "A marathoner's companion. Specialized training metrics, recovery statistics, and multi-satellite navigation arrays.",
    category: "wearables",
    brand: "sony",
    price: 1899,
    originalPrice: 2999,
    discount: 36,
    rating: 4.6,
    reviewsCount: 31,
    stock: 19,
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Solar Red", hex: "#dc2626" },
      { name: "Graphite", hex: "#4b5563" }
    ],
    highlights: [
      "Solar charging sapphire screen lens adds battery lifetime",
      "Full VO2 Max estimation and recovery guides",
      "Preloaded offline trail navigation maps"
    ],
    specs: {
      "Battery Life": "Up to 28 Days in Smart mode",
      "Weight": "53 grams",
      "GPS Mode": "All Systems navigation with multiband"
    }
  },
  {
    id: "prod-16",
    slug: "hybrid-smart-watch-luxe",
    name: "Hybrid Smart Watch Luxe",
    description: "Real physical clock hands meet a hidden OLED monochrome display. The premium visual style of analog with digital smarts.",
    category: "wearables",
    brand: "apple",
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    rating: 4.8,
    reviewsCount: 19,
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Rose Gold Leather", hex: "#fda4af" },
      { name: "Espresso Brown Leather", hex: "#78350f" }
    ],
    highlights: [
      "Real mechanical physical clock hands that move on swipe",
      "Italian premium calfskin leather quick release straps",
      "Hidden ambient glow OLED display panel"
    ],
    specs: {
      "Crystal": "Curved mineral glass lens",
      "Battery Life": "Up to 28 days in Watch-only mode",
      "Casing": "40mm Rose Gold-plated Steel"
    }
  },

  // 3. SMART GADGETS (6 products)
  {
    id: "prod-17",
    slug: "smart-anti-lost-tracker-tag",
    name: "Smart Anti-Lost Tracker Tag",
    description: "Never lose what matters. Employs ultra-wideband Bluetooth mesh tracking. A single tap sounds the buzzer or maps it directly.",
    category: "smart-gadgets",
    brand: "apple",
    price: 199,
    originalPrice: 399,
    discount: 50,
    rating: 4.7,
    reviewsCount: 1104,
    stock: 350,
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Pure White", hex: "#ffffff" },
      { name: "Sleek Charcoal", hex: "#1e293b" }
    ],
    highlights: [
      "Ultra-wideband (UWB) tracking chips provide step-by-step radar guides",
      "Integrated 85dB piercing locating chime buzzer",
      "Standard replaceable CR2032 battery runs for 1 full year",
      "Universal integration with Apple and Android locating mesh networks",
      "Dust and water proof IP67 standard"
    ],
    specs: {
      "Battery Type": "CR2032 Coin Cell Battery",
      "Range": "Bluetooth up to 100 meters, Unlimited via network",
      "Chirp Sound": "85 dB High Pitch Buzzer",
      "Thickness": "6mm ultra-flat design"
    },
    isFeatured: true,
    isNew: false
  },
  {
    id: "prod-18",
    slug: "smart-wifi-plug-dual",
    name: "Smart WiFi Plug Dual",
    description: "Turn any appliance smart instantly. Connects with home networks, enabling voice command controls, scheduled routines, and energy tracking.",
    category: "smart-gadgets",
    brand: "sonix-elite",
    price: 249,
    originalPrice: 499,
    discount: 50,
    rating: 4.5,
    reviewsCount: 654,
    stock: 180,
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Glossy Ivory", hex: "#fbfbfb" }],
    highlights: [
      "Dual independent output sockets in a single wall-mount format",
      "Real-time electricity consumption stats and daily billing forecasts",
      "Compatible with HomeKit, Alexa, SmartThings, and Google Home",
      "Fire-retardant V0 safety grade poly-carbonate shell"
    ],
    specs: {
      "Input Voltage": "110V - 240V AC",
      "Max Load": "16 Amps (3500 Watts)",
      "Wireless Protocol": "Wi-Fi 2.4GHz & Bluetooth Assist",
      "Security": "Overload auto shut-off protection"
    }
  },
  {
    id: "prod-19",
    slug: "laser-distance-measure-smart",
    name: "Laser Distance Measure Smart",
    description: "Replace standard manual tape measurers. Point, click, and instantaneously send millimeter-perfect calculations directly to your tablet.",
    category: "smart-gadgets",
    brand: "sonix-elite",
    price: 899,
    originalPrice: 1799,
    discount: 50,
    rating: 4.6,
    reviewsCount: 88,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Industrial Yellow", hex: "#eab308" },
      { name: "Matte Slate", hex: "#475569" }
    ],
    highlights: [
      "Extremely fast 0.1-second laser readout mechanism",
      "Precision deviation within 1.5mm",
      "Calculates area, volumetric volume, and pythagoras equations"
    ],
    specs: {
      "Measurement Distance": "0.05m to 40 meters",
      "Display": "Backlit LCD screen readout",
      "Battery": "USB Rechargeable Li-Ion battery"
    }
  },
  {
    id: "prod-20",
    slug: "smart-pet-feeder-camera",
    name: "Smart Pet Feeder with HD Camera",
    description: "Interact with your pet from anywhere. Dispense customized kibble portions, schedules, and monitor via built-in 1080p camera.",
    category: "smart-gadgets",
    brand: "samsung",
    price: 3499,
    originalPrice: 5999,
    discount: 41,
    rating: 4.8,
    reviewsCount: 52,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Polar White", hex: "#f8fafc" },
      { name: "Tuxedo Grey", hex: "#334155" }
    ],
    highlights: [
      "HD wide-angle camera with night vision and two-way audio",
      "Anti-clog double rotor dispenser mechanics",
      "Dual battery and AC back-up guarantees feeding never stops"
    ],
    specs: {
      "Food Capacity": "4 Liters Dry Kibble",
      "Camera Resolution": "1080p Full HD Video",
      "Power": "5V DC USB + 4x D-cell backup batteries"
    }
  },
  {
    id: "prod-21",
    slug: "pocket-instant-photo-printer",
    name: "Pocket Instant Photo Printer",
    description: "Print wallet-size stickers anywhere. Bluetooth inkless ZINK tech lets you print images directly from phone rolls.",
    category: "smart-gadgets",
    brand: "sony",
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    rating: 4.4,
    reviewsCount: 83,
    stock: 38,
    images: [
      "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Pristine Pink", hex: "#fbcfe8" },
      { name: "Midnight Teal", hex: "#115e59" }
    ],
    highlights: [
      "ZINK (Zero Ink) thermal printing needs zero cartridges",
      "Strong peel-and-stick backing photo paper",
      "Custom collage filters inside smart app"
    ],
    specs: {
      "Print Speed": "45 seconds per sheet",
      "Image Size": "2 x 3 inches",
      "Battery Capacity": "Up to 30 prints per charge"
    }
  },
  {
    id: "prod-22",
    slug: "smart-sleep-sound-machine",
    name: "Smart Sleep Sound & Light",
    description: "Transform your evenings. Sunset simulation guides you to sleep, with white noise library and wake-up sunrise alarms.",
    category: "smart-gadgets",
    brand: "sonos",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    rating: 4.7,
    reviewsCount: 167,
    stock: 26,
    images: [
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Soft Cream Linen", hex: "#fafaf9" }],
    highlights: [
      "Gradual light simulation emulates morning sunshine",
      "Dual audio chambers pump high-fidelity relaxing audio waves",
      "Customizable touch-panel top sensor"
    ],
    specs: {
      "Audio Library": "35 soundscapes, white noises, pink noises",
      "Light Levels": "100 brightness levels, 16 million colors",
      "Power Source": "12V Wall adapter input"
    }
  },

  // 4. POWER & CHARGERS (6 products)
  {
    id: "prod-23",
    slug: "type-c-fast-charging-cable",
    name: "Type-C High-Speed Fast Charging Cable",
    description: "Virtually indestructible. Shielded in heavy ballistic braided nylon and copper conductors, supports blazing-fast data and 100W Power Delivery.",
    category: "power-chargers",
    brand: "sonix-elite",
    price: 129,
    originalPrice: 249,
    discount: 48,
    rating: 4.3,
    reviewsCount: 2410,
    stock: 1200,
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Carbon Grey", hex: "#374151" },
      { name: "Crimson Red", hex: "#dc2626" }
    ],
    highlights: [
      "Supports 100W USB-C Power Delivery (PD) fast charging",
      "Tested to withstand over 30,000 extreme 180-degree bends",
      "E-marker smart protection chip limits voltage spikes",
      "480Mbps ultra-fast file transfer speeds"
    ],
    specs: {
      "Cable Length": "2.0 meters (6.5 feet)",
      "Power output capability": "20V / 5A (Up to 100W)",
      "Outer Material": "Double-braided high-tensile nylon jacket",
      "Connector type": "USB Type-C to Type-C"
    }
  },
  {
    id: "prod-24",
    slug: "magnetic-wireless-powerbank-10k",
    name: "MagSafe Magnetic Power Bank 10K",
    description: "Snap and go. Powerful magnetic rings lock onto compatible devices, delivering fast wireless charging with 10,000mAh capacity.",
    category: "power-chargers",
    brand: "apple",
    price: 599,
    originalPrice: 1199,
    discount: 50,
    rating: 4.4,
    reviewsCount: 654,
    stock: 140,
    images: [
      "https://images.unsplash.com/photo-1622445262465-24819af522f5?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Sandstone Grey", hex: "#4b5563" },
      { name: "Chalk White", hex: "#f3f4f6" }
    ],
    highlights: [
      "Strong N52 magnetic grip holds tightly through bumps",
      "Simultaneously charge 3 devices (1x wireless, 2x wired ports)",
      "Pass-through charging: power the power bank while charging your device",
      "Intelligent temperature controls prevent overheating"
    ],
    specs: {
      "Capacity": "10,000 mAh Li-Polymer core",
      "Wireless Output": "7.5W / 10W / 15W Qi Standard",
      "Wired USB-C": "20W Power Delivery output",
      "Weight": "195 grams"
    },
    isFeatured: true
  },
  {
    id: "prod-25",
    slug: "gan-120w-charger-4port",
    name: "120W GaN 4-Port Fast Charger",
    description: "Shrink your brick. Next-gen Gallium Nitride (GaN) engineering packs 120W charging power into a adapter smaller than standard laptop chargers.",
    category: "power-chargers",
    brand: "sonix-elite",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    rating: 4.8,
    reviewsCount: 320,
    stock: 95,
    images: [
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Stealth Dark", hex: "#0f172a" },
      { name: "Ice White", hex: "#f8fafc" }
    ],
    highlights: [
      "Gallium Nitride (GaN v3) chips run cooler and 40% smaller",
      "Power 2 laptops and 2 mobile devices simultaneously",
      "Dynamic allocation feeds power where it is required"
    ],
    specs: {
      "Total Wattage": "120W Max",
      "Ports": "3x USB-C (PD 3.0) + 1x USB-A (QC 4.0)",
      "Plug Type": "Foldable US/EU Type-A prongs"
    },
    isFeatured: false,
    isNew: true
  },
  {
    id: "prod-26",
    slug: "magnetic-wireless-trio-dock",
    name: "Magnetic 3-in-1 Wireless Dock",
    description: "Declare war on cables. Charge your phone, smart watch, and wireless earbuds in a single premium floating glass stand.",
    category: "power-chargers",
    brand: "apple",
    price: 1899,
    originalPrice: 2999,
    discount: 36,
    rating: 4.7,
    reviewsCount: 142,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Aluminum Obsidian", hex: "#090d16" },
      { name: "Stardust White", hex: "#fafafa" }
    ],
    highlights: [
      "Brushed solid aluminum frame with heavy premium glass base",
      "Floating magnetic mount holds phone in portrait or landscape",
      "Built-in watch charging disc modules"
    ],
    specs: {
      "Phone Charging": "15W Magnetic wireless alignment",
      "Watch Charging": "5W magnetic",
      "Earbud Charging": "5W Qi base zone",
      "Required adapter": "9V/3A or 12V/3A adapter (included)"
    }
  },
  {
    id: "prod-27",
    slug: "heavy-duty-car-charger-65w",
    name: "Heavy-Duty 65W Car Charger",
    description: "Charged up on the road. Elegant carbon-fiber metal casing fits into standard cigarette lighter ports, pushing 65W total laptop speed.",
    category: "power-chargers",
    brand: "sonix-elite",
    price: 299,
    originalPrice: 599,
    discount: 50,
    rating: 4.4,
    reviewsCount: 198,
    stock: 210,
    images: [
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Gunmetal Chrome", hex: "#3f3f46" }],
    highlights: [
      "65W Power Delivery (USB-C) charges phones to 60% in 20 mins",
      "Heavy gold-plated connection contacts prevent drops on rough roads",
      "Built-in ambient diagnostic LED voltmeter screen"
    ],
    specs: {
      "Input": "DC 12V - 24V Vehicles compatibility",
      "Outputs": "1x USB-C (45W Max) + 1x USB-A (18W Max)",
      "Safety": "Over-current and thermal thermal shutdown"
    }
  },
  {
    id: "prod-28",
    slug: "solar-powerbank-rugged-20k",
    name: "Solar Rugged Power Bank 20K",
    description: "The ultimate survival battery. Shock-proof casing, built-in high power LED flashlight, and solar back-up panels.",
    category: "power-chargers",
    brand: "razer-labs",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    rating: 4.5,
    reviewsCount: 77,
    stock: 48,
    images: [
      "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Survival Green", hex: "#166534" },
      { name: "Stealth Black", hex: "#000000" }
    ],
    highlights: [
      "Massive 20,000mAh capacity provides 5 full charges",
      "High-efficiency solar cells gather emergency energy",
      "IP65 weather sealing: dust, drops, and downpour proof"
    ],
    specs: {
      "Capacity": "20,000 mAh",
      "Solar charging speed": "1.5W under bright sunlight",
      "Flashlight brightness": "300 lumens with SOS signaling modes"
    }
  },

  // 5. GAMING (8 products)
  {
    id: "prod-29",
    slug: "pro-tactile-mechanical-keyboard",
    name: "Apex Mechanical Keyboard",
    description: "Engineered for esports dominance. Features linear optical-magnetic switches, full customized per-key RGB lighting, and robust aluminum top plate.",
    category: "gaming",
    brand: "razer-labs",
    price: 1999,
    originalPrice: 3999,
    discount: 50,
    rating: 4.8,
    reviewsCount: 312,
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Classic Quartz Black", hex: "#18181b" },
      { name: "Mercury Silver White", hex: "#f4f4f5" }
    ],
    highlights: [
      "Linear optical switches deliver near-instantaneous 0.2ms trigger response",
      "High durability double-shot PBT keycaps never fade or shine",
      "Detachable plush leatherette ergonomic magnetic wrist support rest",
      "Dedicated multi-function media dial wheel control",
      "Full internal sound dampening foam layers"
    ],
    specs: {
      "Form Factor": "Tenkeyless (80% TKL design)",
      "Switch Type": "Sonix Linear Optical-Red Switches",
      "Lighting": "Per-Key RGB customizable through console app",
      "Connection Type": "Detachable Braided USB-C to USB-A"
    },
    isFeatured: true,
    isNew: true
  },
  {
    id: "prod-30",
    slug: "wireless-gaming-mouse-lightspeed",
    name: "Lightspeed Pro Gaming Mouse",
    description: "Absolute precision at minimal weight. Weighs only 63g. Outfitted with 25K sub-micron tracking sensors and zero-latency wireless lag.",
    category: "gaming",
    brand: "razer-labs",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    rating: 4.7,
    reviewsCount: 421,
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625842268584-8f329044703b?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Matte Void Black", hex: "#111827" },
      { name: "Pure Whiteout", hex: "#fafafa" }
    ],
    highlights: [
      "Ultra-lightweight 63g chassis without honeycomb holes",
      "25,600 DPI smart sub-micron motion sensor",
      "Exclusive zero-latency 2.4GHz USB wireless dongle",
      "Pure virgin PTFE feet plates provide friction-free sliding feel"
    ],
    specs: {
      "Sensor Type": "Apex Precision 25K Sensor",
      "Max Acceleration": "> 40G",
      "Max Speed": "> 400 IPS",
      "Battery Performance": "Up to 70 hours active motion"
    },
    isFeatured: true
  },
  {
    id: "prod-31",
    slug: "gaming-headset-with-mic",
    name: "Predator Surround Sound Headset",
    description: "Immerse yourself. 7.1 positional virtual surround audio, premium memory foam ear cushions, and carbon-reinforced adjustable band.",
    category: "gaming",
    brand: "razer-labs",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.4,
    reviewsCount: 76,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Razer Green Accent", hex: "#22c55e" },
      { name: "Apex Purple Accent", hex: "#a855f7" }
    ],
    highlights: [
      "Immersive 7.1 Virtual Spatial audio engine",
      "Active cardioid retractable microphone blocks background chat noise",
      "Breathable cooling-gel ear pad liners"
    ],
    specs: {
      "Drivers": "50mm Custom-tuned titanium diaphragms",
      "Weight": "285 grams",
      "Connection": "USB Wired + 3.5mm splitters"
    }
  },
  {
    id: "prod-32",
    slug: "rgb-custom-gaming-mousepad-xl",
    name: "RGB Custom Gaming Mousepad XL",
    description: "Complete desk authority. Spill-resistant microfiber weave framed by thick dual-zone smart RGB light bands.",
    category: "gaming",
    brand: "sonix-elite",
    price: 399,
    originalPrice: 799,
    discount: 50,
    rating: 4.5,
    reviewsCount: 198,
    stock: 120,
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Stealth Black Weave", hex: "#09090b" }],
    highlights: [
      "Massive 900mm x 400mm dimensions covers whole keyboard and mouse",
      "Premium micro-woven cloth is fully spill and stain proof",
      "12 dynamic RGB glow profiles easily selectable"
    ],
    specs: {
      "Dimensions": "900 x 400 x 4 mm",
      "Base": "Non-slip vulcanized natural rubber grip",
      "Power Connection": "1.8m Detachable micro-USB cable"
    }
  },
  {
    id: "prod-33",
    slug: "ergonomic-gaming-controller-pro",
    name: "Viper Pro Gaming Controller",
    description: "Designed for competitive console and PC play. Custom hair-trigger locks, swappable control sticks, and rear macro paddles.",
    category: "gaming",
    brand: "razer-labs",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    rating: 4.6,
    reviewsCount: 55,
    stock: 32,
    images: [
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Void Grey", hex: "#1e293b" },
      { name: "Cyberpunk Yellow", hex: "#fbbf24" }
    ],
    highlights: [
      "Instantaneous trigger stops cut throw distance by 80%",
      "4 assignable back paddle click switches",
      "Bluetooth & low-latency 2.4GHz wireless support"
    ],
    specs: {
      "Platform compatibility": "PC, Xbox, PlayStation, Android, Switch",
      "Thumbsticks": "Magnetic tension-adjustable caps",
      "Battery life": "Up to 30 hours rechargeable"
    }
  },
  {
    id: "prod-34",
    slug: "usb-c-streaming-microphone",
    name: "Sonix Streamer USB Microphone",
    description: "Broadcast your voice beautifully. Cardioid studio pattern capsule captures studio vocals, with built-in zero-latency monitoring jack.",
    category: "gaming",
    brand: "sony",
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    rating: 4.7,
    reviewsCount: 88,
    stock: 27,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Obsidian Black", hex: "#18181b" },
      { name: "Ice White", hex: "#fafafa" }
    ],
    highlights: [
      "Premium 14mm condenser cardioid recording capsule",
      "Tap-to-mute capacitive top switch with glowing state indicator",
      "Built-in heavy internal steel shock-mount frame"
    ],
    specs: {
      "Sample Rate": "96kHz / 24-bit studio grade",
      "Polar Patterns": "Cardioid directional only",
      "Connection": "USB-C plug-and-play"
    }
  },
  {
    id: "prod-35",
    slug: "smart-rgb-lightbar-monitor",
    name: "Smart Monitor Screen Bar Light",
    description: "Save space on your desk and reduce eye strain. Clamps safely onto monitors, throwing ambient front light onto your work area.",
    category: "gaming",
    brand: "sonix-elite",
    price: 899,
    originalPrice: 1799,
    discount: 50,
    rating: 4.6,
    reviewsCount: 165,
    stock: 52,
    images: [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Anodized Black Aluminum", hex: "#27272a" }],
    highlights: [
      "Asymmetric optical projection shines down, avoiding screen glare",
      "Dual backlight throws custom immersive reactive RGB on wall",
      "Wireless desktop dial controller for dimming and temperature adjustments"
    ],
    specs: {
      "Length": "450 mm bar",
      "Brightness": "Maximum 500 Lux output",
      "Color Temp Range": "2700K Warm - 6500K Ice White"
    }
  },
  {
    id: "prod-36",
    slug: "pro-vr-headset-wireless-allinone",
    name: "Apex VR Headset Wireless",
    description: "Step into virtual universes. Wireless standalone headset, detailed 4K high resolution screens, and precise spatial tracking.",
    category: "gaming",
    brand: "samsung",
    price: 29999,
    originalPrice: 49999,
    discount: 40,
    rating: 4.9,
    reviewsCount: 22,
    stock: 5,
    images: [
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Polished Carbon White", hex: "#f8fafc" }],
    highlights: [
      "Standalone Snapdragon processor, no computer cords needed",
      "Stunning 4K dual display panels (120Hz refresh rates)",
      "High-precision tracking controllers"
    ],
    specs: {
      "Display": "2064x2208 pixels per eye display",
      "Storage": "128GB Flash",
      "Battery life": "Up to 3 hours immersive gameplay"
    },
    isFeatured: true
  },

  // 6. LIGHTING (6 products)
  {
    id: "prod-37",
    slug: "rgb-strip-light-2m",
    name: "Chroma RGB Smart Strip Light (2m)",
    description: "Paint your room in color. Multi-zone adressable LEDs, full music sync, and dynamic home automation integration.",
    category: "lighting",
    brand: "sonix-elite",
    price: 249,
    originalPrice: 499,
    discount: 50,
    rating: 4.4,
    reviewsCount: 1420,
    stock: 500,
    images: [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Pure White base", hex: "#ffffff" }],
    highlights: [
      "Addressable RGBIC lets you paint multiple colors in one strip simultaneously",
      "Thick premium splash-proof silicone protective jacket layer",
      "Smart micro-phone adapter synchronizes glow styles perfectly to music",
      "High quality strong 3M backing tape bounds to any flat surface"
    ],
    specs: {
      "Length": "2 Meters (6.5 feet) extendable",
      "LED Quantity": "60 LEDs per Meter",
      "Connectivity": "Wi-Fi 2.4GHz & Bluetooth mesh",
      "Lumen output": "1000 Lumens total brightness"
    }
  },
  {
    id: "prod-38",
    slug: "smart-rgb-mood-lamp",
    name: "GlowSphere Smart Mood Lamp",
    description: "Sleek architectural statement. Diffused 360-degree ambient glow, touch-capacitive tap top, and millions of curated color presets.",
    category: "lighting",
    brand: "sonix-elite",
    price: 299,
    originalPrice: 599,
    discount: 50,
    rating: 4.5,
    reviewsCount: 520,
    stock: 140,
    images: [
      "https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Frosted Glass Finish", hex: "#ffffff" }],
    highlights: [
      "Beautiful frosted hand-blown glass aesthetic shade",
      "Warm candle simulation mode flickers realistically",
      "Saves custom settings directly to unit flash"
    ],
    specs: {
      "Bulb Type": "Smart Addressable LED Array",
      "Power consumption": "10 Watts Max",
      "Dimensions": "15cm Diameter Sphere"
    },
    isFeatured: true
  },
  {
    id: "prod-39",
    slug: "architectural-rgb-lightbars-pair",
    name: "Architectural RGB Lightbars (Pair)",
    description: "Immersive television backlighting. Twin vertical light towers to stand next to monitors or lay behind displays.",
    category: "lighting",
    brand: "nothing-tech",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.6,
    reviewsCount: 78,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Anodized Slate Frame", hex: "#1e293b" }],
    highlights: [
      "Twin lighting towers provide immersive room lighting coverage",
      "Camera-sync option captures screen state and mirrors colors",
      "Heavy weighted non-tip base structures"
    ],
    specs: {
      "Quantity": "Two vertical lightbars in box",
      "Height": "350mm high stand",
      "Power": "Dual light split cable feeds from single wall block"
    }
  },
  {
    id: "prod-40",
    slug: "smart-rgb-lightbulb-e27",
    name: "Smart RGB Lightbulb (E27)",
    description: "Upgrade standard sockets. 16 million colors and tunable white lighting inside a standard energy-saving bulb.",
    category: "lighting",
    brand: "sonix-elite",
    price: 199,
    originalPrice: 399,
    discount: 50,
    rating: 4.3,
    reviewsCount: 887,
    stock: 450,
    images: [
      "https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Opal Glass", hex: "#ffffff" }],
    highlights: [
      "Bright 9W LED bulb replaces old power-hungry 60W bulbs",
      "Fully dimmable down to 1% for night lighting",
      "Connects directly with home Wi-Fi, no extra hub hardware required"
    ],
    specs: {
      "Socket Base": "E27 Screw Socket Base",
      "Lumen Output": "806 Lumens maximum brightness",
      "Power Consumption": "9 Watts at full white output"
    }
  },
  {
    id: "prod-41",
    slug: "minimalist-smart-desk-lamp",
    name: "Minimalist Smart Desk Lamp",
    description: "Engineered for productive desks. Sleek aluminum armature, adjustable color heat, and integrated MagSafe wireless charger in base.",
    category: "lighting",
    brand: "apple",
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    rating: 4.8,
    reviewsCount: 65,
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Alum Space Grey", hex: "#3f3f46" },
      { name: "Polar Satin White", hex: "#fafafa" }
    ],
    highlights: [
      "MagSafe charging coil built directly into base plate",
      "Architectural dual-pivot steel arm adjusts light angles safely",
      "High quality glare-free front diffuser prevents eye fatigue"
    ],
    specs: {
      "Base Charger Wattage": "15W MagSafe fast charge",
      "Maximum height": "550mm extended arm",
      "CRI index": "95 Ra natural light quality standard"
    }
  },
  {
    id: "prod-42",
    slug: "outdoor-smart-solar-wall-light",
    name: "Outdoor Smart Solar Wall Light",
    description: "Guard paths with light. Gathers solar power, turning on bright floodlights when smart PIR sensors catch motion.",
    category: "lighting",
    brand: "sonix-elite",
    price: 349,
    originalPrice: 699,
    discount: 50,
    rating: 4.1,
    reviewsCount: 198,
    stock: 90,
    images: [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Satin Slate Black", hex: "#18181b" }],
    highlights: [
      "IP65 completely weatherproof and heatproof wall mount",
      "Intelligent passive infrared sensor (PIR) detects movement up to 10m away",
      "Integrated solar panel runs battery for 8 hours active lighting"
    ],
    specs: {
      "Battery Capacity": "2200 mAh Lithium battery core",
      "Brightness": "500 Lumens full sweep",
      "Weather Sealing": "IP65 Waterproofing"
    }
  },

  // 7. MOBILE ACCESSORIES (6 products)
  {
    id: "prod-43",
    slug: "magnetic-phone-holder-desk",
    name: "Magnetic Phone Holder for Desk",
    description: "Clean, architectural desktop pedestal. Solid weighted steel footplate with powerful swiveling magnetic head.",
    category: "accessories",
    brand: "sonix-elite",
    price: 149,
    originalPrice: 299,
    discount: 50,
    rating: 4.5,
    reviewsCount: 982,
    stock: 450,
    images: [
      "https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Space Grey Alloy", hex: "#4b5563" },
      { name: "Champagne Silver", hex: "#cbd5e1" }
    ],
    highlights: [
      "Industrial grade N52 neodymium magnets snap hold any device",
      "360-degree precision rotation ball joint allows easy view angles",
      "Solid zinc-alloy base plate weighs 250 grams to prevent tipping",
      "Soft silicone pads protect device surfaces"
    ],
    specs: {
      "Base Weight": "245 grams",
      "Chassis Material": "Zinc Alloy & Space Anodized Aluminum",
      "Compatibility": "Universal MagSafe & metal plate adapters (included)"
    }
  },
  {
    id: "prod-44",
    slug: "cable-organizer-set",
    name: "Silicon Cable Organizer (Set of 5)",
    description: "Control desk clutter. Flexible, heavy-duty silicone slots bind charging cables to desk sides.",
    category: "accessories",
    brand: "sonix-elite",
    price: 99,
    originalPrice: 199,
    discount: 50,
    rating: 4.2,
    reviewsCount: 1845,
    stock: 2000,
    images: [
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Stealth Charcoal Black", hex: "#18181b" },
      { name: "Ice White", hex: "#f4f4f5" }
    ],
    highlights: [
      "Made of ultra-flexible eco-friendly silicone",
      "Heavy-duty acrylic tape adheres to wood, glass, or steel desks",
      "Packs include 1, 3, and 5-channel organizers"
    ],
    specs: {
      "Pack Quantity": "5 pieces in different slot variations",
      "Material": "70 durometer flexible silicone",
      "Max Cable Diameter": "6.5 mm per channel slot"
    }
  },
  {
    id: "prod-45",
    slug: "selfie-stick-tripod-remote",
    name: "Selfie Stick Tripod with Bluetooth Remote",
    description: "Capture memories perfectly. Collapsible selfie stick unfolds into a stable tabletop tripod with wireless capture clicker.",
    category: "accessories",
    brand: "sonix-elite",
    price: 349,
    originalPrice: 599,
    discount: 41,
    rating: 4.3,
    reviewsCount: 312,
    stock: 180,
    images: [
      "https://images.unsplash.com/photo-1603184017905-b4164b497b83?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Matte Black Aluminum", hex: "#1f2937" }],
    highlights: [
      "Expands from 18cm pockets up to 80cm tall tripod stand",
      "Rechargeable Bluetooth shutter remote slides out of base",
      "Supports 360 rotation for portrait video captures"
    ],
    specs: {
      "Weight": "165 grams",
      "Material": "Carbon Fiber & Polycarbonate",
      "Wireless distance": "Up to 10 meters distance capture"
    }
  },
  {
    id: "prod-46",
    slug: "suction-cup-magnetic-car-mount",
    name: "Suction Cup Magnetic Car Mount",
    description: "Locks phone safely during road trips. Heavy military grade suction cup mounts to windshields or dash boards.",
    category: "accessories",
    brand: "sonix-elite",
    price: 249,
    originalPrice: 499,
    discount: 50,
    rating: 4.4,
    reviewsCount: 382,
    stock: 220,
    images: [
      "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Textured Carbon Black", hex: "#1c1917" }],
    highlights: [
      "Sticky-gel suction cup is fully washable and reusable",
      "Extending telescopic arm adds 5 inches of custom viewing range",
      "N52 magnetic plate locks phone safely over massive bumps"
    ],
    specs: {
      "Arm Extension": "100mm to 150mm extension range",
      "Pull capacity": "Locks up to 2.5kg load",
      "Mounting base": "Suction gel locking pad"
    }
  },
  {
    id: "prod-47",
    slug: "waterproof-phone-pouch-oceanic",
    name: "Waterproof Phone Pouch Oceanic",
    description: "Deep sea protection. Secure double clasp lock completely blocks water, sand, and dust down to 30 meters.",
    category: "accessories",
    brand: "sonix-elite",
    price: 199,
    originalPrice: 399,
    discount: 50,
    rating: 4.2,
    reviewsCount: 142,
    stock: 450,
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Clear Neon Green", hex: "#86efac" },
      { name: "Stealth Clear Dark", hex: "#1e293b" }
    ],
    highlights: [
      "IPX8 certified water seal down to 30 meters depth",
      "Ultra-clear capacitive PVC keeps screens fully touch-functional",
      "High strength safety lanyard cord included"
    ],
    specs: {
      "Waterproofing": "IPX8 Certified",
      "Max Screen compatibility": "Up to 7.0 inch smartphones",
      "Floatation": "Air pocket border floats to surface"
    }
  },
  {
    id: "prod-48",
    slug: "ring-light-desktop-vlog",
    name: "Vlogger Desktop Ring Light",
    description: "Professional lighting for Zoom and vlogging. Heavy metal desktop stand holding a 10-inch variable temperature ring light.",
    category: "accessories",
    brand: "sony",
    price: 499,
    originalPrice: 999,
    discount: 50,
    rating: 4.5,
    reviewsCount: 382,
    stock: 68,
    images: [
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Pro Satin Black", hex: "#111827" }],
    highlights: [
      "10-inch ring light with 120 premium high-CRI LEDs",
      "3 dynamic color temperature light channels with 10 brightness steps",
      "Heavy non-tip iron desktop base plate"
    ],
    specs: {
      "Light Diameter": "10 inches (250 mm)",
      "Height Range": "300mm to 500mm adjustable",
      "Power Connection": "2m USB-A cable with controller"
    }
  },

  // 8. HOME TECH (4 products)
  {
    id: "prod-49",
    slug: "smart-security-camera-1080p",
    name: "Horizon Smart Security Camera",
    description: "Protect your home with smart eyes. 360 pan-tilt cover, high accuracy AI human detection, and crystal clear night vision.",
    category: "home-tech",
    brand: "samsung",
    price: 1999,
    originalPrice: 3999,
    discount: 50,
    rating: 4.6,
    reviewsCount: 382,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [{ name: "Pristine Ceramic White", hex: "#ffffff" }],
    highlights: [
      "Full 360-degree horizontal rotation cover with 110 vertical tilt",
      "Real-time AI tracks shapes, filtering bugs and wind alerts",
      "Secure end-to-end encryption on local MicroSD or Cloud storage",
      "Two-way high quality audio makes it a baby monitor option"
    ],
    specs: {
      "Video Resolution": "1080p Full HD (25 FPS)",
      "Pan-Tilt Range": "360 Horizontal, 114 Vertical",
      "Night Vision Range": "Up to 30 feet infrared range",
      "Wireless Protocol": "Wi-Fi 2.4GHz"
    },
    isFeatured: true
  },
  {
    id: "prod-50",
    slug: "ultrasonic-essential-oil-diffuser",
    name: "Ultrasonic Essential Oil Diffuser",
    description: "Immersive home atmosphere. Diffuses custom scents with dense ultrasonic cool mist, accompanied by warm glowing lights.",
    category: "home-tech",
    brand: "sonos",
    price: 499,
    originalPrice: 999,
    discount: 50,
    rating: 4.4,
    reviewsCount: 712,
    stock: 85,
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Natural Maple Wood", hex: "#fbcfe8" },
      { name: "Frosted Obsidian Glass", hex: "#3f3f46" }
    ],
    highlights: [
      "2.4MHz ultrasonic vibrating plate creates microscopic scent mist",
      "Whisper quiet operation runs under 23 decibels",
      "Automatic dry water level auto-shutoff mechanism"
    ],
    specs: {
      "Water Tank Capacity": "300 mL volume",
      "Mist Output Speed": "30 mL per hour continuous",
      "Run duration": "Up to 10 hours interval misting"
    }
  },
  {
    id: "prod-51",
    slug: "mini-air-purifier-desktop",
    name: "Halo Mini Air Purifier",
    description: "Breath pure air at your desk. High-performance True HEPA H13 filter traps 99.97% of smoke, pet dander, and odors.",
    category: "home-tech",
    brand: "sonix-elite",
    price: 1899,
    originalPrice: 2999,
    discount: 36,
    rating: 4.5,
    reviewsCount: 110,
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Polar Satin White", hex: "#f8fafc" },
      { name: "Midnight Ash Black", hex: "#0f172a" }
    ],
    highlights: [
      "3-stage filtration: Pre-filter, True HEPA filter, and Activated Carbon",
      "Smart filter health indicator counts remaining life hours",
      "Low power sleep mode consumes only 2 Watts of electricity"
    ],
    specs: {
      "CADR rating": "80 m³/hour cleaning capacity",
      "Room coverage": "Up to 120 square feet area",
      "Noise Level": "24dB Sleep mode to 48dB Max turbo"
    }
  },
  {
    id: "prod-52",
    slug: "smart-lcd-writing-tablet",
    name: "Smart LCD Sketch Pad & Tablet",
    description: "Doodle, draw, and keep notes without paper. Frictionless pressure-sensitive LCD stylus feels exactly like writing on sheets.",
    category: "home-tech",
    brand: "nothing-tech",
    price: 299,
    originalPrice: 499,
    discount: 40,
    rating: 4.3,
    reviewsCount: 312,
    stock: 140,
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop"
    ],
    colors: [
      { name: "Chalk White Frame", hex: "#f4f4f5" },
      { name: "Charcoal Black Frame", hex: "#18181b" }
    ],
    highlights: [
      "High-contrast zero-emission pressure sensitive LCD screen",
      "One-click complete screen erase button with smart lock switch",
      "Lithium coin battery operates for 50,000 erase cycles"
    ],
    specs: {
      "Screen Diagonal": "10.5 inch surface size",
      "Stylus Type": "Frictionless magnetic snap-on stylus (included)",
      "Battery Type": "CR2025 coin cell power"
    }
  }
];
