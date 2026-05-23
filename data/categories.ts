export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  gradient: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Audio",
    slug: "audio",
    icon: "Headphones",
    description: "Immersive high-fidelity audio equipment for audiophiles.",
    gradient: "from-blue-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "cat-2",
    name: "Wearables",
    slug: "wearables",
    icon: "Watch",
    description: "Smartwatches and fitness trackers designed for tomorrow.",
    gradient: "from-indigo-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "cat-3",
    name: "Smart Gadgets",
    slug: "smart-gadgets",
    icon: "Cpu",
    description: "Intelligent tools and sensors to automate your modern life.",
    gradient: "from-purple-500 to-pink-600",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "cat-4",
    name: "Power & Chargers",
    slug: "power-chargers",
    icon: "Zap",
    description: "High-speed charging units, multi-ports, and premium power banks.",
    gradient: "from-amber-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "cat-5",
    name: "Gaming",
    slug: "gaming",
    icon: "Gamepad2",
    description: "Pro-grade tactile mice, keyboards, and ultimate setups.",
    gradient: "from-red-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "cat-6",
    name: "Lighting",
    slug: "lighting",
    icon: "Sparkles",
    description: "Ambient RGB bars, customizable strips, and architectural lighting.",
    gradient: "from-cyan-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "cat-7",
    name: "Mobile Accessories",
    slug: "accessories",
    icon: "Smartphone",
    description: "Premium magnetic mounts, minimal stands, and everyday accessories.",
    gradient: "from-teal-500 to-emerald-600",
    image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "cat-8",
    name: "Home Tech",
    slug: "home-tech",
    icon: "Home",
    description: "Sleek smart diffusers, automated cameras, and climate tools.",
    gradient: "from-emerald-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop"
  }
];
