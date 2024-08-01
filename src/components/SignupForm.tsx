'use client';

import { useForm } from 'react-hook-form';
import { useSignUp } from '@/hooks/queries/useAuth';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { useLoginState } from '@/store/useLoginState';

import Button from './Button';
import Input from './Input';

type SignUpForm = {
  email: string;
};

export default function SignUpForm() {
  const router = useRouter();
  const { code } = useLoginState();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    mode: 'onChange',
  });
  const modal = useModal();

  const { mutate: signup } = useSignUp({
    onError: () => {
      modal.show();
    },
  });

  const onSubmit = (data: SignUpForm) => {
    if (!code || !data.email) return;
    signup({
      code,
      email: data.email,
    });
  };

  const onGoHome = () => {
    router.replace('/');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 max-w-sm">
        <h1 className="mb-4 w-full text-center font-bold text-h3">회원가입</h1>
        <div className="flex flex-col gap-6">
          <Input
            placeholder="이메일을 입력해주세요."
            register={register('email', {
              required: '이메일은 필수입니다.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '올바른 이메일형식이 아닙니다.',
              },
            })}
          />
          <div className="flex items-center gap-2">
            <Button title="확인" disabled={!isValid} />
            <Button title="돌아가기" onClick={onGoHome} type="button" />
          </div>
          {errors.email?.message && (
            <p className="text-label text-system-S100 leading-label font-bold text-center">{errors.email?.message}</p>
          )}
        </div>
      </form>
    </>
  );
}
