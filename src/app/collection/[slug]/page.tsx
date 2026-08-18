import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, getCollectionBySlug, getProductsByCollection } from "@/lib/data";
import { CollectionView } from "@/components/product/collection-view";

export function generateStaticParams() {
  return collections.map((col) => ({ slug: col.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/collection/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};
  return {
    title: collection.name,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: PageProps<"/collection/[slug]">) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();
  const products = getProductsByCollection(slug);

  return <CollectionView collection={collection} products={products} />;
}
