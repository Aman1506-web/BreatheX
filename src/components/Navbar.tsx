// components/Navbar.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import {
  ShoppingBag, Menu, X, Heart,
  GraduationCap, ChevronRight, ChevronDown
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import CartSidebar from "@/components/shop/CartSidebar";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Programs", href: "/programs/students" },
  { name: "Shop", href: "/shop" },
  // { name: "Community", href: "/community" },
  { name: "Profile", href: "/profile" },
  { name: "Pricing", href: "/pricing" },
];

// now with gray subtext per category
const PROGRAMS = [
  {
    name: "Students",
    href: "/programs/students",
    Icon: GraduationCap,
    sub: "Study‑friendly workouts + stress‑relief pranayama",
  },
  // {
  //   name: "Housewives",
  //   href: "/programs/housewives",
  //   Icon: Home,
  //   sub: "Home‑friendly routines for energy, mobility & balance",
  // },
  // {
  //   name: "Working Professionals",
  //   href: "/programs/professionals",
  //   Icon: Briefcase,
  //   sub: "Efficient 30‑min plans + desk‑strain relief",
  // },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false); // 👈 accordion
  const { isCartOpen, openCart, closeCart, itemCount } = useCart();

  // hydration-safe
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDarkRoute = mounted && pathname === "/generate";
  const navBase =
    "px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 fixed top-9 w-full flex justify-between items-center h-16 z-50 transition-colors duration-300";

  const navTheme = isDarkRoute
    ? "bg-transparent text-white"
    : "bg-white/75 backdrop-blur-md shadow-md text-black";

  // underline: hover on desktop, active/current on mobile & route
  const linkBase =
    "relative text-sm font-medium after:block after:h-[1.5px] after:w-0 after:absolute after:left-0 after:bottom-[-4px] after:transition-all after:duration-500 hover:after:w-full active:after:w-full";
  const underline = isDarkRoute ? "after:bg-white" : "after:bg-black";

  // helper to mark current route
  const isActive = (href: string) =>
    pathname === href || (href === "/programs" && pathname.startsWith("/programs"));

  return (
    <nav className={`${navBase} ${navTheme}`}>
      {/* 🍔 Mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
          {isMobileMenuOpen ? (
            <X className={`w-6 h-6 ${isDarkRoute ? "text-white" : "text-black"}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isDarkRoute ? "text-white" : "text-black"}`} />
          )}
        </button>
      </div>

      {/* 🌀 Logo */}
      <div className="flex-shrink-0">
        <Link href="/">
          <Image
            src={isDarkRoute ? "/BreatheX_Logo2.png" : "/BreatheX_logo.png"}
            alt="BreatheX Logo"
            width={120}
            height={80}
            className="object-contain transition-all h-auto w-40 hover:scale-105 cursor-pointer"
            priority
          />
        </Link>
      </div>

      {/* 🔗 Desktop Links (with Programs dropdown) */}
      <div className="hidden md:flex gap-6 items-center">
        {navItems.map((item) => {
          if (item.name === "Programs") {
            return (
              <div key="Programs" className="relative group">
                {/* trigger */}
                <Link
                  href={item.href}
                  className={`${linkBase} ${underline} ${isDarkRoute ? "text-white" : ""} ${isActive(item.href) ? "after:w-full" : ""}`}
                >
                  Programs
                </Link>

                {/* dropdown panel — vertical list */}
                <div
                  className={`
                    invisible opacity-0 translate-y-2 pointer-events-none
                    group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                    group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto
                    absolute left-1/2 -translate-x-1/2 top-[140%]
                    min-w-[320px] rounded-2xl border border-black/5
                    shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                    bg-white p-2 transition-all duration-200
                  `}
                >
                  <div className="absolute -top-3 left-0 right-0 h-3" />
                  <div className="flex flex-col">
                    {PROGRAMS.map(({ name, href, Icon, sub }) => (
                      <Link
                        key={name}
                        href={href}
                        className="group/item flex items-center justify-between gap-3 rounded-xl px-3 py-2 hover:bg-neutral-50 transition"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100">
                            <Icon className="h-4 w-4 text-neutral-700" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-neutral-900 leading-none">{name}</span>
                            <span className="mt-1 text-xs text-neutral-500">{sub}</span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-neutral-400 group-hover/item:text-neutral-600" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          // default links
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`${linkBase} ${underline} ${isDarkRoute ? "text-white" : ""} ${isActive(item.href) ? "after:w-full" : ""}`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* 🧡 Wishlist • 🛒 Cart • Auth */}
      <div className="flex items-center gap-4">
        <Link href="/wishlist" className="relative" aria-label="Wishlist">
          <Heart
            className={`w-5 h-5 transition ${isDarkRoute ? "text-white hover:opacity-80" : "text-black hover:text-primary"}`}
          />
        </Link>
        <button onClick={openCart} className="relative" aria-label="Cart">
          <ShoppingBag
            className={`w-5 h-5 transition ${isDarkRoute ? "text-white hover:opacity-80" : "text-black hover:text-primary"}`}
          />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#FFD700] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
        <SignedIn><UserButton /></SignedIn>
        <SignedOut>
          <Link href="/sign-in" className={`text-sm font-medium ${isDarkRoute ? "text-white" : "text-black"}`}>Sign In</Link>
        </SignedOut>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />

      {/* 📱 Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className={`absolute top-16 left-0 w-full md:hidden z-40 px-6 py-4 flex flex-col items-start gap-3 ${
            isDarkRoute ? "bg-black/50 text-white backdrop-blur-md" : "bg-white text-black shadow-md"
          }`}
        >
          {navItems.map((item) => {
            const isPrograms = item.name === "Programs";
            if (!isPrograms) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${linkBase} ${isDarkRoute ? "after:bg-white" : "after:bg-black"} ${isActive(item.href) ? "after:w-full" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            }

            // Programs as accordion on mobile
            return (
              <div key="Programs" className="w-full">
                <button
                  type="button"
                  onClick={() => setMobileProgramsOpen((s) => !s)}
                  className={`w-full flex items-center justify-between ${linkBase} ${isDarkRoute ? "after:bg-white" : "after:bg-black"} ${isActive(item.href) ? "after:w-full" : ""}`}
                  aria-expanded={mobileProgramsOpen}
                  aria-controls="mobile-programs"
                >
                  <span>Programs</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileProgramsOpen ? "rotate-180" : ""}`} />
                </button>

                {mobileProgramsOpen && (
                  <div id="mobile-programs" className="mt-2 ml-2 flex flex-col gap-2">
                    {PROGRAMS.map(({ name, href, Icon, sub }) => (
                      <Link
                        key={name}
                        href={href}
                        className="flex items-start gap-2 text-sm opacity-90"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setMobileProgramsOpen(false);
                        }}
                      >
                        <Icon className="h-4 w-4 mt-[2px]" />
                        <div className="flex flex-col">
                          <span>{name}</span>
                          <span className="text-[11px] text-neutral-500">{sub}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* quick actions */}
          <div className="mt-2 flex items-center gap-4">
            <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
              <Heart className="w-5 h-5" /> <span>Wishlist</span>
            </Link>
            <button onClick={() => { openCart(); setIsMobileMenuOpen(false); }} className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Cart ({itemCount})</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

/*
---------------------------------------------
💾 SAVED (OLD GENXAI NAV ITEM CODE) - For Future
---------------------------------------------
... your saved GenXAI comment block ...
*/


/* 
---------------------------------------------
💾 SAVED (OLD GENXAI NAV ITEM CODE) - For Future
---------------------------------------------

const navItems = [
  { name: "Home", href: "/" },
  { name: "⚡GenXAI", href: "/generate" },
  { name: "Shop", href: "/shop" },
  { name: "Profile", href: "/profile" },
];

const isGenXAI = item.name.includes("GenXAI");
const underlineClass = isGenXAI
  ? "after:bg-gradient-to-r after:from-blue-500 after:via-pink-500 after:to-orange-400"
  : isDarkRoute
  ? "after:bg-white"
  : "after:bg-black";

{isGenXAI ? (
  <span className="bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400 bg-clip-text text-transparent font-bold">
    {item.name}
  </span>
) : (
  item.name
)}
---------------------------------------------
*/
