'use client';

import { useDeleteStore } from '@/hooks/queries/useStores';
import { useModal } from '@/hooks/useModal';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';

import AlertModal from '../modal/AlertModal';

import MyMoreViewList from '../MyMoreViewList';

interface Props {
  storeId: number;
}

export default function StoreDetailMenu({ storeId }: Props) {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const loginModal = useModal();
  const alertModal = useModal();

  const { mutate: deleteStore, isSuccess } = useDeleteStore(storeId, {
    onError: () => {
      alertModal.show();
    },
  });

  const handleMenuItem = (type: string) => {
    if (!isLoggedIn) loginModal.show();

    if (type === 'edit') {
      return router.push(`/store/edit/${storeId}`);
    }
    if (type === 'delete') {
      return deleteStore(storeId);
    }
  };

  return (
    <>
      <MyMoreViewList onMenuClick={handleMenuItem} />
      <AlertModal isOpen={alertModal.isVisible} close={alertModal.hide} type="error" />
    </>
  );
}
