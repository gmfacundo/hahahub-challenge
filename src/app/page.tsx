import { AppWrapper } from '@/context/store';
import MainPage from '@/pages/MainPage';

export default function Home() {
  return (
    <AppWrapper>
      <MainPage />
    </AppWrapper>
  );
}
