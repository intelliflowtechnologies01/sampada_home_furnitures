"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hammer, Leaf, Award, Users } from "lucide-react";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { useParallax } from "@/lib/use-parallax";

export default function AboutPage() {
  const ref = useScrollReveal<HTMLDivElement>();
  const parallax1 = useParallax<HTMLDivElement>(-0.1);
  const parallax2 = useParallax<HTMLDivElement>(0.08);

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-ink">
        <div ref={parallax1} className="absolute inset-0 parallax-layer">
          <Image
            src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=2400&q=80"
            alt="Sampada atelier"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-ink/80" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <p className="eyebrow text-gold-light mb-6 reveal">Est. 1987 · Bengaluru</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory text-balance reveal">
            The Sampada Atelier
          </h1>
          <p className="text-lg md:text-xl text-ivory/80 max-w-2xl mt-8 leading-relaxed reveal">
            For nearly four decades, we have built furniture the slow way —
            by hand, in solid wood, for the few who understand that true luxury
            cannot be rushed.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32">
        <div className="container-lux max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal">
              <p className="eyebrow mb-4">Our story</p>
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6 text-balance">
                It began with a single workbench and a stubborn idea.
              </h2>
              <div className="space-y-4 text-ink/80 leading-relaxed">
                <p>
                  In 1987, our founder opened a small workshop in Bengaluru with one
                  principle: furniture should be built to outlast the person who buys it.
                  No veneers. No shortcuts. No planned obsolescence.
                </p>
                <p>
                  Thirty-eight years later, that workbench is still in use — and the
                  principle hasn&apos;t changed. We&apos;ve grown to a team of forty-three
                  craftspeople, but every piece still passes through human hands, from
                  timber selection to the final coat of wax.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-linen reveal">
              <Image
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                alt="Craftsperson at work"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="container-lux">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <p className="eyebrow mb-4">What we stand for</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ink text-balance">
              Four principles, non-negotiable.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Hammer,
                title: "By hand, always",
                text: "Every joint is cut, fitted, and finished by a human. Machines assist; they never replace.",
              },
              {
                icon: Leaf,
                title: "Responsible timber",
                text: "FSC-certified solid hardwood, sourced from sustainably managed forests. No MDF, no veneer cores.",
              },
              {
                icon: Award,
                title: "Lifetime warranty",
                text: "If a frame fails in your lifetime, we repair or replace it. No questions, no expiry.",
              },
              {
                icon: Users,
                title: "Fair craft wages",
                text: "Our artisans earn above-industry wages with healthcare and pensions. Quality begins with dignity.",
              },
            ].map((value, i) => (
              <div key={i} className="text-center reveal">
                <div className="w-16 h-16 rounded-full bg-linen flex items-center justify-center mx-auto mb-6">
                  <value.icon size={26} strokeWidth={1.25} className="text-gold" />
                </div>
                <h3 className="font-serif text-xl text-ink mb-3">{value.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process parallax */}
      <section className="relative py-32 md:py-48 overflow-hidden bg-ink">
        <div ref={parallax2} className="absolute inset-0 parallax-layer opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=2400&q=80"
            alt="Workshop detail"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative container-lux max-w-3xl text-center">
          <p className="eyebrow text-gold-light mb-6 reveal">The process</p>
          <h2 className="font-serif text-4xl md:text-6xl text-ivory text-balance reveal">
            From tree to your home, in eight deliberate weeks.
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 mt-16">
            {[
              { num: "01", title: "Select", text: "Timber is hand-selected, kiln-dried, and rested for stability." },
              { num: "02", title: "Build", text: "Joinery cut and fitted. Frames assembled without metal fasteners." },
              { num: "03", title: "Finish", text: "Sanded through seven grits. Wax or lacquer rubbed by hand." },
            ].map((step) => (
              <div key={step.num} className="reveal">
                <p className="font-serif text-5xl text-gold-light mb-3">{step.num}</p>
                <h3 className="font-serif text-xl text-ivory mb-2">{step.title}</h3>
                <p className="text-sm text-ivory/60 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container-lux text-center max-w-2xl mx-auto reveal">
          <h2 className="font-serif text-4xl md:text-5xl text-ink text-balance mb-6">
            Visit our atelier.
          </h2>
          <p className="text-lg text-muted mb-10">
            See the craft firsthand. Book a private viewing at our Bengaluru workshop.
          </p>
          <Link href="/contact" className="btn-lux">
            <span>Book a Visit</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
