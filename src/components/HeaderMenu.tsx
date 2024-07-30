'use client';

import Link from 'next/link';
import { useModal } from '@/hooks/useModal';
import { useUser } from '@/hooks/useUser';

import MenuItem from './header/MenuItem';
import LoginModal from './modal/LoginModal';

import { mainHeaderMenu } from '@/constants';

export default function HeaderMenu() {
  const modal = useModal();
  const { isLoggedIn } = useUser();

  const handleLinkClick = (key: string) => {
    if (!isLoggedIn && key === 'myPage') {
      modal.show();
    }
  };

  return (
    <ul>
      {mainHeaderMenu.map((item) => (
        <Link
          onClick={() => handleLinkClick(item.key)}
          href={item.url}
          key={item.key}
          className="flex flex-col border-b last:border-0"
        >
          <MenuItem>
            <p>{item.title}</p>
          </MenuItem>
        </Link>
      ))}

      <LoginModal isOpen={modal.isVisible} onCloseModal={modal.hide} />
    </ul>
  );
}
