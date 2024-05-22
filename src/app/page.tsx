import MainPage from '@/components/MainPage';
import { AppWrapper } from '@/context/store';

export default function Home() {
  return (
    <AppWrapper>
      <MainPage />
    </AppWrapper>
  );
}
