"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Check, MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

export default function ContactPage() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div ref={ref}>
      {/* Header */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container-lux text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-4 reveal">We&apos;d love to hear from you</p>
          <h1 className="font-serif text-5xl md:text-6xl text-ink text-balance reveal">
            Visit a showroom, or invite us to yours.
          </h1>
          <p className="text-lg text-muted mt-6 max-w-xl mx-auto reveal">
            Book a private consultation, schedule a home visit, or simply ask a question.
            Our design team responds within one business day.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-lux">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <div className="reveal">
              <h2 className="font-serif text-3xl text-ink mb-8">Send us a message</h2>
              {submitted ? (
                <div className="p-8 bg-surface text-center">
                  <div className="w-16 h-16 rounded-full bg-green-700 flex items-center justify-center mx-auto mb-6">
                    <Check size={28} strokeWidth={1.5} className="text-ivory" />
                  </div>
                  <h3 className="font-serif text-2xl text-ink mb-3">Message received</h3>
                  <p className="text-muted">
                    Thank you for reaching out. Our team will respond within one business day.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="First name" name="firstName" required />
                    <Field label="Last name" name="lastName" required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Phone" name="phone" type="tel" />
                  </div>
                  <div>
                    <label className="block text-[0.7rem] tracking-[0.18em] uppercase text-gold mb-2 font-sans font-medium">
                      I&apos;m interested in
                    </label>
                    <select
                      name="interest"
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-ink focus:border-gold outline-none transition-colors"
                    >
                      <option>Booking a showroom visit</option>
                      <option>Scheduling a home consultation</option>
                      <option>Commissioning a custom piece</option>
                      <option>Trade &amp; interior designer program</option>
                      <option>General enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[0.7rem] tracking-[0.18em] uppercase text-gold mb-2 font-sans font-medium">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-ink focus:border-gold outline-none transition-colors resize-none"
                      placeholder="Tell us about your space, your style, or what you're looking for..."
                    />
                  </div>
                  <button type="submit" className="btn-lux">
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-10 reveal">
              <div>
                <h2 className="font-serif text-3xl text-ink mb-8">Showrooms</h2>
                <div className="space-y-8">
                  {[
                    {
                      city: "Hyderabad",
                      addr: "Rajendar, Plot No 135, Reddy Colony, Rajender Reddy Nagar Colony, Ameenpur, Hyderabad, Telangana 500050",
                      phone: "+91 80 4567 8900",
                      hours: "Mon–Sat, 10am–7pm",
                    },
                  ].map((showroom) => (
                    <div key={showroom.city} className="border-l-2 border-gold pl-6">
                      <h3 className="font-serif text-xl text-ink mb-2">{showroom.city}</h3>
                      <div className="space-y-2 text-sm text-muted">
                        <p className="flex items-start gap-3">
                          <MapPin size={16} className="flex-shrink-0 mt-0.5 text-gold" />
                          {showroom.addr}
                        </p>
                        <p className="flex items-center gap-3">
                          <Phone size={16} className="flex-shrink-0 text-gold" />
                          {showroom.phone}
                        </p>
                        <p className="flex items-center gap-3">
                          <Clock size={16} className="flex-shrink-0 text-gold" />
                          {showroom.hours}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <h3 className="font-serif text-xl text-ink mb-4">Other ways to reach us</h3>
                <div className="space-y-3 text-sm">
                  <a
                    href="mailto:atelier@sampada.in"
                    className="flex items-center gap-3 text-muted hover:text-ink transition-colors"
                  >
                    <Mail size={16} className="text-gold" />
                    atelier@sampada.in
                  </a>
                  <a
                    href="https://wa.me/918045678900"
                    className="flex items-center gap-3 text-muted hover:text-ink transition-colors"
                  >
                    <MessageCircle size={16} className="text-gold" />
                    WhatsApp us +91 80 4567 8900
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
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
