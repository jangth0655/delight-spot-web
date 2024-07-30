import { cls } from '@/utils/cls';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ButtonOutline({ title, size = 'md', ...prop }: Props) {
  const sizes = {
    sm: 'h-8 py-1',
    md: 'h-10 py-2',
    lg: 'h-14 py-4',
  };
  return (
    <button
      {...prop}
      className={cls(
        'text-body leading-body flex justify-center items-center px-4 rounded-lg w-full border border-slate-S300',
        sizes[size]
      )}
    >
      {title}
    </button>
  );
}
