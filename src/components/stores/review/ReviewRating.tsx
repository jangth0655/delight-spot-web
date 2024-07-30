'use client';

import { translateRatingTitle } from '@/utils/translateToKorean';
import { FaStar } from 'react-icons/fa';

interface Props {
  onRatingChange: (label: string, rating: number) => void;
  ratings: Record<string, number>;
}

const ratingLabels = [
  'taste_rating',
  'atmosphere_rating',
  'kindness_rating',
  'clean_rating',
  'parking_rating',
  'restroom_rating',
] as const;

export default function ReviewRating({ onRatingChange, ratings }: Props) {
  return (
    <div>
      <p className="text-h4 leading-h4 font-bold mb-4">평점을 주세요.</p>
      <ul className="flex flex-col gap-2">
        {ratingLabels.map((label) => (
          <li key={label} className="flex items-center gap-3">
            <label className="mr-4">{translateRatingTitle(label)}</label>
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                aria-label={`${label}-${rating}-score`}
                key={rating}
                type="button"
                onClick={() => onRatingChange(label, rating)}
              >
                <FaStar size={24} className={rating <= ratings[label] ? 'text-yellow-500' : 'text-gray-300'} />
              </button>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
