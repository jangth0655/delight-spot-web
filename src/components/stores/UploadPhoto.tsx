'use client';

import { useUploadImage } from '@/hooks/queries/useImage';
import { useModal } from '@/hooks/useModal';
import { IoImage } from 'react-icons/io5';

import AlertModal from '../modal/AlertModal';
import LoadingSpinner from '../LoadingSpinner';

import { ChangeEvent } from 'react';

export type PhotoItem = {
  previewUrl: string;
  formData: FormData;
};

interface Props {
  onSetFileUrls: (fileUrls: string) => void;
}

export default function UploadPhoto({ onSetFileUrls }: Props) {
  const modal = useModal();
  const {
    mutate: upload,
    isPending,
    error,
  } = useUploadImage({
    onSuccess: (data) => {
      if (data.imageUrl) {
        onSetFileUrls(data.imageUrl);
      }
    },
    onError: () => {
      modal.show();
    },
  });

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSizeInBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeInBytes) return;

    const formData = new FormData();
    formData.append('file', file);
    upload(formData);
  };

  return (
    <div className="flex items-end gap-2">
      <label
        aria-label="upload-image"
        htmlFor="photo"
        className="size-24 aspect-square bg-slate-S200 flex items-center justify-center rounded-lg cursor-pointer relative overflow-hidden"
      >
        {isPending ? <LoadingSpinner /> : <IoImage size={30} color="#64748b" />}
      </label>
      <div className="flex flex-col text-label text-system-S200 font-semibold">
        <p>최대 5개 이미지만 가능합니다.</p>
        <p>jpg, jpeg, png 형식만 가능합니다.</p>
        <p>최대 10MB까지만 가능합니다.</p>
      </div>
      <input onChange={handleFile} type="file" id="photo" className="hidden" accept="image/*" />

      {error && <AlertModal close={modal.hide} isOpen={modal.isVisible} type="error" />}
    </div>
  );
}
