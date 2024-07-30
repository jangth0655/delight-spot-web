interface Review {
  pk: number;
  user: {
    avatar: string;
    username: string;
    date_joined: Date;
    pk: number;
  };
  total_rating: number;
  taste_rating: number;
  atmosphere_rating: number;
  kindness_rating: number;
  clean_rating: number;
  parking_rating: number;
  restroom_rating: number;
  description: string;
  review_photo: string[];
}

export type { Review };
