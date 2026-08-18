import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
  getCategoryBySlug,
  getCollectionBySlug,
} from "@/lib/data";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductCard } from "@/components/product/product-card";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const category = getCategoryBySlug(product.category);
  const collection = getCollectionBySlug(product.collection);

  return (
    <>
      <ProductDetail product={product} categoryName={category?.name} collectionName={collection?.name} />

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-20 md:py-28 bg-surface">
          <div className="container-lux">
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">You may also commission</p>
              <h2 className="font-serif text-3xl md:text-4xl text-ink">
                Pieces that pair beautifully
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
