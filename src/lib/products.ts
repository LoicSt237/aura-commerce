export type Product = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  badge?: "new" | "sale" | "hot";
  stock: number;
  description: string;
  features: string[];
};
const img = (q: string, seed: number) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=900&q=80&sig=${seed}`;

export const categories = [
  { slug: "electronics", name: "Electronics", icon: "💻" },
  { slug: "fashion", name: "Fashion", icon: "👗" },
  { slug: "home", name: "Home & Living", icon: "🛋️" },
  { slug: "beauty", name: "Beauty", icon: "💄" },
  { slug: "sports", name: "Sports", icon: "⚽" },
  { slug: "books", name: "Books", icon: "📚" },
];

export const products: Product[] = [
  {
    id: "1", slug: "aurora-wireless-headphones", name: "Aurora Wireless Headphones",
    brand: "Sonix", price: 24900, oldPrice: 32900, rating: 4.8, reviews: 2143,
    category: "electronics", image: img("1505740420928-5e560c06d30e", 1),
    badge: "sale", stock: 24,
    description: "Studio-grade active noise cancelling headphones with 40h battery life and spatial audio.",
    features: ["ANC adaptatif", "40h autonomie", "Bluetooth 5.3", "Audio spatial"],
  },
  {
    id: "2", slug: "lumen-smart-watch", name: "Lumen Smart Watch Series 9",
    brand: "Lumen", price: 39900, rating: 4.7, reviews: 1502,
    category: "electronics", image: img("1523275335684-37898b6baf30", 2),
    badge: "new", stock: 48,
    description: "Always-on AMOLED, GPS, ECG and 7-day battery life. Built for athletes.",
    features: ["AMOLED 1.9\"", "GPS double-fréquence", "ECG & SpO2", "7 jours"],
  },
  {
    id: "3", slug: "nova-running-shoes", name: "Nova Running Shoes",
    brand: "Pulse", price: 12900, oldPrice: 15900, rating: 4.6, reviews: 845,
    category: "sports", image: img("1542291026-7eec264c27ff", 3),
    badge: "hot", stock: 90,
    description: "Featherweight runners with carbon plate and responsive foam for marathon PRs.",
    features: ["Plaque carbone", "Mousse réactive", "245g", "Drop 8mm"],
  },
  {
    id: "4", slug: "velvet-trench-coat", name: "Velvet Trench Coat",
    brand: "Maison Côte", price: 28900, rating: 4.9, reviews: 312,
    category: "fashion", image: img("1551488831-00ddcb6c6bd3", 4),
    stock: 12,
    description: "Tailored trench in Italian wool with signature horn buttons.",
    features: ["Laine italienne", "Coupe ajustée", "Doublure soie"],
  },
  {
    id: "5", slug: "ceramic-pour-over", name: "Ceramic Pour-Over Set",
    brand: "Brewlab", price: 6400, rating: 4.5, reviews: 423,
    category: "home", image: img("1495474472287-4d71bcdd2085", 5),
    badge: "new", stock: 60,
    description: "Hand-thrown ceramic dripper with double-walled carafe.",
    features: ["Céramique artisanale", "Double paroi", "Filtre permanent"],
  },
  {
    id: "6", slug: "glow-vitamin-c-serum", name: "Glow Vitamin C Serum",
    brand: "Lume", price: 3800, oldPrice: 5200, rating: 4.7, reviews: 1893,
    category: "beauty", image: img("1556228720-195a672e8a03", 6),
    badge: "sale", stock: 200,
    description: "Brightening serum with 15% L-ascorbic acid and hyaluronic acid.",
    features: ["Vitamine C 15%", "Acide hyaluronique", "Sans parfum"],
  },
  {
    id: "7", slug: "linen-throw-pillow", name: "Linen Throw Pillow",
    brand: "Maisonnée", price: 4200, rating: 4.4, reviews: 219,
    category: "home", image: img("1540574163026-643ea20ade25", 7),
    stock: 150,
    description: "Stonewashed linen pillow cover in muted earth tones.",
    features: ["100% lin lavé", "Zip dissimulé", "45×45cm"],
  },
  {
    id: "8", slug: "atlas-leather-backpack", name: "Atlas Leather Backpack",
    brand: "Wanderlight", price: 21900, oldPrice: 27900, rating: 4.8, reviews: 654,
    category: "fashion", image: img("1553062407-98eeb64c6a62", 8),
    badge: "sale", stock: 35,
    description: "Full-grain leather backpack with padded laptop sleeve and YKK zippers.",
    features: ["Cuir pleine fleur", "Compartiment 16\"", "Garantie à vie"],
  },
  {
    id: "9", slug: "pro-yoga-mat", name: "Pro Yoga Mat 6mm",
    brand: "Asana", price: 7800, rating: 4.6, reviews: 932,
    category: "sports", image: img("1592194996308-7b43878e84a6", 9),
    stock: 80,
    description: "Eco-friendly natural rubber yoga mat with alignment markers.",
    features: ["Caoutchouc naturel", "Antidérapant", "Lignes d'alignement"],
  },
  {
    id: "10", slug: "minimalism-book", name: "The Art of Minimalism",
    brand: "Penguin", price: 1800, rating: 4.3, reviews: 487,
    category: "books", image: img("1544947950-fa07a98d237f", 10),
    stock: 300,
    description: "A modern guide to designing a focused, intentional life.",
    features: ["Couverture rigide", "324 pages", "Édition limitée"],
  },
  {
    id: "11", slug: "orbit-4k-monitor", name: "Orbit 27\" 4K Monitor",
    brand: "Orbit", price: 54900, oldPrice: 69900, rating: 4.7, reviews: 1108,
    category: "electronics", image: img("1527443224154-c4a3942d3acf", 11),
    badge: "sale", stock: 18,
    description: "27\" 4K IPS panel with 99% DCI-P3 and USB-C 90W power delivery.",
    features: ["4K UHD", "99% DCI-P3", "USB-C 90W", "120Hz"],
  },
  {
    id: "12", slug: "silk-scrunchie-set", name: "Silk Scrunchie Set",
    brand: "Soie & Co", price: 2400, rating: 4.5, reviews: 372,
    category: "beauty", image: img("1522335789203-aaa2f1668dba", 12),
    badge: "new", stock: 240,
    description: "Set of 5 mulberry silk scrunchies, gentle on hair.",
    features: ["Soie de mûrier", "Pack de 5", "Hypoallergénique"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (cat: string) =>
  products.filter((p) => p.category === cat);
