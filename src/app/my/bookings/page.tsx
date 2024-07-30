import Header from '@/components/header/Header';
import HeaderMenu from '@/components/HeaderMenu';
import BookingStoreList from '@/components/stores/BookingStoreList';

export default function BookingStorePage() {
  return (
    <section>
      <Header isBack title="찜 스토어" customMenu={<HeaderMenu />} />
      <BookingStoreList />
    </section>
  );
}
