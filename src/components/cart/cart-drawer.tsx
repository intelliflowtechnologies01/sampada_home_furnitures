"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart, useCartTotal } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCart();
  const total = useCartTotal();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 bottom-0 z-[71] w-full max-w-md bg-ivory shadow-[var(--shadow-elevated)] flex flex-col transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} strokeWidth={1.5} className="text-ink" />
            <h2 className="font-serif text-xl text-ink">Your Selection</h2>
            <span className="text-xs text-muted">({items.length})</span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-muted hover:text-ink transition-colors"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
            <div className="w-20 h-20 rounded-full bg-linen flex items-center justify-center">
              <ShoppingBag size={28} strokeWidth={1} className="text-stone" />
            </div>
            <div>
              <p className="font-serif text-xl text-ink mb-2">Your cart is empty</p>
              <p className="text-sm text-muted">
                Discover pieces crafted to last a lifetime.
              </p>
            </div>
            <Link href="/shop" onClick={closeCart} className="btn-lux">
              <span>Explore the Collection</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="flex-shrink-0 w-24 h-32 bg-linen overflow-hidden img-zoom"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="font-serif text-base text-ink hover:text-gold transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    {item.finish && (
                      <p className="text-xs text-muted mt-1">{item.finish}</p>
                    )}
                    {item.upholstery && (
                      <p className="text-xs text-muted">{item.upholstery}</p>
                    )}
                    <p className="text-sm font-medium text-ink mt-2">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-muted hover:text-ink transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-muted hover:text-ink transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-muted hover:text-ink underline underline-offset-2 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Subtotal</span>
                <span className="font-serif text-xl text-ink">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-muted">
                Shipping and taxes calculated at checkout. White-glove delivery included.
              </p>
              <Link
                href="/cart"
                onClick={closeCart}
                className="btn-outline w-full text-ink"
              >
                <span>View Cart</span>
              </Link>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-lux w-full"
              >
                <span>Proceed to Checkout</span>
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
