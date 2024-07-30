'use client';

import RadioButton from '../RadioButton';
import Button from '../Button';
import ButtonOutline from '../ButtonOutline';

import { storeTypeList } from '@/constants';
import { translateKindMenu } from '@/utils/translateToKorean';
import { KindMenu } from '@/types/domain/stores';

interface Props {
  onSelector: (type?: KindMenu) => void;
  onClose: () => void;
  selectedType?: string;
}

export default function SelectorStoreType({ onSelector, selectedType, onClose }: Props) {
  const handleApply = () => {
    onClose();
  };
  const handleReset = () => {
    onSelector(undefined);
    onClose();
  };

  return (
    <ul className="flex flex-col gap-8">
      {storeTypeList.map((item) => (
        <li onClick={() => onSelector(item)} key={item} className="flex items-center gap-2 cursor-pointer">
          <RadioButton checked={selectedType === item} />
          <p>{translateKindMenu(item)}</p>
        </li>
      ))}
      <div className="flex items-center gap-2">
        <ButtonOutline title="취소" type="button" onClick={handleReset} />
        <Button title="적용" type="button" onClick={handleApply} disabled={!selectedType} />
      </div>
    </ul>
  );
}
