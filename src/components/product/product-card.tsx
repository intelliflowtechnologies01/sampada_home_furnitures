"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/lib/data";

const badgeStyles: Record<string, string> = {
  New: "bg-gold text-ivory",
  Bestseller: "bg-ink text-ivory",
  Limited: "bg-ivory text-ink border border-ink",
  "Award-winning": "bg-bronze text-ivory",
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  function quickAdd() {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      finish: product.finishes[0]?.value,
      upholstery: product.upholstery?.[0]?.value,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="group">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-linen img-zoom">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover"
        />
        {/* Second image crossfade on hover */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} — alternate view`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}

        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0"
          aria-label={`View ${product.name}`}
        />

        {product.badge && (
          <span
            className={cn(
              "absolute top-3 left-3 z-10 text-[0.58rem] tracking-[0.16em] uppercase px-2.5 py-1 rounded-full font-medium",
              badgeStyles[product.badge] ?? "bg-ink text-ivory"
            )}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setWished((v) => !v)}
          className={cn(
            "absolute top-3 right-3 z-10 w-9 h-9 rounded-full backdrop-blur flex items-center justify-center transition-all",
            wished
              ? "bg-gold text-ivory"
              : "bg-ivory/90 text-ink hover:text-gold"
          )}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} strokeWidth={1.5} fill={wished ? "currentColor" : "none"} />
        </button>

        {/* Quick add — slides up on hover (desktop), always visible (touch) */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100 transition-all duration-300">
          <button
            onClick={quickAdd}
            className={cn(
              "w-full flex items-center justify-center gap-2 text-xs font-medium tracking-[0.1em] uppercase py-3 rounded-xl backdrop-blur-md transition-colors",
              added
                ? "bg-green-700 text-ivory"
                : "bg-ink/90 text-ivory hover:bg-gold"
            )}
          >
            {added ? (
              <>
                <Check size={14} /> Added
              </>
            ) : (
              <>
                <Plus size={14} /> Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={11}
                className={s <= Math.round(product.rating) ? "text-gold" : "text-mist"}
                fill="currentColor"
                strokeWidth={0}
              />
            ))}
          </span>
          <span className="text-[0.7rem] text-muted">{product.rating}</span>
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-base lg:text-lg text-ink mt-1.5 group-hover:text-gold transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-ink">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-stone line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

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
  );
}
