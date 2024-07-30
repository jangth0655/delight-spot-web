'use client';

import { IoImage } from 'react-icons/io5';
import Link from 'next/link';

import ImageSlider from '../stores/ImageSlider';

import { BookingStore } from '@/types/domain/stores';
import { useToggleBooking } from '@/hooks/queries/useBookings';

interface Props {
  item: BookingStore;
  size?: number | string;
}

export default function BookingStoreItem({ item, size = 156 }: Props) {
  const { mutate: deleteBooking } = useToggleBooking(item.pk);
  return (
    <li className="relative flex-none flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Link href={`/store/${item.pk}`} className="text-black text-body-s">
          {item.name}
        </Link>
        <button
          onClick={() => deleteBooking(item.pk)}
          className="text-system-S200 hover:text-system-S100 transition-colors p-1 text-body-s"
        >
          취소
        </button>
      </div>
      <div
        style={{
          width: size,
          height: size,
        }}
        className="relative"
      >
        {item?.photos && item.photos.length > 0 ? (
          <ImageSlider images={item.photos} />
        ) : (
          <div
            className="absolute w-full h-full bg-slate-200 flex items-center justify-center"
            data-testid="detail-no-photo"
          >
            <IoImage size={30} color="#64748b" />
          </div>
        )}
      </div>
    </li>
  );
}
