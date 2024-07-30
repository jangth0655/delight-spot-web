import Image from 'next/image';
import { IoPerson } from 'react-icons/io5';

interface Props {
  size: number;
  avatarUrl?: string;
}

export default function Avatar({ avatarUrl, size }: Props) {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="relative"
    >
      {avatarUrl ? (
        <Image src={avatarUrl} alt={'avatar'} className="rounded-full overflow-hidden" data-testid="avatar" fill />
      ) : (
        <div className="absolute w-full h-full rounded-full overflow-hidden bg-[#64748b] flex items-center justify-center">
          <IoPerson aria-label="noneAvatarIcon" size={size / 2} color="white" data-testid="detail-person-icon" />
        </div>
      )}
    </div>
  );
}
