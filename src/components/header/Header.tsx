'use client';

import { MdChevronLeft, MdOutlineMenu } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { useCloseOnOutSideClick } from '@/hooks/useCloseOnOutSide';
import { useRef } from 'react';

import HeaderButton from './HeaderButton';
import MoreViewWrapper from '../MoreViewWrapper';

interface Props {
  title: string;
  isBack?: boolean;
  backUrl?: string;
  customButton?: React.ReactNode;
  customMenu?: React.ReactNode;
}

export default function Header({ title, isBack, backUrl, customMenu, customButton }: Props) {
  const router = useRouter();
  const rightMenuModal = useModal();
  const headerRef = useRef<HTMLHeadElement | null>(null);

  useCloseOnOutSideClick({
    onClose: rightMenuModal.hide,
    excludeRefs: [headerRef],
  });

  const onBackPage = () => {
    if (backUrl) return router.push(backUrl);
    router.back();
  };

  const handleMenuButton = () => {
    rightMenuModal.toggle();
  };

  return (
    <header ref={headerRef} className="fixed m-auto left-0 right-0 bg-white z-50 py-2">
      <div className="w-sm md:w-md m-auto relative">
        <div className="py-4 px-1 flex items-center relative justify-between h-14 bg-white z-20">
          {isBack ? (
            <HeaderButton
              type="button"
              icon={<MdChevronLeft aria-label="back-icon" color="#00000" size={24} />}
              onClick={onBackPage}
            />
          ) : (
            <div />
          )}

          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-h4 font-bold text-slate-S900 ">{title}</h1>
          {customMenu ? (
            <button aria-label="menu-button" type="button" onClick={handleMenuButton}>
              <MdOutlineMenu size={24} />
            </button>
          ) : (
            customButton
          )}
        </div>

        {customMenu && (
          <MoreViewWrapper top={56} right={16} isOpen={rightMenuModal.isVisible}>
            {customMenu}
          </MoreViewWrapper>
        )}
      </div>
    </header>
  );
}
