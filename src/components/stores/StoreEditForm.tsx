'use client';

import { useForm } from 'react-hook-form';
import { useEditStore, useGetStoreDetail } from '@/hooks/queries/useStores';
import { useCallback, useEffect, useState } from 'react';
import { useModal } from '@/hooks/useModal';

import Header from '../header/Header';
import LoadingSpinner from '../LoadingSpinner';
import Button from '../Button';
import FormLabel from './FormLabel';
import Input from '../Input';
import SearchAddress from './SearchAddress';
import UploadPhoto from './UploadPhoto';
import Divider from '../Divider';
import BottomModal from '../modal/BottomModal';
import SelectorStoreType from './SelectorStoreType';
import RadioButton from '../RadioButton';
import UploadPhotoList from '../UploadPhotoList';
import TextArea from '../TextArea';

import { KindMenu, PetFriendlyOption } from '@/types/domain/stores';
import { translateKindMenu, translatePetFriendlyType } from '@/utils/translateToKorean';
import { petFriendlyOptions } from '@/constants';
import { useUser } from '@/hooks/useUser';
import AlertModal from '../modal/AlertModal';

interface Props {
  storeId: number;
}

type EditForm = {
  description: string;
  name: string;
  address: string;
  type: KindMenu;
  petFriendly: boolean;
};

export default function StoreEditForm({ storeId }: Props) {
  const { data } = useGetStoreDetail(storeId);

  const {
    formState: { isValid, errors },
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useForm<EditForm>();
  const { isLoggedIn } = useUser();
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const typeSelectorModal = useModal();
  const alertModal = useModal();
  const { mutate: editStore, isPending } = useEditStore(storeId, {
    onError: () => {
      alertModal.show();
    },
  });

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('description', data.description);
      setValue('address', data.city);
      setValue('type', data.kind_menu);
      setValue('petFriendly', data.pet_friendly);
      setFileUrls(data.store_photo || []);
    }
  }, [data, setValue]);

  const onSelectorType = useCallback(
    (type?: KindMenu) => {
      if (!type) return;
      setValue('type', type);
      clearErrors('type');
    },
    [clearErrors, setValue]
  );

  const onSelectorPetFriendly = (type?: PetFriendlyOption) => {
    if (type === 'possible') {
      setValue('petFriendly', true);
    } else {
      setValue('petFriendly', false);
    }
    clearErrors('petFriendly');
  };

  const onSelectAddress = useCallback(
    (address: string) => {
      if (!address) return;
      setValue('address', address);
      clearErrors('address');
    },
    [clearErrors, setValue]
  );

  const onSetFileUrls = useCallback(
    (fileUrl: string) => {
      if (!fileUrls || fileUrls.length < 0) return;
      if (fileUrls.length > 5) return;
      setFileUrls((prev) => [...(prev && prev), fileUrl]);
    },
    [fileUrls]
  );

  const onDeleteFileUrls = useCallback((fileUrl: string) => {
    setFileUrls((prev) => prev.filter((url) => url !== fileUrl));
  }, []);

  const onSubmit = (data: EditForm) => {
    if (!isLoggedIn) return;
    if (!data.address) {
      return setError('address', { message: '주소를 입력해주세요.' });
    }
    if (!data.type) {
      return setError('type', { message: '종류를 입력해주세요.' });
    }
    editStore({
      city: data.address,
      description: data.description,
      kind_menu: data.type as KindMenu,
      name: data.name,
      pet_friendly: data.petFriendly,
      store_photo: fileUrls,
    });
  };

  const disabled = !getValues('address') || !getValues('type');

  const petFriendlyChecked = (type?: boolean) => {
    return type ? 'possible' : 'impossible';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 pb-5">
      <Header
        title="수정하기"
        isBack
        customButton={
          <div>{isPending ? <LoadingSpinner /> : <Button title="수정" type="submit" disabled={disabled} />}</div>
        }
      />
      <div className="pt-24">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-1">
            <FormLabel text="이름" isRequired errorMessage={errors.name?.message} />
            <Input
              id="name"
              placeholder="제목을 입력해주세요."
              register={register('name', {
                required: {
                  message: '필수입니다.',
                  value: true,
                },
              })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <FormLabel text="종류" isRequired errorMessage={errors.type?.message} />
            <Input
              value={translateKindMenu(getValues('type')) ?? ''}
              style={{ cursor: 'default' }}
              readOnly={true}
              placeholder="종류를 선택해주세요."
              onClick={typeSelectorModal.show}
            />
          </div>

          <SearchAddress
            onSelectAddress={onSelectAddress}
            errorMessage={errors.address?.message}
            address={getValues('address')}
          />

          <div className="flex flex-col gap-1">
            <FormLabel text="애완동물 가능 여부" />
            <ul className="flex gap-4 items-center">
              {petFriendlyOptions.map((item) => (
                <li onClick={() => onSelectorPetFriendly(item)} key={item} className="flex items-center gap-1">
                  <FormLabel text={translatePetFriendlyType(item)} />
                  <RadioButton checked={petFriendlyChecked(getValues('petFriendly')) === item} />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <div>
              <FormLabel text="이미지 업로드" />
            </div>
            <UploadPhoto onSetFileUrls={onSetFileUrls} />
            <div className="my-4">
              <Divider type="sm" />
            </div>
            <div>
              <UploadPhotoList fileUrls={fileUrls} onDeleteFileUrls={onDeleteFileUrls} />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Divider type="sm" />
        </div>

        <div>
          <TextArea
            register={register('description', {
              required: {
                message: '필수입니다.',
                value: true,
              },
            })}
            isError={!!errors.description?.message}
            placeholder="소개를 작성해주세요!"
          />
        </div>
      </div>

      <BottomModal isOpen={typeSelectorModal.isVisible} onClose={typeSelectorModal.hide} title="종류">
        <div className="mt-10">
          <SelectorStoreType
            onSelector={onSelectorType}
            selectedType={getValues('type')}
            onClose={typeSelectorModal.hide}
          />
        </div>
      </BottomModal>

      <AlertModal type="error" close={alertModal.hide} isOpen={alertModal.isVisible} />
    </form>
  );
}
