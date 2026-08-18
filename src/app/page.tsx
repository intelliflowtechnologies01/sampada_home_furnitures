"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getFeaturedProducts, getProductBySlug } from "@/lib/data";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { formatPrice } from "@/lib/utils";

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=96&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80",
];

const roomStrip = [
  { label: "Sofas & Couches", slug: "seating", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80" },
  { label: "Chairs", slug: "seating", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&q=80" },
  { label: "Tables", slug: "tables", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=400&q=80" },
  { label: "Beds", slug: "beds", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80" },
  { label: "Storage", slug: "storage", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80" },
  { label: "Lighting", slug: "lighting", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=400&q=80" },
  { label: "Decor", slug: "decor", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&q=80" },
  { label: "Outdoor", slug: "decor", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&q=80" },
];

const inspiration = [
  {
    tag: "Design Tips",
    title: "5 Ways to Style Your Living Room",
    date: "May 12, 2024",
    read: "6 min read",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    tag: "Inspiration",
    title: "Create a Calm & Cozy Bedroom",
    date: "April 28, 2024",
    read: "5 min read",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
  {
    tag: "Trends",
    title: "Top Interior Design Trends for 2024",
    date: "April 15, 2024",
    read: "8 min read",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80",
  },
];

const testimonials = [
  {
    quote:
      "The quality is outstanding and the designs are simply beautiful. Highly recommend Sampada furniture!",
    name: "Emily R.",
    location: "Mumbai, MH",
    avatar: avatars[0],
  },
  {
    quote:
      "Fast delivery, easy assembly, and the sofa is incredibly comfortable. Worth every rupee.",
    name: "James T.",
    location: "Bengaluru, KA",
    avatar: avatars[1],
  },
  {
    quote:
      "Customer service was amazing and the product exceeded my expectations. A true heirloom.",
    name: "Sophia L.",
    location: "New Delhi, DL",
    avatar: avatars[2],
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={s <= Math.round(rating) ? "text-gold" : "text-mist"}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

export default function HomePage() {
  const ref = useScrollReveal<HTMLDivElement>();
  const loved = getFeaturedProducts().slice(0, 4);
  const heroProduct = getProductBySlug("heritage-armchair");

  return (
    <div ref={ref}>
      {/* ============ HERO ============ */}
      <section className="relative bg-linen overflow-hidden">
        <div className="container-lux">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center py-14 lg:py-20 min-h-[calc(100svh-10rem)]">
            {/* Left — copy */}
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 bg-gold/15 text-gold-dark text-[0.65rem] tracking-[0.16em] uppercase font-medium px-4 py-2 rounded-full hero-fade-up" style={{ animationDelay: "0.1s" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                New Collection 2024
              </span>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-ink leading-[1.02] tracking-tight mt-7">
                <span className="block hero-line" style={{ animationDelay: "0.25s" }}>
                  Crafted for
                </span>
                <span className="block hero-line" style={{ animationDelay: "0.4s" }}>
                  Comfort.
                </span>
                <span className="block hero-line italic text-gold-dark" style={{ animationDelay: "0.55s" }}>
                  Made for Life.
                </span>
              </h1>

              <p
                className="text-base lg:text-lg text-muted mt-7 leading-relaxed max-w-md hero-fade-up"
                style={{ animationDelay: "0.75s" }}
              >
                Timeless design, premium materials, and unmatched comfort
                for every space in your home.
              </p>

              <div
                className="flex flex-wrap items-center gap-4 mt-9 hero-fade-up"
                style={{ animationDelay: "0.9s" }}
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2.5 bg-ink text-ivory text-sm font-medium px-7 py-3.5 rounded-full hover:bg-gold transition-colors duration-300"
                >
                  Shop Now <ArrowRight size={16} />
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2.5 border border-ink/20 text-ink text-sm font-medium px-7 py-3.5 rounded-full hover:border-ink hover:bg-ink hover:text-ivory transition-colors duration-300"
                >
                  Explore Collections
                </Link>
              </div>

              <div
                className="flex items-center gap-4 mt-10 hero-fade-up"
                style={{ animationDelay: "1.05s" }}
              >
                <div className="flex -space-x-3">
                  {avatars.map((src, i) => (
                    <span key={i} className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-linen">
                      <Image src={src} alt="Happy customer" fill sizes="36px" className="object-cover" />
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted">
                  Trusted by <span className="font-semibold text-ink">25,000+</span> happy customers
                </p>
              </div>
            </div>

            {/* Right — image + floating card */}
            <div className="relative hero-image-reveal">
              <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-[2rem] overflow-hidden bg-mist">
                <Image
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80"
                  alt="Modern living room with Sampada furniture"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Floating shop-the-look card */}
              <Link
                href={heroProduct ? `/product/${heroProduct.slug}` : "/shop"}
                className="group absolute bottom-6 left-6 flex items-center gap-4 bg-ivory/95 backdrop-blur-md rounded-2xl p-3 pr-5 shadow-[var(--shadow-elevated)] hero-fade-up"
                style={{ animationDelay: "1.2s" }}
              >
                <span className="relative w-16 h-16 rounded-xl overflow-hidden bg-linen flex-shrink-0">
                  {heroProduct && (
                    <Image
                      src={heroProduct.images[0]}
                      alt={heroProduct.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  )}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    Heritage Living Room
                  </span>
                  <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-gold-dark font-medium">
                    Shop the look
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATEGORY STRIP ============ */}
      <section className="bg-ivory border-b border-border">
        <div className="container-lux py-10">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-6">
            {roomStrip.map((room) => (
              <Link
                key={room.label}
                href={`/category/${room.slug}`}
                className="group flex flex-col items-center gap-3 reveal"
              >
                <span className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-linen img-zoom">
                  <Image
                    src={room.image}
                    alt={room.label}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <span className="text-[0.7rem] sm:text-xs font-medium text-ink/80 group-hover:text-gold transition-colors text-center leading-tight">
                  {room.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BEST SELLERS ============ */}
      <section className="py-16 lg:py-24">
        <div className="container-lux">
          <div className="grid lg:grid-cols-[minmax(0,20rem)_1fr] gap-10 lg:gap-14">
            {/* Left header */}
            <div className="reveal">
              <p className="eyebrow mb-4">Best Sellers</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight text-balance">
                Our Most Loved Pieces
              </h2>
              <p className="text-muted mt-5 leading-relaxed">
                Handpicked favourites that blend style, quality, and functionality.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 bg-ink text-ivory text-sm font-medium px-6 py-3 rounded-full mt-8 hover:bg-gold transition-colors duration-300"
              >
                View All Products <ArrowRight size={15} />
              </Link>
            </div>

            {/* Product cards */}
            <div className="relative">
              <div className="hidden lg:flex items-center gap-2 absolute -top-14 right-0">
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink hover:bg-ink hover:text-ivory transition-colors" aria-label="Previous products">
                  <ChevronLeft size={18} />
                </button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink hover:bg-ink hover:text-ivory transition-colors" aria-label="Next products">
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
                {loved.map((product) => (
                  <div key={product.id} className="group reveal">
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-linen img-zoom">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />
                      <Link
                        href={`/product/${product.slug}`}
                        className="absolute inset-0"
                        aria-label={`View ${product.name}`}
                      />
                      <button
                        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-ivory/90 backdrop-blur flex items-center justify-center text-ink hover:text-gold transition-colors"
                        aria-label="Add to wishlist"
                      >
                        <Heart size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="pt-4">
                      <div className="flex items-center gap-2">
                        <Stars rating={product.rating} />
                        <span className="text-xs text-muted">{product.rating}</span>
                      </div>
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="font-serif text-base lg:text-lg text-ink mt-1.5 group-hover:text-gold transition-colors leading-snug">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm font-semibold text-ink mt-1">
                        {formatPrice(product.price)}
                      </p>
                      {product.finishes.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-2.5">
                          {product.finishes.slice(0, 4).map((f) => (
                            <span
                              key={f.id}
                              className="w-3.5 h-3.5 rounded-full border border-border"
                              style={{ backgroundColor: f.swatch }}
                              title={f.value}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SALE BANNER ============ */}
      <section className="container-lux pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 rounded-[2rem] overflow-hidden reveal">
          <div className="bg-ink text-ivory p-10 lg:p-16 flex flex-col justify-center">
            <p className="eyebrow text-gold-light mb-4">Festive Offer</p>
            <h2 className="font-serif text-4xl lg:text-5xl leading-tight text-balance">
              Up to 15% Off
            </h2>
            <p className="text-ivory/70 mt-4 leading-relaxed max-w-sm">
              Selected pieces, for a limited time only. Handcrafted heirlooms at
              a rare invitation price.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2.5 bg-ivory text-ink text-sm font-medium px-6 py-3 rounded-full mt-8 w-fit hover:bg-gold hover:text-ivory transition-colors duration-300"
            >
              Shop Sale <ArrowRight size={15} />
            </Link>
          </div>
          <div className="relative min-h-[280px] lg:min-h-[420px] bg-linen">
            <Image
              src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=80"
              alt="Heritage armchair on sale"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ============ TRUST BAR ============ */}
      <section className="border-y border-border bg-surface">
        <div className="container-lux">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 py-10">
            {[
              { icon: Truck, title: "Free Shipping", sub: "On all orders over ₹50,000" },
              { icon: RotateCcw, title: "30-Day Returns", sub: "Hassle-free returns" },
              { icon: ShieldCheck, title: "Secure Payments", sub: "100% secure checkout" },
              { icon: Headphones, title: "24/7 Support", sub: "We're here to help" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 reveal">
                <span className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} strokeWidth={1.5} className="text-gold-dark" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="text-xs text-muted mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INSPIRATION ============ */}
      <section className="py-16 lg:py-24">
        <div className="container-lux">
          <div className="grid lg:grid-cols-[minmax(0,20rem)_1fr] gap-10 lg:gap-14">
            <div className="reveal">
              <p className="eyebrow mb-4">Get Inspired</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight text-balance">
                Designed to inspire your home
              </h2>
              <p className="text-muted mt-5 leading-relaxed">
                Explore ideas and tips to create spaces that feel uniquely yours.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 bg-ink text-ivory text-sm font-medium px-6 py-3 rounded-full mt-8 hover:bg-gold transition-colors duration-300"
              >
                Explore Inspiration <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {inspiration.map((post, i) => (
                <Link key={i} href="/about" className="group reveal">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-linen img-zoom">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <span className="inline-block bg-linen text-ink/70 text-[0.65rem] tracking-[0.1em] uppercase font-medium px-3 py-1.5 rounded-full mt-4">
                    {post.tag}
                  </span>
                  <h3 className="font-serif text-lg lg:text-xl text-ink mt-2 leading-snug group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted mt-1.5">
                    {post.date} · {post.read}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-16 lg:py-24 bg-linen/60">
        <div className="container-lux">
          <div className="text-center max-w-xl mx-auto mb-12 reveal">
            <p className="eyebrow mb-4">What Our Customers Say</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink text-balance">
              Real homes. Real stories.
            </h2>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
              {testimonials.map((t, i) => (
                <figure
                  key={i}
                  className="bg-ivory rounded-2xl p-7 lg:p-8 shadow-[var(--shadow-soft)] reveal"
                >
                  <Quote size={22} strokeWidth={1.25} className="text-gold" fill="currentColor" />
                  <blockquote className="text-sm lg:text-base text-ink/80 leading-relaxed mt-4">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-border">
                    <span className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={t.avatar} alt={t.name} fill sizes="40px" className="object-cover" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{t.name}</span>
                      <span className="block text-xs text-muted">{t.location}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2 absolute top-1/2 -translate-y-1/2 -left-5">
              <button className="w-10 h-10 rounded-full bg-ivory shadow-[var(--shadow-soft)] flex items-center justify-center text-ink hover:bg-ink hover:text-ivory transition-colors" aria-label="Previous testimonials">
                <ChevronLeft size={18} />
              </button>
            </div>
            <div className="hidden md:flex items-center gap-2 absolute top-1/2 -translate-y-1/2 -right-5">
              <button className="w-10 h-10 rounded-full bg-ivory shadow-[var(--shadow-soft)] flex items-center justify-center text-ink hover:bg-ink hover:text-ivory transition-colors" aria-label="Next testimonials">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-1.5 mt-8">
            {[0, 1, 2].map((i) => (
              <span key={i} className={i === 0 ? "w-6 h-1.5 rounded-full bg-gold" : "w-1.5 h-1.5 rounded-full bg-stone/40"} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
