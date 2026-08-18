import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-lux py-24 md:py-32 text-center">
      <p className="eyebrow text-gold mb-4">Error 404</p>
      <h1 className="font-serif text-6xl md:text-8xl text-ink mb-6">
        This page has been
        <span className="block italic text-gold">refinished and moved.</span>
      </h1>
      <p className="text-lg text-muted max-w-md mx-auto mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been relocated.
        Let&apos;s get you back to the collection.
      </p>
      <Link href="/" className="btn-lux">
        <span>Return Home</span>
      </Link>
    </div>
  );
}
