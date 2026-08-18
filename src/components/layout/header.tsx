"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Heart,
  ShoppingBag,
  User,
  X,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { categories, collections } from "@/lib/data";
import { useCartCount } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

const navLink =
  "text-[0.78rem] font-medium tracking-[0.06em] text-ink/80 hover:text-ink transition-colors whitespace-nowrap";

export function Header() {
  const pathname = usePathname();
  const cartCount = useCartCount();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlays on route change (adjust state during render, not in an effect)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setMegaOpen(null);
    setSearchOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-ivory/95 backdrop-blur-xl border-b border-border shadow-[0_1px_12px_rgba(14,14,16,0.05)]"
            : "bg-transparent border-b border-transparent"
        )}
        onMouseLeave={() => setMegaOpen(null)}
      >
        <div className="container-lux">
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-18 lg:h-20 gap-4">
            {/* LEFT — Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Sampada home">
              <span className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-ink text-ivory flex items-center justify-center flex-shrink-0">
                <span className="font-serif text-lg lg:text-xl leading-none pt-0.5">S</span>
              </span>
              <span className="leading-none">
                <span className="font-serif text-xl lg:text-2xl tracking-[0.12em] text-ink block">
                  SAMPADA
                </span>
                <span className="text-[0.5rem] lg:text-[0.55rem] tracking-[0.32em] uppercase text-gold block mt-1">
                  Fine Furniture
                </span>
              </span>
            </Link>

            {/* CENTER — Menus */}
            <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-10 min-w-0">
              <Link href="/" className={navLink}>
                Home
              </Link>
              <Link href="/shop" className={navLink}>
                Shop
              </Link>
              <button
                onMouseEnter={() => setMegaOpen("collections")}
                className={cn(
                  navLink,
                  "inline-flex items-center gap-1",
                  megaOpen === "collections" && "text-ink"
                )}
              >
                Collections
                <ChevronDown
                  size={13}
                  strokeWidth={1.75}
                  className={cn(
                    "transition-transform duration-300",
                    megaOpen === "collections" && "rotate-180"
                  )}
                />
              </button>
              <button
                onMouseEnter={() => setMegaOpen("categories")}
                className={cn(
                  navLink,
                  "inline-flex items-center gap-1",
                  megaOpen === "categories" && "text-ink"
                )}
              >
                Furniture
                <ChevronDown
                  size={13}
                  strokeWidth={1.75}
                  className={cn(
                    "transition-transform duration-300",
                    megaOpen === "categories" && "rotate-180"
                  )}
                />
              </button>
              <Link href="/about" className={navLink}>
                Atelier
              </Link>
              <Link href="/contact" className={navLink}>
                Contact
              </Link>
            </nav>

            {/* RIGHT — Search, Wishlist, Cart, Profile */}
            <div className="flex items-center justify-end gap-1 sm:gap-2 flex-shrink-0">
              <button
                className="lg:hidden p-2 text-ink hover:text-gold transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={21} strokeWidth={1.5} />
              </button>

              <button
                className="p-2 text-ink hover:text-gold transition-colors"
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
              >
                <Search size={19} strokeWidth={1.5} />
              </button>
              <Link
                href="/cart"
                className="hidden sm:flex p-2 text-ink hover:text-gold transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={19} strokeWidth={1.5} />
              </Link>
              <Link
                href="/cart"
                className="relative p-2 text-ink hover:text-gold transition-colors"
                aria-label={`Cart, ${cartCount} items`}
              >
                <ShoppingBag size={19} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-gold text-ivory text-[0.55rem] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="/contact"
                className="hidden sm:flex p-2 text-ink hover:text-gold transition-colors"
                aria-label="Account"
              >
                <User size={19} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mega menu — Collections */}
        {megaOpen === "collections" && (
          <div className="absolute left-0 right-0 top-full bg-ivory border-t border-border shadow-[var(--shadow-elevated)] hidden lg:block">
            <div className="container-lux py-10">
              <div className="grid grid-cols-4 gap-6 xl:gap-8">
                {collections.map((col) => (
                  <Link
                    key={col.id}
                    href={`/collection/${col.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-linen mb-4 img-zoom rounded-2xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={col.image}
                        alt={col.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="eyebrow mb-1">{col.tagline}</p>
                    <h3 className="font-serif text-xl text-ink group-hover:text-gold transition-colors">
                      {col.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mega menu — Categories */}
        {megaOpen === "categories" && (
          <div className="absolute left-0 right-0 top-full bg-ivory border-t border-border shadow-[var(--shadow-elevated)] hidden lg:block">
            <div className="container-lux py-10">
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="group flex items-start gap-4"
                  >
                    <div className="w-20 h-20 overflow-hidden bg-linen flex-shrink-0 img-zoom rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg text-ink group-hover:text-gold transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-muted mt-1 line-clamp-2">
                        {cat.description}
                      </p>
                      <span className="text-[0.65rem] tracking-[0.15em] uppercase text-gold mt-2 inline-flex items-center gap-1">
                        {cat.productCount} pieces <ChevronRight size={12} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search overlay bar */}
        {searchOpen && (
          <div className="absolute left-0 right-0 top-full bg-ivory border-t border-border shadow-[var(--shadow-elevated)]">
            <div className="container-lux py-5">
              <form action="/shop" className="flex items-center gap-4">
                <Search size={20} strokeWidth={1.5} className="text-muted flex-shrink-0" />
                <input
                  type="search"
                  name="q"
                  placeholder="Search sofas, tables, collections..."
                  autoFocus
                  className="flex-1 min-w-0 bg-transparent border-none outline-none text-base sm:text-lg font-serif placeholder:text-stone text-ink"
                />
                <button
                  type="submit"
                  className="hidden sm:inline-flex items-center gap-2 bg-ink text-ivory text-xs tracking-[0.12em] uppercase font-medium px-5 py-2.5 rounded-full hover:bg-gold transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-muted hover:text-ink transition-colors flex-shrink-0"
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-ivory overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="font-serif text-xl tracking-[0.12em]">SAMPADA</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="p-6 space-y-8">
              <div className="space-y-3">
                <Link href="/" className="block text-sm font-medium tracking-[0.08em] uppercase text-ink">
                  Home
                </Link>
                <Link href="/shop" className="block text-sm font-medium tracking-[0.08em] uppercase text-ink">
                  Shop All
                </Link>
              </div>
              <div>
                <p className="eyebrow mb-3">Collections</p>
                <div className="space-y-2">
                  {collections.map((col) => (
                    <Link
                      key={col.id}
                      href={`/collection/${col.slug}`}
                      className="block font-serif text-lg text-ink hover:text-gold transition-colors"
                    >
                      {col.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow mb-3">Furniture</p>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      className="block font-serif text-lg text-ink hover:text-gold transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-border">
                <Link href="/about" className="block text-sm tracking-[0.1em] uppercase text-ink">
                  The Atelier
                </Link>
                <Link href="/contact" className="block text-sm tracking-[0.1em] uppercase text-ink">
                  Contact
                </Link>
                <Link href="/cart" className="block text-sm tracking-[0.1em] uppercase text-ink">
                  Cart ({cartCount})
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
