"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, X, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { categories, collections, getAllProducts } from "@/lib/data";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

export default function ShopPage() {
  const ref = useScrollReveal<HTMLDivElement>();
  const allProducts = getAllProducts();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [maxPrice, setMaxPrice] = useState(800000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = allProducts.filter((p) => {
      if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
      if (selectedCollections.length && !selectedCollections.includes(p.collection)) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
    }
    return result;
  }, [allProducts, selectedCategories, selectedCollections, maxPrice, sortBy]);

  function toggleCategory(slug: string) {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function toggleCollection(slug: string) {
    setSelectedCollections((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function clearFilters() {
    setSelectedCategories([]);
    setSelectedCollections([]);
    setMaxPrice(800000);
    setSortBy("featured");
  }

  const activeFilterCount =
    selectedCategories.length + selectedCollections.length + (maxPrice < 800000 ? 1 : 0);

  const filterContent = (
    <div className="space-y-8">
      <div>
        <h3 className="text-[0.7rem] tracking-[0.2em] uppercase text-gold mb-4 font-sans font-medium">
          Category
        </h3>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
                className="w-4 h-4 accent-gold border-border"
              />
              <span className="text-sm text-ink group-hover:text-gold transition-colors">
                {cat.name}
              </span>
              <span className="text-xs text-muted ml-auto">{cat.productCount}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[0.7rem] tracking-[0.2em] uppercase text-gold mb-4 font-sans font-medium">
          Collection
        </h3>
        <div className="space-y-2.5">
          {collections.map((col) => (
            <label key={col.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCollections.includes(col.slug)}
                onChange={() => toggleCollection(col.slug)}
                className="w-4 h-4 accent-gold border-border"
              />
              <span className="text-sm text-ink group-hover:text-gold transition-colors">
                {col.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[0.7rem] tracking-[0.2em] uppercase text-gold mb-4 font-sans font-medium">
          Max Price
        </h3>
        <input
          type="range"
          min={50000}
          max={800000}
          step={10000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-gold"
        />
        <p className="text-sm text-ink mt-2">
          Up to{" "}
          <span className="font-medium">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(maxPrice)}
          </span>
        </p>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="text-xs text-muted hover:text-ink underline underline-offset-2 transition-colors"
        >
          Clear all filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div ref={ref}>
      {/* Page header */}
      <section className="relative py-14 md:py-20 border-b border-border bg-linen/50 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="container-lux text-center max-w-3xl mx-auto relative">
          <nav className="flex items-center justify-center gap-2 text-xs text-muted mb-6 reveal">
            <Link href="/" className="hover:text-ink transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-ink">Shop</span>
          </nav>
          <p className="eyebrow mb-4 reveal">The complete catalogue</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink text-balance reveal">
            Every piece, in one place.
          </h1>
          <p className="text-base md:text-lg text-muted mt-5 max-w-xl mx-auto reveal">
            Browse our full range of handcrafted furniture. Filter by room, collection, or budget.
          </p>
        </div>
      </section>

      <div className="container-lux py-10 md:py-14">
        <div className="flex gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              {filterContent}
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-border">
              <div className="flex items-center gap-4">
                <button
                  className="lg:hidden inline-flex items-center gap-2 text-sm font-medium text-ink border border-border rounded-full px-4 py-2 hover:border-gold transition-colors"
                  onClick={() => setShowFilters(true)}
                >
                  <SlidersHorizontal size={16} strokeWidth={1.5} />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-gold text-ivory text-[0.6rem] rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <p className="text-sm text-muted">
                  Showing <span className="text-ink font-semibold">{filtered.length}</span> of{" "}
                  {allProducts.length} pieces
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs tracking-[0.12em] uppercase text-muted hidden sm:inline">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-sm border border-border bg-transparent px-4 py-2 rounded-full text-ink focus:border-gold outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {selectedCategories.map((slug) => (
                  <button
                    key={slug}
                    onClick={() => toggleCategory(slug)}
                    className="inline-flex items-center gap-1.5 bg-ink text-ivory text-xs font-medium pl-3.5 pr-2.5 py-1.5 rounded-full hover:bg-gold transition-colors"
                  >
                    {categories.find((c) => c.slug === slug)?.name}
                    <X size={12} />
                  </button>
                ))}
                {selectedCollections.map((slug) => (
                  <button
                    key={slug}
                    onClick={() => toggleCollection(slug)}
                    className="inline-flex items-center gap-1.5 bg-gold/15 text-gold-dark text-xs font-medium pl-3.5 pr-2.5 py-1.5 rounded-full hover:bg-gold hover:text-ivory transition-colors"
                  >
                    {collections.find((c) => c.slug === slug)?.name}
                    <X size={12} />
                  </button>
                ))}
                {maxPrice < 800000 && (
                  <button
                    onClick={() => setMaxPrice(800000)}
                    className="inline-flex items-center gap-1.5 bg-linen text-ink text-xs font-medium pl-3.5 pr-2.5 py-1.5 rounded-full hover:bg-mist transition-colors"
                  >
                    Under {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(maxPrice)}
                    <X size={12} />
                  </button>
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs text-muted hover:text-ink underline underline-offset-2 transition-colors ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
                {filtered.map((product) => (
                  <div key={product.id} className="reveal">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 md:py-28">
                <div className="w-20 h-20 rounded-full bg-linen flex items-center justify-center mx-auto mb-6">
                  <SlidersHorizontal size={28} strokeWidth={1.25} className="text-stone" />
                </div>
                <p className="font-serif text-3xl text-ink mb-3">No pieces match your filters</p>
                <p className="text-sm text-muted mb-8 max-w-sm mx-auto">
                  Try widening your price range or removing a category to see more of the collection.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2.5 bg-ink text-ivory text-sm font-medium px-7 py-3.5 rounded-full hover:bg-gold transition-colors duration-300"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-ivory overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-xl">Filters</h2>
              <button onClick={() => setShowFilters(false)} aria-label="Close filters">
                <X size={22} />
              </button>
            </div>
            {filterContent}
            <button
              onClick={() => setShowFilters(false)}
              className="btn-lux w-full mt-8"
            >
              <span>Show {filtered.length} pieces</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
