export const CATEGORIES = [
  { id: "oversized", name: "Oversized", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop" },
  { id: "minimal", name: "Minimal", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop" },
  { id: "graphic", name: "Graphic", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop" },
  { id: "anime", name: "Anime", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop" },
  { id: "vintage", name: "Vintage", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop" },
  { id: "streetwear", name: "Streetwear", image: "https://images.unsplash.com/photo-1503341455253-b2e72fbb0bd2?q=80&w=1200&auto=format&fit=crop" },
];

export const PRODUCTS = [
  {
    id: "1",
    name: "Onyx Oversized",
    price: 125,
    category: "oversized",
    description: "Premium cotton oversized t-shirt in matte black. Heavyweight fabric with a luxury drape, featuring dropped shoulders and a wider silhouette for the ultimate street look. Crafted from 400GSM organic cotton for superior longevity.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583744414846-48211063bc81?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: ["#050505", "#ffffff"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 124,
  },
  {
    id: "2",
    name: "Zen Minimalist",
    price: 95.00,
    category: "minimal",
    description: "Ultra-clean aesthetic. Sustainably sourced organic cotton with a soft-touch finish. Designed for those who appreciate the beauty of simplicity and high-end texture. Reinforced shoulders for silhouette retention.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: ["#f5f5dc", "#ffffff", "#050505"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 98,
  },
  {
    id: "3",
    name: "Cyberspace Graphic",
    price: 115.00,
    category: "graphic",
    description: "Limited edition drop. Futuristic 3D graphic print on premium heavyweight cotton. A statement piece that bridges digital art and physical fashion with high-density puff print details.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503341509153-d8ac0ac7551a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503341918561-002d2466986e?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: ["#050505", "#0000ff"],
    sizes: ["M", "L", "XL"],
    rating: 5.0,
    reviews: 42,
  },
  {
    id: "4",
    name: "Neon Samurai",
    price: 145,
    category: "anime",
    description: "Manga-inspired aesthetics with a streetwear twist. Glow-in-the-dark accent lines and premium screen-printed artwork on our custom oversized block. A fusion of neo-Tokyo cyberculture and high-end street garments.",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583744414846-48211063bc81?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: ["#ffffff", "#ff00ff"],
    sizes: ["S", "M", "L"],
    rating: 4.7,
    reviews: 67,
  },
  {
    id: "5",
    name: "Dust Vintage",
    price: 135.00,
    category: "vintage",
    description: "Acid washed for a pre-loved vintage look. Relaxed fit with distressed edges and a soft, broken-in feel from the first wear. Unique wash on every piece. Crafted in our specialized aging studio.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: ["#4a4a4a", "#808080"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 215,
  },
  {
    id: "6",
    name: "Concrete Hype",
    price: 185,
    category: "streetwear",
    description: "The ultimate collector's piece. Dense embroidery on premium midnight blue cotton. This drop defines the Veloura Zone vision of elevated street culture. Limited to 50 pieces worldwide.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503341509153-d8ac0ac7551a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583744414846-48211063bc81?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: ["#000080", "#050505"],
    sizes: ["M", "L", "XL"],
    rating: 5.0,
    reviews: 18,
  }
];
