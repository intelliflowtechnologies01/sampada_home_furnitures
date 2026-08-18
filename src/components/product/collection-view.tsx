"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { useParallax } from "@/lib/use-parallax";
import { collections, formatPriceRange } from "@/lib/data";
import type { Collection, Product } from "@/lib/data";

export function CollectionView({
  collection,
  products,
}: {
  collection: Collection;
  products: Product[];
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  const heroParallax = useParallax<HTMLDivElement>(-0.12);
  const siblings = collections.filter((c) => c.slug !== collection.slug);
  const priceRange = formatPriceRange(products);

  return (
    <div ref={ref}>
      {/* Editorial hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-ink">
        <div ref={heroParallax} className="absolute inset-0 parallax-layer">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/25 to-ink/85" />

        <div className="relative h-full flex flex-col justify-end pb-16 md:pb-20 px-6">
          <div className="container-lux">
            <nav className="flex items-center gap-2 text-xs text-ivory/60 mb-6 reveal">
              <Link href="/" className="hover:text-ivory transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link href="/shop" className="hover:text-ivory transition-colors">Collections</Link>
              <ChevronRight size={12} />
              <span className="text-gold-light">{collection.name}</span>
            </nav>
            <p className="eyebrow text-gold-light mb-4 reveal">{collection.tagline}</p>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-ivory text-balance max-w-3xl reveal">
              {collection.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-8 text-sm text-ivory/70 reveal">
              <span>
                <span className="text-gold-light font-serif text-lg">{products.length}</span> pieces
              </span>
              {priceRange && (
                <>
                  <span className="w-px h-4 bg-ivory/20 hidden sm:block" />
                  <span>{priceRange}</span>
                </>
              )}
              <span className="w-px h-4 bg-ivory/20 hidden sm:block" />
              <span>Limited annual production</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story block */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container-lux">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="reveal">
              <p className="eyebrow mb-4">The story</p>
              <h2 className="font-serif text-3xl md:text-4xl text-ink text-balance leading-tight">
                Why this collection exists
              </h2>
              <p className="text-base md:text-lg text-muted mt-6 leading-relaxed">
                {collection.description}
              </p>
              <p className="text-base text-muted mt-4 leading-relaxed">
                Each piece is made to order in our Bengaluru atelier, numbered, and
                signed by the craftsperson who built it. Production is deliberately
                limited — when the year&apos;s allocation is filled, the collection
                closes until the next season.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 md:gap-6 reveal">
              {[
                { num: "8–14", label: "Week lead time" },
                { num: "100%", label: "Solid hardwood" },
                { num: "∞", label: "Lifetime warranty" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-5 md:p-6 bg-surface rounded-2xl">
                  <p className="font-serif text-2xl md:text-3xl text-gold-dark">{stat.num}</p>
                  <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.15em] uppercase text-muted mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-14 md:py-20">
        <div className="container-lux">
          <div className="flex items-end justify-between mb-10 reveal">
            <div>
              <p className="eyebrow mb-2">The pieces</p>
              <h2 className="font-serif text-3xl md:text-4xl text-ink">
                {products.length} {products.length === 1 ? "piece" : "pieces"} in this collection
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-gold hover:text-gold-dark transition-colors"
            >
              View all furniture <ArrowUpRight size={15} />
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
              {products.map((product) => (
                <div key={product.id} className="reveal">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 md:py-28">
              <p className="font-serif text-3xl text-ink mb-3">The atelier is at work</p>
              <p className="text-sm text-muted mb-8 max-w-sm mx-auto">
                Pieces in this collection are being handcrafted. Join the waitlist to be
                notified when they become available.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-ink text-ivory text-sm font-medium px-7 py-3.5 rounded-full hover:bg-gold transition-colors duration-300"
              >
                Join the waitlist <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Sibling collections */}
      <section className="border-t border-border bg-surface">
        <div className="container-lux py-14 md:py-20">
          <div className="flex items-end justify-between mb-8 reveal">
            <h2 className="font-serif text-2xl md:text-3xl text-ink">Explore other collections</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 md:gap-6">
            {siblings.map((col) => (
              <Link key={col.id} href={`/collection/${col.slug}`} className="group block reveal">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-linen img-zoom">
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="eyebrow text-gold-light mb-1">{col.tagline}</p>
                    <h3 className="font-serif text-xl text-ivory group-hover:text-gold-light transition-colors">
                      {col.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
