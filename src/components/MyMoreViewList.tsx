import { IoPencilSharp, IoTrashSharp } from 'react-icons/io5';

import MenuItem from './header/MenuItem';

import { myMenuList } from '@/constants';

interface Props {
  onMenuClick: (type: string) => void;
}

export default function MyMoreViewList({ onMenuClick }: Props) {
  const handleIconType = (type: string) => {
    if (type === 'edit') {
      return <IoPencilSharp />;
    }
    if (type === 'delete') {
      return <IoTrashSharp color="#FF5F5F" />;
    }
  };
  return (
    <ul aria-label="store-detail-menu">
      {myMenuList.map((item) => (
        <div onClick={() => onMenuClick(item.key)} key={item.key} className="border-b last:border-0 cursor-pointer">
          <MenuItem>
            <div className="p-2 mr-1">{handleIconType(item.key)}</div>
            <p className={item.key === 'delete' ? 'text-system-S200' : ''}>{item.name}</p>
          </MenuItem>
        </div>
      ))}
    </ul>
  );
}
