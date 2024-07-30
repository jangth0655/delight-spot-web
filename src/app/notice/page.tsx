import Header from '@/components/header/Header';
import HeaderMenu from '@/components/HeaderMenu';

export default function NoticePage() {
  return (
    <section>
      <Header title="공지사항" isBack customMenu={<HeaderMenu />} />
      <div className="pt-20">
        <p className="text-h4 leading-h4 font-semibold">준비중입니다.</p>
      </div>
    </section>
  );
}
