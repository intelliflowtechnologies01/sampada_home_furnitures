"use client";

import { useEffect, useRef } from "react";

/**
 * Parallax effect — moves elements on scroll at a configurable speed.
 * Uses requestAnimationFrame for smooth 60fps performance.
 * Positive speed moves up, negative moves down (relative to scroll).
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed = 0.3
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let rafId = 0;

    function update() {
      const rect = el!.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Only animate when element is near viewport
      if (rect.bottom < -200 || rect.top > viewportHeight + 200) {
        rafId = requestAnimationFrame(update);
        return;
      }
      const center = rect.top + rect.height / 2;
      const offset = (center - viewportHeight / 2) * speed;
      el!.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      rafId = requestAnimationFrame(update);
    }

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [speed]);

  return ref;
}
