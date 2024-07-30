'use client';

import { useUser } from '@/hooks/useUser';

import Avatar from '../stores/Avatar';

export default function UserInfo() {
  const { userInfo } = useUser();

  return (
    <div className="pt-20 px-4">
      <div className="py-4 flex flex-col justify-center items-center gap-4 bg-slate-50 shadow-md">
        <Avatar size={140} avatarUrl={userInfo?.avatar} />

        <div className="font-semibold flex flex-col justify-center items-center gap-2">
          <p>{userInfo?.username}</p>
          <p className="font-normal text-slate-S500">{userInfo?.email}</p>
        </div>
      </div>
    </div>
  );
}
