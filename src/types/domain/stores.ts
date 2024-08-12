type SellingList = {
  pk: number;
  name: string;
  description: string;
};

type KindMenu = 'cafe' | 'food' | 'ect';
type PetFriendlyOption = 'possible' | 'impossible';
type RatingTitle =
  | 'taste_rating'
  | 'atmosphere_rating'
  | 'kindness_rating'
  | 'clean_rating'
  | 'parking_rating'
  | 'restroom_rating';

interface Store {
  pk: number;
  name: string;
  description: string;
  kind_menu: KindMenu;
  sell_list: SellingList[];
  city: string;
  reviews_len: number;
  total_rating: number | string;
  is_owner: boolean;
  user_name: string;
  is_liked: boolean;
  store_photo: string[];
  create_at: Date;
}

interface StoreDetail {
  id: number;
  owner: {
    pk: number;
    avatar: string;
    username: string;
  };
  sell_list: SellingList[];
  total_rating: number | string;
  taste_rating: number | string;
  atmosphere_rating: number | string;
  kindness_rating: number | string;
  clean_rating: number | string;
  parking_rating: number | string;
  restroom_rating: number | string;
  is_owner: boolean;
  store_photo: string[];
  is_liked: boolean;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  kind_menu: KindMenu;
  pet_friendly: boolean;
  city: string;
}

interface BookingStore {
  pk: number;
  name: string;
  photos: string[][];
  created_at: string | Date;
}

export type { SellingList, Store, KindMenu, StoreDetail, RatingTitle, BookingStore, PetFriendlyOption };
