import { cls } from '@/utils/cls';
import { ButtonHTMLAttributes } from 'react';
import { IoChevronForward, IoChevronBack } from 'react-icons/io5';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'right' | 'left';
  isHide?: boolean;
}

export default function ListMoveButton({ direction, isHide, ...props }: Props) {
  return (
    <button
      {...props}
      className={cls(
        isHide ? 'md:hidden' : 'flex',
        direction === 'right' ? 'right-0' : 'left-0',
        'absolute m-auto top-1/2 z-10 -translate-y-1/2 p-1 group-hover:opacity-100 opacity-0 transition-opacity text-slate-S200 bg-slate-400 rounded-full flex justify-center items-center'
      )}
    >
      {direction === 'right' ? <IoChevronForward size={20} /> : <IoChevronBack size={20} />}
    </button>
  );
}
