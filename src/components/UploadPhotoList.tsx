import { useDeleteImage } from '@/hooks/queries/useImage';
import { useModal } from '@/hooks/useModal';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import LoadingSpinner from './LoadingSpinner';
import { useEffect } from 'react';

interface Props {
  fileUrls?: string[];
  onDeleteFileUrls: (fileUrl: string) => void;
}

export default function UploadPhotoList({ fileUrls = [], onDeleteFileUrls }: Props) {
  const totalSlots = 5;
  const modal = useModal();
  const { mutate: deleteImageMutate, isPending } = useDeleteImage();

  const deleteImage = (fileUrl: string) => {
    const urlObj = new URL(fileUrl);
    const fileName = urlObj.pathname.split('/')[1];
    if (!fileName) return;
    deleteImageMutate([fileName], {
      onSuccess: () => {
        onDeleteFileUrls(fileUrl);
      },
      onError: () => {
        modal.show();
      },
    });
  };

  return (
    <ul className="grid grid-cols-3 gap-4 max-w-sm">
      {Array.from({ length: totalSlots }, (_, index) => (
        <li key={index} className="w-full aspect-square rounded-lg overflow-hidden  relative">
          {fileUrls[index] ? (
            <div className="w-full h-full flex items-center justify-center">
              {isPending ? (
                <LoadingSpinner />
              ) : (
                <div className="relative size-[75px] overflow-hidden rounded-lg">
                  <Image fill src={fileUrls[index]} alt="Upload Image" className="object-cover" />
                </div>
              )}
              <button
                type="button"
                onClick={() => deleteImage(fileUrls[index])}
                className="absolute right-1 top-0 z-20 p-1 bg-system-S200 rounded-full hover:bg-system-S100 transition-colors"
              >
                <IoClose color="white" size={16} />
              </button>
            </div>
          ) : (
            <div className="absolute w-full h-full bg-slate-S200" />
          )}
        </li>
      ))}
    </ul>
  );
}

// 브라우저 종료, 게시 하지 않은 경우 모든 이미지 제거, isSubmit일 경우만!
// const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//   if (!isFormSaved) {
//     fileUrls.forEach((fileUrl) => {
//       const urlObj = new URL(fileUrl);
//       const fileName = urlObj.pathname.split('/')[1];
//       if (fileName) {
//         deleteImageMutate(fileName);
//       }
//     });
//     event.preventDefault();
//     event.returnValue = ''; // 표준 방식
//   }
// };

// useEffect(() => {
//   window.addEventListener('beforeunload', handleBeforeUnload);

//   return () => {
//     window.removeEventListener('beforeunload', handleBeforeUnload);
//   };
// }, [fileUrls, deleteImageMutate, isFormSaved]);
