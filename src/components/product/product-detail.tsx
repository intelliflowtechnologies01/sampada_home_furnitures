"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Share2,
  ChevronRight,
  ChevronDown,
  Truck,
  Shield,
  Hammer,
  Check,
  RotateCcw,
} from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/lib/data";

export function ProductDetail({
  product,
  categoryName,
  collectionName,
}: {
  product: Product;
  categoryName?: string;
  collectionName?: string;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(product.finishes[0]?.value ?? "");
  const [selectedUpholstery, setSelectedUpholstery] = useState(product.upholstery?.[0]?.value ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("details");

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      finish: selectedFinish || undefined,
      upholstery: selectedUpholstery || undefined,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div ref={ref}>
      {/* Breadcrumbs */}
      <div className="container-lux pt-6 pb-2">
        <nav className="flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-ink transition-colors">Shop</Link>
          {categoryName && (
            <>
              <ChevronRight size={12} />
              <Link href={`/category/${product.category}`} className="hover:text-ink transition-colors">
                {categoryName}
              </Link>
            </>
          )}
          <ChevronRight size={12} />
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      {/* Main product */}
      <section className="container-lux py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible no-scrollbar">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "flex-shrink-0 w-20 h-24 md:w-20 md:h-24 overflow-hidden bg-linen rounded-xl border-2 transition-colors",
                    selectedImage === i ? "border-gold" : "border-transparent hover:border-border"
                  )}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    width={80}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative aspect-[4/5] overflow-hidden bg-linen rounded-2xl group/main">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover/main:scale-105"
              />
              {product.badge && (
                <span className="absolute top-5 left-5 bg-ink text-ivory text-[0.6rem] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full font-medium">
                  {product.badge}
                </span>
              )}
              {product.compareAtPrice && (
                <span className="absolute top-5 right-5 bg-ivory/95 backdrop-blur text-gold-dark text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full font-semibold">
                  Save {formatPrice(product.compareAtPrice - product.price)}
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:py-4">
            {collectionName && (
              <Link
                href={`/collection/${product.collection}`}
                className="eyebrow mb-3 hover:text-gold-dark transition-colors"
              >
                {collectionName}
              </Link>
            )}
            <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight">
              {product.name}
            </h1>
            <p className="text-lg text-muted mt-3 italic font-serif">{product.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={cn(
                      "text-sm",
                      star <= Math.round(product.rating) ? "text-gold" : "text-border"
                    )}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted">
                {product.rating} · {product.reviewCount} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-6">
              <span className="font-serif text-3xl text-ink">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-lg text-stone line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <span className="text-xs bg-gold/10 text-gold-dark px-2 py-1 tracking-wide">
                    Save {formatPrice(product.compareAtPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            <div className="divider-gold my-8" />

            {/* Description */}
            <p className="text-base text-ink/80 leading-relaxed">
              {product.description}
            </p>

            {/* Finish selection */}
            {product.finishes.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[0.7rem] tracking-[0.2em] uppercase text-gold font-sans font-medium">
                    {product.finishes[0].name}
                  </label>
                  <span className="text-sm text-ink">{selectedFinish}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.finishes.map((finish) => (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish.value)}
                      className={cn(
                        "relative w-10 h-10 rounded-full border-2 transition-all",
                        selectedFinish === finish.value
                          ? "border-gold ring-2 ring-gold/20"
                          : "border-border hover:border-stone"
                      )}
                      style={{ backgroundColor: finish.swatch }}
                      aria-label={finish.value}
                      title={finish.value}
                    >
                      {selectedFinish === finish.value && (
                        <Check
                          size={16}
                          className="absolute inset-0 m-auto text-ivory mix-blend-difference"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Upholstery selection */}
            {product.upholstery && product.upholstery.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[0.7rem] tracking-[0.2em] uppercase text-gold font-sans font-medium">
                    Upholstery
                  </label>
                  <span className="text-sm text-ink">{selectedUpholstery}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.upholstery.map((up) => (
                    <button
                      key={up.id}
                      onClick={() => setSelectedUpholstery(up.value)}
                      className={cn(
                        "relative w-10 h-10 rounded-full border-2 transition-all",
                        selectedUpholstery === up.value
                          ? "border-gold ring-2 ring-gold/20"
                          : "border-border hover:border-stone"
                      )}
                      style={{ backgroundColor: up.swatch }}
                      aria-label={up.value}
                      title={up.value}
                    >
                      {selectedUpholstery === up.value && (
                        <Check
                          size={16}
                          className="absolute inset-0 m-auto text-ivory mix-blend-difference"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="flex items-stretch gap-3 mt-10">
              <div className="flex items-center border border-border rounded-full">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3.5 pl-4 text-muted hover:text-ink transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="px-3 text-sm tabular-nums min-w-[2.5rem] text-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3.5 pr-4 text-muted hover:text-ink transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={cn(
                  "flex-1 inline-flex items-center justify-center gap-2.5 text-sm font-medium tracking-wide uppercase py-3.5 rounded-full transition-all duration-300",
                  added
                    ? "bg-green-700 text-ivory"
                    : "bg-ink text-ivory hover:bg-gold"
                )}
              >
                {added ? (
                  <>
                    <Check size={16} /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} /> Add to Cart · {formatPrice(product.price * quantity)}
                  </>
                )}
              </button>
            </div>

            {/* Secondary actions */}
            <div className="flex items-center gap-6 mt-6 text-sm text-muted">
              <button className="flex items-center gap-2 hover:text-ink transition-colors">
                <Heart size={16} strokeWidth={1.5} /> Save
              </button>
              <button className="flex items-center gap-2 hover:text-ink transition-colors">
                <Share2 size={16} strokeWidth={1.5} /> Share
              </button>
            </div>

            {/* Lead time */}
            <div className="mt-8 p-5 bg-linen rounded-2xl border-l-2 border-gold">
              <p className="text-sm text-ink">
                <span className="font-medium">Made to order.</span> Lead time:{" "}
                <span className="text-gold-dark font-medium">{product.leadTime}</span>
              </p>
              <p className="text-xs text-muted mt-1">
                Each piece is handcrafted upon commission. We&apos;ll keep you updated
                at every stage of production.
              </p>
            </div>

            {/* Accordion sections */}
            <div className="mt-8 border-t border-border">
              {[
                {
                  id: "details",
                  title: "Materials & Craft",
                  content: (
                    <ul className="text-sm text-ink/80 space-y-2">
                      {product.materials.map((mat, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" /> {mat}
                        </li>
                      ))}
                    </ul>
                  ),
                },
                {
                  id: "dimensions",
                  title: "Dimensions & Weight",
                  content: (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[0.65rem] tracking-[0.18em] uppercase text-gold mb-1">Dimensions</p>
                        <p className="text-ink">{product.dimensions}</p>
                      </div>
                      <div>
                        <p className="text-[0.65rem] tracking-[0.18em] uppercase text-gold mb-1">Weight</p>
                        <p className="text-ink">{product.weight}</p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "delivery",
                  title: "Delivery & Returns",
                  content: (
                    <div className="text-sm text-ink/80 space-y-2">
                      <p>Complimentary white-glove delivery across India. Our team will carry, place, and assemble the piece in your room of choice.</p>
                      <p>30-day returns. If the piece isn&apos;t right, we&apos;ll collect it at no cost to you.</p>
                    </div>
                  ),
                },
                {
                  id: "warranty",
                  title: "Lifetime Warranty",
                  content: (
                    <p className="text-sm text-ink/80">
                      Every frame is guaranteed for life. If a joint loosens, a finish fades, or a spring loses its tension — we repair or replace it, no questions asked, no expiry date.
                    </p>
                  ),
                },
              ].map((section) => (
                <div key={section.id} className="border-b border-border">
                  <button
                    onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                    className="w-full flex items-center justify-between py-4 text-left group"
                  >
                    <span className="text-sm font-medium text-ink group-hover:text-gold transition-colors">
                      {section.title}
                    </span>
                    <ChevronDown
                      size={16}
                      className={cn(
                        "text-muted transition-transform duration-300",
                        openSection === section.id && "rotate-180 text-gold"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-500",
                      openSection === section.id ? "max-h-96 pb-5" : "max-h-0"
                    )}
                  >
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border">
              {[
                { icon: Hammer, label: "Handcrafted" },
                { icon: Shield, label: "Lifetime warranty" },
                { icon: Truck, label: "White-glove delivery" },
                { icon: RotateCcw, label: "30-day returns" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2.5">
                  <span className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center">
                    <item.icon size={18} strokeWidth={1.5} className="text-gold-dark" />
                  </span>
                  <span className="text-[0.7rem] text-muted leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile add-to-cart bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-ivory/95 backdrop-blur-xl border-t border-border px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-serif text-sm text-ink truncate">{product.name}</p>
          <p className="text-sm font-semibold text-gold-dark">{formatPrice(product.price)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className={cn(
            "inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase px-6 py-3 rounded-full transition-all duration-300 flex-shrink-0",
            added
              ? "bg-green-700 text-ivory"
              : "bg-ink text-ivory hover:bg-gold"
          )}
        >
          {added ? (
            <>
              <Check size={14} /> Added
            </>
          ) : (
            <>
              <ShoppingBag size={14} /> Add to Cart
            </>
          )}
        </button>
      </div>

      {/* Spacer for sticky bar on mobile */}
      <div className="h-16 lg:hidden" />
    </div>
  );
}
