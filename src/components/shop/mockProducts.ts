import { Product } from "./ProductCard";

export const mockProducts: Product[] = [
  // Bestseller Category
  {
    id: "1",
    name: "RESISTANCE TUBE - SET OF 11",
    slug: "resistance-tube-set-11",
    price: 1299,
    originalPrice: 2165,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop",
    badge: "Trending",
    category: "bestseller"
  },
  {
    id: "2",
    name: "POSTURE CORRECTOR - UNISEX",
    slug: "posture-corrector-unisex",
    price: 1199,
    originalPrice: 1699,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=800&fit=crop",
    badge: "Bestseller",
    category: "bestseller"
  },

  // Apparel Category
  {
    id: "3",
    name: "MENS WINTER BOMBER JACKET - BLUE/GREY",
    slug: "mens-winter-bomber-jacket-blue-grey",
    price: 1499,
    originalPrice: 2498,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop",
    category: "apparel"
  },
  {
    id: "4",
    name: "MENS WINTER BOMBER JACKET WITH DETACHABLE CAP - BLUE/WHITE",
    slug: "mens-winter-bomber-jacket-detachable-cap",
    price: 1499,
    originalPrice: 2498,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
    badge: "Trending",
    category: "apparel"
  },
  {
    id: "5",
    name: "MENS WINTER BOMBER JACKET - BLACK/GREY",
    slug: "mens-winter-bomber-jacket-black-grey",
    price: 1499,
    originalPrice: 2685,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
    badge: "Trending",
    category: "apparel"
  },
  {
    id: "6",
    name: "MENS WHITE CAPGREY/ BEIGE JACKET",
    slug: "mens-white-capgrey-beige-jacket",
    price: 1499,
    originalPrice: 2498,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop",
    badge: "Top pick",
    category: "apparel"
  },
  {
    id: "7",
    name: "MEN WHITECAP GREY/ BEIGE HOODIE",
    slug: "men-whitecap-grey-beige-hoodie",
    price: 1499,
    originalPrice: 2498,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
    category: "apparel"
  },

  // Footwear Category
  {
    id: "8",
    name: "IGNITR MENS RUNNING & TRAINING SHOES - BLUE",
    slug: "ignitr-mens-running-shoes-blue",
    price: 1099,
    originalPrice: 1998,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
    badge: "Top pick",
    category: "footwear"
  },
  {
    id: "9",
    name: "IGNITR MENS RUNNING & TRAINING SHOES - BLACK",
    slug: "ignitr-mens-running-shoes-black",
    price: 1099,
    originalPrice: 2165,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
    badge: "Bestseller",
    category: "footwear"
  },
  {
    id: "10",
    name: "ARCHER BADMINTON SHOES - BLACK/WHITE",
    slug: "archer-badminton-shoes-black-white",
    price: 1499,
    originalPrice: 2498,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop",
    category: "footwear"
  },
  {
    id: "11",
    name: "BOLDFIT HAWKEYE BADMINTON SHOE",
    slug: "boldfit-hawkeye-badminton-shoe",
    price: 999,
    originalPrice: 1665,
    image: "https://images.unsplash.com/photo-1628253747716-0c4f5c90fdda?w=800&h=800&fit=crop",
    badge: "Bestseller",
    category: "footwear"
  },
  {
    id: "12",
    name: "DYNAMO NON-MARKING BADMINTON SHOES - BLACK",
    slug: "dynamo-non-marking-badminton-shoes",
    price: 1099,
    originalPrice: 1931,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop",
    badge: "Top pick",
    category: "footwear"
  },

  // Bags Category
  {
    id: "13",
    name: "TRAIL MAX RUCKSACK 60L - BLACK",
    slug: "trail-max-rucksack-60l",
    price: 2779,
    originalPrice: 4631,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
    category: "bags"
  },
  {
    id: "14",
    name: "TOILETRY BAG BLACK",
    slug: "toiletry-bag-black",
    price: 399,
    originalPrice: 665,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop",
    category: "bags"
  },
  {
    id: "15",
    name: "GYM DUFFLE BAG - BLACK",
    slug: "gym-duffle-bag-black",
    price: 1299,
    originalPrice: 2165,
    image: "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800&h=800&fit=crop",
    badge: "Bestseller",
    category: "bags"
  },

  // Supplements Category
  {
    id: "16",
    name: "WHEY PROTEIN ISOLATE - CHOCOLATE",
    slug: "whey-protein-isolate-chocolate",
    price: 2999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&h=800&fit=crop",
    badge: "Bestseller",
    category: "supplements"
  },
  {
    id: "17",
    name: "PRE-WORKOUT BOOSTER - FRUIT PUNCH",
    slug: "pre-workout-booster-fruit-punch",
    price: 1499,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=800&fit=crop",
    badge: "Trending",
    category: "supplements"
  },
  {
    id: "18",
    name: "MASS GAINER - VANILLA",
    slug: "mass-gainer-vanilla",
    price: 2499,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=800&fit=crop",
    category: "supplements"
  },

  // Bottles Category
  {
    id: "19",
    name: "CHUGGER WATER BOTTLE - PINK/BLUE",
    slug: "chugger-water-bottle-pink-blue",
    price: 499,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop",
    category: "bottles"
  },
  {
    id: "20",
    name: "PROTEIN SHAKER - BLACK",
    slug: "protein-shaker-black",
    price: 299,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&h=800&fit=crop",
    badge: "Bestseller",
    category: "bottles"
  },

  // Accessories Category
  {
    id: "21",
    name: "LIFTING GRIP BOLD - PAIR",
    slug: "lifting-grip-bold-pair",
    price: 1499,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop",
    category: "accessories"
  },
  {
    id: "22",
    name: "KNEE SUPPORT CAP - PAIR OF 1",
    slug: "knee-support-cap-pair",
    price: 699,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
    category: "accessories"
  },
  {
    id: "23",
    name: "WRIST WRAPS - PAIR",
    slug: "wrist-wraps-pair",
    price: 499,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&h=800&fit=crop",
    badge: "Top pick",
    category: "accessories"
  },

  // Equipment Category
  {
    id: "24",
    name: "PULL UP BAR - DOOR MOUNT",
    slug: "pull-up-bar-door-mount",
    price: 1299,
    originalPrice: 2165,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop",
    category: "equipment"
  },
  {
    id: "25",
    name: "FOAM ROLLER - HIGH DENSITY",
    slug: "foam-roller-high-density",
    price: 899,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&h=800&fit=crop",
    badge: "Bestseller",
    category: "equipment"
  },

  // Yoga Category
  {
    id: "26",
    name: "YOGA MAT - 6MM THICK - PURPLE",
    slug: "yoga-mat-6mm-purple",
    price: 799,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&h=800&fit=crop",
    badge: "Top pick",
    category: "yoga"
  },
  {
    id: "27",
    name: "YOGA BLOCKS - SET OF 2",
    slug: "yoga-blocks-set-2",
    price: 499,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop",
    category: "yoga"
  },

  // Home Workout Category
  {
    id: "28",
    name: "RESISTANCE BANDS SET - 5 LEVELS",
    slug: "resistance-bands-set-5-levels",
    price: 999,
    originalPrice: 1699,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop",
    badge: "Trending",
    category: "home-workout"
  },
  {
    id: "29",
    name: "ADJUSTABLE DUMBBELLS - 20KG PAIR",
    slug: "adjustable-dumbbells-20kg",
    price: 3999,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=800&fit=crop",
    badge: "Bestseller",
    category: "home-workout"
  },
  {
    id: "30",
    name: "PUSH UP BARS - PAIR",
    slug: "push-up-bars-pair",
    price: 699,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop",
    category: "home-workout"
  },

  // Homepage Featured Products
  {
    id: "31",
    name: "BREATHEX GYM SHORTS - BLACK/WHITE",
    slug: "breathex-gym-shorts-black-white",
    price: 650,
    originalPrice: 1500,
    image: "/images/shorts1.jpg",
    badge: "Trending",
    category: "apparel"
  },
  {
    id: "32",
    name: "GYMWEAR SET - NAVY BLUE",
    slug: "gymwear-set-navy-blue",
    price: 1799,
    originalPrice: 2499,
    image: "/images/men1.jpg",
    badge: "Bestseller",
    category: "apparel"
  },
  {
    id: "33",
    name: "CLASSIC GYM VEST - WHITE",
    slug: "classic-gym-vest-white",
    price: 699,
    originalPrice: 999,
    image: "/images/men2.jpg",
    category: "apparel"
  },
  {
    id: "34",
    name: "GYMWEAR SET - BLACK",
    slug: "gymwear-set-black",
    price: 1799,
    originalPrice: 2499,
    image: "/images/men3.jpg",
    badge: "Top pick",
    category: "apparel"
  },
  {
    id: "35",
    name: "SNATCHED RIBBED SET - NAVY BLUE",
    slug: "snatched-ribbed-set-navy-blue",
    price: 1799,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=800&fit=crop",
    category: "apparel"
  },
  {
    id: "36",
    name: "SNATCHED LEGGINGS - BLACK",
    slug: "snatched-leggings-black",
    price: 1099,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=800&fit=crop",
    category: "apparel"
  },
  {
    id: "37",
    name: "SNATCHED RIBBED SET - WHITE",
    slug: "snatched-ribbed-set-white",
    price: 1799,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=800&h=800&fit=crop",
    category: "apparel"
  },
  {
    id: "38",
    name: "JUMP ROPE PRO",
    slug: "jump-rope-pro",
    price: 399,
    originalPrice: 599,
    image: "/images/gear1.jpg",
    badge: "Bestseller",
    category: "equipment"
  },
  {
    id: "39",
    name: "ANTI-BURST GYM BALL",
    slug: "anti-burst-gym-ball",
    price: 999,
    originalPrice: 1299,
    image: "/images/gear3.jpg",
    category: "equipment"
  },
  {
    id: "40",
    name: "ROLLER + 10LB DUMBELL SET",
    slug: "roller-10lb-dumbell-set",
    price: 1499,
    originalPrice: 1999,
    image: "/images/gear2.jpg",
    badge: "Top pick",
    category: "equipment"
  },
];
