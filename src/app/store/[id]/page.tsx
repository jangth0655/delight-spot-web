import SSRSuspense from '@/components/SSRSuspense';
import StoreDetailInfo from '@/components/stores/StoreDetailInfo';
import StoreDetailSkeleton from '@/components/stores/StoreDetailSkeleton';
import Toast from '@/components/Toast';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default function StoreDetailPage({ params }: Props) {
  const storeId = Number(params.id);
  if (isNaN(storeId)) {
    return notFound();
  }
  return (
    <section>
      <SSRSuspense fallback={<StoreDetailSkeleton />}>
        <StoreDetailInfo id={Number(storeId)} />
      </SSRSuspense>
      <Toast isShowing />
    </section>
  );
}
