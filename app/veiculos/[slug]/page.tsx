import { notFound } from 'next/navigation';
import { getVehicle, VEHICLES } from '@/lib/vehicles';
import ProductView from '@/components/ProductView';

export function generateStaticParams() {
  return VEHICLES.map((v) => ({ slug: v.slug }));
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  return <ProductView vehicle={vehicle} />;
}
