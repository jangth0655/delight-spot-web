'use client';

import { useDaumPostcodePopup } from 'react-daum-postcode';
import Input from '../Input';
import FormLabel from './FormLabel';

type AddressData = {
  zonecode: string;
  address: string;
  buildingName: string;
  bname: string;
  roadAddress: string;
  sido: string;
  sigungu: string;
  sigunguCode: string;
  userLanguageType: string;
};

interface Props {
  onSelectAddress: (address: string) => void;
  errorMessage?: string;
  address?: string;
}

export default function SearchAddress({ onSelectAddress, errorMessage, address }: Props) {
  const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data: AddressData) => {
    onSelectAddress(data.address);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="flex flex-col gap-1">
      <FormLabel text="주소 찾기" isRequired errorMessage={errorMessage} />
      <Input
        style={{ cursor: 'default' }}
        readOnly={true}
        placeholder="주소를 입력해주세요."
        onClick={handleClick}
        value={address ?? ''}
      />
    </div>
  );
}
