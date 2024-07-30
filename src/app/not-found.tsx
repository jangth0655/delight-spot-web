import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="fixed left-0 right-0 h-screen w-full bg-slate-800 flex justify-center items-center text-slate-50 ">
      <div className="px-10 flex flex-col justify-center items-center gap-4">
        <h1 className="font-semibold text-h3 leading-h3">완료되지 않는 페이지 또는 페이지를 찾을 수 없습니다.</h1>
        <Link
          href="/"
          className="bg-slate-600 p-4 flex justify-center items-center w-[180px] rounded-lg hover:bg-slate-900 transition-all text-h3 leading-h4"
        >
          <p>돌아가기</p>
        </Link>
      </div>
    </section>
  );
}
