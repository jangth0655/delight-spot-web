'use client';

import { useEffect } from 'react';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-h4 leading-h4 font-semibold text-slate-S500">현재 페이지를 접속할 수 없습니다.</h1>
        <button
          onClick={reset}
          className="text-body leading-body bg-slate-S400 text-white px-6 py-2 rounded-lg hover:bg-slate-S600 transition-colors"
        >
          다시 시도
        </button>
      </div>
    </section>
  );
}
