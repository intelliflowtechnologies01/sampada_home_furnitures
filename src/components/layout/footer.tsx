import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 9a3 3 0 0 1 3-3h13a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-13a3 3 0 0 1-3-3z" />
      <path d="m10 9 5 3-5 3z" fill="currentColor" />
    </svg>
  );
}
import { categories, collections } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory mt-16 lg:mt-24">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="container-lux py-12 lg:py-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 justify-between">
            <div className="flex items-start gap-5">
              <span className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                <Mail size={20} strokeWidth={1.5} className="text-gold-light" />
              </span>
              <div>
                <h2 className="font-serif text-2xl lg:text-3xl text-ivory">Stay inspired</h2>
                <p className="text-sm text-ivory/60 mt-1.5 max-w-md">
                  Join our newsletter for new arrivals, offers &amp; inspiration.
                </p>
              </div>
            </div>
            <form className="flex w-full lg:w-auto items-center gap-2 bg-white/10 border border-white/15 rounded-full p-1.5 pl-5">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 lg:w-72 min-w-0 bg-transparent text-sm text-ivory placeholder:text-ivory/40 outline-none"
              />
              <button
                type="submit"
                className="w-11 h-11 rounded-full bg-gold text-ink flex items-center justify-center flex-shrink-0 hover:bg-gold-light transition-colors"
                aria-label="Subscribe"
              >
                <ArrowUpRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-lux py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <span className="font-serif text-2xl tracking-[0.15em] block mb-1">
              SAMPADA
            </span>
            <span className="text-[0.55rem] tracking-[0.35em] uppercase text-gold block mb-6">
              Fine Furniture
            </span>
            <p className="text-sm text-stone leading-relaxed max-w-xs">
              Heirloom-quality furniture, handcrafted for the discerning few.
              Made in India, shipped worldwide.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="text-stone hover:text-gold transition-colors">
                <InstagramIcon size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="text-stone hover:text-gold transition-colors">
                <FacebookIcon size={18} />
              </a>
              <a href="#" aria-label="YouTube" className="text-stone hover:text-gold transition-colors">
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-[0.7rem] tracking-[0.2em] uppercase text-gold mb-5 font-sans font-medium">
              Collections
            </h4>
            <ul className="space-y-3">
              {collections.map((col) => (
                <li key={col.id}>
                  <Link
                    href={`/collection/${col.slug}`}
                    className="text-sm text-stone hover:text-ivory transition-colors"
                  >
                    {col.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Furniture */}
          <div>
            <h4 className="text-[0.7rem] tracking-[0.2em] uppercase text-gold mb-5 font-sans font-medium">
              Furniture
            </h4>
            <ul className="space-y-3">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-stone hover:text-ivory transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[0.7rem] tracking-[0.2em] uppercase text-gold mb-5 font-sans font-medium">
              The House
            </h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-stone hover:text-ivory transition-colors">Our Atelier</Link></li>
              <li><Link href="/about" className="text-sm text-stone hover:text-ivory transition-colors">Craftsmanship</Link></li>
              <li><Link href="/contact" className="text-sm text-stone hover:text-ivory transition-colors">Showrooms</Link></li>
              <li><Link href="/contact" className="text-sm text-stone hover:text-ivory transition-colors">Trade Program</Link></li>
              <li><Link href="/about" className="text-sm text-stone hover:text-ivory transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[0.7rem] tracking-[0.2em] uppercase text-gold mb-5 font-sans font-medium">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-stone">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0 text-gold" />
                <span>Rajendar, Plot No 135, Reddy Colony, Rajender Reddy Nagar Colony, Ameenpur, Hyderabad, Telangana 500050</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-stone">
                <Phone size={16} strokeWidth={1.5} className="flex-shrink-0 text-gold" />
                <span>+91 80 4567 8900</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-stone">
                <Mail size={16} strokeWidth={1.5} className="flex-shrink-0 text-gold" />
                <span>atelier@sampada.in</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-lux py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone">
            © {new Date().getFullYear()} Sampada Fine Furniture. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-stone">
            <a href="#" className="hover:text-ivory transition-colors">Privacy</a>
            <a href="#" className="hover:text-ivory transition-colors">Terms</a>
            <a href="#" className="hover:text-ivory transition-colors">Warranty</a>
            <a href="#" className="hover:text-ivory transition-colors">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
