import { useModal } from '@/hooks/useModal';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useDeleteReview } from '@/hooks/queries/useReviews';

import MoreViewWrapper from '@/components/MoreViewWrapper';
import MyMoreViewList from '@/components/MyMoreViewList';
import AlertModal from '@/components/modal/AlertModal';
import LoginModal from '@/components/modal/LoginModal';

interface Props {
  isOpen: boolean;
  reviewId: number;
  storeId: number;
}

export default function ReviewMoreView({ isOpen, reviewId, storeId }: Props) {
  const { isLoggedIn, userInfo } = useUser();
  const loginModal = useModal();
  const alertModal = useModal();
  const router = useRouter();
  const { mutate: deleteReview } = useDeleteReview({ reviewId, storeId });

  const handleMenuItem = (type: string) => {
    if (!isLoggedIn || !userInfo?.username) return loginModal.show();

    if (type === 'edit') {
      return router.push(`/store/${storeId}/review/edit/${reviewId}`);
    }
    if (type === 'delete') {
      deleteReview(userInfo.username);
    }
  };
  return (
    <div>
      <MoreViewWrapper isOpen={isOpen} right={0} top={26} isAnimate={false}>
        <MyMoreViewList onMenuClick={handleMenuItem} />
      </MoreViewWrapper>

      <LoginModal isOpen={loginModal.isVisible} onCloseModal={loginModal.show} />
      <AlertModal isOpen={alertModal.isVisible} close={alertModal.hide} type="error" backUrl="/" />
    </div>
  );
}
