import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

export default function IconWrapper({ icon, ...props }: Props) {
  return (
    <button aria-label="icon-wrapper" {...props} className="p-2">
      {icon}
    </button>
  );
}
