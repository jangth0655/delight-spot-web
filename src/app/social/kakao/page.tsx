import AuthKakao from '@/components/AuthKakao';
import { Suspense } from 'react';

export default function KakaoLoginPage() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <AuthKakao />
    </Suspense>
  );
}
