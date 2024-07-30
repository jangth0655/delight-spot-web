import StoreEditForm from '@/components/stores/StoreEditForm';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default function StoreEditPage({ params }: Props) {
  const storeId = Number(params.id);
  if (isNaN(storeId)) {
    return notFound();
  }
  return (
    <section>
      <StoreEditForm storeId={storeId} />
    </section>
  );
}
