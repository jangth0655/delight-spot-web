import ReviewEditForm from '@/components/stores/review/ReviewEditForm';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
    reviewId: string;
  };
}

export default function EditReviewPage({ params }: Props) {
  const storeId = Number(params.id);
  const reviewId = Number(params.reviewId);
  if (isNaN(reviewId) || isNaN(storeId)) {
    return notFound();
  }
  return <section>{<ReviewEditForm reviewId={reviewId} storeId={storeId} />}</section>;
}
