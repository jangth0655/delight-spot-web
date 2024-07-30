import { KindMenu, PetFriendlyOption, RatingTitle } from '@/types/domain/stores';

function translateKindMenu(word?: KindMenu): string {
  if (!word) return '';
  const dictionary: Record<KindMenu, string> = {
    ect: '기타',
    cafe: '카페',
    food: '상점',
  };

  return dictionary[word];
}

function translatePetFriendlyType(word?: PetFriendlyOption): string {
  if (!word) return '';
  const dictionary: Record<PetFriendlyOption, string> = {
    possible: '가능',
    impossible: '불가능',
  };
  return dictionary[word];
}

function translateRatingTitle(word?: RatingTitle) {
  if (!word) return;
  const obj: Record<RatingTitle, string> = {
    taste_rating: '맛',
    atmosphere_rating: '분위기',
    kindness_rating: '친절함',
    clean_rating: '깔끔함',
    parking_rating: '주차 공간',
    restroom_rating: '화장실',
  };

  return obj[word];
}

export { translateKindMenu, translateRatingTitle, translatePetFriendlyType };
