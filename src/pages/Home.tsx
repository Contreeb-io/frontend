import Faqs from '@/components/home/faqs';
import Footer from '@/components/home/footer';
import Hero from '@/components/home/hero';
import Review from '@/components/home/review';
import Reasons from '@/components/home/reasons';
import Secure from '@/components/home/secure';
import Trust from '@/components/home/trust';
import Verified from '@/components/home/verified';

function Home() {
  return (
    <>
      <main>
        <Hero />
        <Trust />
        <Verified />
        <Secure />
        <Review />
        <Reasons />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}

export default Home;
