"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { useParallax } from "@/lib/use-parallax";
import { categories } from "@/lib/data";
import type { Category, Product } from "@/lib/data";

export function CategoryView({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  const heroParallax = useParallax<HTMLDivElement>(-0.1);
  const siblings = categories.filter((c) => c.slug !== category.slug);

  return (
    <div ref={ref}>
      {/* Cinematic hero */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden bg-ink">
        <div ref={heroParallax} className="absolute inset-0 parallax-layer">
          <Image
            src={category.image}
            alt={category.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/85" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <nav className="flex items-center gap-2 text-xs text-ivory/60 mb-6 reveal">
            <Link href="/" className="hover:text-ivory transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/shop" className="hover:text-ivory transition-colors">Shop</Link>
            <ChevronRight size={12} />
            <span className="text-gold-light">{category.name}</span>
          </nav>
          <p className="eyebrow text-gold-light mb-4 reveal">Browse by room</p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-ivory text-balance reveal">
            {category.name}
          </h1>
          <p className="text-base md:text-lg text-ivory/80 max-w-xl mt-6 leading-relaxed reveal">
            {category.description}
          </p>
          <div className="flex items-center gap-6 mt-8 text-ivory/60 text-sm reveal">
            <span>
              <span className="text-gold-light font-serif text-xl">{products.length}</span>{" "}
              pieces available
            </span>
            <span className="w-px h-4 bg-ivory/20" />
            <span>Made to order</span>
          </div>
        </div>
      </section>

      {/* Sibling category chips */}
      <section className="border-b border-border bg-surface">
        <div className="container-lux py-5">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar reveal">
            <span className="text-[0.65rem] tracking-[0.18em] uppercase text-muted flex-shrink-0">
              Explore
            </span>
            {siblings.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="flex-shrink-0 text-xs font-medium text-ink/70 border border-border rounded-full px-4 py-2 hover:border-gold hover:text-gold transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/shop"
              className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-gold pl-2 hover:text-gold-dark transition-colors"
            >
              View all <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-14 md:py-20">
        <div className="container-lux">
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
              <p className="font-serif text-3xl text-ink mb-3">Pieces being crafted</p>
              <p className="text-sm text-muted mb-8 max-w-sm mx-auto">
                New {category.name.toLowerCase()} pieces are being handcrafted in the atelier.
                Explore the full catalogue in the meantime.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 bg-ink text-ivory text-sm font-medium px-7 py-3.5 rounded-full hover:bg-gold transition-colors duration-300"
              >
                Browse all furniture <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
