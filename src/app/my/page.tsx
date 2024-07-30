import Header from '@/components/header/Header';
import HeaderMenu from '@/components/HeaderMenu';
import UserInfo from '@/components/mypage/UserInfo';
import UserStoreList from '@/components/mypage/UsreStoreList';
import Toast from '@/components/Toast';

export default function MyPage() {
  return (
    <section>
      <Header isBack title="MY PAGE" customMenu={<HeaderMenu />} />
      <UserInfo />
      <UserStoreList />
      <Toast isShowing />
    </section>
  );
}
