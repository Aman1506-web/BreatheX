// /constants/everydayData.ts

export const PRODUCTS = {
  Men: [
    {
      id: "32",
      title: "GYMWEAR SET - NAVY BLUE",
      slug: "gymwear-set-navy-blue",
      img: "/images/men1.jpg",
      oldPrice: 2499,
      price: 1799,
      discount: "28% OFF",
    },
    {
      id: "33",
      title: "CLASSIC GYM VEST - WHITE",
      slug: "classic-gym-vest-white",
      img: "/images/men2.jpg",
      oldPrice: 999,
      price: 699,
      discount: "30% OFF",
    },
    {
      id: "34",
      title: "GYMWEAR SET- BLACK",
      slug: "gymwear-set-black",
      img: "/images/men3.jpg",
      oldPrice: 2499,
      price: 1799,
      discount: "28% OFF",
    },
  ],
  Women: [
    {
      id: "35",
      title: "Snatched Ribbed Set - Navy Blue",
      slug: "snatched-ribbed-set-navy-blue",
      img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=800&fit=crop",
      oldPrice: 2499,
      price: 1799,
      discount: "28% OFF",
    },
    {
      id: "36",
      title: "Snatched Leggings - Black",
      slug: "snatched-leggings-black",
      img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=800&fit=crop",
      oldPrice: 1499,
      price: 1099,
      discount: "27% OFF",
    },
    {
      id: "37",
      title: "Snatched Ribbed Set - White",
      slug: "snatched-ribbed-set-white",
      img: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=800&h=800&fit=crop",
      oldPrice: 2499,
      price: 1799,
      discount: "28% OFF",
    },
  ],
  Gear: [
    {
      id: "38",
      title: "JUMP ROPE PRO",
      slug: "jump-rope-pro",
      img: "/images/gear1.jpg",
      oldPrice: 599,
      price: 399,
      discount: "33% OFF",
    },
    {
      id: "39",
      title: "ANTI-BURST GYM BALL",
      slug: "anti-burst-gym-ball",
      img: "/images/gear3.jpg",
      oldPrice: 1299,
      price: 999,
      discount: "23% OFF",
    },
    {
      id: "40",
      title: "ROLLER + 10LB DUMBELL SET",
      slug: "roller-10lb-dumbell-set",
      img: "/images/gear2.jpg",
      oldPrice: 1999,
      price: 1499,
      discount: "25% OFF",
    },
  ],
} as const;

export type ProductCategory = keyof typeof PRODUCTS;
export type Product = (typeof PRODUCTS)[ProductCategory][number];
