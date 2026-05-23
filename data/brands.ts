export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description: string;
}

export const brands: Brand[] = [
  { id: "b-1", name: "Sonix Elite", slug: "sonix-elite", description: "Our house brand of engineered audio and smart peripherals." },
  { id: "b-2", name: "Nothing Tech", slug: "nothing-tech", description: "Minimalistic, raw, transparent design concepts." },
  { id: "b-3", name: "Apple", slug: "apple", description: "Premium design, ultimate integration, and reliable performance." },
  { id: "b-4", name: "Bose", slug: "bose", description: "Unmatched noise-cancelling and absolute audio clarity." },
  { id: "b-5", name: "Sonos", slug: "sonos", description: "Wireless home sound systems connecting music, home theater, and more." },
  { id: "b-6", name: "Razer Labs", slug: "razer-labs", description: "High-performance gaming accessories designed for esports pros." },
  { id: "b-7", name: "Sony", slug: "sony", description: "Decades of engineering mastery in imaging, gaming, and sound." },
  { id: "b-8", name: "Samsung", slug: "samsung", description: "Pioneering displays, mobile ecosystems, and interconnected appliances." }
];
