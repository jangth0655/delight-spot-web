'use client';

import Image from 'next/image';
import { IoStar, IoImage, IoHeartSharp } from 'react-icons/io5';

import { translateKindMenu } from '@/utils/translateToKorean';
import { Store } from '@/types/domain/stores';
import { useState } from 'react';

interface Props {
  store: Store;
}

export default function StoreItem({ store }: Props) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  //sizes="256px"
  return (
    <li className="flex gap-2">
      <div className="relative w-[8rem] h-[8rem] rounded-md overflow-hidden ">
        {store.store_photo?.length > 0 && !imageError ? (
          <Image src={store.store_photo[0]} alt={`store ${store.name}`} fill onError={handleImageError} />
        ) : (
          <div className="absolute w-full h-full bg-slate-S200 flex items-center justify-center">
            <IoImage size={20} color="#64748b" data-testid="store-no-image-icon" />
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 justify-between">
        <div>
          <p className="line-clamp-2 text-subtitle leading-subtitle font-semibold">{store.name}</p>
          <div className="flex flex-col mt-2 *:text-label *:leading-label *:text-slate-S500">
            <span className="font-semibold text-slate-S700">{store.city}</span>
            <span className="my-1">{translateKindMenu(store.kind_menu)}</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <IoStar data-testid="store-star-icon" size={12} color={store.reviews_len > 0 ? '#FFBD53' : '#C8C9DF'} />
                <span>{`(${store.reviews_len})`}</span>
              </div>

              <div>
                <IoHeartSharp data-testid="store-heart-icon" size={12} color={store.is_liked ? '#FF5F5F' : '#C8C9DF'} />
              </div>
            </div>
          </div>
        </div>

        <p className="line-clamp-2 font-semibold text-label text-slate-S400">{store.description}</p>
      </div>
    </li>
  );
}
