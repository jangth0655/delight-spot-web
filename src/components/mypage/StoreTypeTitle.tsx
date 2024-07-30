import { IoChevronForward } from 'react-icons/io5';

interface Props {
  title: string;
}

export default function StoreTypeTitle({ title }: Props) {
  return (
    <div className="flex items-center gap-1">
      <p className="text-h4 inline-block">{title}</p>
      <IoChevronForward size={20} />
    </div>
  );
}
