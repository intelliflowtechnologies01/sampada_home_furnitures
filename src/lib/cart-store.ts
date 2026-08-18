"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  finish?: string;
  upholstery?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

function makeItemId(item: {
  productId: string;
  finish?: string;
  upholstery?: string;
}): string {
  return `${item.productId}-${item.finish ?? "default"}-${item.upholstery ?? "default"}`;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const id = makeItemId(item);
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { ...item, id, quantity: item.quantity ?? 1 }],
            isOpen: true,
          };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "sampada-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export function useCartCount(): number {
  return useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
}

export function useCartTotal(): number {
  return useCart((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
}
