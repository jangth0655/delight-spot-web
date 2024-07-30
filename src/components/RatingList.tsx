import { RatingTitle } from '@/types/domain/stores';
import RatingBox from './RatingBox';

interface Props {
  ratingList?: { title: RatingTitle; rating: number }[];
}

export default function RatingList({ ratingList }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {ratingList?.map((item, index) => (
        <RatingBox key={index} rating={item.rating} title={item.title} />
      ))}
    </ul>
  );
}
