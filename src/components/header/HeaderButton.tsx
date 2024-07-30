import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  labelTitle?: string;
}

export default function HeaderButton({ labelTitle, icon, ...props }: Props) {
  return (
    <button className="p-3" {...props}>
      {!labelTitle && icon}
      {!icon && labelTitle && <p>{labelTitle}</p>}
    </button>
  );
}
