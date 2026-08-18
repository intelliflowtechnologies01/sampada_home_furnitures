"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Lock } from "lucide-react";
import { useCart, useCartTotal } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items } = useCart();
  const total = useCartTotal();
  const tax = Math.round(total * 0.12);
  const grandTotal = total + tax;
  const [orderRef, setOrderRef] = useState<string | null>(null);
  const submitted = orderRef !== null;

  if (items.length === 0 && !submitted) {
    return (
      <div className="container-lux py-24 md:py-32 text-center">
        <h1 className="font-serif text-4xl text-ink mb-4">Your cart is empty</h1>
        <p className="text-muted mb-8">Add pieces to your cart before checking out.</p>
        <Link href="/shop" className="btn-lux">
          <span>Explore the Collection</span>
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container-lux py-24 md:py-32">
        <div className="text-center max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-green-700 flex items-center justify-center mx-auto mb-8">
            <Check size={36} strokeWidth={1.5} className="text-ivory" />
          </div>
          <p className="eyebrow text-gold mb-4">Order confirmed</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-6">
            Thank you for your commission.
          </h1>
          <p className="text-muted leading-relaxed mb-8">
            We&apos;ve received your order and our atelier team will reach out within
            24 hours to confirm your selections, discuss finishes, and schedule your
            white-glove delivery. A confirmation has been sent to your email.
          </p>
          <div className="bg-surface p-6 mb-8 text-left">
            <p className="text-xs tracking-[0.18em] uppercase text-gold mb-2">Order Reference</p>
            <p className="font-mono text-lg text-ink">SMP-{orderRef}</p>
          </div>
          <Link href="/shop" className="btn-lux">
            <span>Continue Browsing</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-lux py-12 md:py-16">
      <div className="text-center mb-12">
        <p className="eyebrow mb-3">Final step</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink">Checkout</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOrderRef(Date.now().toString().slice(-8));
        }}
        className="grid lg:grid-cols-3 gap-10 lg:gap-16"
      >
        {/* Form fields */}
        <div className="lg:col-span-2 space-y-10">
          {/* Contact */}
          <section>
            <h2 className="font-serif text-2xl text-ink mb-6">Contact Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="First name" required name="firstName" />
              <Input label="Last name" required name="lastName" />
              <Input label="Email" type="email" required name="email" />
              <Input label="Phone" type="tel" required name="phone" />
            </div>
          </section>

          {/* Delivery */}
          <section>
            <h2 className="font-serif text-2xl text-ink mb-6">Delivery Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Input label="Street address" required name="address" />
              </div>
              <Input label="City" required name="city" />
              <Input label="State" required name="state" />
              <Input label="PIN code" required name="pincode" />
              <Input label="Country" required name="country" defaultValue="India" />
            </div>
          </section>

          {/* Payment (mock) */}
          <section>
            <h2 className="font-serif text-2xl text-ink mb-6">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-4 p-4 border border-border cursor-pointer hover:border-gold transition-colors">
                <input type="radio" name="payment" defaultChecked className="accent-gold" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">Credit / Debit Card</p>
                  <p className="text-xs text-muted">Visa, Mastercard, Amex, RuPay</p>
                </div>
                <Lock size={16} className="text-muted" />
              </label>
              <label className="flex items-center gap-4 p-4 border border-border cursor-pointer hover:border-gold transition-colors">
                <input type="radio" name="payment" className="accent-gold" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">UPI / Net Banking</p>
                  <p className="text-xs text-muted">All major banks and UPI apps</p>
                </div>
              </label>
              <label className="flex items-center gap-4 p-4 border border-border cursor-pointer hover:border-gold transition-colors">
                <input type="radio" name="payment" className="accent-gold" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">Bank Transfer (NEFT/RTGS)</p>
                  <p className="text-xs text-muted">For orders above ₹5,00,000</p>
                </div>
              </label>
            </div>
            <p className="text-xs text-muted mt-4 flex items-center gap-2">
              <Lock size={12} /> This is a demo checkout. No payment will be processed.
            </p>
          </section>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface p-8 sticky top-32">
            <h2 className="font-serif text-2xl text-ink mb-6">Your Order</h2>
            <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-sm">
                  <span className="text-muted tabular-nums">{item.quantity}×</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-ink truncate">{item.name}</p>
                    {item.finish && <p className="text-xs text-muted">{item.finish}</p>}
                  </div>
                  <span className="text-ink font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="text-ink">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Delivery</span>
                <span className="text-gold-dark">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">GST (12%)</span>
                <span className="text-ink">{formatPrice(tax)}</span>
              </div>
            </div>
            <div className="border-t border-border mt-4 pt-4 flex justify-between items-baseline">
              <span className="font-serif text-lg text-ink">Total</span>
              <span className="font-serif text-2xl text-ink">{formatPrice(grandTotal)}</span>
            </div>

            <button type="submit" className="btn-lux w-full mt-8">
              <span>Place Order</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-[0.7rem] tracking-[0.18em] uppercase text-gold mb-2 font-sans font-medium">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-transparent border border-border px-4 py-3 text-sm text-ink focus:border-gold outline-none transition-colors"
      />
    </div>
  );
}
