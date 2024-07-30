type User = {
  pk: number;
  username: string;
  name: string;
  email: string;
  gender: 'male' | 'female';
  date_joined: Date;
  is_host: boolean;
  avatar: string;
};

export type { User };
