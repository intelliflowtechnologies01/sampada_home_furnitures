"use client";

import { useEffect, useState } from "react";
import { X, Truck, Hammer, Shield, Sparkles, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type Announcement = {
  icon: typeof Truck;
  text: string;
  highlight?: string;
};

const announcements: Announcement[] = [
  {
    icon: Truck,
    text: "Complimentary white-glove delivery across India",
    highlight: "On all orders",
  },
  {
    icon: Hammer,
    text: "Made to order by master artisans",
    highlight: "8–14 week lead time",
  },
  {
    icon: Shield,
    text: "Lifetime warranty on every frame",
    highlight: "Guaranteed for life",
  },
  {
    icon: Sparkles,
    text: "New: The Monolith Series in Calacatta Gold marble",
    highlight: "Limited annual production",
  },
  {
    icon: Phone,
    text: "Book a private atelier consultation",
    highlight: "Bengaluru · Mumbai · Delhi",
  },
];

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setExiting(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % announcements.length);
        setExiting(false);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  const announcement = announcements[current];
  const Icon = announcement.icon;

  return (
    <div className="relative bg-ink text-ivory overflow-hidden">
      {/* Gold top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="container-lux">
        <div className="flex items-center justify-center gap-4 py-2.5 relative min-h-[38px]">
          {/* Left decorative dots */}
          <div className="hidden md:flex items-center gap-1.5 absolute left-0">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "w-1 h-1 rounded-full transition-colors duration-500",
                  i === current % 3 ? "bg-gold" : "bg-ivory/20"
                )}
              />
            ))}
          </div>

          {/* Rotating message */}
          <div
            className={cn(
              "flex items-center gap-3 text-center",
              exiting ? "announce-exit" : "announce-active"
            )}
            key={current}
          >
            <Icon
              size={14}
              strokeWidth={1.5}
              className="text-gold flex-shrink-0"
            />
            <span className="text-[0.68rem] tracking-[0.18em] uppercase font-light">
              {announcement.text}
              {announcement.highlight && (
                <>
                  <span className="text-ivory/30 mx-2">·</span>
                  <span className="text-gold-light font-normal">
                    {announcement.highlight}
                  </span>
                </>
              )}
            </span>
          </div>

          {/* Right: progress indicator + close */}
          <div className="hidden md:flex items-center gap-3 absolute right-0">
            {/* Progress dots */}
            <div className="flex items-center gap-1">
              {announcements.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setExiting(true);
                    setTimeout(() => {
                      setCurrent(i);
                      setExiting(false);
                    }, 400);
                  }}
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    i === current
                      ? "w-6 bg-gold"
                      : "w-1.5 bg-ivory/20 hover:bg-ivory/40"
                  )}
                  aria-label={`Show announcement ${i + 1}`}
                />
              ))}
            </div>
            <span className="w-px h-3 bg-ivory/15" />
            <button
              onClick={() => setVisible(false)}
              className="text-ivory/40 hover:text-ivory transition-colors p-0.5"
              aria-label="Dismiss announcement"
            >
              <X size={14} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile close */}
          <button
            onClick={() => setVisible(false)}
            className="md:hidden text-ivory/40 hover:text-ivory transition-colors absolute right-0 p-0.5"
            aria-label="Dismiss announcement"
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Gold bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </div>
  );
}
