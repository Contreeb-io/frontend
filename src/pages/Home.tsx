import Faqs from '@/components/home/faqs';
import Footer from '@/components/home/footer';
import Hero from '@/components/home/hero';
import Review from '@/components/home/review';
import Secure from '@/components/home/secure';
import Transparent from '@/components/home/transparent';
import Trust from '@/components/home/trust';
import Verified from '@/components/home/verified';

function Home() {
  return (
    <>
      <main>
        <Hero />
        <Trust />
        <Verified />
        <Secure imageSrc="/secure.png" />
        <Review />
        <Transparent />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}

export default Home;
