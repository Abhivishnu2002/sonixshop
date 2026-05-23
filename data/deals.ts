export interface Deal {
  id: string;
  productId: string; // references a product slug
  dealPrice: number;
  badge: string;
  endsAt: string; // ISO string or static countdown target
}

export const deals: Deal[] = [
  {
    id: "deal-1",
    productId: "tws-wireless-earbuds-pro",
    dealPrice: 299,
    badge: "50% OFF FLASH",
    endsAt: "2026-06-01T00:00:00Z"
  },
  {
    id: "deal-2",
    productId: "smart-watch-fit-tracker",
    dealPrice: 599,
    badge: "BESTSELLER DEAL",
    endsAt: "2026-06-01T00:00:00Z"
  },
  {
    id: "deal-3",
    productId: "pro-tactile-mechanical-keyboard",
    dealPrice: 1999,
    badge: "GAMER CRUSH",
    endsAt: "2026-06-01T00:00:00Z"
  },
  {
    id: "deal-4",
    productId: "magnetic-wireless-powerbank-10k",
    dealPrice: 599,
    badge: "POWER FLASH",
    endsAt: "2026-06-01T00:00:00Z"
  }
];
export const newArrivals: string[] = [
  "smart-watch-ultra-titanium",
  "gan-120w-charger-4port",
  "pro-tactile-mechanical-keyboard",
  "wireless-over-ear-headphones",
  "smart-ring-health-tracker"
];
