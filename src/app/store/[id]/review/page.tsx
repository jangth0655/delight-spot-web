import ReviewForm from '@/components/stores/review/ReviewForm';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default function ReviewFormPage({ params }: Props) {
  const storeId = Number(params.id);
  if (isNaN(storeId)) {
    return notFound();
  }
  return (
    <section>
      <ReviewForm storeId={storeId} />
    </section>
  );
}
