"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Help & Support", href: "/support" },
      { label: "Contact Us", href: "/contact" },
      { label: "Press Kit", href: "/press" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Online Coaching", href: "/coaching" },
      { label: "Corporate Wellness", href: "/corporate-wellness" },
      { label: "Fitness & Yoga Plans", href: "/plans" },
      { label: "Nutrition Courses", href: "/courses" },
      { label: "Weight Loss Program", href: "/programs/weight-loss" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "BMR Calculator", href: "/tools/bmr" },
      { label: "Macro Calculator", href: "/tools/macros" },
      { label: "Body Fat Calculator", href: "/tools/body-fat" },
      { label: "1RM Calculator", href: "/tools/1rm" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Warranty Policy", href: "/legal/warranty" },
      { label: "Return & Refund", href: "/legal/refund" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Top gray line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-[1350px] px-6 md:px-8 py-14 md:py-16">
        {/* Brand + columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          {/* Brand & Contact */}
          <div>
            <Link href="/" className="inline-flex items-start">
              <Image
                src="/BreatheX_logo2.png"
                alt="BreatheX"
                width={320}
                height={96}
                priority
                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-[96px] w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm text-white/70 leading-relaxed">
              Join us on our mission to help millions move, breathe and live better with AI-powered training.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/60" />
                <a href="mailto:support@breathex.ai" className="hover:underline">
                  support@breathex.ai
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-white/60" />
                <a href="tel:+918888003430" className="hover:underline">
                  +91 96542 48879
                </a>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <a
                aria-label="Instagram"
                href="https://instagram.com/breathex"
                target="_blank"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                aria-label="Facebook"
                href="https://facebook.com/breathex"
                target="_blank"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                aria-label="LinkedIn"
                href="https://linkedin.com/company/breathex"
                target="_blank"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                aria-label="Twitter"
                href="https://x.com/breathex"
                target="_blank"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="m-0 text-sm font-semibold tracking-wider text-white/80">
                {col.title.toUpperCase()}
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom row without border */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} BreatheX. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/legal/cookies" className="hover:text-white">
              Cookies
            </Link>
            <Link href="/sitemap" className="hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
