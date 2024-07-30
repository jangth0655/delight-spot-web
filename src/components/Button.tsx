import { cls } from '@/utils/cls';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ title, size = 'md', ...props }: Props) {
  const sizes = {
    sm: 'h-8 py-1',
    md: 'h-10 py-2',
    lg: 'h-14 py-4',
  };
  return (
    <button
      className={cls(
        props.disabled ? 'bg-slate-S400 text-slate-S500' : 'bg-primary-P300 hover:bg-primary-P400 text-white',
        sizes[size],
        'text-body leading-body flex justify-center items-center px-4 rounded-lg w-full'
      )}
      {...props}
    >
      {title}
    </button>
  );
}
