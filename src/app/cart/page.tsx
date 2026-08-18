"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Shield, Lock } from "lucide-react";
import { useCart, useCartTotal } from "@/lib/cart-store";
import { getNewArrivals } from "@/lib/data";
import { ProductCard } from "@/components/product/product-card";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 50000;

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const total = useCartTotal();
  const tax = Math.round(total * 0.12);
  const grandTotal = total + tax;
  const recommendations = getNewArrivals().slice(0, 4);
  const shippingProgress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);
  const qualifiesFreeShipping = total >= FREE_SHIPPING_THRESHOLD;

  if (items.length === 0) {
    return (
      <div className="container-lux py-24 md:py-32">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 rounded-full bg-linen flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={32} strokeWidth={1} className="text-stone" />
          </div>
          <h1 className="font-serif text-4xl text-ink mb-4">Your cart is empty</h1>
          <p className="text-muted mb-8">
            You have not selected any pieces yet. Explore our collection of
            handcrafted, heirloom-quality furniture.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2.5 bg-ink text-ivory text-sm font-medium px-7 py-3.5 rounded-full hover:bg-gold transition-colors duration-300"
          >
            Explore the Collection <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-lux py-10 md:py-14">
      <div className="text-center mb-10">
        <p className="eyebrow mb-3">Your selection</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink">Shopping Cart</h1>
      </div>

      {/* Free shipping progress */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center gap-4 bg-surface rounded-2xl p-5">
          <span className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
            <Truck size={18} strokeWidth={1.5} className="text-gold-dark" />
          </span>
          <div className="flex-1 min-w-0">
            {qualifiesFreeShipping ? (
              <p className="text-sm font-medium text-ink">
                You&apos;ve unlocked <span className="text-gold-dark">complimentary white-glove delivery</span>
              </p>
            ) : (
              <p className="text-sm text-ink">
                Add <span className="font-semibold text-gold-dark">{formatPrice(FREE_SHIPPING_THRESHOLD - total)}</span>{" "}
                more for complimentary white-glove delivery
              </p>
            )}
            <div className="w-full h-1.5 bg-linen rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full bg-gold rounded-full transition-all duration-700"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-5 sm:gap-6 pb-6 border-b border-border last:border-0"
            >
              <Link
                href={`/product/${item.slug}`}
                className="flex-shrink-0 w-24 h-32 sm:w-32 sm:h-40 bg-linen overflow-hidden rounded-xl img-zoom"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={128}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-serif text-lg sm:text-xl text-ink hover:text-gold transition-colors leading-snug"
                    >
                      {item.name}
                    </Link>
                    {item.finish && (
                      <p className="text-xs sm:text-sm text-muted mt-1">Finish: {item.finish}</p>
                    )}
                    {item.upholstery && (
                      <p className="text-xs sm:text-sm text-muted">Upholstery: {item.upholstery}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted hover:text-ink transition-colors p-1 flex-shrink-0"
                    aria-label="Remove item"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex items-end justify-between mt-auto pt-4">
                  <div className="flex items-center border border-border rounded-full">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 pl-3 text-muted hover:text-ink transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-sm tabular-nums font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 pr-3 text-muted hover:text-ink transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-serif text-lg text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-4">
            <Link href="/shop" className="text-sm text-muted hover:text-ink transition-colors inline-flex items-center gap-1.5">
              ← Continue shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-sm text-muted hover:text-ink underline underline-offset-2 transition-colors"
            >
              Clear cart
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface rounded-2xl p-7 sm:p-8 sticky top-28">
            <h2 className="font-serif text-2xl text-ink mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="text-ink font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">White-glove delivery</span>
                <span className="text-gold-dark font-medium">
                  {qualifiesFreeShipping ? "Complimentary" : "Calculated at checkout"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">GST (12%)</span>
                <span className="text-ink font-medium">{formatPrice(tax)}</span>
              </div>
            </div>
            <div className="border-t border-border mt-6 pt-6 flex justify-between items-baseline">
              <span className="font-serif text-lg text-ink">Total</span>
              <span className="font-serif text-2xl text-ink">{formatPrice(grandTotal)}</span>
            </div>

            <Link
              href="/checkout"
              className="w-full inline-flex items-center justify-center gap-2.5 bg-ink text-ivory text-sm font-medium tracking-wide uppercase py-4 rounded-full mt-8 hover:bg-gold transition-colors duration-300"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </Link>

            <div className="flex items-center justify-center gap-5 mt-5 text-[0.65rem] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Lock size={11} /> Secure checkout
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Shield size={11} /> Encrypted payment
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Truck size={11} /> 30-day returns
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <section className="mt-20 md:mt-28 pt-14 border-t border-border">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow mb-2">Complete the room</p>
              <h2 className="font-serif text-3xl md:text-4xl text-ink">New arrivals to consider</h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-gold hover:text-gold-dark transition-colors"
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {recommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
