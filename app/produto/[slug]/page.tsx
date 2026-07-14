import { notFound } from 'next/navigation';
import { getProduct, PRODUCTS } from '@/lib/catalog';
import ProductBuyView from '@/components/ProductBuyView';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return <ProductBuyView product={product} />;
}
